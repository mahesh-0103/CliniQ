# **App Name**: CliniQ

## Core Features:

- User Authentication: Secure user sign-up and login using Firebase Authentication.
- Dashboard Metrics: Display key metrics (total predictions, positive pneumonia count, average confidence) fetched from Firestore on the dashboard.
- Image Capture and Upload: Capture X-ray images directly from the device camera or gallery, storing the image as Base64 (but not upload it yet).
- Data Input and API Call: Collect patient data (name, age, symptoms) using legible input fields, convert the image to Base64, and make a POST request to the FastAPI backend for pneumonia diagnosis.
- AI Diagnosis: Leverage AI to interpret medical images, providing diagnostic assistance with pneumonia detection; this tool determines the likely presence of pneumonia based on an analysis of the medical image.
- Results Display: Display the AI's diagnostic result (PNEUMONIA DETECTED/NORMAL) and confidence score in a clear, high-contrast status card.
- Prediction History: Maintain and display a filterable list of past predictions with Patient ID and Date, fetched from Firestore.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to evoke trust and medical professionalism.
- Background color: Light grey (#F0F2F5) for a clean, clinical appearance.
- Accent color: Teal (#009688) for highlights and actionable elements.
- Body and headline font: 'Inter', sans-serif, for a modern, neutral and objective feel that ensures readability.
- Use simple, recognizable medical icons for quick identification of features.
- Follow medical dashboard best practices: prioritize critical data and use a clear hierarchy.
- Subtle animations and transitions to guide the user through the diagnostic process.