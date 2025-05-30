# POC Quick Start Guide

## Setup (10 minutes)

### 1. Prerequisites
- Claude Desktop with Browserbase MCP
- Node.js 18+
- API Keys: Browserbase, GitHub, Gemini

### 2. Install Browserbase MCP
```bash
# Install in Claude Desktop
npx @browserbasehq/mcp install
```

### 3. Configure Project
```bash
git clone https://github.com/adamanz/video-demo-agent
cd video-demo-agent
npm install
cp .env.example .env
# Add your API keys to .env
```

## Running the POC

### Option 1: Command Line
```bash
npm run poc -- --url https://myapp.com --repo owner/repo
```

### Option 2: Interactive
```bash
npm run poc
# Follow prompts for URL and repository
```

## Example Test File Support

### Playwright
```javascript
test('user can login', async ({ page }) => {
  await page.goto('https://myapp.com');
  await page.click('#login-button');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password');
  await page.click('#submit');
  await expect(page).toHaveURL('/dashboard');
});
```

### Cypress
```javascript
it('completes checkout flow', () => {
  cy.visit('/shop');
  cy.get('.product').first().click();
  cy.get('#add-to-cart').click();
  cy.get('#checkout').click();
});
```

## What Happens

1. **Parses your test files** to understand user flows
2. **Runs tests on deployed site** using Browserbase
3. **Records the entire session** automatically
4. **Generates demo video** from recording
5. **Creates social posts** with AI

## Success Metrics
- First video in < 2 hours
- Zero infrastructure setup
- Works with existing tests
- One-command execution