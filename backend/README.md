---
title: CliniQ AI Diagnostic Backend
emoji: 🩺
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
---
# CliniQ AI Diagnostic Backend

This space hosts the FastAPI backend service for the CliniQ AI application. It runs a lightweight Keras model for pneumonia prediction.

**API Endpoint:** /predict
**Model Status:** Lazy Loading (TensorFlow model loads on first API call to save resources).