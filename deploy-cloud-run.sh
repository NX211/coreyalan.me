#!/bin/bash
set -e

# Print each command before executing
set -x

# Configuration
PROJECT_ID="YOUR_GCP_PROJECT_ID"  # Replace with your GCP project ID
SERVICE_NAME="coreyalan"
REGION="us-central1"  # Replace with your preferred region
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Push the image to Google Container Registry
echo "Pushing image to Google Container Registry..."
docker push $IMAGE_NAME

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image=$IMAGE_NAME \
  --platform=managed \
  --region=$REGION \
  --allow-unauthenticated \
  --memory=1Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --port=8080 \
  --set-env-vars="NODE_ENV=production" \
  --timeout=300s

echo "Deployment completed successfully!"
echo "Your application should be available at: $(gcloud run services describe $SERVICE_NAME --region=$REGION --format='value(status.url)')"