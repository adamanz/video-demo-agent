# /agent:create-demo Command

Creates a complete demo video from a GitHub repository.

## Usage
```
/agent:create-demo owner/repo [options]
```

## Options
- `--duration`: Video duration in seconds (default: 120)
- `--platform`: Target platform (twitter, youtube)
- `--zoom`: Enable intelligent zoom (default: true)

## Process
1. Analyze the repository structure
2. Generate a demo script
3. Build and run the application
4. Record with intelligent zoom
5. Post-process the video
6. Publish to specified platform

## Examples
```
/agent:create-demo facebook/react --duration=90 --platform=twitter
/agent:create-demo vercel/next.js --platform=youtube
```