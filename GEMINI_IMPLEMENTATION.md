# Gemini AI Implementation Guide

## Overview
This document details the Gemini AI integration for the Video Demo Agent, focusing on prompt engineering and model configuration.

## Gemini Model Configuration

```javascript
const {VertexAI} = require('@google-cloud/vertexai');

class GeminiService {
  constructor() {
    this.vertexAI = new VertexAI({
      project: process.env.GCP_PROJECT,
      location: 'us-central1'
    });
    
    // Initialize Gemini 1.5 Pro
    this.model = this.vertexAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_ONLY_HIGH'
        }
      ]
    });
  }
}
```

## Core Prompts

### 1. Repository Analysis
```javascript
async analyzeRepository(repoData) {
  const prompt = `You are an expert software engineer analyzing a GitHub repository.
  
Repository: ${repoData.name}
Description: ${repoData.description}
Language: ${repoData.language}
README: ${repoData.readme}

Analyze and provide:
1. **Project Purpose**: What problem does this solve?
2. **Key Features**: List 3-5 main features
3. **Tech Stack**: Primary technologies and frameworks
4. **Demo Flow**: Step-by-step demo script (2-3 minutes)
5. **Visual Focus Points**: Where to zoom during recording

Format as JSON.`;
  
  return await this.model.generateContent(prompt);
}
```

### 2. Social Media Content Generation

```javascript
async generateLinkedInPost(analysis) {
  const prompt = `Create a professional LinkedIn post about this project:
  
${JSON.stringify(analysis, null, 2)}

Requirements:
- Professional tone but engaging
- Highlight business value
- Include 3-5 relevant hashtags
- Call-to-action at the end
- Maximum 3000 characters

Structure:
1. Hook (attention grabber)
2. Problem/Solution
3. Key benefits
4. Call to action`;

  return await this.model.generateContent(prompt);
}

async generateTwitterThread(analysis) {
  const prompt = `Create a Twitter/X thread about this technical project:
  
${JSON.stringify(analysis, null, 2)}

Requirements:
- Technical but accessible
- 5-7 tweets maximum
- Each tweet under 280 characters
- Include relevant hashtags
- End with a link placeholder

Make it informative and shareable.`;

  return await this.model.generateContent(prompt);
}
```

### 3. Intelligent Zoom Detection

```javascript
async detectZoomPoints(videoScript, codeStructure) {
  const prompt = `Given this demo script and code structure, identify optimal zoom points:

Script: ${videoScript}
Code Structure: ${JSON.stringify(codeStructure)}

For each zoom point, provide:
- timestamp (seconds)
- zoom level (1.0-3.0)
- target area (coordinates or description)
- duration (seconds)
- transition type (smooth/instant)

Consider:
- Code sections being explained
- UI elements being demonstrated
- Important terminal output
- Key interactions

Return as JSON array.`;

  return await this.model.generateContent(prompt);
}
```

## Best Practices

1. **Context Window**: Gemini 1.5 Pro supports up to 1M tokens
2. **Structured Output**: Request JSON for easier parsing
3. **Temperature**: Use 0.7 for creative content, 0.3 for analysis
4. **Safety Settings**: Configure based on content type
5. **Caching**: Cache analysis results in Firestore

## Error Handling

```javascript
async safeGenerateContent(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      if (error.code === 'RESOURCE_EXHAUSTED') {
        await this.exponentialBackoff(i);
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}
```