import fs from "fs";
import { rules } from "./rules/index.js";

const pkg = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { name: string; version: string };

// TODO: types
// type Plugin = Omit<ESLint.Plugin, "rules"> & { rules: Rules };
const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
    namespace: "pulumi",
  },
  configs: {},
  rules,
  processors: {},
};

// type ConfigData = Omit<ESLint.ConfigData, "rules"> & { rules: Rules };
type ConfigRules<TPrefix extends string> = Partial<
  Record<`${TPrefix}/${keyof typeof rules}`, "error">
>;

const recommended = {
  plugins: {
    pulumi: plugin,
  },
  rules: {
    "pulumi/no-output-in-template-literal": "error",
    "pulumi/no-output-instance-in-template-literal": "error",
  } satisfies ConfigRules<"pulumi">,
};

plugin.configs = {
  ...plugin.configs,
  recommended,
};

export default plugin;
