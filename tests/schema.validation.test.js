import { test } from "node:test";
import assert from "node:assert/strict";
import { InfoSchema, BenchmarksSchema } from "../validation/schema.validation.js";

const validInfo = {
  id: "x",
  name: "X",
  icon: "https://example.com/icon.png",
  category: ["API"],
};

test("InfoSchema accepts a minimal valid catalog entry", () => {
  assert.equal(InfoSchema.safeParse(validInfo).success, true);
});

test("InfoSchema rejects a missing required field (name)", () => {
  const { name, ...bad } = validInfo;
  assert.equal(InfoSchema.safeParse(bad).success, false);
});

test("InfoSchema rejects an unknown category", () => {
  assert.equal(InfoSchema.safeParse({ ...validInfo, category: ["Nope"] }).success, false);
});

test("InfoSchema accepts a dotted catalog id (only op ids must be dot-free)", () => {
  assert.equal(InfoSchema.safeParse({ ...validInfo, id: "a.b" }).success, true);
});

test("InfoSchema rejects an id longer than 16 chars", () => {
  assert.equal(InfoSchema.safeParse({ ...validInfo, id: "x".repeat(17) }).success, false);
});

test("InfoSchema rejects unknown top-level keys (strict)", () => {
  assert.equal(InfoSchema.safeParse({ ...validInfo, github_url: "https://x.com" }).success, false);
});

test("InfoSchema accepts a template with variants", () => {
  const info = {
    ...validInfo,
    variants: [{ id: "v1", name: "V1", description: "d", job_definition: "job-definition-v1.json" }],
  };
  assert.equal(InfoSchema.safeParse(info).success, true);
});

test("InfoSchema rejects duplicate variant ids within a template", () => {
  const info = {
    ...validInfo,
    variants: [
      { id: "v1", name: "A", job_definition: "a.json" },
      { id: "v1", name: "B", job_definition: "b.json" },
    ],
  };
  assert.equal(InfoSchema.safeParse(info).success, false);
});

test("InfoSchema rejects an empty name", () => {
  assert.equal(InfoSchema.safeParse({ ...validInfo, name: "" }).success, false);
});

const validBench = {
  variants: ["e2b", "e4b"],
  metrics: [
    { key: "tokens_per_second", type: "float", expiry: "5d", processor: "results_selector", defaultValue: null },
  ],
  support_ops: [
    {
      id: "benchmark",
      type: "container/run",
      args: { image: "nosana/llm-benchmark:0.0.2", gpu: true },
      results: { "%%global.variables.MODEL%%__tokens_per_second": "\"x\":(-?[\\d.]+)" },
    },
  ],
  ops_overrides: { execution: { group: "llm-pair", depends_on: ["benchmark"], stop_if_dependent_stops: true } },
};

test("BenchmarksSchema accepts a valid benchmarks file", () => {
  assert.equal(BenchmarksSchema.safeParse(validBench).success, true);
});

test("BenchmarksSchema rejects a results key with no matching metric", () => {
  const bad = structuredClone(validBench);
  bad.support_ops[0].results = { "%%global.variables.MODEL%%__unknown_metric": "x" };
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects an empty metrics array", () => {
  const bad = structuredClone(validBench);
  bad.metrics = [];
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects unknown top-level keys (strict)", () => {
  const bad = { ...structuredClone(validBench), extra: 1 };
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects a missing variants selector", () => {
  const { variants, ...bad } = structuredClone(validBench);
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects an empty variants array", () => {
  const bad = structuredClone(validBench);
  bad.variants = [];
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects duplicate variant ids in the selector", () => {
  const bad = structuredClone(validBench);
  bad.variants = ["e2b", "e2b"];
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects an invalid metric type", () => {
  const bad = structuredClone(validBench);
  bad.metrics[0].type = "json";
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects a metric missing a required field", () => {
  const bad = structuredClone(validBench);
  delete bad.metrics[0].processor;
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects unknown keys in ops_overrides.execution (strict)", () => {
  const bad = structuredClone(validBench);
  bad.ops_overrides.execution.unexpected = true;
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema accepts ops_overrides with extra op fields (passthrough)", () => {
  const ok = structuredClone(validBench);
  ok.ops_overrides.args = { gpu: true };
  assert.equal(BenchmarksSchema.safeParse(ok).success, true);
});
