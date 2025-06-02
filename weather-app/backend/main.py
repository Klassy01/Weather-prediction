from fastapi import FastAPI
from pydantic import BaseModel
from meteostat import Point, Daily
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()   # <-- This line must be before @app.post

# Enable CORS for local frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, set your frontend origin here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model("weather_forecast_lstm.h5", compile=False)
model.compile(optimizer='adam', loss='mse')

class WeatherRequest(BaseModel):
    lat: float
    lon: float

@app.post("/predict")
def predict_temperature(req: WeatherRequest):
    lat, lon = req.lat, req.lon
    location = Point(lat, lon)

    end = datetime.now()
    start = end - timedelta(days=90)  # fetch last 90 days

    data = Daily(location, start, end).fetch()

    print(f"Fetched data columns: {data.columns}")
    print(f"Total rows fetched: {len(data)}")

    if 'tavg' not in data.columns or len(data['tavg'].dropna()) < 30:
        # fallback: compute average from tmin and tmax if possible
        if 'tmin' in data.columns and 'tmax' in data.columns:
            data['tavg'] = (data['tmin'] + data['tmax']) / 2
            if len(data['tavg'].dropna()) < 30:
                return {"error": "Not enough data for prediction."}
        else:
            return {"error": "Not enough data for prediction."}

    temps = data['tavg'].dropna().values[-30:].reshape(-1, 1)

    scaler = MinMaxScaler()
    temps_scaled = scaler.fit_transform(temps)
    seq = temps_scaled.reshape(1, 30, 1)

    prediction = model.predict(seq)
    temp_next = scaler.inverse_transform(prediction)[0][0]
    temp_next = float(temp_next)  # convert numpy.float32 to float

    return {"predicted_temp_celsius": round(temp_next, 2)}
