import type { Preview } from "@storybook/react";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
