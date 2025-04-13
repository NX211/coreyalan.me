# Google Drive API Setup Guide

This guide will help you set up the Google Drive API for the document upload feature.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your Project ID

## Step 2: Enable the Google Drive API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Drive API" and select it
3. Click "Enable"

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a name for your service account (e.g., "document-upload-service")
4. Add a description (optional)
5. Click "Create and Continue"
6. For the role, select "Project" > "Editor" (or a more restricted role like "Drive File Creator" if you prefer)
7. Click "Continue" and then "Done"

## Step 4: Create a Service Account Key

1. Find your newly created service account in the list and click on it
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" as the key type
5. Click "Create". A JSON file will be downloaded to your computer.

## Step 5: Set Up Environment Variables

Open the downloaded JSON key file and copy the relevant information to your `.env.local` file:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
UPLOAD_API_KEY=your_secure_upload_api_key
NEXT_PUBLIC_UPLOAD_API_KEY=your_secure_upload_api_key
```

Notes:
- Replace `your-service-account@your-project.iam.gserviceaccount.com` with the `client_email` from the JSON file
- Replace `your_private_key_here` with the `private_key` value from the JSON file
- For `UPLOAD_API_KEY` and `NEXT_PUBLIC_UPLOAD_API_KEY`, create a secure random string (e.g., using `openssl rand -hex 32`)

## Step 6: Shared Drive Setup (Optional)

If you want to use a shared Google Drive folder:

1. Create the folder in Google Drive
2. Right-click the folder and select "Share"
3. Share it with your service account email with "Editor" permissions

## Step 7: Testing

After deploying with these environment variables, test the upload functionality:

1. Go to the document upload page
2. Upload a test file
3. Check your Google Drive to verify that the file was uploaded successfully 