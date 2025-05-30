# POC Build Guide - Start Here! 🚀

## What You're Building
A tool that turns test files into demo videos automatically.

## Prerequisites (5 min)
1. **Get API Keys**:
   - Browserbase: https://browserbase.com
   - Gemini: https://makersuite.google.com/app/apikey
   - GitHub: Settings → Developer → Tokens

2. **Install**: Node.js 18+ and Claude Desktop

## Quick Start (10 min)
```bash
# Clone and setup
git clone https://github.com/adamanz/video-demo-agent
cd video-demo-agent
npm install
cp .env.example .env
# Add API keys to .env

# Install Browserbase MCP
npx @browserbasehq/mcp install

# Run POC
npm run poc -- --url https://example.com --repo ./examples
```

## What Happens
1. Parses test files
2. Runs on deployed site
3. Records automatically
4. Generates video
5. Creates social posts

## Key Docs
- **APIs**: `API_QUICK_REFERENCE.md`
- **Architecture**: `POC_ARCHITECTURE.md`
- **Steps**: `POC_IMPLEMENTATION_STEPS.md`
- **Claude Tips**: `CLAUDE_CODE_BEST_PRACTICES.md`

## Success Checklist
- [ ] API keys configured
- [ ] MCP installed
- [ ] First video generated
- [ ] Social posts created

Ready? Let's build! 🎬