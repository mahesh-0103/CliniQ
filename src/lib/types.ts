import { z } from 'zod';

export const PatientDataSchema = z.object({
  patient_name: z.string().min(2, "Full name is required."),
  age: z.coerce.number().min(0, "Age must be a positive number."),
  gender: z.enum(['Male', 'Female', 'Other']),
  symptoms: z.string().min(10, "Please provide a brief description of symptoms."),
});

// This is the type for the form data
export type PatientFormData = z.infer<typeof PatientDataSchema>;

// This is the type that includes the patient_id, which is generated before API call
export type PatientData = PatientFormData & {
  patient_id: string;
};

// This type matches the raw API response
export type ApiPredictionResponse = {
  label: 'PNEUMONIA' | 'NORMAL';
  confidence: number;
  is_pneumonia: boolean;
  severity: string;
  model_status: string;
  findings?: string[];
  recommendations?: string;
};


// This is the main type used throughout the application UI
export type PredictionResponse = {
  diagnosis: 'PNEUMONIA DETECTED' | 'NORMAL FINDINGS';
  confidence_level: number;
  findings: string[];
  recommendations: string;
  patient_data: {
    patient_name: string;
    patient_age: number;
    patient_gender: string;
    patient_id: string;
    symptoms: string;
  };
};

// Type for Zustand store
export type PredictionHistoryItem = PredictionResponse & {
  date: string;
};
