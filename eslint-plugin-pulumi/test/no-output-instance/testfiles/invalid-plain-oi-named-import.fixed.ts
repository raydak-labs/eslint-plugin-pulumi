import { OutputInstance, output } from "@pulumi/pulumi";
import * as pulumi from "@pulumi/pulumi";

export function test() {
  const port: OutputInstance<number> = output(123);
  return pulumi.interpolate`${port}`;
}
