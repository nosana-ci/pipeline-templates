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
  const requiredFields = ['id', 'name', 'description', 'category', 'icon'];
  for (const field of requiredFields) {
    if (!info[field]) {
      throw new Error(`${folder}: Missing required field '${field}' in info.json`);
    }
  }

  // Validate icon URL length
  if (info.icon.length > 256) {
    throw new Error(`${folder}: Icon URL exceeds 256 characters`);
  }

  // Check for unique IDs
  if (allIds.has(info.id)) {
    throw new Error(`${folder}: Duplicate ID '${info.id}' found in info.json`);
  }
  allIds.add(info.id);

  // Validate category is an array
  if (!Array.isArray(info.category)) {
    throw new Error(`${folder}: 'category' must be an array in info.json`);
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

// Process all template directories
const templateDirs = fs.readdirSync('./templates');
templateDirs.forEach(validateTemplate);

console.log('\n✓ All templates validated successfully!');
