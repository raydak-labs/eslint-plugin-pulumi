import { readFileSync } from "fs";
import { noOutputInstanceInTemplateLiteral } from "../../src/rules/no-output-instance-in-template-literal.js";
import { ruleTester } from "../test-utils.js";

function readTestFile(filename: string) {
  return readFileSync(
    new URL(`./testfiles/${filename}`, import.meta.url),
    "utf-8",
  );
}

ruleTester.run(
  "no-output-instance-in-template-literal",
  noOutputInstanceInTemplateLiteral,
  {
    valid: [
      {
        name: "string in template literal",
        code: readTestFile("valid-plain-string.ts"),
      },
      {
        name: "interpolated OutputInstance",
        code: readTestFile("valid-interpolated.ts"),
      },
    ],
    invalid: [
      {
        name: "plain OutputInstance",
        code: readTestFile("invalid-plain-oi.ts"),
        output: readTestFile("invalid-plain-oi.fixed.ts"),
        errors: [{ messageId: "outputInstanceInTemplateLiteral" }],
      },
      {
        name: "plain OutputInstance with named import",
        code: readTestFile("invalid-plain-oi-named-import.ts"),
        output: readTestFile("invalid-plain-oi-named-import.fixed.ts"),
        errors: [{ messageId: "outputInstanceInTemplateLiteral" }],
      },
    ],
  },
);
