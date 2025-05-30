# Browserbase API Reference

## Quick Start

```javascript
import Browserbase from "@browserbasehq/sdk";
import { chromium } from "playwright-core";

const bb = new Browserbase({
  apiKey: process.env.BROWSERBASE_API_KEY
});

// Create session
const session = await bb.sessions.create({
  projectId: process.env.BROWSERBASE_PROJECT_ID
});

// Connect Playwright
const browser = await chromium.connectOverCDP(session.connectUrl);
const page = browser.contexts()[0].pages()[0];

// Navigate
await page.goto("https://example.com");
await page.click("#button");

// Close and get recording
await browser.close();
```

## Key Methods

### Sessions
```javascript
// Create
await bb.sessions.create({ projectId })

// Get recording
await bb.sessions.recording.get(sessionId)
```

### Session Options
- `projectId`: Required
- `timeout`: Max duration
- `proxy`: Enable proxy
- `browserSettings`: Customize browser

## Links
- [Full Docs](https://docs.browserbase.com)
- [NPM Package](https://npmjs.com/@browserbasehq/sdk)