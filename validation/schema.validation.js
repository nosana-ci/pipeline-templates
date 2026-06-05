import { z } from "zod";
import { Info } from "../schemas/schema.js";

// ─────────────────────────────────────────────────────────────────────────────
// Validation layer (not contributor-facing):
//  - the internal benchmarks.json shape (host-manager input), and
//  - the cross-field refinements Zod can't express declaratively,
// producing the validators the runner uses. The public info.json model lives in
// schemas/schema.js.
// ─────────────────────────────────────────────────────────────────────────────

// Catalog metadata for a single benchmark metric. Enums reflect values observed
// across templates; widen if a new type/processor is introduced.
const Metric = z
  .object({
    key: z.string().min(1),
    type: z.enum(["float", "int", "string", "bool"]),
    expiry: z.string().min(1),
    processor: z.string().min(1),
    defaultValue: z.union([z.number(), z.string(), z.boolean(), z.null()]).optional(),
  })
  .strict();

// Execution wiring (op grouping / dependencies).
const Execution = z
  .object({
    group: z.string().optional(),
    depends_on: z.array(z.string()).optional(),
    stop_if_dependent_stops: z.boolean().optional(),
  })
  .strict();

// A partial op the host manager merges into the deploy ops. Currently only
// `execution` is overridden; passthrough allows overriding other op fields later.
const OpsOverrides = z
  .object({
    execution: Execution.optional(),
  })
  .passthrough();

// benchmarks.json — internal benchmark recipe for a template (host-manager input).
const Benchmarks = z
  .object({
    // Variant ids (from info.json) to benchmark. Cross-checked against the template's
    // actual variant ids in validation.js (a schema can't see info.json).
    variants: z.array(z.string().min(1)).min(1),
    metrics: z.array(Metric).min(1),
    // Op structure is validated by the kit's validateOps; here we only require objects.
    support_ops: z.array(z.object({}).passthrough()).min(1),
    ops_overrides: OpsOverrides.optional(),
  })
  .strict();

// Strip a "%%...%%__" interpolation prefix from a results key to get the bare metric name.
const stripMetricPrefix = (key) => key.replace(/^%%[^%]+%%__/, "");

// info.json validator: public shape + unique variant ids within a template.
export const InfoSchema = Info.superRefine((data, ctx) => {
  if (!data.variants) return;
  const seen = new Set();
  data.variants.forEach((variant, index) => {
    if (seen.has(variant.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["variants", index, "id"],
        message: `duplicate variant id '${variant.id}'`,
      });
    }
    seen.add(variant.id);
  });
});

// benchmarks.json validator: shape + unique benchmark variant ids + every
// support_ops results key (prefix stripped) must have a matching metrics[] entry.
export const BenchmarksSchema = Benchmarks.superRefine((data, ctx) => {
  const seenVariants = new Set();
  data.variants.forEach((id, index) => {
    if (seenVariants.has(id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["variants", index],
        message: `duplicate benchmark variant id '${id}'`,
      });
    }
    seenVariants.add(id);
  });

  const metricKeys = new Set(data.metrics.map((m) => m.key));
  for (const op of data.support_ops) {
    const results = op?.results;
    if (!results || typeof results !== "object") continue;
    for (const rawKey of Object.keys(results)) {
      const metric = stripMetricPrefix(rawKey);
      if (!metricKeys.has(metric)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["support_ops"],
          message: `results key '${rawKey}' (metric '${metric}') has no matching metrics[] entry`,
        });
      }
    }
  }
});

// Turn a ZodError into a single "path - message" line for consistent output.
export function formatZodError(error) {
  const issue = error.issues[0];
  const path = issue.path.join(".") || "(root)";
  return `${path} - ${issue.message}`;
}
