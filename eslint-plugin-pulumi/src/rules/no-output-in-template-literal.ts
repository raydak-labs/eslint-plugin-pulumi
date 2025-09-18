import { createRule } from "../utils.js";
import { createTemplateLiteralRule } from "./create-template-literal-rule.js";

export const noOutputInTemplateLiteral = createRule({
  name: "no-output-in-template-literal",
  meta: {
    docs: {
      description: "Disallow usage of Pulumi Outputs in template literals",
    },
    fixable: "code",
    messages: {
      outputInTemplateLiteral:
        "Pulumi Outputs cannot be used directly in template literals. Use `pulumi.interpolate` or `.apply` instead.",
    },
    schema: [],
    type: "problem",
  },
  defaultOptions: [],
  create(context) {
    return createTemplateLiteralRule(
      context,
      "outputInTemplateLiteral",
      "Output",
    );
  },
});
