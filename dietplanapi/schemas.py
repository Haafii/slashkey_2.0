from pydantic import BaseModel

class User(BaseModel):
    activity:float
    bmr:float