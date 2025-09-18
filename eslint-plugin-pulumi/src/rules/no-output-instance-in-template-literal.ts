import { createRule } from "../utils.js";
import { createTemplateLiteralRule } from "./create-template-literal-rule.js";

export const noOutputInstanceInTemplateLiteral = createRule({
  name: "no-output-instance-in-template-literal",
  meta: {
    docs: {
      description:
        "Disallow usage of Pulumi OutputInstance in template literals",
    },
    fixable: "code",
    messages: {
      outputInTemplateLiteral:
        "Pulumi Output Instances cannot be used directly in template literals. Use `pulumi.interpolate` or `.apply` instead.",
    },
    schema: [],
    type: "problem",
  },
  defaultOptions: [],
  create(context) {
    return createTemplateLiteralRule(
      context,
      "outputInstanceInTemplateLiteral",
      "OutputInstance",
    );
  },
});
