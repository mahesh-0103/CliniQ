import type { ApiPredictionResponse, PatientData } from './types';

export async function fetchPredict(
  base64String: string,
  patientData: PatientData
): Promise<ApiPredictionResponse> {

  // The API expects a raw base64 string, without the data URI prefix.
  const base64Image = base64String.split(',')[1];
  
  const payload = {
    image_base64: base64Image,
    patient_data: {
      patient_name: patientData.patient_name,
      patient_age: String(patientData.age),
      patient_gender: patientData.gender,
      patient_id: patientData.patient_id,
      symptoms: patientData.symptoms,
    }
  };

  const response = await fetch("https://kira0103-cliniq.hf.space/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const data: ApiPredictionResponse = await response.json();
  return data;
}
