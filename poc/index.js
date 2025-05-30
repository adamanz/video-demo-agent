#!/usr/bin/env node
// poc/index.js - Main POC runner

const { program } = require('commander');
const TestParser = require('./testParser');
const BrowserbaseRecorder = require('./browserbaseRecorder');
const VideoExporter = require('./videoExporter');
const { generateSocialPosts } = require('./socialGenerator');

async function runPOC(url, repoPath) {
  console.log('🚀 Starting Video Demo Agent POC\n');
  
  try {
    // Step 1: Parse test files
    console.log('📝 Analyzing test files...');
    const parser = new TestParser();
    const testData = await parser.parseRepository(repoPath);
    console.log(`✅ Found ${testData.length} test files\n`);
    
    // Step 2: Run tests with Browserbase
    console.log('🎬 Recording demo with Browserbase...');
    const recorder = new BrowserbaseRecorder();
    const sessionId = await recorder.recordTests(url, testData);
    console.log(`✅ Recording complete! Session: ${sessionId}\n`);
    
    // Step 3: Export video
    console.log('🎥 Generating video...');
    const exporter = new VideoExporter();
    const videoPath = await exporter.exportVideo(sessionId);
    console.log(`✅ Video saved: ${videoPath}\n`);
    
    // Step 4: Generate social posts
    console.log('📱 Creating social media posts...');
    const posts = await generateSocialPosts(repoPath, videoPath);
    console.log('✅ Posts generated!\n');
    
    console.log('🎉 POC Complete!');
    console.log(`Video: ${videoPath}`);
    console.log(`LinkedIn: ${posts.linkedin.substring(0, 100)}...`);
    console.log(`X/Twitter: ${posts.twitter[0]}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// CLI setup
program
  .option('-u, --url <url>', 'Deployed website URL')
  .option('-r, --repo <path>', 'Path to repository')
  .parse(process.argv);

const options = program.opts();

if (!options.url || !options.repo) {
  console.error('Please provide both --url and --repo');
  process.exit(1);
}

runPOC(options.url, options.repo);