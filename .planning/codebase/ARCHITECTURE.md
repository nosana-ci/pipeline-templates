# Architecture

**Analysis Date:** 2026-04-03

## Pattern Overview

**Overall:** Declarative template repository with validation-driven metadata

**Key Characteristics:**
- Metadata-first design: templates defined by JSON descriptors rather than code
- Schema validation enforced via Node.js validation layer
- Multi-variant support for models with size/capability variants
- Docker image build orchestration for custom runtime environments
- Git-based CI/CD with PR validation before merge

## Layers

**Metadata Layer:**
- Purpose: Defines template properties, variants, categorization
- Location: `templates/*/info.json`
- Contains: Template ID, name, category tags, icon/github URL, variant definitions
- Depends on: None (foundational data)
- Used by: Validation layer, dashboard consumption

**Job Definition Layer:**
- Purpose: Specifies Nosana job execution parameters (containers, GPU, resources)
- Location: `templates/*/job-definition.json` or `templates/*/job-definition-<variant>.json`
- Contains: Container image, command, ports, health checks, VRAM/CUDA requirements
- Depends on: Metadata layer (via variant references)
- Used by: Nosana SDK for job submission

**Validation Layer:**
- Purpose: Enforces schema compliance and consistency rules
- Location: `scripts/validate.js`
- Contains: Metadata validation, job definition validation against Nosana SDK, ID uniqueness checks
- Depends on: Metadata layer, job definition layer, @nosana/sdk
- Used by: CI/CD pipeline, pre-commit hooks

**Docker Build Layer:**
- Purpose: Builds custom container images for templates
- Location: `dockerfiles/Dockerfile.*`, `build-images.sh`, `Makefile`
- Contains: Base image specifications, environment setup, tool installation
- Depends on: Job definition layer (image specifications)
- Used by: Docker registry for deployment

## Data Flow

**Template Submission:**

1. Contributor creates `templates/<name>/` directory with `info.json`, `job-definition.json` (or multiple variants), and `README.md`
2. Pre-commit hooks run `npm run validate` locally
3. Validation script (`scripts/validate.js`) checks:
   - `info.json` has required fields (id, name, category)
   - ID is unique, no dots (dots break interpolation)
   - Category values are valid
   - icon or github_url is present
   - Job definition files exist
4. Job definitions validated against Nosana SDK schema (meta field stripped before validation)
5. PR merged if all validation passes
6. CI workflow (`/.github/workflows/validate.yml`) re-validates on main branch push

**Variant Resolution:**

1. Template with `info.json` containing `variants` array points to multiple job definition files
2. Each variant entry specifies: id, name, description, job_definition path
3. Validator iterates variants, validating each referenced job definition file
4. Dashboard consumes variants array to present model size options (e.g., Deepseek-R1: 1.5b/7b/14b/32b)

**Image Building:**

1. Custom images defined in `build-images.sh` IMAGES array
2. `make build` or `make build-parallel` executes `build-images.sh`
3. Each Dockerfile in `dockerfiles/` built with registry prefix (`nosana`) and tag (`2.0.0`)
4. `make push` builds and pushes to registry
5. Job definitions reference built images (e.g., `docker.io/nosana/comfyui:2.0.0`)

**State Management:**
- No runtime state: templates are immutable declarative definitions
- All state is file-based in git repository
- Validation state tracked implicitly via CI workflow status

## Key Abstractions

**Template:**
- Purpose: Self-contained, deployable AI/ML workload definition
- Examples: `templates/Deepseek-R1/`, `templates/ComfyUI/`, `templates/hello-world/`
- Pattern: Three-file structure (info.json + job-definition(s) + README.md)

**Variant:**
- Purpose: Represents alternative configurations of same model (different sizes/quantizations)
- Examples: ComfyUI variants (sd15, sdxl, flux), Deepseek-R1 variants (1.5b, 7b, 14b, 32b)
- Pattern: info.json.variants[] array, each pointing to separate job-definition-<id>.json file

**Job Definition:**
- Purpose: Nosana job specification (container, GPU, ports, health checks)
- Schema: version, type, ops[], meta
- Example ops: container/run with image, cmd, gpu, expose, resources

**Metadata:**
- Purpose: Dashboard display and categorization
- Schema fields: id (unique), name, category (array of valid tags), icon/github_url
- System requirements: required_vram (GB), required_cuda (array of versions)

**Docker Image:**
- Purpose: Runtime environment for job execution
- Examples: `nosana/comfyui:2.0.0`, `nosana/whisper-asr:2.0.0`, `nosana/pytorch-jupyter:2.0.0`
- Base: `pytorch/pytorch:2.7.1-cuda12.8-cudnn9-runtime`

## Entry Points

**npm run validate:**
- Location: `scripts/validate.js` (Node.js module exported at root)
- Triggers: Pre-commit hook, CI workflow on PR/push to main
- Responsibilities: Loads all templates, validates each against schema

**make build:**
- Location: `Makefile` (calls `build-images.sh`)
- Triggers: Manual developer command
- Responsibilities: Builds all Docker images specified in IMAGES array

**GitHub Actions validate.yml:**
- Location: `.github/workflows/validate.yml`
- Triggers: Push to main, pull requests to main
- Responsibilities: Installs Node 20.x, runs npm ci && npm run validate

**git push to main:**
- Location: Pre-commit hooks defined in `.pre-commit-config.yaml`
- Triggers: Developer commit attempt
- Responsibilities: Runs trailing-whitespace, end-of-file-fixer, check-json, pretty-format-json, npm run validate

## Error Handling

**Strategy:** Fail-fast validation with descriptive error messages

**Patterns:**
- Validation errors include folder/file context: `${folder}: ${field} - ${error message}`
- ID uniqueness errors list duplicate: `Duplicate ID '${id}' found`
- Schema validation delegates to Nosana SDK: catches invalid job definition structure
- Field length validation: explicit max length checks for id (16), name (256), icon (256)
- Category validation: explicit list of valid categories with suggestions on mismatch
- Dot validation: Op IDs and template IDs must not contain dots (breaks interpolation)

## Cross-Cutting Concerns

**Validation:** Central validator (`scripts/validate.js`) enforces all schemas and constraints
- Runs on every commit (pre-commit)
- Runs on every PR and push to main (CI)
- Idempotent: same result regardless of execution order

**Formatting:** Pre-commit hooks enforce JSON formatting (`pretty-format-json` for `templates/`)
- Auto-fixes indentation, trailing whitespace, EOF newlines
- No manual formatting required

**Schema Compliance:** Job definitions validated against Nosana SDK (`@nosana/sdk` v0.4.38)
- Ensures created jobs execute correctly on Nosana network
- Meta field (system_requirements) stripped before SDK validation

**Docker Registry:** Consistent registry/tag naming
- Default registry: `nosana`
- Default tag: `2.0.0`
- Customizable via `make build-custom REGISTRY=X TAG=Y`

---

*Architecture analysis: 2026-04-03*
