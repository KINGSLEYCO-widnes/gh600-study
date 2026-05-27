import { readFileSync } from "fs";

const output = JSON.parse(readFileSync("agent-output.json", "utf8"));
const results = [];

function check(name, passed, detail) {
  results.push({ name, passed, detail });
}

check(
  "status is complete",
  output.status === "complete",
  `status was "${output.status}"`
);

check(
  "file_count matches files_changed length",
  output.file_count === output.files_changed.length,
  `count=${output.file_count}, actual=${output.files_changed.length}`
);

check(
  "timestamp is present",
  typeof output.timestamp === "string" && output.timestamp.length > 0,
  `timestamp="${output.timestamp}"`
);

check(
  "at least one file changed",
  output.files_changed.length > 0,
  `found ${output.files_changed.length} files`
);

console.log("\n=== Evaluation Results ===\n");
let passed = 0;
for (const r of results) {
  const icon = r.passed ? "✓" : "✗";
  console.log(`${icon} ${r.name} (${r.detail})`);
  if (r.passed) passed++;
}
console.log(`\n${passed}/${results.length} checks passed`);
process.exit(passed === results.length ? 0 : 1);
