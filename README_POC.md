# Video Demo Agent - POC README

## Quick Start (2 Hours)

This POC creates demo videos by running your existing tests on deployed websites.

### How It Works
1. **You provide**: Deployed URL + GitHub repo with tests
2. **Agent analyzes**: Your Playwright/Cypress tests
3. **Browserbase records**: Tests running on your live site
4. **Output**: Demo video + social media posts

### Setup (10 min)
```bash
# Prerequisites: Node.js 18+, Claude Desktop

# 1. Clone and install
git clone https://github.com/adamanz/video-demo-agent
cd video-demo-agent
npm install

# 2. Configure
cp .env.example .env
# Add: BROWSERBASE_API_KEY, GITHUB_TOKEN, GEMINI_API_KEY

# 3. Install Browserbase MCP in Claude Desktop
npx @browserbasehq/mcp install
```

### Run POC (5 min)
```bash
npm run poc -- --url https://myapp.com --repo ./path/to/repo
```

### Example Output
```
🚀 Starting Video Demo Agent POC
📝 Found 3 test files with 15 test steps
🎬 Recording demo with Browserbase...
🎥 Video saved: demo-2024-01-15.mp4
📱 LinkedIn post and X thread created!
```

## What Gets Recorded

Your tests become the demo script:
- `page.goto()` → Shows navigation
- `page.click()` → Demonstrates interactions  
- `page.fill()` → Shows form completion
- `expect()` → Validates features

## Simple Architecture
```
Test Files → Browserbase → Video → Social Posts
```

No Docker. No FFmpeg. No complexity.

## Try It Now
1. Point to any deployed site
2. Provide repo with tests
3. Get demo video in minutes

**Built in 2-4 hours. Ready to scale later.**