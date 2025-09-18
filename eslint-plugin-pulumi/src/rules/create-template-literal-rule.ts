import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { RuleContext, RuleListener } from "@typescript-eslint/utils/ts-eslint";

export function createTemplateLiteralRule<TMessageId extends string>(
  context: Readonly<RuleContext<TMessageId, []>>,
  messageId: TMessageId,
  expectedTypeName: string,
): RuleListener {
  const parserServices = ESLintUtils.getParserServices(context);
  const typeChecker = parserServices.program.getTypeChecker();

  return {
    TemplateLiteral(node) {
      // ignore empty template literals
      if (!node.expressions) {
        return;
      }

      // ignore tagged template literals
      if (node.parent.type === AST_NODE_TYPES.TaggedTemplateExpression) {
        return;
      }

      const hasOutputExpressions = node.expressions.some((expression) => {
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(expression);
        const tsType = typeChecker.getTypeAtLocation(tsNode);
        const symbol = tsType.aliasSymbol ?? tsType.symbol;
        const typeName = symbol?.escapedName;

        // NOTE: think about checking as in https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/rules/restrict-template-expressions.ts
        // const constrainedType = parserServices.program
        //   .getTypeChecker()
        //   .getBaseConstraintOfType(tsType);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        return typeName === expectedTypeName;
      });

      if (hasOutputExpressions) {
        context.report({
          node,
          messageId,
          fix: (fixer) => {
            return fixer.replaceText(
              node,
              `pulumi.interpolate${context.sourceCode.getText(node)}`,
            );
          },
        });
      }
    },
  };
}
