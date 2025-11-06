import { validateJobDefinition } from "@nosana/sdk";
import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";

// Store all IDs to check for uniqueness
const allIds = new Set();

// Required fields that must be present in info.json
const REQUIRED_FIELDS = ["id", "name", "category"];

// Valid categories
const VALID_CATEGORIES = [
  "API",
  "Web UI",
  "Featured",
  "New",
  "LLM",
  "Image Generation",
  "Image Generation Fine-tuning",
  "LLM Fine-tuning",
  "Official",
  "Benchmark",
  "Ollama",
  "vLLM",
  "OCR",
];

// Optional metadata fields in job-definition.json
const META_FIELDS = {
  trigger: "dashboard",
  system_requirements: {
    required_vram: "number",
    required_cuda: "array",
  },
};

const MAX_FIELD_LENGTHS = {
  id: 16,
  name: 256,
  icon: 256,
};

// Validate a single job definition file
async function validateJobDefinitionFile(folder, jobDefPath) {
  const template = fs.readFileSync(jobDefPath);
  const jobDefinition = JSON.parse(template.toString());

  // Validate metadata structure if present
  if (jobDefinition.meta) {
    if (
      jobDefinition.meta.trigger &&
      jobDefinition.meta.trigger !== META_FIELDS.trigger
    ) {
      throw new Error(
        `${folder}: If 'trigger' is specified in meta, it must be '${
          META_FIELDS.trigger
        }' in ${path.basename(jobDefPath)}`
      );
    }
  }

  // Create a copy of job definition without meta for SDK validation
  const jobDefForValidation = {
    ...jobDefinition,
    meta: undefined,
  };
  delete jobDefForValidation.meta;

  const result = validateJobDefinition(jobDefForValidation);
  if (!result.success) {
    const error = result.errors[0];
    throw new Error(
      `${folder}: ${error.path} - expected ${
        error.expected
      }, but found ${JSON.stringify(error.value)} in ${path.basename(
        jobDefPath
      )}`
    );
  }
}

// Validate a single template directory
async function validateTemplate(folder) {
  const templatePath = path.join("./templates", folder);

  // Check if README.md exists
  if (!fs.existsSync(path.join(templatePath, "README.md"))) {
    throw new Error(`${folder}: Missing README.md file`);
  }

  // Check if info.json exists
  if (!fs.existsSync(path.join(templatePath, "info.json"))) {
    throw new Error(`${folder}: Missing info.json file`);
  }

  // Validate info.json format and content
  const infoContent = fs.readFileSync(path.join(templatePath, "info.json"));
  let info;
  try {
    info = JSON.parse(infoContent);
  } catch (e) {
    throw new Error(`${folder}: Invalid JSON in info.json`);
  }

  // Check required fields in info.json
  for (const field of REQUIRED_FIELDS) {
    if (!info[field]) {
      throw new Error(
        `${folder}: Missing required field '${field}' in info.json`
      );
    }
  }

  // Validate category array
  if (!Array.isArray(info.category)) {
    throw new Error(`${folder}: 'category' must be an array in info.json`);
  }

  // Validate category values
  for (const category of info.category) {
    if (!VALID_CATEGORIES.includes(category)) {
      throw new Error(
        `${folder}: Invalid category '${category}' in info.json. Valid categories are: ${VALID_CATEGORIES.join(
          ", "
        )}`
      );
    }
  }

  // Skip icon validation if github_url is provided
  if (!info.icon && !info.github_url) {
    throw new Error(
      `${folder}: Missing 'icon' in info.json and no 'github_url' provided`
    );
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
        throw new Error(
          `${folder}: GitHub URL returned status ${response.status}`
        );
      }
    } catch (error) {
      console.warn(
        `Warning: Could not verify GitHub URL for ${folder}: ${error.message}`
      );
    }
  }

  // Check field lengths
  for (const [field, maxLength] of Object.entries(MAX_FIELD_LENGTHS)) {
    if (info[field] && info[field].length > maxLength) {
      throw new Error(
        `${folder}: Field '${field}' exceeds maximum length of ${maxLength} characters in info.json`
      );
    }
  }

  // Validate job definitions - support both single and multiple variants
  if (info.variants && Array.isArray(info.variants)) {
    // Multiple variants mode
    if (info.variants.length === 0) {
      throw new Error(`${folder}: 'variants' array cannot be empty`);
    }

    const variantIds = new Set();
    for (const variant of info.variants) {
      // Validate required variant fields
      if (!variant.id || !variant.name || !variant.job_definition) {
        throw new Error(
          `${folder}: Each variant must have 'id', 'name', and 'job_definition' fields`
        );
      }

      // Check for unique variant IDs
      if (variantIds.has(variant.id)) {
        throw new Error(`${folder}: Duplicate variant ID '${variant.id}'`);
      }
      variantIds.add(variant.id);

      // Validate job definition file exists
      const jobDefPath = path.join(templatePath, variant.job_definition);
      if (!fs.existsSync(jobDefPath)) {
        throw new Error(
          `${folder}: Job definition file '${variant.job_definition}' not found for variant '${variant.id}'`
        );
      }

      // Validate the job definition file
      await validateJobDefinitionFile(folder, jobDefPath);
    }
  } else {
    // Single job definition mode (backward compatibility)
    const jobDefPath = path.join(templatePath, "job-definition.json");
    if (!fs.existsSync(jobDefPath)) {
      throw new Error(`${folder}: Missing job-definition.json file`);
    }

    await validateJobDefinitionFile(folder, jobDefPath);
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
  const templateDirs = fs.readdirSync("./templates");

  try {
    await Promise.all(templateDirs.map(validateTemplate));
    console.log("\n✓ All templates validated successfully!");
  } catch (error) {
    console.error("\n❌ Validation failed:", error.message);
    process.exit(1);
  }
}

validateAllTemplates();
