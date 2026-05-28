import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const templatesRoot = path.join(repoRoot, "templates");
const benchmarkOperationTemplatePath = path.join(
  repoRoot,
  "scripts",
  "llm-benchmark-operation-template.json"
);
const checkMode = process.argv.includes("--check");

const DEFAULT_BENCHMARK_METRICS_SCHEMA = [
  {
    key: "tokens_per_second",
    input: '"users_1_tokens_per_second_mean":(-?[\\d.]+)',
    type: "float",
    expiry: "5d",
    processor: "regex_parser",
  },
  {
    key: "gpu_wattage_avg",
    input: '"users_1_gpu_wattage_avg":(-?[\\d.]+)',
    type: "float",
    expiry: "5d",
    processor: "regex_parser",
  },
  {
    key: "gpu_temperature_avg",
    input: '"users_1_gpu_temperature_avg":(-?[\\d.]+)',
    type: "float",
    expiry: "5d",
    processor: "regex_parser",
  },
];

const TEMPLATE_METRIC_KEY_SEPARATOR = "__";

function buildMetricPrefix(templateInfo, variant) {
  return variant ? `${templateInfo.id}-${variant.id}` : templateInfo.id;
}

function stripMetricPrefix(key, prefix) {
  const supportedPrefixes = [`${prefix}${TEMPLATE_METRIC_KEY_SEPARATOR}`, `${prefix}_`, `${prefix}.`];
  const matchingPrefix = supportedPrefixes.find((candidate) => key.startsWith(candidate));
  return matchingPrefix ? key.slice(matchingPrefix.length) : key;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function hasBenchmarkCategory(info) {
  return Array.isArray(info.category) && info.category.includes("Benchmark");
}

function isOllamaResource(resource) {
  return isObject(resource) && resource.type === "Ollama";
}

function findTemplateServerOp(ops) {
  if (!Array.isArray(ops)) return null;

  for (const op of ops) {
    if (!isObject(op) || op.type !== "container/run") continue;
    const resources = isObject(op.args) ? op.args.resources : undefined;
    if (Array.isArray(resources) && resources.some(isOllamaResource)) {
      return op;
    }
  }

  return null;
}

function resolveServerPort(serverOp) {
  const expose = isObject(serverOp.args) ? serverOp.args.expose : undefined;

  if (typeof expose === "number" || typeof expose === "string") {
    return String(expose);
  }

  const firstExpose = Array.isArray(expose) ? expose[0] : null;
  if (isObject(firstExpose) && (typeof firstExpose.port === "number" || typeof firstExpose.port === "string")) {
    return String(firstExpose.port);
  }

  return "11434";
}

function withBenchmarkExecution(op) {
  const execution = isObject(op.execution) ? op.execution : {};
  return {
    ...op,
    execution: {
      ...execution,
      group: "llm-pair",
      depends_on: ["benchmark"],
      stop_if_dependent_stops: true,
    },
  };
}

function renderJsonTemplate(value, replacements) {
  if (typeof value === "string") {
    let result = value;
    for (const [placeholder, replacement] of replacements) {
      result = result.replaceAll(placeholder, replacement);
    }
    return result;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => renderJsonTemplate(entry, replacements));
  }

  if (isObject(value)) {
    const output = {};
    for (const [key, innerValue] of Object.entries(value)) {
      output[key] = renderJsonTemplate(innerValue, replacements);
    }
    return output;
  }

  return value;
}

function createBenchmarkOp(serverOpId, port) {
  return renderJsonTemplate(readJson(benchmarkOperationTemplatePath), [
    ["__BASE_URL__", `http://%%ops.${serverOpId}.host%%:${port}`],
  ]);
}

function flattenGlobalVariables(jobDefinition) {
  const ops = Array.isArray(jobDefinition.ops) ? jobDefinition.ops : [];
  const global = isObject(jobDefinition.global) ? jobDefinition.global : null;
  if (!global) return ops;

  const variables = isObject(global.variables) ? global.variables : null;
  const replacements = new Map();
  if (variables) {
    for (const [key, value] of Object.entries(variables)) {
      replacements.set(`%%global.variables.${key}%%`, value);
    }
  }

  const { variables: _variables, ...globals } = global;

  function resolveValue(value) {
    if (typeof value === "string") {
      let result = value;
      for (const [placeholder, replacement] of replacements) {
        result = result.replaceAll(placeholder, String(replacement));
      }
      return result;
    }

    if (Array.isArray(value)) {
      return value.map(resolveValue);
    }

    if (isObject(value)) {
      const output = {};
      for (const [key, innerValue] of Object.entries(value)) {
        output[key] = resolveValue(innerValue);
      }
      return output;
    }

    return value;
  }

  const resolvedOps = resolveValue(ops);
  return resolvedOps.map((op) => ({
    ...op,
    args: {
      ...globals,
      ...(isObject(op.args) ? op.args : {}),
    },
  }));
}

function stripGeneratedBenchmarkArtifacts(jobDefinition) {
  const ops = Array.isArray(jobDefinition.ops) ? jobDefinition.ops : [];
  const nextOps = [];

  for (const op of ops) {
    if (isObject(op) && op.id === "benchmark") continue;
    if (!isObject(op)) {
      nextOps.push(op);
      continue;
    }

    const execution = isObject(op.execution) ? { ...op.execution } : null;
    if (execution) {
      if (execution.group === "llm-pair") delete execution.group;
      if (Array.isArray(execution.depends_on) && execution.depends_on.length === 1 && execution.depends_on[0] === "benchmark") {
        delete execution.depends_on;
      }
      if (execution.stop_if_dependent_stops === true) {
        delete execution.stop_if_dependent_stops;
      }
    }

    nextOps.push({
      ...op,
      ...(execution && Object.keys(execution).length > 0 ? { execution } : { execution: undefined }),
    });
  }

  return {
    ...jobDefinition,
    ops: nextOps.map((op) => {
      if (!isObject(op) || op.execution !== undefined) return op;
      const { execution: _execution, ...rest } = op;
      return rest;
    }),
  };
}

function buildOperationDefinition(jobDefinition) {
  const flattenedOps = flattenGlobalVariables(stripGeneratedBenchmarkArtifacts(jobDefinition));
  const serverOp = findTemplateServerOp(flattenedOps);
  if (!serverOp) return flattenedOps;

  const serverOpId = typeof serverOp.id === "string" && serverOp.id.length > 0 ? serverOp.id : "server";
  const port = resolveServerPort(serverOp);
  const benchmarkOp = createBenchmarkOp(serverOpId, port);

  const nextOps = [];
  for (const op of flattenedOps) {
    if (isObject(op) && op.id === "benchmark") continue;
    if (op === serverOp) nextOps.push(withBenchmarkExecution(op));
    else nextOps.push(op);
  }
  nextOps.push(benchmarkOp);

  return nextOps;
}

function mergeMetricsSchema(existingSchema, metricPrefix) {
  const merged = new Map(
    DEFAULT_BENCHMARK_METRICS_SCHEMA.map((entry) => [entry.key, { ...entry }])
  );
  for (const entry of existingSchema ?? []) {
    const normalizedKey = stripMetricPrefix(entry.key, metricPrefix);
    merged.set(normalizedKey, {
      ...entry,
      key: normalizedKey,
    });
  }
  return [...merged.values()].map((entry) => ({
    ...entry,
    key: `${metricPrefix}${TEMPLATE_METRIC_KEY_SEPARATOR}${entry.key}`,
    defaultValue: entry.defaultValue ?? null,
  }));
}

function normalizeOperationDefinitionPath(existingPath, fallbackPath) {
  if (!existingPath) return fallbackPath;
  return existingPath.startsWith("operation-definitions/") ? existingPath : fallbackPath;
}

function removeFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function syncTemplate(templateDir) {
  const infoPath = path.join(templateDir, "info.json");
  const info = readJson(infoPath);
  if (!hasBenchmarkCategory(info)) return [];

  const touchedFiles = [];
  const nextInfo = structuredClone(info);

  const syncVariant = (variant, index) => {
    const metricPrefix = buildMetricPrefix(info, variant);
    const jobDefinitionPath = path.join(templateDir, variant.job_definition);
    const jobDefinition = readJson(jobDefinitionPath);
    const sourceJobDefinition = stripGeneratedBenchmarkArtifacts(jobDefinition);
    const operationDefinition = buildOperationDefinition(sourceJobDefinition);
    const operationDefinitionFile = normalizeOperationDefinitionPath(
      variant.operation_definition,
      `operation-definitions/${variant.id}.json`
    );
    const operationDefinitionPath = path.join(templateDir, operationDefinitionFile);
    const previousOperationDefinitionPath = variant.operation_definition
      ? path.join(templateDir, variant.operation_definition)
      : null;

    if (!deepEqual(jobDefinition, sourceJobDefinition)) {
      if (checkMode) {
        touchedFiles.push(path.relative(repoRoot, jobDefinitionPath));
      } else {
        writeJson(jobDefinitionPath, sourceJobDefinition);
        touchedFiles.push(path.relative(repoRoot, jobDefinitionPath));
      }
    }

    const existingOperationDefinition = fs.existsSync(operationDefinitionPath)
      ? readJson(operationDefinitionPath)
      : null;
    if (!deepEqual(existingOperationDefinition, operationDefinition)) {
      if (checkMode) {
        touchedFiles.push(path.relative(repoRoot, operationDefinitionPath));
      } else {
        writeJson(operationDefinitionPath, operationDefinition);
        touchedFiles.push(path.relative(repoRoot, operationDefinitionPath));
      }
    }

    if (
      !checkMode &&
      previousOperationDefinitionPath &&
      previousOperationDefinitionPath !== operationDefinitionPath
    ) {
      removeFileIfExists(previousOperationDefinitionPath);
    }

    const nextVariant = {
      ...variant,
      operation_definition: operationDefinitionFile,
    };

    if (findTemplateServerOp(operationDefinition)) {
      nextVariant.metrics_schema = mergeMetricsSchema(
        variant.metrics_schema ?? info.metrics_schema,
        metricPrefix
      );
    }

    if (!deepEqual(variant, nextVariant)) {
      nextInfo.variants[index] = nextVariant;
      touchedFiles.push(path.relative(repoRoot, infoPath));
    }
  };

  if (Array.isArray(info.variants) && info.variants.length > 0) {
    nextInfo.variants = [...info.variants];
    info.variants.forEach(syncVariant);
  } else {
    const metricPrefix = buildMetricPrefix(info);
    const jobDefinitionPath = path.join(templateDir, "job-definition.json");
    const jobDefinition = readJson(jobDefinitionPath);
    const sourceJobDefinition = stripGeneratedBenchmarkArtifacts(jobDefinition);
    const operationDefinitionFile = normalizeOperationDefinitionPath(
      info.operation_definition,
      "operation-definitions/default.json"
    );
    const operationDefinitionPath = path.join(templateDir, operationDefinitionFile);
    const previousOperationDefinitionPath = info.operation_definition
      ? path.join(templateDir, info.operation_definition)
      : null;
    const operationDefinition = buildOperationDefinition(sourceJobDefinition);

    if (!deepEqual(jobDefinition, sourceJobDefinition)) {
      if (checkMode) {
        touchedFiles.push(path.relative(repoRoot, jobDefinitionPath));
      } else {
        writeJson(jobDefinitionPath, sourceJobDefinition);
        touchedFiles.push(path.relative(repoRoot, jobDefinitionPath));
      }
    }

    const existingOperationDefinition = fs.existsSync(operationDefinitionPath)
      ? readJson(operationDefinitionPath)
      : null;
    if (!deepEqual(existingOperationDefinition, operationDefinition)) {
      if (checkMode) {
        touchedFiles.push(path.relative(repoRoot, operationDefinitionPath));
      } else {
        writeJson(operationDefinitionPath, operationDefinition);
        touchedFiles.push(path.relative(repoRoot, operationDefinitionPath));
      }
    }

    if (
      !checkMode &&
      previousOperationDefinitionPath &&
      previousOperationDefinitionPath !== operationDefinitionPath
    ) {
      removeFileIfExists(previousOperationDefinitionPath);
    }

    nextInfo.operation_definition = operationDefinitionFile;

    if (findTemplateServerOp(operationDefinition)) {
      const finalMetricsSchema = mergeMetricsSchema(info.metrics_schema, metricPrefix);
      if (!deepEqual(info.metrics_schema ?? null, finalMetricsSchema)) {
        nextInfo.metrics_schema = finalMetricsSchema;
        touchedFiles.push(path.relative(repoRoot, infoPath));
      }
    }
  }

  if (!deepEqual(info, nextInfo) && !checkMode) {
    writeJson(infoPath, nextInfo);
  }

  return [...new Set(touchedFiles)];
}

function main() {
  const templateDirs = fs
    .readdirSync(templatesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(templatesRoot, entry.name));

  const touchedFiles = templateDirs.flatMap(syncTemplate);

  if (checkMode && touchedFiles.length > 0) {
    console.error("Benchmark template files are out of sync:");
    for (const filePath of touchedFiles) {
      console.error(` - ${filePath}`);
    }
    process.exit(1);
  }

  if (!checkMode) {
    if (touchedFiles.length === 0) console.log("No benchmark template updates needed.");
    else console.log(`Updated ${touchedFiles.length} benchmark template files.`);
  }
}

main();
