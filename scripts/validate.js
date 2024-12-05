import { validateJobDefinition } from '@nosana/sdk';
import * as fs from 'fs';
import * as path from 'path';

// Store all IDs to check for uniqueness
const allIds = new Set();

// Validate a single template directory
function validateTemplate(folder) {
  const templatePath = path.join('./templates', folder);

  // Check if README.md exists
  if (!fs.existsSync(path.join(templatePath, 'README.md'))) {
    throw new Error(`${folder}: Missing README.md file`);
  }

  // Check if info.json exists
  if (!fs.existsSync(path.join(templatePath, 'info.json'))) {
    throw new Error(`${folder}: Missing info.json file`);
  }

  // Validate info.json format and content
  const infoContent = fs.readFileSync(path.join(templatePath, 'info.json'));
  let info;
  try {
    info = JSON.parse(infoContent);
  } catch (e) {
    throw new Error(`${folder}: Invalid JSON in info.json`);
  }

  // Check required fields in info.json
  const requiredFields = ['id', 'name', 'description', 'category'];
  for (const field of requiredFields) {
    if (!info[field]) {
      throw new Error(`${folder}: Missing required field '${field}' in info.json`);
    }
  }

  // Ensure only one category and one subcategory
  if (!Array.isArray(info.category) || info.category.length !== 1) {
    throw new Error(`${folder}: 'category' must be an array with exactly one item in info.json`);
  }
  if (info.subcategory) {
    if (!Array.isArray(info.subcategory) || info.subcategory.length !== 1) {
      throw new Error(`${folder}: 'subcategory' must be an array with exactly one item in info.json`);
    }
  } else {
    throw new Error(`${folder}: Missing required field 'subcategory' in info.json`);
  }

  // Skip icon validation if github_url is provided
  if (!info.icon && !info.github_url) {
    throw new Error(`${folder}: Missing 'icon' in info.json and no 'github_url' provided`);
  }

  // Check for unique IDs
  if (allIds.has(info.id)) {
    throw new Error(`${folder}: Duplicate ID '${info.id}' found in info.json`);
  }
  allIds.add(info.id);

  // Validate github_url if present
  if (info.github_url) {
    if (!isValidURL(info.github_url)) {
      throw new Error(`${folder}: 'github_url' is not a valid URL`);
    }
    checkGitHubURLReachable(info.github_url).catch((err) => {
      throw new Error(`${folder}: 'github_url' is not reachable`);
    });
  }

  // Validate job definition
  const template = fs.readFileSync(path.join(templatePath, 'job-definition.json'));
  const jobDefinition = template.toString();
  const result = validateJobDefinition(JSON.parse(jobDefinition));
  if (!result.success) {
    const error = result.errors[0];
    throw new Error(`${folder}: ${error.path} - expected ${error.expected}, but found ${JSON.stringify(error.value)}`);
  }

  console.log(`✓ ${folder} template is valid!`);
}

// Helper function to validate URL format
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

// Helper function to check if GitHub URL is reachable
async function checkGitHubURLReachable(url) {
  const https = require('https');
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .on('error', (e) => {
        reject(e);
      });
  });
}

// Process all template directories
const templateDirs = fs.readdirSync('./templates');
templateDirs.forEach(validateTemplate);

console.log('\n✓ All templates validated successfully!');
