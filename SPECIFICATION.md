# Video Demo Agent - Technical Specification

## Overview
Automated agent for creating demo videos from GitHub repositories using Claude Code, MCP, and intelligent screen recording.

## Architecture Components

### 1. Claude Code Agent
- **Role**: Main orchestrator and decision maker
- **Responsibilities**: 
  - Analyze repositories
  - Generate scripts
  - Coordinate recording
  - Make zoom decisions

### 2. MCP Server Infrastructure
```javascript
// Primary MCP server aggregating all tools
{
  "tools": [
    "analyze-repo",      // GitHub analysis
    "run-container",     // Docker execution
    "record-screen",     // FFmpeg recording
    "apply-zoom",        // Video processing
    "publish-video"      // Social media posting
  ]
}
```

### 3. Screen Recording System
- **Primary**: FFmpeg with Node.js wrapper
- **Fallback**: Platform-specific APIs
- **Features**:
  - Programmatic zoom control
  - Smooth transitions
  - 30/60 FPS support
  - H.264 encoding

### 4. Security Architecture
- **Container Isolation**: gVisor/Firecracker
- **Secret Management**: AWS Secrets Manager / Vault
- **API Security**: Rate limiting, key rotation
- **Resource Limits**: CPU, memory, disk quotas

## Core Workflows

### Demo Creation Pipeline
```
1. Repository Analysis
   ├── Clone repository
   ├── Analyze structure
   ├── Identify entry points
   └── Detect UI framework

2. Script Generation
   ├── Extract key features
   ├── Create narrative arc
   ├── Time scene transitions
   └── Generate zoom points

3. Application Execution
   ├── Build Docker container
   ├── Start with security sandbox
   ├── Wait for UI ready
   └── Monitor resource usage

4. Recording Process
   ├── Start FFmpeg capture
   ├── Execute demo script
   ├── Apply intelligent zoom
   └── Capture interactions

5. Post-Processing
   ├── Trim and edit video
   ├── Add transitions
   ├── Generate captions
   └── Optimize for platform

6. Publishing
   ├── Validate video specs
   ├── Upload to platform
   ├── Post with message
   └── Track engagement
```