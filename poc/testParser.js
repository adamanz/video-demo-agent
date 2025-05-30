// poc/testParser.js
const { glob } = require('glob');
const fs = require('fs').promises;

class TestParser {
  async parseRepository(repoPath) {
    const testFiles = await this.findTests(repoPath);
    const allSteps = [];
    
    for (const file of testFiles) {
      const content = await fs.readFile(`${repoPath}/${file}`, 'utf8');
      const steps = await this.parseTestFile(content, file);
      allSteps.push({ file, steps });
    }
    
    return allSteps;
  }

  async findTests(repoPath) {
    const patterns = [
      '**/*.spec.{js,ts}',
      '**/*.test.{js,ts}', 
      '**/cypress/e2e/**/*.cy.js'
    ];
    
    const files = [];
    for (const pattern of patterns) {
      const matches = await glob(pattern, { cwd: repoPath });
      files.push(...matches);
    }
    return files;
  }

  async parseTestFile(content, filename) {
    if (filename.includes('.cy.')) {
      return this.parseCypress(content);
    }
    return this.parsePlaywright(content);
  }

  parsePlaywright(content) {
    const steps = [];
    const regex = /page\.(goto|click|fill|type)\s*\(\s*["']([^"']+)["'](?:,\s*["']([^"']+)["'])?\s*\)/g;
    
    let match;
    while ((match = regex.exec(content))) {
      steps.push({
        action: match[1],
        target: match[2],
        value: match[3]
      });
    }
    return steps;
  }

  parseCypress(content) {
    const steps = [];
    const regex = /cy\.(visit|get|click|type)\s*\(\s*["']([^"']+)["'](?:,\s*["']([^"']+)["'])?\s*\)/g;
    
    let match;
    while ((match = regex.exec(content))) {
      steps.push({
        action: match[1] === 'visit' ? 'goto' : match[1],
        target: match[2],
        value: match[3]
      });
    }
    return steps;
  }
}

module.exports = TestParser;