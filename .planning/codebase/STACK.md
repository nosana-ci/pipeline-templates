# Technology Stack

**Analysis Date:** 2025-04-03

## Languages

**Primary:**
- JavaScript (Node.js) - Validation scripts, CLI tooling
- JSON - All configuration and template definitions
- Bash - Docker image build automation (`scripts/build-images.sh`)

**Secondary:**
- Python - Used within Docker images for AI/ML frameworks
- Dockerfile - Multi-stage container definitions in `dockerfiles/`

## Runtime

**Environment:**
- Node.js 20.x (specified in GitHub Actions workflow)

**Package Manager:**
- npm - Node package management
- Lockfile: `package-lock.json` present

## Frameworks

**Core SDK & CLI:**
- Nosana SDK (0.4.38) - Job definition validation and Solana blockchain integration
- Nosana CLI (1.0.59) - Command-line interface for template operations

**Testing/Validation:**
- Zod schema (via @nosana/sdk) - Validates job definitions against Nosana schema
- node-fetch - HTTP requests for URL validation in `scripts/validate.js`

**Build/Dev:**
- Docker & Docker Compose - Container image building and management
- Make - Build orchestration (`Makefile`)
- Hadolint - Dockerfile linting for validation via `make validate`

## Key Dependencies

**Critical:**
- `@nosana/sdk` (^0.4.38) - Provides `validateJobDefinition()` for schema validation of job definitions
- `@nosana/cli` (^1.0.59) - CLI utilities (exact functionality determined by SDK requirements)
- `@solana/web3.js` (included in SDK deps) - Blockchain/network integration
- `node-fetch` - Network requests for GitHub URL validation

**Infrastructure:**
- Pre-commit hooks (`pre-commit-config.yaml`) - Enforces validation on commit
- JSON formatting tools (`pretty-format-json`) - Auto-formats template JSON files

## Configuration

**Environment:**
- GitHub Actions for CI/CD (`.github/workflows/validate.yml`)
- Node version: 20.x pinned
- No external environment variables required for validation
- Docker registry configuration: default `nosana`, tag `2.0.0` (overridable via `build-images.sh` args)

**Build:**
- `Makefile` - Primary build orchestration entry point
- `build-images.sh` - Docker image build implementation (supports parallel builds, custom registry/tags)
- Docker images use base: `pytorch/pytorch:2.7.1-cuda12.8-cudnn9-runtime`

## Platform Requirements

**Development:**
- Node.js 20.x
- Docker engine (for image building)
- Git with pre-commit hooks enabled
- npm (standard with Node)

**Production/Deployment:**
- Docker-compatible container runtime (for executing job definitions)
- GPU support optional but expected (CUDA 12.8+ for VRAM-intensive templates)
- Nosana Network access (for submitting jobs to dashboard)
- S3-compatible storage (for model downloads via `https://models.nosana.io`)

**Validation Checks:**
- Dockerfile validation: `hadolint` Docker image
- Schema validation: Nosana SDK's Zod schema
- Pre-commit: Runs `npm run validate` automatically

---

*Stack analysis: 2025-04-03*
