# Pulumi ESLint Plugin

[![npm version](https://img.shields.io/npm/v/@raydak/eslint-plugin-pulumi)](https://www.npmjs.com/package/@raydak/eslint-plugin-pulumi)
[![license](https://img.shields.io/npm/l/@raydak/eslint-plugin-pulumi)](LICENSE)
[![build status](https://github.com/raydak-labs/eslint-plugin-pulumi/actions/workflows/ci.yml/badge.svg)](https://github.com/raydak-labs/eslint-plugin-pulumi/actions)

ESLint plugin for Pulumi projects using TypeScript to enforce best practices and coding standards.

This repository is derived from [pulumi/eslint-plugin-pulumi](https://github.com/pulumi/eslint-plugin-pulumi) which is not really maintained.

## Differences to [pulumi/eslint-plugin-pulumi](https://github.com/pulumi/eslint-plugin-pulumi)

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

Configure ESLint by adding an `eslint.config.mjs`, see [eslint.config.mjs](../test-playground/eslint.config.mjs) for an example:

```js
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginPulumi from "@raydak/eslint-plugin-pulumi";

export default defineConfig(
  {
    languageOptions: {
      // configure the parser explicitly
      parser: tseslint.parser,
      // required for pulumi eslint rules as it requires type information
      parserOptions: {
        projectService: true,
      },
    },
  },
  eslintPluginPulumi.configs.recommended,
);
```
