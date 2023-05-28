from pydantic import BaseModel
from typing import Union


class User(BaseModel):
    Name:str
    password:str
    email:str

class UserShow(BaseModel):
    Name:str
    email:str
    class Config():
        orm_mode = True


class login(BaseModel):
    Name:str
    password:str
    
class UserInDB(User):
    password: str 

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    name: Union[str, None] = None


class BMIBase(BaseModel):
    age: int
    height: float
    weight: float
    activity: float


class BMIFind(BMIBase):
    class Config:
        orm_mode = True

class BMI(BMIBase):
    id: int
    owner_id: int
    bmi_value: float
    bmr_value: float 

    class Config:
        orm_mode = True

class BMIModel(BMI):
    calories_needed: float
      
    class Config:
        orm_mode = True

    
 
