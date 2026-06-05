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

// benchmarks.json is an array of benchmark groups.
const validBench = [
  {
    variants: ["e2b", "e4b"],
    metrics: [
      { key: "tokens_per_second", type: "float", expiry: "5d", processor: "results_selector", defaultValue: null, input: "tokens_per_second" },
    ],
    support_ops: [
      {
        id: "benchmark",
        type: "container/run",
        args: { image: "nosana/llm-benchmark:0.0.2", gpu: true },
        results: { "tokens_per_second": "\"x\":(-?[\\d.]+)" },
      },
    ],
    ops_overrides: { execution: { group: "llm-pair", depends_on: ["benchmark"], stop_if_dependent_stops: true } },
  },
];

test("BenchmarksSchema accepts a valid benchmarks file", () => {
  assert.equal(BenchmarksSchema.safeParse(validBench).success, true);
});

test("BenchmarksSchema accepts multiple groups over disjoint variants", () => {
  const ok = structuredClone(validBench);
  ok.push({ ...structuredClone(validBench[0]), variants: ["31b"] });
  assert.equal(BenchmarksSchema.safeParse(ok).success, true);
});

test("BenchmarksSchema rejects an empty array", () => {
  assert.equal(BenchmarksSchema.safeParse([]).success, false);
});

test("BenchmarksSchema rejects a variant benchmarked in more than one group", () => {
  const bad = structuredClone(validBench);
  bad.push({ ...structuredClone(validBench[0]), variants: ["e2b"] });
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects a metric whose input has no matching results key", () => {
  const bad = structuredClone(validBench);
  bad[0].metrics[0].input = "nope";
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema accepts a metric without an input", () => {
  const ok = structuredClone(validBench);
  delete ok[0].metrics[0].input;
  assert.equal(BenchmarksSchema.safeParse(ok).success, true);
});

test("BenchmarksSchema rejects an empty metrics array", () => {
  const bad = structuredClone(validBench);
  bad[0].metrics = [];
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects unknown keys in a group (strict)", () => {
  const bad = structuredClone(validBench);
  bad[0].extra = 1;
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects a missing variants selector", () => {
  const bad = structuredClone(validBench);
  delete bad[0].variants;
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects an empty variants array", () => {
  const bad = structuredClone(validBench);
  bad[0].variants = [];
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects duplicate variant ids within a group", () => {
  const bad = structuredClone(validBench);
  bad[0].variants = ["e2b", "e2b"];
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects an invalid metric type", () => {
  const bad = structuredClone(validBench);
  bad[0].metrics[0].type = "json";
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects a metric missing a required field", () => {
  const bad = structuredClone(validBench);
  delete bad[0].metrics[0].processor;
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema rejects unknown keys in ops_overrides.execution (strict)", () => {
  const bad = structuredClone(validBench);
  bad[0].ops_overrides.execution.unexpected = true;
  assert.equal(BenchmarksSchema.safeParse(bad).success, false);
});

test("BenchmarksSchema accepts ops_overrides with extra op fields (passthrough)", () => {
  const ok = structuredClone(validBench);
  ok[0].ops_overrides.args = { gpu: true };
  assert.equal(BenchmarksSchema.safeParse(ok).success, true);
});
