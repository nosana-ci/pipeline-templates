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
  "LLM Gateway", // Internal managed inference; never a public or benchmark template.
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

// Secret-free serving contract. Activation and GPU spending are separately approved.
export const Inference = z.object({
  model: z.string().min(1).max(128),
  context_length: z.number().int().positive(),
  max_output_tokens: z.number().int().positive(),
  op: z.string().min(1),
  port: z.number().int().min(1).max(65535),
}).strict().refine(v => v.max_output_tokens <= v.context_length,
  "max_output_tokens must fit context_length");

// A selectable variant shown in the dashboard.
const Variant = z
  .object({
    id: catalogId,
    name: z.string().min(1).max(256),
    description: z.string().optional(),
    job_definition: z.string().min(1),
    inference: Inference.optional(),
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
    inference: Inference.optional(),
  })
  .strict().superRefine((info, ctx) => {
    const internal = info.category.includes("LLM Gateway");
    const definitions = info.variants ?? [info];
    if (definitions.some(v => Boolean(v.inference) !== internal)) {
      ctx.addIssue({ code: "custom", message: "Inference metadata is required only for LLM Gateway definitions" });
    }
    if (info.variants && info.inference) {
      ctx.addIssue({ code: "custom", message: "Put inference metadata on each variant" });
    }
  });
