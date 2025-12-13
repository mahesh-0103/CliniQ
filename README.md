# 🩺 CliniQ : Advanced Pneumonia Diagnostic System

<div align="center">

![CliniQ  Banner](https://img.shields.io/badge/CliniQ-AI%20Diagnostics-1E40AF?style=for-the-badge&logo=lungs&logoColor=white)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.13+-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**Professional-grade medical platform for AI-powered pneumonia detection from chest X-rays**

[Live Demo](https://huggingface.co/spaces/Kira0103/CliniQ) • [Report Bug](https://github.com/yourusername/cliniq-ai/issues) • [Request Feature](https://github.com/yourusername/cliniq-ai/issues)

</div>

---

## 🌟 Overview

**CliniQ AI** is a modern medical diagnostic platform combining React frontend with FastAPI backend for instant pneumonia detection. Built following **Morweb Medical Design Guidelines** with focus on accessibility, clinical usability, and privacy-first architecture.

---

## 🚀 Key Features

- 🤖 **AI-Powered Diagnostics**: Keras/TensorFlow model achieving 96.5% accuracy
- ⚡ **Real-time Analysis**: Instant chest X-ray processing with confidence scoring
- 📊 **Clinical Dashboard**: Multi-page React interface with interactive visualizations
- 📄 **PDF Reports**: Client-side generation using `@react-pdf/renderer`
- 💬 **Medical Assistant**: Keyword-matched chatbot with comprehensive clinical data
- 🔒 **Privacy-First**: In-memory state management, no persistent storage
- 📱 **Responsive Design**: Tailwind CSS with mobile-optimized layouts

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│           CliniQ AI System                  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐      ┌──────────────┐     │
│  │   Frontend   │◄────►│   Backend    │     │
│  │   TypeScript │ API │  FastAPI     │     │
│  │  + Tailwind  │      │  + Keras     │     │
│  └──────────────┘      └──────────────┘     │
│         │                      │            │
│  ┌──────▼──────┐      ┌───────▼────┐        │
│  │ PDF Reports │      │  AI Model  │        │
│  │ @react-pdf  │      │ (HF Space) │        │
│  └─────────────┘      └────────────┘        │
└─────────────────────────────────────────────┘
```

### Data Flow
1. User uploads X-ray → **Base64 encoding** (client-side)
2. POST to `/predict` → **FastAPI validation** (Pydantic)
3. Image preprocessing → **Keras inference** (224×224 normalization)
4. Results returned → **In-memory state** (React)
5. PDF generation → **Client-side rendering** (@react-pdf)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript** - Component architecture
- **Tailwind CSS** - Responsive grid system (grid-cols-12)
- **Recharts** - Confidence gauges & severity charts
- **@react-pdf/renderer** - Client-side PDF generation
- **React Router** - Multi-page navigation

### Backend (Hugging Face Spaces)
- **FastAPI** - Async ASGI framework
- **Keras/TensorFlow** - AI model inference
- **Pydantic** - Data validation with field coercion
- **Docker** - Containerized deployment (port 7860)

### AI Model
- **Architecture**: MobileNetV2 (fine-tuned)
- **Input**: 224×224×3 RGB images
- **Output**: [normal_prob, pneumonia_prob]
- **Hosted**: [Hugging Face Space](https://huggingface.co/spaces/Kira0103/CliniQ)

---

## 📥 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.9+ (for local backend testing)
- Git

### Quick Start (Using Hosted Backend)

1. **Clone repository**
   ```bash
   git clone https://github.com/mahesh0103/cliniq.git
   cd cliniq
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   ```typescript
   // src/config.ts
   export const API_URL = "https://kira0103-cliniq.hf.space";
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access application**
   ```
   http://localhost:3000
   ```

### Local Backend Setup (Optional)

1. **Install Python dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Download AI model**
   - Model hosted at: https://huggingface.co/spaces/Kira0103/CliniQ
   - Place `keras_model_from_trained_data.h5` in `backend/` directory

3. **Run FastAPI server**
   ```bash
   uvicorn backend:app --host 0.0.0.0 --port 7860 --reload
   ```

4. **Update frontend config**
   ```typescript
   export const API_URL = "http://localhost:7860";
   ```

---

## 🎯 Usage

### Basic Workflow

1. **Navigate to Diagnostic Page** (`/diagnostic`)
2. **Enter patient information**:
   - Name, Age (auto-validates as string), Gender
   - Patient ID (auto-generated: PID-0001, PID-0002...)
   - Symptoms (optional)
3. **Upload chest X-ray** (PNG/JPG/JPEG)
4. **Click "Run Analysis"** → Results in 3-5 seconds
5. **View confidence gauge** and severity classification
6. **Download PDF report** from Reports page

### AI Assistant
- Pre-loaded quick questions on symptoms, treatment, prevention
- Keyword-matched responses for medical queries
- Pediatric and elderly care guidelines

---

## 📡 API Documentation

### Base URL
```
Production: https://kira0103-cliniq.hf.space
Local:      http://localhost:7860
```

### Endpoints

#### `POST /predict`
**Request:**
```json
{
  "image": "base64_encoded_string",
  "patient_name": "John Doe",
  "patient_age": "45",  // String or int (auto-coerced)
  "patient_gender": "Male",
  "patient_id": "PID-0001",
  "symptoms": "Cough, fever"
}
```

**Response:**
```json
{
  "is_pneumonia": true,
  "label": "PNEUMONIA DETECTED",
  "confidence": 92.5,
  "severity": "HIGH PROBABILITY",
  "predictions": [0.075, 0.925],
  "timestamp": "2025-12-13T10:35:00Z"
}
```

#### `GET /health`
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

**Interactive Docs**: https://kira0103-cliniq.hf.space/docs

---

## 🔧 Critical Technical Fixes

### 1. Tensor Input Mismatch (Fixed)
**Problem**: Model expected single 4D tensor, received multiple tensors → `400 Bad Request`

**Solution**: 
```python
# backend.py - Explicit batch dimension
img_array = np.expand_dims(img_array, axis=0).astype(np.float32)
```

### 2. Data Type Validation (Fixed)
**Problem**: Frontend sent `patient_age` as int, backend expected string → `422 Unprocessable Entity`

**Solution**:
```python
# backend.py - Pydantic field validator
@field_validator('patient_age', mode='before')
def coerce_age(cls, v):
    return str(v) if v is not None else ""
```

---

## 🎨 Design Philosophy

### Morweb Medical Guidelines
- **Primary Color**: `#1E40AF` (Deep Blue) - Trust & professionalism
- **Typography**: Inter font, high contrast (4.5:1 minimum)
- **Iconography**: Opaque SVG lungs icon for clinical authority
- **Layout**: Grid-cols-12 responsive system

### Accessibility
- ♿ WCAG 2.1 Level AA compliant
- ⌨️ Keyboard navigation
- 📖 Screen reader optimized
- 🎨 High contrast mode support

---

## 📁 Project Structure

```
cliniq-ai/
├── backend/
│   ├── backend.py                      # FastAPI app
│   ├── requirements.txt
│   └── keras_model_from_trained_data.h5
│
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Diagnostic.tsx
│   │   ├── Reports.tsx
│   │   └── Assistant.tsx
│   ├── utils/
│   │   ├── api.ts                      # API client
│   │   └── pdfGenerator.ts             # @react-pdf logic
│   ├── App.tsx                         # Main router
│   └── config.ts                       # API URL config
│
├── package.json
├── tailwind.config.js
└── README.md
```

## 📜 License

MIT License - see [LICENSE](LICENSE) file

---

## ⚠️ Medical Disclaimer

**CliniQ AI is for educational and auxiliary diagnostic support only.**

- ✅ Designed to assist healthcare professionals
- 🏥 All findings must be verified by certified radiologists
- 🚫 Not FDA approved - research tool only
- ❌ Do NOT use for emergency diagnoses
- 📋 Clinical correlation with patient history required

**In emergencies, call your local emergency services (e.g., 911).**


---

## 🙏 Acknowledgments

- **Hugging Face** - Model hosting and deployment
- **Morweb** - Medical design guidelines
- **NIH** - Chest X-ray datasets
- **Open source community** - All the amazing tools used

---

<div align="center">


Made with ❤️ for better healthcare

[⬆ Back to Top](#-cliniq-ai-advanced-pneumonia-diagnostic-system)

</div>
