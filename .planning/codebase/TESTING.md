# Testing Patterns

**Analysis Date:** 2026-04-03

## Test Framework

**Runner:**
- No dedicated test framework (Jest, Vitest, Mocha not installed)
- Validation happens via `npm run validate` which executes `scripts/validate.js`
- No unit test files detected (*.test.js, *.spec.js)

**Assertion Library:**
- Custom validation logic using throw/catch pattern
- External validation via Nosana SDK: `validateJobDefinition()` from `@nosana/sdk`

**Run Commands:**
```bash
npm run validate              # Validate all templates (main test command)
npm ci                        # Install dependencies (CI requirement)
make validate                 # Validate Dockerfiles with hadolint
make test                     # Smoke test built Docker images
```

## Test File Organization

**Validation Script Location:**
- Primary validation: `scripts/validate.js`
- CI configuration: `.github/workflows/validate.yml`
- Pre-commit hook integration: `.pre-commit-config.yaml`

**Validation Triggers:**
- Automatic on PR to main branch
- Automatic on push to main branch
- Pre-commit hook (local development)
- Manual: `npm run validate`

## Test Structure

**Validation Suite Organization:**
```javascript
// Main validation function
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
```

**Validation Patterns:**
- Top-level function `validateAllTemplates()` orchestrates all validation
- `validateTemplate()` function processes individual template directories in parallel
- `validateJobDefinitionFile()` function validates individual job definition files
- Helper function `isValidURL()` validates URL format
- Sequential validation checks within each function with early throw on error

**Error Reporting:**
- First error encountered stops validation and displays in console
- Error message includes template folder name and specific validation rule that failed
- Process exits with code 1 on any validation failure
- Success messages printed per template with `✓` prefix

## Validation Rules

**Template Structure Validation:**
1. Check `README.md` exists: `if (!fs.existsSync(path.join(templatePath, "README.md")))`
2. Check `info.json` exists
3. Parse `info.json` as valid JSON
4. Validate required fields: `id`, `name`, `category`
5. Validate `category` is array with values from whitelist
6. Validate `id` is unique across all templates
7. Validate `id` format: max 16 chars, no dots, kebab-case pattern checked implicitly
8. Validate either `icon` or `github_url` present (one required)
9. Validate `github_url` is valid URL format and HTTP status OK (with warn on failure)
10. Validate field length limits (MAX_FIELD_LENGTHS object)

**Variant Validation (if present):**
1. Check `variants` is non-empty array
2. Each variant must have `id`, `name`, `job_definition` fields
3. Variant `id` must not contain dots
4. Check variant `job_definition` file exists
5. Validate each variant's job definition file

**Job Definition Validation:**
1. Parse as valid JSON
2. Check `meta.trigger` (if present) equals "dashboard"
3. Check all op IDs don't contain dots (breaks interpolation)
4. Strip `meta` field and validate remaining structure via SDK
5. SDK validation checks: version, type, ops structure, image, gpu, cmd, expose, etc.

## Mocking

**Framework:** No mocking library detected (no Jest, Sinon, or Vitest)

**Patterns:**
- File system mocking: Not detected (real files read with `fs.readFileSync`)
- Network mocking: Not detected (real fetch to GitHub URLs - with try/catch and warning on failure)
- SDK validation: Real `validateJobDefinition()` called from Nosana SDK

**What to Mock (if adding tests):**
- File system operations (would need fs mock)
- Fetch for GitHub URL verification (currently fetches real URLs)
- External SDK validation could be mocked if adding unit tests

**What NOT to Mock:**
- Nosana SDK's `validateJobDefinition()` - this validates job definition schema
- Template file reading - actual template files should be validated

## Fixtures and Factories

**Test Data:**
No test fixtures or factories detected. Validation runs against actual template files in `templates/` directory.

**Location:**
- Real templates: `templates/{template-name}/`
- Configuration constants in `scripts/validate.js`: `REQUIRED_FIELDS`, `VALID_CATEGORIES`, `MAX_FIELD_LENGTHS`, `META_FIELDS`

## Coverage

**Requirements:** No coverage enforcement detected

**View Coverage:** Not applicable (no test framework)

**Current State:** Validation covers:
- All required JSON fields
- Unique constraint on template IDs
- Category whitelist compliance
- Schema validation via Nosana SDK
- File existence checks
- URL format and HTTP status

**Gaps:**
- No unit tests for individual validation functions
- No tests for error messages accuracy
- No tests for variant behavior
- No performance testing
- No integration tests with actual Nosana network

## Test Types

**Validation Tests:**
- Scope: All template definitions (info.json + job-definition.json files)
- Approach: Synchronous file reading with async SDK validation
- Coverage: Structure, required fields, uniqueness, schema compliance
- Parallelization: `Promise.all(templateDirs.map(validateTemplate))` processes all templates concurrently
- Failure mode: Exit code 1 on first error

**Integration Tests:**
- Scope: Docker image building and basic functionality
- Approach: `make test` runs basic smoke tests: `--version`, `--help`, or echo
- Coverage: Images execute without crashing
- Failure mode: Continues if test fails (reports but doesn't exit 1)

**CI Pipeline:**
- Trigger: Push to main or PR against main
- Steps: Node setup (20.x) → cache npm → `npm ci` → `npm run validate`
- Duration: < 2 minutes typical
- Failure: PR check fails if validation fails

## Docker Image Testing

**Build Validation:**
```bash
make validate      # Run hadolint on all Dockerfiles
```

**Smoke Tests:**
```bash
make test          # Run images with --version, --help, or echo
```

**Image Commands:**
- `make build` - Build all Docker images sequentially
- `make build-parallel` - Build images in parallel (experimental)
- `make list` - List available images without building

## Pre-commit Integration

**Hooks Configured:**
1. `trailing-whitespace` - Remove trailing spaces
2. `end-of-file-fixer` - Ensure single newline at EOF
3. `check-json` - Validate JSON syntax on all files
4. `pretty-format-json` - Auto-format JSON (templates/ only) with `--autofix --no-sort-keys`
5. Custom `npm run validate` - Run full validation script

**Hook Execution Order:**
- Pre-commit hooks run in configuration order
- JSON formatting runs before validation (so format is correct before schema check)
- Validation hook is local (command-based) and runs last
- If any hook fails, commit is blocked and files are staged for fixes

---

*Testing analysis: 2026-04-03*
