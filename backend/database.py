from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


URL_DATABASE ='shems:///./home.rb'   # might need to change this to connect to localhost
                        #'shems:///./home.rb'

engine = create_engine(URL_DATABASE, connect_args={"check thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

