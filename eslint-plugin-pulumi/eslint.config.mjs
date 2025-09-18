import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import { defineConfig } from "eslint/config";
import eslintPluginNode from "eslint-plugin-n";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  eslintPlugin.configs["recommended"],
  eslintPluginNode.configs["flat/recommended-script"],
  {
    files: ["**/*.test.*"],
    rules: {
      "n/no-unpublished-import": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dir,
      },
    },
  },
  {
    ignores: ["dist/**", "*.{mjs,ts}", "test/**"],
  },
]);
