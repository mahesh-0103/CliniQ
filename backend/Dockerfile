# Dockerfile - For Hugging Face Spaces Deployment

FROM python:3.10-slim

# Setup environment and user
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"
WORKDIR /app

# Copy requirements and install
COPY --chown=user ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy application code and model (Hugging Face LFS handles the model)
COPY --chown=user . /app

# Expose the port Hugging Face requires
EXPOSE 7860

# Command to run the Uvicorn server
CMD ["uvicorn", "backend.backend:app", "--host", "0.0.0.0", "--port", "7860"]