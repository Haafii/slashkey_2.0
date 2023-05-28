
from fastapi.responses import JSONResponse
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

from fastapi import FastAPI,Depends,HTTPException,status
import schemas
from database import engine,SessionLocal
import model
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from tocken1 import create_access_token
from sqlalchemy import desc
import uuid
import oaut2
# from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# Generate QR code

 
 
app = FastAPI()
model.Base.metadata.create_all(engine)

origins = [ 
    "http://localhost", 
    "http://localhost:8000"
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post('/user',tags=['user'])
async def user(request:schemas.User,db : Session = Depends(get_db)):
    
    userid = str(uuid.uuid4())
    user1 = model.user(name = request.Name, email = request.email, password = request.password, uid = userid)    
    db.add(user1)
    db.commit()
    db.refresh(user1) 
    
    return user1
 

@app.get('/user/{id1}',tags=['user'], status_code=status.HTTP_201_CREATED)
async def user(id1:int,db : Session = Depends(get_db),get_current_user : schemas.User = Depends(oaut2.get_current_user)):
    
    user = db.query(model.user).filter(model.user.id == id1).first()
    return user 


@app.post('/login',tags=['authentication'])
def login(request:OAuth2PasswordRequestForm= Depends(),db : Session = Depends(get_db)):
    user = db.query(model.user).filter(model.user.name == request.username).first()
    if not user:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="invalid credential")
    if (user.password != request.password ):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="invalid credential")
    
    access_token = create_access_token(data={"sub": user.name,"id":user.id})
    return {"access_token": access_token, "token_type": "bearer"} 

@app.get("/users/me/", response_model=None)  
async def read_users_me(current_user: schemas.User= Depends(oaut2.get_current_active_user)):
    return current_user
    

@app.post("/bmi", response_model=schemas.BMI, tags=['bmi'])
def bmi(request: schemas.BMIFind ,db : Session = Depends(get_db), current_user: schemas.User = Depends(oaut2.get_current_active_user)):
    h = request.height/100 #convert height in meter
    try:
        bmi_value = (request.weight / (h*h))
        bmr_value = 66.47 + (13.75 * request.weight) + (5.003 * request.height) - (6.755 * request.age)
    except ZeroDivisionError:
        return {'message':'Height cannot be zero'}
    bmi_data = model.bmiModel(age = request.age, height = h, weight = request.weight, activity = request.activity, bmi_value = bmi_value, bmr_value = bmr_value, owner_id = current_user.id)
    db.add(bmi_data)
    db.commit()
    db.refresh(bmi_data) 
    return bmi_data   
   
@app.get('/bmi',tags=['bmi'])
def showbmi(db : Session = Depends(get_db), current_user: schemas.User = Depends(oaut2.get_current_active_user)):
    bmi = db.query(model.bmiModel).filter(model.bmiModel.owner_id == current_user.id).first()
    return bmi


# Load the data once during startup
data = pd.read_csv('cleaned_data.csv')

# Separate the features (activity_level, BMR) from the target variable (calories_to_maintain_weight)
X = data[['activity_level', 'BMR']]
y = data['calories_to_maintain_weight']

# Create a linear regression model
modelML = LinearRegression()

# Train the model once during startup
modelML.fit(X, y)

@app.put("/model")
def predict_calories(request: schemas.BMI, db : Session = Depends(get_db), current_user: schemas.User = Depends(oaut2.get_current_active_user)):
    # Create a DataFrame with user input
    user_data = pd.DataFrame({'activity_level': [request.activity], 'BMR': [request.bmr_value]})

    # Make predictions
    predicted_calories = modelML.predict(user_data)
    predicted_calories=predicted_calories.round()
    update_bmi = db.query(model.bmiModel).filter(model.bmiModel.owner_id == current_user.id).first()

    if not update_bmi:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    #modelData = model.bmiModel(calorie_needed = predicted_calories, owner_id = current_user.id)
    update_bmi.calories_needed = predicted_calories[0]
    # db.add(current_user.calorie_needed)
    db.commit()
    # db.refresh(current_user.calorie_needed)
    print (predicted_calories)
    # Return the predicted calories as a JSON response 
    response_data = {"predicted_calories": predicted_calories[0]}
    return JSONResponse(content=response_data)
 
   
    
 
  
 

 
