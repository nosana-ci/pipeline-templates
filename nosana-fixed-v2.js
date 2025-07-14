#!/usr/bin/env node

// Fix terminal compatibility issues for Nosana CLI
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

// Set up CLI arguments properly
const originalArgv = process.argv;
process.argv = [
  originalArgv[0], 
  './node_modules/@nosana/cli/dist/src/cli/index.js',
  ...originalArgv.slice(2)
];

// Import and run the CLI with proper output handling
(async () => {
  try {
    await import('./node_modules/@nosana/cli/dist/src/cli/index.js');
  } catch (err) {
    console.error('CLI Error:', err);
    process.exit(1);
  }
})();