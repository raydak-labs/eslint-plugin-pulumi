import * as pulumi from "@pulumi/pulumi";

export function test() {
  const myOutput = pulumi.output([1, 2, 3])[0];
  return pulumi.interpolate`${myOutput}`;
}
