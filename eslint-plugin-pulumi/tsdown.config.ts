import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/index.ts",
  format: ["cjs", "esm"],
  outDir: "./dist",
  // Keep .js/.d.ts (not .mjs/.d.mts) to match existing package exports.
  fixedExtension: false,
});
