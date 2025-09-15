import numpy as np
import pandas as pd
import joblib
import sys
import warnings
import os

warnings.filterwarnings("ignore")

def Predict_GWL(rainfall, maxTemperature, minTemperature, morningHumidity, eveningHumidity, postMonsoon, preMonsoon):
    model_path = r'E:\GWL Project\Model\GWL_Predictor_Maharastra2.pkl'

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")

    model = joblib.load(model_path)

    input_data = pd.DataFrame([{
        'Rainfall (mm)': rainfall,
        'Mean Max Temperature (°C)': maxTemperature,
        'Mean Min Temperature (°C)': minTemperature,
        'Morning Humidity (%)': morningHumidity,
        'Evening Humidity (%)': eveningHumidity,
        'Period_Post Monsoon': postMonsoon,
        'Period_Pre Monsoon': preMonsoon
    }])

    prediction = model.predict(input_data)
    return prediction[0]


if __name__ == "__main__":
    if len(sys.argv) != 8:
        print("Usage: python Maharastra_Predict.py rainfall maxTemperature minTemperature morningHumidity eveningHumidity postMonsoon preMonsoon")
        sys.exit(1)

    try:
        rainfall = float(sys.argv[1])
        maxTemperature = float(sys.argv[2])
        minTemperature = float(sys.argv[3])
        morningHumidity = float(sys.argv[4])
        eveningHumidity = float(sys.argv[5])
        postMonsoon = float(sys.argv[6])
        preMonsoon = float(sys.argv[7])

        # print("Inputs received:", rainfall, maxTemperature, minTemperature, morningHumidity, eveningHumidity, postMonsoon, preMonsoon)

        predicted_value = Predict_GWL(rainfall, maxTemperature, minTemperature, morningHumidity, eveningHumidity, postMonsoon, preMonsoon)
        print(predicted_value)
        # print(f"Predicted Ground Water Level: {predicted_value}")

    except ValueError as ve:
        print(f"Value Error Occurred: {ve}")
        sys.exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)
