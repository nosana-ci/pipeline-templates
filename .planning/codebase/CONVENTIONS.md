# Coding Conventions

**Analysis Date:** 2026-04-03

## Naming Patterns

**Files:**
- JavaScript files: lowercase with hyphens for multi-word names (e.g., `validate.js`, `build-images.sh`)
- Dockerfile convention: `Dockerfile.{image-name}` using kebab-case
- JSON template files: `job-definition.json` or `job-definition-{variant}.json` for multi-variant templates
- Shell scripts: kebab-case with `.sh` extension (e.g., `build-images.sh`)

**Functions:**
- camelCase for JavaScript functions (e.g., `validateTemplate()`, `validateJobDefinitionFile()`, `isValidURL()`)
- Snake_case for shell functions (e.g., `print_status()`, `build_image()`, `show_usage()`)
- Helper functions prefixed with context (e.g., `print_*` for output functions, `validate*` for validation functions)

**Variables:**
- Constants: UPPER_SNAKE_CASE for configuration and constants (e.g., `REGISTRY`, `TAG`, `MAX_FIELD_LENGTHS`, `REQUIRED_FIELDS`, `VALID_CATEGORIES`)
- Shell variables: UPPER_SNAKE_CASE throughout shell scripts
- Local variables: camelCase in JavaScript
- Const-first approach: use `const` declarations unless value must change, then use `let` (no `var`)

**Types:**
- JSON object keys: kebab-case in `info.json` (e.g., `job_definition`, `github_url`) and snake_case in job definitions
- IDs in JSON: kebab-case (e.g., `"id": "deepseek-r1-qwen"`, variant IDs like `"1-5b"`, `"sd15"`)
- Op IDs: kebab-case required (dots prohibited - they break interpolation)

## Code Style

**Formatting:**
- JSON files: Pretty-formatted with 2-space indentation
- Pre-commit hook enforces JSON formatting with `pretty-format-json --autofix --no-sort-keys` for files in `templates/` directory
- Trailing whitespace removal and end-of-file fixing via pre-commit hooks

**Linting:**
- Dockerfile validation via `hadolint` (run with `make validate`)
- JSON validation with `check-json` pre-commit hook
- Schema validation with custom `npm run validate` command (via pre-commit hook)
- No JavaScript linter detected (ESLint/Prettier not used)

## Import Organization

**JavaScript/Node.js:**
Order imports as shown in `scripts/validate.js`:
1. External SDK/library imports: `import { validateJobDefinition } from "@nosana/sdk"`
2. Node.js built-in modules: `import * as fs from "fs"`, `import * as path from "path"`
3. Third-party libraries: `import fetch from "node-fetch"`

No specific path aliases detected.

## Error Handling

**Patterns:**
- Throw descriptive errors with context: `throw new Error(\`${folder}: Missing required field '${field}' in info.json\`)`
- Include template/folder name at start of error message for context
- Include file name when error relates to specific file: `in ${path.basename(jobDefPath)}`
- Use try-catch for JSON parsing with specific error messages: `catch (e) { throw new Error(\`${folder}: Invalid JSON in info.json\`) }`
- Validation errors include field name, expected value, and actual value
- Async errors propagate via Promise.all with catch at top level
- Non-critical warnings use `console.warn()` (e.g., for GitHub URL verification failures)

**Error Messages Format:**
- Structure: `[template-folder]: [Problem description including field/file context]`
- Example: `"deepseek-r1-qwen: Op ID 'op.id' in job-definition-1.5b.json must not contain dots"`
- Include suggestions: `"Replace dots with dashes"`

## Logging

**Framework:** console methods (no dedicated logging library)

**Patterns:**
- `console.log()` for success messages prefixed with `✓`: `console.log(\`✓ ${folder} template is valid!\`)`
- `console.warn()` for non-critical issues
- `console.error()` for validation failures with emoji prefix: `console.error("\n❌ Validation failed:", error.message)`
- Colored output in shell scripts using ANSI codes (RED, GREEN, YELLOW, BLUE, NC variables)
- Functions for colored output: `print_status()`, `print_success()`, `print_error()`, `print_warning()`

## Comments

**When to Comment:**
- Above function definitions explaining purpose
- Before constant/configuration blocks explaining their use
- Before complex validation logic blocks
- On guard clauses that check critical conditions

**Comment Style:**
- Single-line comments use `//` with capital letter: `// Store all IDs to check for uniqueness`
- Comments placed on line above code block
- Comments are sparse and focus on "why" not "what"

**JSDoc/TSDoc:**
- Not used in this codebase

## Function Design

**Size:** Functions typically 30-50 lines for validation logic

**Parameters:** 
- Async functions receive folder path or file path as primary parameter
- Configuration passed via object parameters in some cases
- Return values: boolean or throw errors (no returning error objects)

**Return Values:**
- Validation functions return success implicitly (no return statement = success)
- Throw errors on validation failure rather than returning error objects
- Promise.all() used for parallel validation of multiple templates

## Module Design

**Exports:**
- Entry point: `validateAllTemplates()` called directly at module end
- No explicit exports (scripts execute on import for CLI tools)

**Barrel Files:**
- Not used in this codebase

## Template Structure Conventions

**info.json fields (required):**
- `id`: string, max 16 chars, kebab-case, no dots
- `name`: string, max 256 chars, human-readable
- `category`: array of strings from approved list

**info.json fields (conditional):**
- Either `icon` OR `github_url` required (one mandatory)
- `variants`: array for multi-variant templates (each with `id`, `name`, `description`, `job_definition`)

**job-definition.json structure (required):**
- `version`: string (e.g., "0.1")
- `type`: string (always "container")
- `ops`: array of operation objects
- `meta`: optional, can include `trigger: "dashboard"` and `system_requirements`

**op (operation) structure:**
- `type`: string (e.g., "container/run")
- `id`: string, kebab-case, must not contain dots
- `args`: object containing `image`, `gpu`, `cmd`, `expose`, `env`, `resources`

---

*Convention analysis: 2026-04-03*
