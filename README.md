# Pulumi ESLint Plugin

ESLint plugin for Pulumi projects using TypeScript to enforce best practices and coding standards.

This repository is derived from [pulumi/eslint-plugin-pulumi](https://github.com/pulumi/eslint-plugin-pulumi) which is not really maintained.

## Differences to `pulumi/eslint-plugin-pulumi`

- this plugin is in active development
- lints bad usages of `OutputInstance`s correctly (see below)
- contains a recommended ruleset

### Example of bad code being detected

```ts
const db = new aws.rds.Instance(...);
new aws.ssm.Parameter("db-port", {
  name: "/my-db/port",
  type: aws.ssm.ParameterType.String,
  value: `${db.port}`, // this is wrong
  // value: pulumi.interpolate`${db.port}`, // this is better
});
```

## Usage

Install the dependencies:

```sh
npm install -D @raydak/eslint-plugin-pulumi eslint typescript-eslint
# or pnpm add -D @raydak/eslint-plugin-pulumi eslint typescript-eslint
```

This plugin requires ESLint v9.0.0 or later using the flat configuration.

Configure ESLint by adding an `eslint.config.mjs`, see [eslint.config.mjs](./test-playground/eslint.config.mjs) for an example:

```js
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import raydakPluginPulumi from "@raydak/eslint-plugin-pulumi";

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
);
```

### Test Playground

The subproject [test-playground](./test-playground/) contains a minimal Pulumi project setup to test the ESLint plugin.
It depends on the local version of the ESLint plugin so a `pnpm build` is required in [eslint-plugin-pulumi](./eslint-plugin-pulumi/) directory before testing it in the playground.
