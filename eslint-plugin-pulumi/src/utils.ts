import { ESLintUtils } from "@typescript-eslint/utils";

export type RuleOptions = {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
};

// TODO: check this parameter and the options
export const createRule = ESLintUtils.RuleCreator<RuleOptions>((name) => name);
