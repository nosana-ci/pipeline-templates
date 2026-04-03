# Ollama Model Templates Expansion

## What This Is

A project to expand the Nosana job template repository with templates for the top 10-15 most popular Ollama models. Each model gets a template directory with all available parameter sizes as variants, following the established pattern (info.json + job-definition variants + README.md). The end deliverable is a PR to main.

## Core Value

Cover the most popular Ollama models so Nosana users can deploy them from the dashboard without writing job definitions manually.

## Requirements

### Validated

- ✓ Template structure (info.json + job-definition + README.md) — existing
- ✓ Multi-variant support for models with multiple sizes — existing
- ✓ Ollama-based job definitions using `docker.io/ollama/ollama:0.15.4` — existing
- ✓ Validation pipeline (scripts/validate.js, pre-commit, CI) — existing
- ✓ Health checks on port 11434 with `/api/tags` endpoint — existing
- ✓ Resource block with type "Ollama" and model reference — existing
- ✓ VRAM requirements in meta.system_requirements — existing

### Active

- [ ] Research top 10-15 most popular Ollama models not already in repo
- [ ] Create template directories for each model with correct structure
- [ ] Include all available parameter sizes as variants per model
- [ ] Set accurate VRAM requirements per variant
- [ ] Use correct Ollama model tags (quantization, instruction-tuned, etc.)
- [ ] All templates pass `npm run validate`
- [ ] PR opened to main branch

### Out of Scope

- Custom Docker images — Ollama templates use the standard ollama/ollama image
- Non-LLM models — focus on language models available through Ollama
- Embedding-only models — focus on models with chat/generation capabilities
- Updating existing templates — only adding new ones

## Context

- Existing Ollama templates: Gemma3, GPT-OSS, GLM-47-flash, Qwen3.5
- Pattern is well-established: use `docker.io/ollama/ollama:0.15.4`, port 11434, Ollama resource type
- IDs must be max 16 chars, no dots; op IDs also no dots
- Valid categories include "Ollama", "LLM", "API", "Official", "Benchmark"
- Ollama model tags follow patterns like `model:size-variant` (e.g., `gemma3:4b-it-qat`)
- Models need accurate VRAM estimates for each variant size

## Constraints

- **ID length**: Template IDs max 16 characters, no dots
- **Validation**: All templates must pass `npm run validate`
- **Image version**: Use `docker.io/ollama/ollama:0.15.4` (current pinned version)
- **Schema**: Job definitions must conform to Nosana SDK schema

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| All available sizes as variants | User requested comprehensive variant coverage | — Pending |
| Top 10-15 models by popularity | Balances coverage with manageable scope | — Pending |
| PR to main | User wants deliverable as a pull request | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-03 after initialization*
