# Gemini API Reference

## Quick Start

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash" 
});

// Generate content
const result = await model.generateContent(
  "Analyze this test and create a demo script"
);
const text = result.response.text();
```

## Text Generation
```javascript
const result = await model.generateContent({
  contents: [{ 
    role: "user", 
    parts: [{ text: "Your prompt" }] 
  }]
});
```

## Streaming
```javascript
const stream = await model.generateContentStream(prompt);
for await (const chunk of stream.stream) {
  console.log(chunk.text());
}
```

## Configuration
```javascript
{
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 8192,
  }
}
```