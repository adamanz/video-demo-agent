# MCP Browserbase Integration

## Installation
```bash
npx @browserbasehq/mcp install
```

## Claude Desktop Config
```json
{
  "mcpServers": {
    "browserbase": {
      "command": "npx",
      "args": ["@browserbasehq/mcp"],
      "env": {
        "BROWSERBASE_API_KEY": "key",
        "BROWSERBASE_PROJECT_ID": "id"
      }
    }
  }
}
```

## Usage Example
```
Please use Browserbase to:
1. Go to https://example.com
2. Click "Login"  
3. Fill email: test@example.com
4. Click submit
5. Record session
```

## Available Actions
- Navigate to URLs
- Click elements
- Fill forms
- Take screenshots
- Execute JS
- Wait for elements

## Resources
- Console: `console://logs`
- Screenshots: `screenshot://1`

## Workflow
1. Create session via MCP
2. Execute test steps
3. Auto-records session
4. Retrieve via SDK