# Claude Code Best Practices

## Core Philosophy
Claude Code provides close to raw model access without forcing specific workflows.

## Essential Workflow

1. **Research**: Analyze the problem
2. **Plan**: Create implementation plan
3. **Implement**: Execute in code
4. **Commit**: Create PR with docs

```bash
claude -p "Research test parsing"
claude -p "Plan extraction approach"
claude -p "Implement the parser"
claude -p "Commit with docs"
```

## Thinking Modes
- `"think"` - 4,000 tokens
- `"ultrathink"` - 31,999 tokens

## Project Configuration
Create `CLAUDE.md` in root:
```markdown
# Project: Video Demo Agent
## Instructions
- Use TypeScript
- Small functions
- Add comments
```

## TDD with Claude
```bash
# Tests first
claude -p "Create tests"
# Then implement
claude -p "Make tests pass"
```

## Quick Tips
- Use `--verbose` for debugging
- Break complex tasks into steps
- Review before committing
- Keep prompts focused

## References
- [Official Docs](https://claude.ai/code)
- [Anthropic Blog](https://www.anthropic.com/engineering/claude-code-best-practices)