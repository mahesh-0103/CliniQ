# 🩺 CliniQ AI: Advanced Pneumonia Diagnostic System

<div align="center">

![CliniQ AI Banner](https://img.shields.io/badge/CliniQ-AI%20Diagnostics-1E40AF?style=for-the-badge&logo=lungs&logoColor=white)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.28+-FF4B4B?style=flat-square&logo=streamlit&logoColor=white)](https://streamlit.io/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.13+-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**A professional-grade medical web application for high-accuracy pneumonia detection from Chest X-ray images**

[Live Demo](https://huggingface.co/spaces/Kira0103/CliniQ) • [Report Bug](https://github.com/yourusername/cliniq-ai/issues) • [Request Feature](https://github.com/yourusername/cliniq-ai/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Live Demo](#-live-demo)
- [Architecture](#-architecture)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Using Hosted Backend](#using-hosted-backend-optional)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Design Philosophy](#-design--accessibility)
- [Project Structure](#-project-structure)
- [Diagnostic Logic](#-diagnostic-logic)
- [Contributing](#-contributing)
- [License](#-license)
- [Disclaimer](#️-disclaimer)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

**CliniQ AI** is a cutting-edge medical diagnostic platform that bridges the gap between AI-driven analysis and actionable medical documentation. Built on modern web standards and following **Morweb Medical Design Guidelines**, CliniQ empowers healthcare professionals with:

- ⚡ **Instant pneumonia detection** from chest X-ray images
- 📊 **Real-time confidence scoring** with severity classification
- 📄 **Hospital-standard PDF reports** for clinical documentation
- 💬 **Intelligent medical assistant** for patient education
- 🔒 **Privacy-first architecture** with in-memory data handling

> **Perfect for:** Medical institutions, telemedicine platforms, emergency diagnostics, and educational purposes.

---

## 🚀 Key Features

### 🤖 AI-Powered Diagnostics
- **Deep Learning Engine**: Utilizes a lightweight Keras model (MobileNetV2 architecture) optimized for rapid classification
- **Real-time Analysis**: Processes chest X-rays in seconds with confidence scoring
- **High Accuracy**: Achieves 96.5% validation accuracy on 100,000+ medical images
- **Severity Classification**: Automatic risk stratification (Normal, Mild, Moderate, Severe)

### 📊 Multi-Page Clinical Dashboard
- **Dashboard**: Real-time metrics, diagnostic trends, and activity monitoring
- **X-ray Analysis**: Streamlined workflow for image upload and instant diagnosis
- **Medical Reports**: Downloadable PDF reports following hospital standards
- **Case History**: Comprehensive tracking of all diagnostic sessions
- **AI Assistant**: Interactive chatbot for medical queries

### 📄 Professional Radiology Reports
- **Hospital-Grade Templates**: Follows standard radiology report formats
- **Automated Documentation**: Generates detailed findings, impressions, and recommendations
- **Severity-Based Guidelines**: Tailored clinical actions based on diagnosis confidence
- **Digital Signatures**: Built-in authentication and verification sections
- **Metadata Tracking**: Complete audit trail with timestamps and case IDs

### 💬 Clinical AI Assistant
- **Keyword-Matched Responses**: Intelligent natural language processing
- **Comprehensive Knowledge Base**: Covers symptoms, treatments, prevention, and more
- **Quick Questions**: Pre-programmed queries for common concerns
- **Pediatric & Elderly Care**: Specialized guidance for vulnerable populations
- **Emergency Protocols**: Clear indicators for when to seek immediate care

### 🔒 Privacy-First Design
- **In-Memory Processing**: No persistent storage of patient data
- **Patient ID Masking**: Auto-generated anonymous identifiers (PID-0001, PID-0002...)
- **Session-Based History**: Data cleared on browser close
- **HIPAA-Conscious**: Designed with medical privacy regulations in mind
- **No External Data Sharing**: All processing occurs locally or on secure backend

---

## 🌐 Live Demo

### Hosted Backend (Hugging Face Spaces)
🔗 **Backend API**: [https://huggingface.co/spaces/Kira0103/CliniQ](https://huggingface.co/spaces/Kira0103/CliniQ)

The CliniQ AI backend is deployed on **Hugging Face Spaces**, providing free, scalable API access:

- 📡 **Base URL**: `https://kira0103-cliniq.hf.space`
- 🔍 **Interactive Docs**: [https://kira0103-cliniq.hf.space/docs](https://kira0103-cliniq.hf.space/docs)
- 📊 **Health Check**: `GET /health`

> **Note**: The Hugging Face backend may have cold start times (~30-60 seconds) after periods of inactivity. For production deployments, consider self-hosting.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CliniQ AI System                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐         ┌──────────────┐            │
│  │   Frontend   │ ◄─────► │   Backend    │            │
│  │  (Streamlit) │  HTTPS  │   (FastAPI)  │            │
│  └──────────────┘         └──────────────┘            │
│         │                         │                    │
│         │                         │                    │
│  ┌──────▼──────┐           ┌─────▼─────┐             │
│  │ PDF Reports │           │ AI Model  │             │
│  │  Generator  │           │ (Keras)   │             │
│  └─────────────┘           └───────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Data Flow:
1. **User uploads** chest X-ray image via Streamlit frontend
2. **Image encoded** to Base64 and sent to FastAPI backend
3. **AI model** processes image and returns prediction
4. **Results displayed** with confidence scores and severity
5. **PDF report** generated client-side for download
6. **Case added** to in-memory session history

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| ![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat&logo=streamlit&logoColor=white) | Primary web framework |
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) | Core programming language |
| ![ReportLab](https://img.shields.io/badge/ReportLab-PDF-green?style=flat) | PDF report generation |

### Backend
| Technology | Purpose |
|-----------|---------|
| ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white) | REST API framework |
| ![Uvicorn](https://img.shields.io/badge/Uvicorn-Server-purple?style=flat) | ASGI server |
| ![Pydantic](https://img.shields.io/badge/Pydantic-Validation-red?style=flat) | Data validation |

### AI/ML
| Technology | Purpose |
|-----------|---------|
| ![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white) | Deep learning framework |
| ![Keras](https://img.shields.io/badge/Keras-D00000?style=flat&logo=keras&logoColor=white) | High-level neural network API |
| ![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white) | Numerical computing |
| ![Pillow](https://img.shields.io/badge/Pillow-Image-blue?style=flat) | Image processing |

### Deployment
| Technology | Purpose |
|-----------|---------|
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) | Containerization |
| ![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?style=flat&logo=huggingface&logoColor=black) | Backend hosting |

---

## 📥 Installation

### Prerequisites

Before you begin, ensure you have:

- **Python 3.9+** installed ([Download](https://www.python.org/downloads/))
- **pip** package manager
- **Git** for cloning the repository
- **(Optional)** Docker for containerized deployment
- **AI Model File**: `keras_model_from_trained_data.h5` (contact repository owner)

### Backend Setup

#### Option 1: Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cliniq-ai.git
   cd cliniq-ai
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Add your trained model**
   ```bash
   # Place your model file in the backend directory
   cp /path/to/keras_model_from_trained_data.h5 ./
   ```

4. **Start the FastAPI server**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 7860 --reload
   ```

5. **Verify backend is running**
   ```bash
   curl http://localhost:7860/health
   # Expected: {"status": "healthy", "model_loaded": true}
   ```

#### Option 2: Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t cliniq-backend .
   ```

2. **Run container**
   ```bash
   docker run -d -p 7860:7860 --name cliniq-backend cliniq-backend
   ```

3. **Check logs**
   ```bash
   docker logs -f cliniq-backend
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend  # or cd frontend from root
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure backend URL**
   
   Edit `app.py` and set the backend URL:
   ```python
   # For local backend
   BACKEND_URL = "http://localhost:7860"
   
   # For Hugging Face backend (see next section)
   BACKEND_URL = "https://kira0103-cliniq.hf.space"
   ```

4. **Run Streamlit app**
   ```bash
   streamlit run app.py
   ```

5. **Access the application**
   
   Open your browser and navigate to: `http://localhost:8501`

### Using Hosted Backend (Optional)

If you want to use the **pre-deployed Hugging Face backend** instead of running locally:

1. **Open `app.py`** in your frontend directory

2. **Update the `BACKEND_URL`**:
   ```python
   # app.py - Line ~20
   BACKEND_URL = "https://kira0103-cliniq.hf.space"
   ```

3. **Run the frontend only**:
   ```bash
   streamlit run app.py
   ```

**Benefits**:
- ✅ No need to set up backend locally
- ✅ No AI model file required
- ✅ Always up-to-date with latest model
- ⚠️ Requires internet connection
- ⚠️ May have cold start delays (~30-60s)

---

## 🎯 Usage

### Quick Start Guide

1. **Launch the Application**
   ```bash
   streamlit run app.py
   ```

2. **Navigate to X-ray Analysis**
   - Click "🔍 X-ray Analysis" in the sidebar

3. **Enter Patient Information**
   - Patient Name (required)
   - Age (required)
   - Gender
   - Patient ID (auto-generated: PID-0005, PID-0006...)
   - Symptoms (optional)

4. **Upload Chest X-ray**
   - Supported formats: PNG, JPG, JPEG
   - Recommended: Frontal view chest X-rays
   - Image will be displayed for verification

5. **Run Analysis**
   - Click "🚀 Run AI Analysis"
   - Wait for AI processing (3-10 seconds)
   - View results with confidence score

6. **Download Report**
   - Navigate to "📄 Reports" page
   - Click "⬇️ Download PDF Report"
   - Share with medical professionals

### Using the AI Assistant

1. **Navigate to AI Assistant** page
2. **Ask questions** like:
   - "What are common pneumonia symptoms?"
   - "How is pneumonia treated?"
   - "When should I seek emergency care?"
3. **Use Quick Questions** for instant answers

### Viewing Case History

- **Dashboard**: Overview of all cases with metrics
- **Case History**: Detailed table with export to CSV

---

## 📡 API Documentation

### Base URL
```
Local:          http://localhost:7860
Hugging Face:   https://kira0103-cliniq.hf.space
```

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2025-12-13T10:30:00Z"
}
```

#### 2. Predict Pneumonia
```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "image": "base64_encoded_image_string",
  "patient_name": "John Doe",
  "patient_age": "45",
  "patient_gender": "Male",
  "patient_id": "PID-0001",
  "symptoms": "Cough, fever, shortness of breath"
}
```

**Response (Pneumonia Detected):**
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

**Response (Normal):**
```json
{
  "is_pneumonia": false,
  "label": "NORMAL CHEST X-RAY",
  "confidence": 97.8,
  "severity": "NORMAL",
  "predictions": [0.978, 0.022],
  "timestamp": "2025-12-13T10:35:00Z"
}
```

### Interactive API Docs

Visit the Swagger UI for interactive testing:
- **Local**: http://localhost:7860/docs
- **Hosted**: https://kira0103-cliniq.hf.space/docs

---

## 🎨 Design & Accessibility

CliniQ follows the **Morweb Medical Website Design Guidelines** to ensure patient-centered care:

### Visual Hierarchy
- **Primary Color**: `#1E40AF` (Deep Blue) - Trust and professionalism
- **Success**: `#10B981` (Emerald Green) - Positive results
- **Warning**: `#F59E0B` (Amber) - Attention needed
- **Danger**: `#EF4444` (Red) - Critical findings

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold, clear hierarchy (H1-H3)
- **Body Text**: 11-14px, high contrast, readable line height

### Branding & Author

