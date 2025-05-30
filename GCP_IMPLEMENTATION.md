# GCP Backend Implementation Guide

## Overview
Complete Google Cloud Platform implementation for the Video Demo Agent backend.

## Service Architecture

### 1. Cloud Run Orchestrator
```javascript
// orchestrator/index.js
const express = require('express');
const {Storage} = require('@google-cloud/storage');
const {Firestore} = require('@google-cloud/firestore');
const {CloudTasksClient} = require('@google-cloud/tasks');

const app = express();
const storage = new Storage();
const firestore = new Firestore();
const tasks = new CloudTasksClient();

app.post('/demo/create', async (req, res) => {
  const {repoUrl, userId} = req.body;
  
  // Create demo document
  const demoRef = await firestore.collection('demos').add({
    userId,
    repoUrl,
    status: 'analyzing',
    createdAt: new Date()
  });
  
  // Queue analysis task
  await queueTask('analyze-repo', {
    demoId: demoRef.id,
    repoUrl
  });
  
  res.json({demoId: demoRef.id});
});
```

### 2. Cloud Tasks Queue
```javascript
async function queueTask(taskType, payload) {
  const project = process.env.GCP_PROJECT;
  const queue = 'demo-processing';
  const location = 'us-central1';
  
  const parent = tasks.queuePath(project, location, queue);
  
  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url: `https://orchestrator-run.a.run.app/task/${taskType}`,
      headers: {'Content-Type': 'application/json'},
      body: Buffer.from(JSON.stringify(payload)).toString('base64')
    }
  };
  
  await tasks.createTask({parent, task});
}
```

### 3. Cloud Storage Video Management
```javascript
class VideoStorage {
  constructor() {
    this.bucket = storage.bucket('demo-videos');
  }
  
  async uploadVideo(videoBuffer, demoId) {
    const filename = `${demoId}/demo.mp4`;
    const file = this.bucket.file(filename);
    
    await file.save(videoBuffer, {
      metadata: {
        contentType: 'video/mp4',
        cacheControl: 'public, max-age=3600'
      }
    });
    
    // Generate signed URL for temporary access
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    
    return url;
  }
}
```

### 4. Firestore Data Model
```javascript
// Collections structure
const collections = {
  users: {
    githubId: 'string',
    email: 'string',
    credits: 'number',
    createdAt: 'timestamp'
  },
  
  demos: {
    userId: 'string',
    repoUrl: 'string',
    analysis: {
      purpose: 'string',
      features: 'array',
      techStack: 'array',
      script: 'string'
    },
    video: {
      url: 'string',
      duration: 'number',
      size: 'number'
    },
    socialPosts: {
      linkedin: 'string',
      twitter: 'array'
    },
    status: 'string', // analyzing, recording, processing, complete
    createdAt: 'timestamp'
  }
};
```

### 5. Compute Engine Recording Instance
```javascript
// Startup script for recording instance
const startupScript = `#!/bin/bash
# Install dependencies
apt-get update
apt-get install -y ffmpeg xvfb chromium-browser

# Start virtual display
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

# Wait for app to be ready
while ! curl -s http://localhost:3000 > /dev/null; do
  sleep 1
done

# Start recording with GPU acceleration
ffmpeg -f x11grab -s 1920x1080 -i :99 \
  -c:v h264_nvenc -preset fast \
  -crf 23 -maxrate 5M -bufsize 10M \
  /tmp/recording.mp4 &

# Execute demo script
node /tmp/demo-script.js

# Stop recording
pkill ffmpeg

# Upload to Cloud Storage
gsutil cp /tmp/recording.mp4 gs://demo-videos/${DEMO_ID}/raw.mp4

# Shutdown instance
shutdown -h now`;
```

## Deployment Configuration

### Cloud Build
```yaml
# cloudbuild.yaml
steps:
  # Build orchestrator
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/orchestrator', '.']
    dir: 'orchestrator'
  
  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'orchestrator'
      - '--image=gcr.io/$PROJECT_ID/orchestrator'
      - '--region=us-central1'
      - '--platform=managed'
      - '--allow-unauthenticated'
```

### IAM Roles
```bash
# Service account roles
gcloud projects add-iam-policy-binding $PROJECT \
  --member="serviceAccount:orchestrator@$PROJECT.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding $PROJECT \
  --member="serviceAccount:orchestrator@$PROJECT.iam.gserviceaccount.com" \
  --role="roles/storage.admin"
```