import * as pulumi from "@pulumi/pulumi";

export function test() {
  const port: pulumi.OutputInstance<number> = pulumi.output(123);
  return pulumi.interpolate`${port}`;
}
