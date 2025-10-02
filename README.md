# Pulumi ESLint Plugin

ESLint plugin for Pulumi projects using TypeScript to enforce best practices and coding standards.
See the subproject [eslint-plugin-pulumi](./eslint-plugin-pulumi/README.md) for the actual plugin code.

## Test Playground

The subproject [test-playground](./test-playground/) contains a minimal Pulumi project setup to test the ESLint plugin.
It depends on the local version of the ESLint plugin so a `pnpm build` is required in [eslint-plugin-pulumi](./eslint-plugin-pulumi/) directory before testing it in the playground.
