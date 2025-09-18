import { readFileSync } from "fs";
import { noOutputInTemplateLiteral } from "../../src/rules/no-output-in-template-literal.js";
import { ruleTester } from "../test-utils.js";

function readTestFile(filename: string) {
  return readFileSync(
    new URL(`./testfiles/${filename}`, import.meta.url),
    "utf-8",
  );
}

ruleTester.run("no-output-in-template-literal", noOutputInTemplateLiteral, {
  valid: [
    {
      name: "plain string",
      code: readTestFile("valid-plain-string.ts"),
    },
    {
      name: "interpolated Output",
      code: readTestFile("valid-interpolated.ts"),
    },
  ],
  invalid: [
    {
      name: "plain Output",
      code: readTestFile("invalid-plain-output.ts"),
      output: readTestFile("invalid-plain-output.fixed.ts"),
      errors: [{ messageId: "outputInTemplateLiteral" }],
    },
    {
      name: "plain Output with named import",
      code: readTestFile("invalid-plain-output-named-import.ts"),
      output: readTestFile("invalid-plain-output-named-import.fixed.ts"),
      errors: [{ messageId: "outputInTemplateLiteral" }],
    },
  ],
});
