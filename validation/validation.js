import * as fs from "fs";
import * as path from "path";
import { validateJobDefinition, validateOps } from "@nosana/types";
import { InfoSchema, BenchmarksSchema, formatZodError } from "./schema.validation.js";

const TEMPLATES_DIR = "./templates";

function fail(folder, message) {
  throw new Error(`${folder}: ${message}`);
}

// Read + parse a JSON file, failing with a clear "<folder>: Invalid JSON in <file>"
// message (with file context) instead of a bare SyntaxError.
function readJsonOrFail(folder, filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    fail(folder, `Invalid JSON in ${path.basename(filePath)}`);
  }
}

// Surface a typia IValidation failure from the kit (@nosana/types) as a clear,
// file-scoped error. No-op when the result is successful.
function failOnKitError(folder, result, fileName) {
  if (result.success) return;
  const error = result.errors[0];
  fail(folder, `${error.path} - expected ${error.expected}, but found ${JSON.stringify(error.value)} in ${fileName}`);
}

function validateJobDefinitionFile(folder, jobDefPath) {
  const jobDefinition = readJsonOrFail(folder, jobDefPath);
  failOnKitError(folder, validateJobDefinition(jobDefinition), path.basename(jobDefPath));
}

function validateBenchmarksFile(folder, benchmarksPath, variantIds) {
  const fileName = path.basename(benchmarksPath);
  const benchmarks = readJsonOrFail(folder, benchmarksPath);

  const parsed = BenchmarksSchema.safeParse(benchmarks);
  if (!parsed.success) fail(folder, `${formatZodError(parsed.error)} in ${fileName}`);

  // Cross-file: every benchmark variant id must be an info.json variant id.
  const knownVariants = new Set(variantIds);
  const unknown = benchmarks.variants.filter((id) => !knownVariants.has(id));
  if (unknown.length > 0) {
    fail(
      folder,
      `${fileName} 'variants' reference unknown variant id(s): ${unknown.join(", ")} ` +
        `(info.json variants: ${variantIds.length ? variantIds.join(", ") : "none"})`
    );
  }

  failOnKitError(folder, validateOps(benchmarks.support_ops), fileName);
}

function validateTemplate(folder) {
  const dir = path.join(TEMPLATES_DIR, folder);

  if (!fs.existsSync(path.join(dir, "README.md"))) fail(folder, "Missing README.md file");
  if (!fs.existsSync(path.join(dir, "info.json"))) fail(folder, "Missing info.json file");

  const info = readJsonOrFail(folder, path.join(dir, "info.json"));

  const parsed = InfoSchema.safeParse(info);
  if (!parsed.success) fail(folder, `${formatZodError(parsed.error)} in info.json`);

  // Resolve job definition file(s): variants mode vs single mode (convention).
  const variants = info.variants ?? [];
  const jobDefinitions = variants.length
    ? variants.map((variant) => variant.job_definition)
    : ["job-definition.json"];

  for (const relativePath of jobDefinitions) {
    const jobDefPath = path.join(dir, relativePath);
    if (!fs.existsSync(jobDefPath)) fail(folder, `Job definition file '${relativePath}' not found`);
    validateJobDefinitionFile(folder, jobDefPath);
  }

  // benchmarks.json is optional; present only for templates with a benchmark.
  const benchmarksPath = path.join(dir, "benchmarks.json");
  if (fs.existsSync(benchmarksPath)) {
    validateBenchmarksFile(folder, benchmarksPath, variants.map((variant) => variant.id));
  }

  console.log(`✓ ${folder} template is valid!`);
}

function validateAllTemplates() {
  const folders = fs
    .readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  try {
    for (const folder of folders) validateTemplate(folder);
    console.log("\n✓ All templates validated successfully!");
  } catch (error) {
    console.error("\n❌ Validation failed:", error.message);
    process.exit(1);
  }
}

validateAllTemplates();
