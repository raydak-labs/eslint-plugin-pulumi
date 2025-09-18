import { Output, output } from "@pulumi/pulumi";
import * as pulumi from "@pulumi/pulumi";

export function test() {
  const fooOutput: Output<string> = output("foo");

  return pulumi.interpolate`${fooOutput}`;
}
