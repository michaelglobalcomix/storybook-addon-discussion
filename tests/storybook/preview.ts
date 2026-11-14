import preview from "../../.storybook/preview";

export default {
  ...preview,
  parameters: {
    ...preview.parameters,
    discussion: {
      supabase: { url: "http://127.0.0.1:4179", secret: "fixture-public-key" },
    },
  },
};
