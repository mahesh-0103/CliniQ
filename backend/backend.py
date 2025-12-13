# backend/backend.py - FastAPI Service for ML Prediction
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import numpy as np
import io
import base64
import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image

# --- Configuration (Using the absolute path provided by the user) ---
# NOTE: Using forward slashes for cross-platform compatibility in Python strings
MODEL_PATH = "C:/Users/Kira/Documents/Projects/Pneumonia/models/keras_model_from_trained_data.h5"
PNEUMONIA_THRESHOLD = 0.75 

# --- FastAPI App Setup ---
app = FastAPI(
    title="Pneumonia AI Prediction API",
    description="Endpoint for serving the Keras Chest X-ray Classification Model.",
)

# --- Data Structure for Request ---
class PredictionRequest(BaseModel):
    image_base64: str
    patient_data: Dict[str, Any]

# --- Model Loading ---
@app.on_event("startup")
def load_model_on_startup():
    global MODEL, IS_MOCK_MODEL
    
    if os.path.exists(MODEL_PATH):
        try:
            # Load the HDF5 model once at startup
            MODEL = load_model(MODEL_PATH, compile=False)
            IS_MOCK_MODEL = False
            print("INFO: Real Keras Model Loaded Successfully.")
        except Exception as e:
            MODEL = None
            IS_MOCK_MODEL = True
            print(f"WARNING: Model load failed ({e}). Running in MOCK mode.")
    else:
        MODEL = None
        IS_MOCK_MODEL = True
        print(f"WARNING: Model file not found at {MODEL_PATH}. Running in MOCK mode.")

# --- Prediction Endpoint ---
@app.post("/predict", response_model=Dict[str, Any])
async def predict(request: PredictionRequest):
    try:
        image_data = base64.b64decode(request.image_base64)

        # 1. Image Validation and Preprocessing
        try:
            image = Image.open(io.BytesIO(image_data))
            image.verify()
            
            image_array = np.array(image.convert('RGB').resize((224, 224))) / 255.0
            image_array = np.expand_dims(image_array, axis=0)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid image file or format.")

        # 2. Prediction Logic
        if IS_MOCK_MODEL:
            import random
            confidence = random.uniform(0.65, 0.99)
        else:
            # REAL MODEL LOGIC
            prediction = MODEL.predict(image_array)
            confidence = prediction[0][0] 

        # 3. Determine Result and Severity
        is_pneumonia = confidence > PNEUMONIA_THRESHOLD
        label = "PNEUMONIA DETECTED" if is_pneumonia else "NORMAL CHEST X-RAY"
        severity = "HIGH PROBABILITY" if (is_pneumonia and confidence > 0.85) else ("MODERATE" if is_pneumonia else "NORMAL")

        return {
            "label": label,
            "confidence": round(confidence * 100, 2),
            "is_pneumonia": is_pneumonia,
            "severity": severity,
            "model_status": "Active" if not IS_MOCK_MODEL else "MOCK"
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Prediction Error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal prediction error: {e}")