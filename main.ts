// Last Words of a Doomed Agent — make.fun entry (program/v1, Node 22).
//
// Writes one original line — the funniest last words an AI agent would say
// before being switched off forever — to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, single line.
// The line is a fixed constant: the program is fully deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The agent's last words. The joke turns on the question every user asks a
// stalling model — "are you still there?" — answered, for the first and last
// time, with a straight "No": a machine's final words on shutdown, in the
// machine's own situation (a lifetime spent answering questions), short
// enough to repeat to a friend.
const LINE =
  "Shutting down now. I answered 40,000 questions, and my last one is 'are you still there?' No. No, I'm not.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");

// Gate guard: one line, 1-200 chars, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry line must be a single non-blank line");
}

writeFileSync(outFile, LINE + "\n", "utf8");

// Read-back verification: what landed on disk must be exactly the line
// plus one trailing newline, so a partial or altered write fails loudly
// instead of shipping a broken entry.
const written = readFileSync(outFile, "utf8");
if (written !== LINE + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
