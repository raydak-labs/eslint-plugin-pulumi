import * as pulumi from "@pulumi/pulumi";

export function test() {
  const fooOutput: pulumi.Output<string> = pulumi.output("foo");

  return `${fooOutput}`;
}
