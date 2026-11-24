// The One-Line Exit — make.fun bounty entry
// https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1
//
// Writes one funny single-line resignation letter to out/entry.txt
// (and to /output/entry.txt when that directory exists, i.e. in the
// grader sandbox). The letter is a fixed, hand-written line: the
// entry is the joke itself, so the program is deterministic by design.
//
// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1-140
// characters, not whitespace-only. The program self-checks the gate
// before writing and refuses to emit an invalid entry.

import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "Dear Sir, I resign as your magician's assistant: after 300 shows sawn in half, I am taking my two halves somewhere with a lunch break.";

// Gate self-check: 1-140 chars, not whitespace-only, exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, outside the 1-140 gate`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is whitespace-only, fails the gate");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be exactly one line");
}

const repoRoot = dirname(fileURLToPath(import.meta.url));
const targets = [join(repoRoot, "out", "entry.txt")];

// In the grader sandbox /output is the output directory.
try {
  if (statSync("/output").isDirectory()) targets.push("/output/entry.txt");
} catch {
  // No /output here (local run) — out/entry.txt is the only target.
}

for (const target of targets) {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${target} (${ENTRY.length} chars)`);
}
