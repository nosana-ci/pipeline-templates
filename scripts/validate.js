import { validateJobDefinition } from '@nosana/sdk';
import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';

// Store all IDs to check for uniqueness
const allIds = new Set();

// Required fields that must be present in info.json
const REQUIRED_FIELDS = ['id', 'name', 'description', 'category', 'subcategory'];

// Required metadata fields in job-definition.json
const REQUIRED_META = {
  trigger: 'dashboard'
};

// Validate a single template directory
async function validateTemplate(folder) {
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
  for (const field of REQUIRED_FIELDS) {
    if (!info[field]) {
      throw new Error(`${folder}: Missing required field '${field}' in info.json`);
    }
  }

  // Ensure only one category and one subcategory
  if (!Array.isArray(info.category) || info.category.length !== 1) {
    throw new Error(`${folder}: 'category' must be an array with exactly one item in info.json`);
  }
  if (!Array.isArray(info.subcategory) || info.subcategory.length !== 1) {
    throw new Error(`${folder}: 'subcategory' must be an array with exactly one item in info.json`);
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
    try {
      const response = await fetch(info.github_url);
      if (!response.ok) {
        throw new Error(`${folder}: GitHub URL returned status ${response.status}`);
      }
    } catch (error) {
      console.warn(`Warning: Could not verify GitHub URL for ${folder}: ${error.message}`);
    }
  }

  // Validate job definition
  const template = fs.readFileSync(path.join(templatePath, 'job-definition.json'));
  const jobDefinition = template.toString();
  const result = validateJobDefinition(JSON.parse(jobDefinition));
  const parsedJob = JSON.parse(jobDefinition);
  
  // Validate metadata
  if (!parsedJob.meta?.trigger || parsedJob.meta.trigger !== REQUIRED_META.trigger) {
    throw new Error(`${folder}: meta.trigger must be '${REQUIRED_META.trigger}'`);
  }
  
  // Validate VRAM if present
  if (parsedJob.meta?.system_requirements?.required_vram !== undefined && 
      typeof parsedJob.meta.system_requirements.required_vram !== 'number') {
    throw new Error(`${folder}: meta.system_requirements.required_vram must be a number if specified`);
  }


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

// Process all template directories
async function validateAllTemplates() {
  const templateDirs = fs.readdirSync('./templates');
  
  try {
    await Promise.all(templateDirs.map(validateTemplate));
    console.log('\n✓ All templates validated successfully!');
  } catch (error) {
    console.error('\n❌ Validation failed:', error.message);
    process.exit(1);
  }
}

validateAllTemplates();
