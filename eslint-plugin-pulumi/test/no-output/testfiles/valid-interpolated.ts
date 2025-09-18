import * as pulumi from "@pulumi/pulumi";

export function test() {
  const foo: pulumi.Output<string> = pulumi.output<string>("foo");

  return pulumi.interpolate`${foo}`;
}
