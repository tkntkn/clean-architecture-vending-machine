import { loadConfigFromFile, mergeConfig } from "vite";
import type { StorybookViteConfig } from "@storybook/builder-vite";
import * as path from "path";

const config: StorybookViteConfig = {
  stories: ["../src/interface/"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
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
      command: "serve",
      mode: options.configType ?? "DEVELOPMENT",
    } as const;
    const file = await loadConfigFromFile(env, path.resolve(__dirname, "../vite.config.ts"));
    const userConfig = file!.config;
    delete userConfig.plugins;
    return mergeConfig(config, userConfig);
  },
};

export default config;
