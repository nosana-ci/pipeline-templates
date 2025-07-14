#!/usr/bin/env node

// Fix terminal compatibility issues for Nosana CLI
console.log('Setting up terminal compatibility fixes...');
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

// Set up CLI arguments
process.argv = [
  process.argv[0], 
  'cli', 
  ...process.argv.slice(2)
];

console.log('Starting Nosana CLI with args:', process.argv.slice(2));
console.log('Please wait for job submission and logs...\n');

// Import and run the CLI
import('./node_modules/@nosana/cli/dist/src/cli/index.js')
  .catch(err => {
    console.error('CLI Error:', err);
    process.exit(1);
  });