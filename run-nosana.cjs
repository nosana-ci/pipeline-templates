#!/usr/bin/env node

// Fix terminal compatibility issues
process.stdout.isTTY = true;
process.stdout.moveCursor = function(dx, dy, callback) {
  if (callback) process.nextTick(callback);
  return true;
};
process.stdout.clearLine = function(dir, callback) {
  if (callback) process.nextTick(callback);
  return true;
};
process.stdout.cursorTo = function(x, y, callback) {
  if (callback) process.nextTick(callback);
  return true;
};

// Import the CLI and run it
const { spawn } = require('child_process');
const path = require('path');

const cliPath = path.join(__dirname, 'node_modules', '.bin', 'nosana');
const args = process.argv.slice(2);

// Set environment variables to help with terminal compatibility
process.env.FORCE_COLOR = '1';
process.env.TERM = 'xterm-256color';

console.log('Running Nosana CLI with args:', args);

const child = spawn('node', [
  '-e', 
  `
  process.stdout.isTTY = true;
  process.stdout.moveCursor = function(dx, dy, callback) { if (callback) process.nextTick(callback); return true; };
  process.stdout.clearLine = function(dir, callback) { if (callback) process.nextTick(callback); return true; };
  process.stdout.cursorTo = function(x, y, callback) { if (callback) process.nextTick(callback); return true; };
  import('${path.join(__dirname, 'node_modules', '@nosana', 'cli', 'dist', 'src', 'index.js')}');
  `,
  ...args
], {
  stdio: 'inherit',
  env: process.env
});

child.on('close', (code) => {
  process.exit(code);
});