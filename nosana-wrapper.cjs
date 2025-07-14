#!/usr/bin/env node

// Fix terminal compatibility issues for Nosana CLI
process.stdout.isTTY = true;
process.stdout.moveCursor = function(dx, dy, callback) {
  if (callback) callback();
};
process.stdout.clearLine = function(dir, callback) {
  if (callback) callback();
};
process.stdout.cursorTo = function(x, y, callback) {
  if (callback) callback();
};

// Import and run the actual Nosana CLI
const path = require('path');
const cliPath = path.join(__dirname, 'node_modules', '@nosana', 'cli', 'dist', 'src', 'cli', 'index.js');

// Set up the CLI arguments
process.argv = [process.argv[0], cliPath, ...process.argv.slice(2)];

// Run the CLI
require(cliPath);