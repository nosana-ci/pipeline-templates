import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Public template data model — the readable source of truth for info.json, the
// catalog/display metadata the dashboard shows and contributors author.
// New contributors: this file is what to read.
//
// The internal benchmarks.json model (host-manager input) and all validation
// mechanics live under validation/ — they are not contributor-facing.
// ─────────────────────────────────────────────────────────────────────────────

// Allowed UI categories for info.json `category`.
export const CATEGORIES = [
  "API",
  "Web UI",
  "Featured",
  "New",
  "LLM",
  "Image Generation",
  "Image Generation Fine-tuning",
  "LLM Fine-tuning",
  "Official",
  "Ollama",
  "vLLM",
  "OCR",
  "Video Generation",
];

// Catalog ids are stable, non-empty identifiers (template id is also length-capped).
// Op ids (in job-definitions / benchmarks) are validated by the kit (@nosana/types),
// which enforces the no-dots / no-spaces rules — not these catalog ids.
const catalogId = z.string().min(1);

// A selectable variant shown in the dashboard.
const Variant = z
  .object({
    id: catalogId,
    name: z.string().min(1).max(256),
    description: z.string().optional(),
    job_definition: z.string().min(1),
  })
  .strict();

// info.json — catalog/display metadata for a template.
export const Info = z
  .object({
    id: catalogId.max(16),
    name: z.string().min(1).max(256),
    icon: z.string().url().max(256),
    category: z.array(z.enum(CATEGORIES)).min(1),
    description: z.string().optional(),
    variants: z.array(Variant).min(1).optional(),
  })
  .strict();
