import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } },
      },
    },
    import.meta.resolve("./local-preset.js"),
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
