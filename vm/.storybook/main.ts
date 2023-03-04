import { loadConfigFromFile, mergeConfig } from "vite";
import type { StorybookViteConfig } from "@storybook/builder-vite";
import * as path from "path";

const config: StorybookViteConfig = {
  stories: ["../src/interface/"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "storybook-addon-css-user-preferences"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, options) {
    // Add your configuration here
    const env = {
      command: options.configType === "PRODUCTION" ? "build" : "serve",
      mode: options.configType ?? "DEVELOPMENT",
    } as const;
    console.log("env", env);
    const file = await loadConfigFromFile(env, path.resolve(__dirname, "../vite.config.ts"));
    const userConfig = file!.config;
    userConfig.base = "/clean-architecture-vending-machine/storybook";
    delete userConfig.plugins;
    return mergeConfig(config, userConfig);
  },
};

export default config;
