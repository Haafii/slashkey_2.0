from database import Base
from sqlalchemy import Column,Integer,String,Float,ForeignKey,Boolean
from sqlalchemy.orm import relationship

class user(Base):
    __tablename__ = "users"
 
    id = Column(Integer,primary_key = True,index = True,autoincrement=True)
    name=Column(String) 
    email=Column(String) 
    password=Column(String)
    uid = Column(String)

    bmitable = relationship("bmiModel", back_populates="owner")    

class bmiModel(Base):
    __tablename__ = "bmitable"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    age = Column(Integer)
    height = Column(Float)
    weight = Column(Float)
    activity = Column(Float)
    bmi_value = Column(Float)
    bmr_value = Column(Float) 
    owner_id = Column(Integer, ForeignKey("users.id"))
    calories_needed = Column(Float, default = 0)
 
    owner = relationship("user", back_populates="bmitable")

   
