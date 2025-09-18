import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import raydakPluginPulumi from "@raydak/eslint-plugin-pulumi";
// import pluginPulumi from "@pulumi/eslint-plugin";

export default defineConfig(
  {
    languageOptions: {
      // configure the parser explicitly or e.g. by using the plugin, see below
      parser: tseslint.parser,
      // required for pulumi eslint rules as it requires type information
      parserOptions: {
        projectService: true,
      },
    },
  },
  raydakPluginPulumi.configs.recommended,
  {
    ignores: ["dist/**", "*.mjs"],
  },

  // NOTE: configure rules as follows, see https://eslint.org/docs/latest/use/configure/rules#using-configuration-files
  // {
  //   rules: {
  //     "pulumi/no-output-in-template-literal": "warn",
  //   },
  // },

  // NOTE: when using the recommended tseslint config below you can remove the parser in the languageOptions above
  // tseslint.configs.recommendedTypeChecked,

  // NOTE: this is the sample configuration when using the @pulumi/eslint-plugin
  // don't forget to uncomment the import above
  // {
  //   plugins: {
  //     pulumi: pluginPulumi,
  //   },
  //   rules: {
  //     "pulumi/no-output-in-template-literal": "error",
  //     "pulumi/no-output-instance-in-template-literal": "error",
  //   },
  // },
);
