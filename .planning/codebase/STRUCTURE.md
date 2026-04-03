# Codebase Structure

**Analysis Date:** 2026-04-03

## Directory Layout

```
pipeline-templates/
├── templates/                   # Job definition templates (50+ templates)
│   ├── <template-name>/
│   │   ├── info.json           # Metadata: id, name, category, icon/github_url, variants
│   │   ├── job-definition.json  # Single job definition (or job-definition-<variant>.json)
│   │   └── README.md            # Description, features, configuration
│   ├── Deepseek-R1/            # Example: Multi-variant template
│   │   ├── info.json           # Contains variants array
│   │   ├── job-definition-1.5b.json
│   │   ├── job-definition-7b.json
│   │   ├── job-definition-14b.json
│   │   ├── job-definition-32b.json
│   │   └── README.md
│   ├── ComfyUI/                # Example: Multi-variant image generation
│   │   ├── info.json           # Variants: sd15, sdxl, flux
│   │   ├── job-definition-sd15.json
│   │   ├── job-definition-sdxl.json
│   │   ├── job-definition-flux.json
│   │   └── README.md
│   ├── hello-world/            # Example: Simple single-job template
│   │   ├── info.json
│   │   ├── job-definition.json
│   │   └── README.md
│   └── ...
├── dockerfiles/                 # Custom Docker images
│   ├── Dockerfile.comfyui
│   ├── Dockerfile.pytorch-jupyter
│   ├── Dockerfile.tensorflow-jupyter
│   ├── Dockerfile.whisper-asr
│   ├── Dockerfile.vscode-server
│   ├── Dockerfile.rstudio
│   └── README.md
├── scripts/                     # Validation and build scripts
│   └── validate.js              # Template schema validator
├── .github/workflows/           # CI/CD workflows
│   └── validate.yml             # GitHub Actions: validate on PR/push
├── .planning/codebase/          # Planning documents (generated)
├── .pre-commit-config.yaml      # Pre-commit hooks
├── .dockerignore
├── .gitignore
├── Makefile                     # Build commands
├── build-images.sh              # Docker image builder
├── package.json                 # Node.js dependencies
├── package-lock.json            # Locked dependencies
├── README.md                    # Project documentation
└── CLAUDE.md                    # Claude Code instructions
```

## Directory Purposes

**templates/**
- Purpose: Repository of reusable job definitions for AI/ML workloads
- Contains: 35+ subdirectories, each a deployable template
- Key files: info.json (metadata), job-definition(s) (Nosana format), README.md (docs)
- Pattern: Contributes via PR, validated before merge

**dockerfiles/**
- Purpose: Custom Docker image specifications for templates
- Contains: Dockerfile.* files for images not available in public registries
- Examples: ComfyUI, PyTorch Jupyter, TensorFlow Jupyter, Whisper ASR, RStudio, VS Code
- Base image: `pytorch/pytorch:2.7.1-cuda12.8-cudnn9-runtime`
- Registry/tag: Built as `nosana/*:2.0.0` by default

**scripts/**
- Purpose: Build and validation tooling
- Key file: `validate.js` - validates all templates against Nosana SDK schema
- Enforces: ID uniqueness, required fields, category validity, schema compliance

**.github/workflows/**
- Purpose: CI/CD automation
- Key file: `validate.yml` - runs on PR/push to main, enforces npm run validate

## Key File Locations

**Entry Points:**
- `package.json`: defines `scripts.validate` command
- `scripts/validate.js`: main validation entry point (Node.js module)
- `Makefile`: build orchestration targets
- `build-images.sh`: Docker image builder script
- `.github/workflows/validate.yml`: CI validation workflow

**Configuration:**
- `.pre-commit-config.yaml`: defines pre-commit hooks (JSON formatting, npm validate)
- `Makefile`: Docker build registry/tag configuration (REGISTRY=nosana, TAG=2.0.0)
- `build-images.sh`: IMAGES array defines all buildable images

**Core Logic:**
- `scripts/validate.js`: Validation logic with detailed error messages
  - Lines 1-50: Configuration (required fields, valid categories, max field lengths)
  - Lines 45-93: validateJobDefinitionFile() function
  - Lines 96-242: validateTemplate() function
  - Lines 255-267: validateAllTemplates() orchestration

**Testing:**
- No unit/integration tests; validation happens through CI on every PR
- Pre-commit hooks run validation locally before commit

**Documentation:**
- `README.md`: Contribution guide, submission requirements, feature overview
- `CLAUDE.md`: Developer instructions for this codebase
- `templates/*/README.md`: Individual template descriptions
- `dockerfiles/README.md`: Docker image documentation

## Naming Conventions

**Files:**
- `info.json`: Metadata for templates (standardized name)
- `job-definition.json`: Single job definition (standardized name)
- `job-definition-<variant>.json`: Variant-specific definitions (kebab-case variant ID)
  - Examples: `job-definition-1.5b.json`, `job-definition-sd15.json`, `job-definition-flux.json`
- `README.md`: Template documentation (standardized)
- `Dockerfile.*`: Docker image specifications (Dockerfile.{image-name})

**Directories:**
- `templates/<TemplateName>/`: PascalCase for template names
  - Examples: `Deepseek-R1`, `ComfyUI`, `AUTOMATIC1111-stable-diffusion-1.5`, `Pytorch-jupyter-notebook`
  - Some use hyphens for multi-word names

**IDs (in JSON):**
- kebab-case, no dots (dots break interpolation)
- Max 16 characters for template ID
- Examples: `deepseek-r1-qwen`, `comfyui`, `hello-world`, `1-5b`, `sd15`, `flux`

**Categories (valid values):**
- Array of strings from fixed set: `API`, `Web UI`, `Featured`, `New`, `LLM`, `Image Generation`, `Image Generation Fine-tuning`, `LLM Fine-tuning`, `Official`, `Benchmark`, `Ollama`, `vLLM`, `OCR`, `Video Generation`

## Where to Add New Code

**New Template:**
- Create directory: `templates/<TemplateName>/`
- Add files:
  - `info.json`: Template metadata (required fields: id, name, category)
  - `job-definition.json`: OR multiple `job-definition-<variant>.json` files
  - `README.md`: Template description with features, configuration, VRAM requirements
- Validation: Run `npm run validate` to verify before PR
- Contribution: Submit PR to main branch

**New Docker Image:**
- Add Dockerfile: `dockerfiles/Dockerfile.<image-name>`
- Register in `build-images.sh` IMAGES array: `dockerfile_name:image_name:description`
- Update `Makefile`: Add target for convenience (e.g., `.PHONY: myimage` + `myimage: ## Build description`)
- Image built as: `nosana/<image-name>:2.0.0`

**New Validation Rule:**
- Edit: `scripts/validate.js`
- Add to REQUIRED_FIELDS, VALID_CATEGORIES, or add new validation in validateTemplate() function
- Validation is idempotent and runs on every commit/PR

**CI/CD Changes:**
- Edit: `.github/workflows/validate.yml`
- Currently: Node 20.x, npm ci, npm run validate
- Triggers: Push to main, PR to main

## Special Directories

**templates/**
- Generated: No (committed templates)
- Committed: Yes
- Auto-formatted: JSON files auto-formatted by pre-commit hook (pretty-format-json)

**dockerfiles/**
- Generated: Images built here, but Dockerfiles are committed
- Committed: Yes (Dockerfiles)
- Built images: Docker daemon (not committed)

**.github/workflows/**
- Generated: No (workflows are committed)
- Committed: Yes

**.planning/codebase/**
- Generated: Yes (planning documents)
- Committed: Typically no (planning artifacts)

**node_modules/**
- Generated: Yes (npm ci)
- Committed: No (in .gitignore)

## File Requirements by Template Type

**Single Job Template (e.g., hello-world):**
```
templates/hello-world/
├── info.json (no variants field)
├── job-definition.json (required)
└── README.md
```

**Multi-Variant Template (e.g., Deepseek-R1):**
```
templates/Deepseek-R1/
├── info.json (contains variants array)
├── job-definition-1.5b.json (referenced by variants[0])
├── job-definition-7b.json (referenced by variants[1])
├── job-definition-14b.json (referenced by variants[2])
├── job-definition-32b.json (referenced by variants[3])
└── README.md
```

**info.json Fields:**
```json
{
  "id": "unique-kebab-case-id",           // Required, max 16 chars, no dots
  "name": "Human Readable Name",          // Required, max 256 chars
  "category": ["LLM", "Official"],        // Required, array of valid categories
  "icon": "https://...",                  // Either icon or github_url required
  "github_url": "https://github.com/...", // Alternative to icon
  "variants": [                           // Optional: if present, multiple job defs
    {
      "id": "variant-id",                 // Required if variants present
      "name": "Variant Name",             // Required
      "description": "...",               // Optional
      "job_definition": "job-definition-variant-id.json" // Required
    }
  ]
}
```

---

*Structure analysis: 2026-04-03*
