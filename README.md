# Video Demo Agent 🎬

Automated demo video creation agent powered by Claude Code and MCP. Creates compelling technical demos from GitHub repositories with intelligent screen recording and social media publishing.

## 🚀 Quick Start

**→ [START HERE](./START_HERE.md) ← Build the POC in 2-4 hours!**

## Features

- 🤖 **Intelligent Analysis**: Automatically understands your project structure
- 📝 **Script Generation**: Creates engaging narratives for your demos  
- 🎥 **Smart Recording**: Zooms on important code and UI elements
- 🚀 **Safe Execution**: Runs code in secure Docker containers
- 📱 **Social Publishing**: Posts directly to X/Twitter

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/video-demo-agent
cd video-demo-agent

# Install dependencies
npm install

# Configure Claude Code
cp CLAUDE.md ~/.claude/

# Set up environment variables
export GITHUB_TOKEN=your_token
export TWITTER_API_KEY=your_key

# Create your first demo
claude -p "Create a demo video for owner/repo"
```

## Architecture

- **Claude Code**: Orchestrates the entire workflow
- **MCP Server**: Integrates GitHub, Docker, FFmpeg, and social APIs
- **FFmpeg**: Handles screen recording and video processing
- **Docker + gVisor**: Provides secure code execution

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Claude Code agent configuration
- [SPECIFICATION.md](./SPECIFICATION.md) - Technical architecture
- [TODO.md](./TODO.md) - Development roadmap

## Security

This project prioritizes security:
- API keys stored in environment variables
- Docker containers run with strict isolation
- Resource limits prevent abuse
- Comprehensive error handling

## Contributing

See [TODO.md](./TODO.md) for current development priorities.

## License

MIT