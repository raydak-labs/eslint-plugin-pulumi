import { noOutputInTemplateLiteral } from "./no-output-in-template-literal.js";
import { noOutputInstanceInTemplateLiteral } from "./no-output-instance-in-template-literal.js";

// export type Rules = Record<string, RuleModule<string>>;

export const rules = {
  "no-output-in-template-literal": noOutputInTemplateLiteral,
  "no-output-instance-in-template-literal": noOutputInstanceInTemplateLiteral,
};
