import warnings
from datetime import date, datetime
from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2
import random
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware

from psycopg2 import  Error

app = FastAPI()
try:
    # Connect to an existing database - stella
    conn = psycopg2.connect(user="postgres",
                                  password="cat",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="shems")
except:   # connect - vivi
        conn = psycopg2.connect("dbname=proj2 user=weizi")
finally:
    warnings.warn_explicit("Can't connect to database")
cur = conn.cursor()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class User(BaseModel):
    name: str
    billing_addr: str

class Location(BaseModel):
    cid: int
    address: str
    unit_no: str
    zip_code: str
    start_date: datetime
    size_eds: int
    num_osqft: int
    num_bccupants: int

class Device(BaseModel):
    lid: int
    time_added: datetime
    type: str
    model: str

class deviceEvents(Enum):
    DOOROPEN = "door open"
    LIGHTON = "light on"
    DOORCLOSED = "door closed"
    LIGHTOFF = "light off"
    TEMPINCREASE = "temperature increased"
    TEMPDECREASE = "temperature decreased"
class DeviceEvent(BaseModel):
    eid: int
    did: int
    time_stamp:  datetime
    event_label: deviceEvents
    value: float  # electrcity consumption

class Counter():
    def __init__(self):
        self.counter = 0
    def increment(self):
        self.counter += 1
    # def reset(self):
    #     self.counter = 0
    def get_value(self):
        return self.counter

# create some primary keys
keys = random.sample(range(1000, 9999), 4096) #return 4^6 unique primary keys
def getPrimaryKey():
    Counter.increment()
    return keys[Counter.get_value()-1]

#query runner
def run_query(query):
    cur.execute(query)
    conn.commit()
    records = cur.fetchall()
    return records

# how can i hold user password?
# register new user
@app.put("/users/register")
def register_user(user: User):
    q = f"""INSERT INTO Customer (cid, name, bil    ling_addr)
VALUES (${getPrimaryKey()}, ${user.name}, ${user.billing_addr});"""
    ret = run_query(q)
    return {"New customer registered!"}

@app.get("/users/login")  # searches customer name in customer table
def loginUser(user: User):
    q = f""" SELECT name from Customer where Customer.name LIKE str(USER)+"%" """
    ret = run_query(q)
    return {"ret": ret}

# register new device
@app.put("/devices/register")
def register_device(device: Device):
    q = f"""INSERT INTO Enroll_Device (did, lid, time_added, type, model)
VALUES (${device.lid}, ${getPrimaryKey()} ${device.time_added}, ${device.type}, ${device.model});"""
    ret = run_query(q)
    return {"New device registered!"}

# register new location
@app.put("/locations/register")
def register_location(location: 1):
    q = f"""INSERT INTO Service_Location (lid, cid, address, unit_no, zip_code, 
start_date, size_sqft, num_beds, num_occupants)
VALUES (${getPrimaryKey()},${location.cid}, ${location.address}, ${location.unit_no}, 
${location.zip_code}, ${location.start_date}, ${location.size_sqft}, 
${location.num_beds}, ${location.num_occupants});"""
    ret = run_query(q)
    return {"New location registered!"}

# remove device
@app.put("/devices/remove")
def remove_device(device_id: int):
    q = f"""DELETE FROM Enroll_Device WHERE did = ${device_id};"""
    ret = run_query(q)
    return {"Device removed."}

# remove location
@app.put("/locations/remove")
def remove_location(location_id: int):
    q = f"""DELETE FROM Service_Location WHERE lid = ${location_id};"""
    ret = run_query(q)
    #lid ++
    return {"Location removed."}


# list user devices
@app.get("/devices")
async def list_devices(user_id: int):
    q = f"""
SELECT
    ed.did AS device_id,
    ed.type,
    ed.model,
    sl.address AS location_address
FROM
    Service_Location sl
JOIN
    Enroll_Device ed ON sl.lid = ed.lid
WHERE
    sl.cid = {user_id};
"""
    ret = await run_query(q, True)
    return {"Devices": ret}

# list user locations
@app.get("/locations/{user_id}")
def list_locations(user_id: int):
    q = f"""SELECT * FROM Service_Location WHERE cid = ${user_id};"""
    ret = run_query(q)
    return {"Locations": ret}

# view daily energy consumption during a given day
@app.get("/views/1")
async def get_view_1(user_id: int, month: int, year: int):
    q = f"""
SELECT
    sl.cid AS user_id,
    CAST(de.timestamp AS DATE) AS date,
    SUM(de.value) AS total_energy_consumption
FROM
    Service_Location sl
JOIN
    Enroll_Device ed ON sl.lid = ed.lid
JOIN
    Device_Event de ON ed.did = de.did
WHERE
    sl.cid = {user_id}
    AND de.event_label = 'energy_use'
    AND EXTRACT(YEAR FROM de.timestamp) = '{year}'
    AND EXTRACT(MONTH FROM de.timestamp) = '{month}'
GROUP BY
    sl.cid,
    CAST(de.timestamp AS DATE)
    ;"""
    ret = await run_query(q, True)
    return {"ret": ret}

# view energy consumption per device for a given day
@app.get("/views/2")
async def get_view_2(user_id: int, day: date):
    q = f"""
SELECT
    ed.did AS device_id,
    de.timestamp AS datetime,
    de.value AS energy_consumption
FROM
    Service_Location sl
JOIN
    Enroll_Device ed ON sl.lid = ed.lid
JOIN
    Device_Event de ON ed.did = de.did
WHERE
    sl.cid = {user_id}
    AND de.event_label = 'energy_use'
    AND CAST(de.timestamp AS DATE) = '{day}'
GROUP BY
	ed.did,
    de.timestamp,
    de.value
;"""
    ret = await run_query(q, True)
    return {"ret": ret}

# view energy consumption during a given day compares to the average 
# consumption of other locations that are similar
@app.get("/views/3")
async def get_view_3(user_id: int, month: int, year: int):
    q = f"""
with x as (
    select 
    sl.cid, sl.lid, sl.size_sqft, de.value as cons
    from service_location sl
    join enroll_device ed on sl.lid = ed.lid
    join device_event de on ed.did = de.did
    where EXTRACT(YEAR FROM de.timestamp) = '{year}'
    AND EXTRACT(MONTH FROM de.timestamp) = '{month}'
    and de.event_label = 'energy_use'
    group by sl.cid, sl.lid, cons
)
,
sum_x as (
    select cid, lid, size_sqft, sum(cons) as cons from x
    group by cid, lid, size_sqft
),
sum_y as (  
    select lid, size_sqft, sum(cons) as cons from x
    group by lid, size_sqft
)

select 
  sum_x.lid as curr_lid, sum_x.size_sqft, sum_x.cons as cons, avg(sum_y.cons) as avg_cons
from sum_x cross join sum_y
where sum_x.lid != sum_y.lid and sum_x.cid = {user_id}
and sum_y.size_sqft between sum_x.size_sqft * 0.95 and sum_x.size_sqft * 1.05
group by curr_lid, sum_x.size_sqft, sum_x.cons
    ;"""
    ret = await run_query(q, True)
    return {"ret": ret}

# view when devices were used at peak (high-price) times and how much 
# could have been saved by using them during a different time
@app.get("/views/4")
async def get_view_4(user_id: int, day: date):
    q = f"""
WITH PeakUsage AS (
    SELECT
  		sl.lid,
  		sl.zip_code,
        de.timestamp AS datetime,
        ep.price AS energy_price,
        sum(de.value) AS energy_consumption
    FROM
        Service_Location sl
    JOIN
        Enroll_Device ed ON sl.lid = ed.lid
    JOIN
        Device_Event de ON ed.did = de.did
    JOIN
        Energy_Price ep ON sl.zip_code = ep.zip_code and de.timestamp = ep.datetime
    WHERE
        sl.cid = {user_id}
  		AND de.event_label = 'energy_use'
  		and cast(de.timestamp as date) = '{day}'
  	group by sl.lid, sl.zip_code, de.timestamp, ep.price
),
Prices AS (
    SELECT *
    FROM
        Energy_Price
    WHERE
        zip_code in (
          select zip_code from PeakUsage
        )
  		and cast(datetime as date) = '{day}'
)

SELECT
    pu.datetime AS peak_time,
    pu.energy_price AS peak_energy_price,
    pu.energy_consumption AS peak_energy_consumption,
    opu.datetime AS off_peak_time,
    opu.price AS off_peak_energy_price,
    (pu.energy_price - opu.price) * pu.energy_consumption AS potential_savings
FROM
    PeakUsage pu
cross JOIN
    Prices opu where pu.energy_price > opu.price
;"""
    ret = await run_query(q, True)
    return {"ret": ret}


@app.get("/views/5")
def avgMonthType(location: int):
    q = f"""WITH energy_consumption AS (
 SELECT 
   location.lid,
   location.num_osqft,
   SUM(de.value) AS total_energy_consumption
 FROM 
   Device_Event de
 JOIN 
   Enroll_Device ed ON de.did = ed.did
 JOIN 
   Service_Location sl ON ed.lid = sl.lid
 WHERE 
   EXTRACT(MONTH FROM de.time_stamp) = 8 AND 
   EXTRACT(YEAR FROM de.time_stamp) = 2022
 GROUP BY 
   location.lid,
   location.num_osqft,
),
average_energy_consumption AS (
 SELECT 
   FLOOR(num_osqft * 0.95) AS min_size,
   CEIL(num_osqft * 1.05) AS max_size,
   AVG(total_energy_consumption) AS average_energy_consumption
 FROM 
   energy_consumption
 GROUP BY 
   min_size,  max_size
  )
  SELECT 
 ec.lid,
 ec.num_osqft,
 ec.total_energy_consumption,
 ace.average_energy_consumption,
 ec.total_energy_consumption / ace.average_energy_consumption AS energy_consumption_ratio
FROM 
 energy_consumption ec
JOIN 
 average_energy_consumption ace ON ec.num_osqft BETWEEN ace.min_size AND ace.max_size;"""
    ret = run_query(q)
    return {"ret": ret}
@app.get("/")
def read_root():
    return {"Hello": "World"}