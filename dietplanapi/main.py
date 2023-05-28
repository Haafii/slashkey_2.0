from fastapi import FastAPI
from fastapi.responses import JSONResponse
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import schemas
from dictionary import dict








app = FastAPI()

# Load the data once during startup
data = pd.read_csv('cleaned_data.csv')

# Separate the features (activity_level, BMR) from the target variable (calories_to_maintain_weight)
X = data[['activity_level', 'BMR']]
y = data['calories_to_maintain_weight']

# Create a linear regression model
model = LinearRegression()

# Train the model once during startup
model.fit(X, y)

@app.post("/model")
def predict_calories(request: schemas.User):
    # Create a DataFrame with user input
    user_data = pd.DataFrame({'activity_level': [request.activity], 'BMR': [request.bmr]})

    # Make predictions
    predicted_calories = model.predict(user_data)
    predicted_calories=predicted_calories.round()
    
    print(predicted_calories)
    
    diet={}

    # Return the predicted calories as a JSON response
    response_data = {"predicted_calories": predicted_calories[0]}
    if predicted_calories<250 and predicted_calories>500:
        diet = dict.get('lowest')
    elif predicted_calories<500 and predicted_calories>750:
        diet = dict.get('lower')
    elif predicted_calories<750 and predicted_calories>1000:
        diet = dict.get('standard')
    elif predicted_calories<1000 and predicted_calories>1250:
        diet = dict.get('slightlyhigher')
    elif predicted_calories<1250 and predicted_calories>1500:
        diet = dict.get('higher')
        
    elif predicted_calories>1250:
        diet = dict.get('mosthigher')
        
    return JSONResponse(diet)


