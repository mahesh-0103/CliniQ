from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, field_validator
from typing import Dict, Any, Union
import numpy as np
import io, base64, os
from tensorflow.keras.models import load_model
from PIL import Image
import random 

MODEL_PATH = os.path.join(os.getcwd(), "keras_model_from_trained_data.h5")
MODEL = None

app = FastAPI(title="CliniQ AI API")

class PatientData(BaseModel):
    patient_name: str
    patient_age: Union[str, int] 
    patient_gender: str
    patient_id: str
    symptoms: str

    @field_validator('patient_age')
    @classmethod
    def convert_age_to_str(cls, v):
        return str(v) 

class PredictionRequest(BaseModel):
    image_base64: str          
    patient_data: PatientData 

def get_model():
    global MODEL
    if MODEL is not None: return MODEL
    if os.path.exists(MODEL_PATH):
        try:
            MODEL = load_model(MODEL_PATH, compile=False)
            return MODEL
        except Exception as e:
            print(f"ERROR: Model Load Failed: {e}")
            return None
    return None

@app.post("/predict")
async def predict(request: PredictionRequest):
    model_instance = get_model()
    try:
        image_data = base64.b64decode(request.image_base64)
        image = Image.open(io.BytesIO(image_data)).convert('RGB').resize((224, 224))
        img_array = np.array(image) / 255.0
        
        img_tensor = np.expand_dims(img_array, axis=0).astype(np.float32)

        if model_instance is None:
            return {"label": "MOCK MODE", "confidence": 95.0, "status": "Model Unloaded"}

        preds = model_instance.predict(img_tensor)
        confidence = float(preds[0][0])
        
        # Normalize score
        confidence = confidence * 100 if confidence <= 1.0 else confidence

        return {
            "label": "PNEUMONIA DETECTED" if confidence > 75.0 else "NORMAL",
            "confidence": round(confidence, 2),
            "severity": "HIGH" if confidence > 85 else "MODERATE",
            "model_status": "Active"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
