import React, { useState } from "react";

export default function WeatherForecast() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function predictTemperature() {
    setResult("");
    setError("");

    if (!lat || !lon) {
      setError("Please enter both latitude and longitude.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: parseFloat(lat), lon: parseFloat(lon) }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.error) {
        setError("Error: " + data.error);
      } else if (data.predicted_temp_celsius !== undefined) {
        setResult(`Predicted Temperature: ${data.predicted_temp_celsius} °C`);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError("Failed to fetch prediction: " + err.message);
    }
  }

  return (
    <>
      <style>{`
        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f0f4f8;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          background: white;
          padding: 2rem 3rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          max-width: 400px;
          width: 100%;
        }
        h1 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }
        label {
          display: block;
          margin-bottom: 0.3rem;
          color: #555;
          font-weight: bold;
        }
        input[type="number"] {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          box-sizing: border-box;
        }
        button {
          width: 100%;
          padding: 0.6rem;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        .result, .error {
          margin-top: 1rem;
          text-align: center;
          font-weight: bold;
        }
        .result {
          color: #2d7a2d;
        }
        .error {
          color: #c9302c;
        }
      `}</style>

      <div className="container">
        <h1>Weather Forecast Predictor</h1>

        <label htmlFor="lat">Latitude:</label>
        <input
          id="lat"
          type="number"
          step="any"
          placeholder="Enter latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />

        <label htmlFor="lon">Longitude:</label>
        <input
          id="lon"
          type="number"
          step="any"
          placeholder="Enter longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />

        <button onClick={predictTemperature}>Predict Temperature</button>

        {result && <div className="result">{result}</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
}
