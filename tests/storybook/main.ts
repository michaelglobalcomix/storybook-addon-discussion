import { fileURLToPath } from "node:url";
import config from "../../.storybook/main";

export default {
  ...config,
  stories: [
    fileURLToPath(new URL("../../src/stories/**/*.mdx", import.meta.url)),
    fileURLToPath(
      new URL("../../src/stories/**/*.stories.ts", import.meta.url)
    ),
  ],
};
