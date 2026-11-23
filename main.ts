// main.ts — copies VIDEO.json from the repository root to the output directory.
// Node 22, standard library only. No network, no other files read.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR && process.env.MAKEFUN_OUTPUT_DIR.length > 0
    ? process.env.MAKEFUN_OUTPUT_DIR
    : "/output";

const source = join(repoRoot, "VIDEO.json");
const destination = join(outputDir, "VIDEO.json");

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

// Verify the copy is byte-for-byte identical to the source.
if (!readFileSync(source).equals(readFileSync(destination))) {
  throw new Error("VIDEO.json copy does not match the source");
}
