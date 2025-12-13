# 🩺 CliniQ AI — Advanced Pneumonia Diagnostic System

**CliniQ AI** is a professional-grade medical web application designed for **high-accuracy pneumonia detection from Chest X-ray images**.  
Built on modern web standards and aligned with **Morweb medical website design guidelines**, it bridges the gap between **AI-driven analysis** and **clinically usable documentation**.

---

## 🚀 Key Features

### 🔍 AI-Powered Diagnostics
- Lightweight **Keras/TensorFlow model** for rapid Chest X-ray classification  
- Real-time **confidence scoring** to support clinical interpretation

### 🧭 Multi-Page Clinical Dashboard
- Responsive, **multi-page medical UI**
- Dedicated sections for:
  - Image analysis
  - Patient history
  - Diagnostic reporting

### 📄 Professional Radiology Reports
- Auto-generated **downloadable PDF reports**
- Hospital-style formatting
- Automated **severity interpretation** based on model confidence

### 🤖 Clinical AI Assistant
- Local, **keyword-matched chatbot**
- Preloaded with curated clinical knowledge:
  - Symptoms & severity
  - Pediatric and elderly care
  - Recovery timelines

### 🔐 Privacy-First Architecture
- No persistent database storage
- **In-memory session history**
- Masked patient identifiers (e.g., `PID-0001`)
- Designed to align with basic medical data privacy principles

---

## 🎨 Design & Accessibility

CliniQ AI follows **Morweb Medical Website Design Guidelines** to ensure usability and trust:

- 🎨 **Professional Medical Palette**  
  Primary color: `#1E40AF` (Deep Clinical Blue)

- 🧠 **Clear Visual Hierarchy**  
  High-contrast typography optimized for medical environments

- 🫁 **Clinical Branding**  
  Opaque lung iconography to establish authority and trust

- 📱 **Mobile-First Responsive Design**  
  Fully adaptable across desktops, tablets, and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Node.js**

### Backend
- **FastAPI (Python)**
- Hosted on **Hugging Face Spaces**

### AI Engine
- **TensorFlow / Keras**
- **MobileNetV2 architecture**

### Reporting
- Client-side PDF generation using `@react-pdf/renderer`

---

