# 🌦️ Weather Prediction API

A REST API for predicting next day's average temperature using LSTM deep learning and historical weather data.

![API Demo](https://img.shields.io/badge/Demo-Live-green) 
![Python Version](https://img.shields.io/badge/Python-3.12+-blue)
![License](https://img.shields.io/badge/License-MIT-orange)

## 📌 Features

- **Accurate Predictions**: LSTM model trained on historical weather patterns
- **Real-time Data**: Fetches latest 90 days of weather data from Meteostat
- **Easy Integration**: Simple REST endpoints with JSON responses
- **CORS Enabled**: Ready for web applications
- **Scalable**: Built with FastAPI for high performance

## 🛠️ Tech Stack

| Component          | Technology |
|--------------------|------------|
| Backend Framework  | FastAPI    |
| Machine Learning   | TensorFlow/Keras |
| Weather Data       | Meteostat API |
| Data Preprocessing | scikit-learn |
| API Documentation  | Swagger UI |

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- pip package manager
- Internet connection (for API data fetching)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Klassy01/Weather-prediction.git
   cd Weather-prediction

   Set up virtual environment:git add .
git commit -m "Add React frontend, backend, and model files"
git push origin main


python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
Install dependencies:

bash
pip install -r requirements.txt
Add model file:

Place weather_forecast_lstm.h5 in project root

(Optional) Download sample model

🏃 Running the API
Start the development server:

bash
uvicorn main:app --reload
The API will be available at:

http://127.0.0.1:8000 (Local)

Interactive docs: http://127.0.0.1:8000/docs

📡 API Endpoints
POST /predict
Predict next day's average temperature for given coordinates.

Request:

json
{
  "lat": 40.7128,
  "lon": -74.0060
}
Successful Response (200):

json
{
  "predicted_temp_celsius": 23.45,
  "confidence": 0.92
}
Error Responses:

400 Bad Request: Invalid coordinates

404 Not Found: Location not supported

500 Server Error: Prediction failed

🧠 Model Details
Architecture: 2-layer LSTM with 50 units

Input Features: 90 days historical temperature data

Output: Next day's average temperature (°C)

Accuracy: ±1.5°C RMSE on test data

🌐 Deployment
Production Deployment
bash
uvicorn main:app --host 0.0.0.0 --port 80