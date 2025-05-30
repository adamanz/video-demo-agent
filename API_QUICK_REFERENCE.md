# API Quick Reference

## Browserbase
```javascript
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey });

// Create & connect
const session = await bb.sessions.create({ projectId });
const browser = await chromium.connectOverCDP(session.connectUrl);

// Get recording
const recording = await bb.sessions.recording.get(sessionId);
```

## Gemini AI
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Generate
const result = await model.generateContent(prompt);
const text = result.response.text();
```

## GitHub (Octokit)
```javascript
import { Octokit } from "octokit";
const octokit = new Octokit({ auth: token });

// Get repo
const { data } = await octokit.rest.repos.get({ owner, repo });
// Get file
const file = await octokit.rest.repos.getContent({ owner, repo, path });
```

## Test Parsing Patterns
```javascript
// Playwright: page.click(), page.goto(), page.fill()
// Cypress: cy.visit(), cy.get().click(), cy.type()
```

## Environment Variables
```bash
BROWSERBASE_API_KEY=
BROWSERBASE_PROJECT_ID=
GEMINI_API_KEY=
GITHUB_TOKEN=
```