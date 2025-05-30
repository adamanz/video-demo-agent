# POC Implementation Steps

## Hour 1: Setup & Parser
```bash
# Setup (15 min)
npm install
cp .env.example .env

# Parser (45 min)
const tests = await glob('**/*.spec.js');
const steps = tests.map(parseTestFile);
```

## Hour 2: Browserbase
```javascript
// MCP Setup (15 min)
npx @browserbasehq/mcp install

// Recording (45 min)
const session = await bb.sessions.create();
const recording = await bb.sessions.recording.get();
```

## Hour 3: Video Export
```javascript
// Convert (30 min)
const video = await convertToMP4(recording.events);

// Test (30 min)
await testOnSampleSite();
```

## Hour 4: Social & Demo
```javascript
// Generate posts (30 min)
const posts = await generatePosts(testData);

// Polish (30 min)
- Clean code
- Create demo
- Document
```

## Checklist
- [ ] API keys configured
- [ ] Test parser working
- [ ] Browserbase recording
- [ ] Video export done
- [ ] Social posts generated
- [ ] Demo recorded