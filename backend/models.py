from database import Base
from sqlalchemy import Table, Column, MetaData , Integer, String, Float, DateTime # should be all the needed types
metadata = MetaData()
from sqlalchemy import CheckConstraint, PrimaryKeyConstraint, ForeignKeyConstraint
from database import Base

#7:57 - checked these looked goof to go
class Customer(Base):
     __tablename__ = 'Customer'

cid = Column(Integer, primary_key=True)
name = Column(String(80), nullable=False)
billing_addr = Column(String(160), nullable=False)


class EnergyPrice(Base):
        __tablename__ = 'Energy_Price'
zip_code = Column(String(5), primary_key=True)
datetime = Column(DateTime, primary_key=True)
price = Column(Float, nullable=False)

class ServiceLocation(Base):
        __tablename__ = 'Service_Location'
lid = Column(Integer, primary_key=True)
cid = Column(Integer, ForeignKeyConstraint('Customer.cid'), nullable=False)
address = Column(String(160), nullable=False)
unit_no = Column(Integer)
zip_code = Column(String(5), ForeignKeyConstraint('Energy_Price.zip_code'), nullable=False)
start_date = Column(DateTime, nullable=False)
size_sqft = Column(Integer, nullable=False)
num_beds = Column(Integer, nullable=False)
num_occupants = Column(Integer, nullable=False)

class EnrollDevice(Base):
        __tablename__ = 'Enroll_Device'
did = Column(Integer, primary_key=True)
lid = Column(Integer, ForeignKeyConstraint('Service_Location.lid'), nullable=False)
timeadded = Column(DateTime, nullable=False)
type = Column(String(80), nullable=False)
model = Column(String(80), nullable=False)

class DeviceEvent(Base):
            __tablename__ = 'Device_Event'
eid = Column(Integer, primary_key=True)
timestamp = Column(DateTime, nullable=False)
event_label = Column(String(80), nullable=False)
value = Column(Integer, nullable=False)