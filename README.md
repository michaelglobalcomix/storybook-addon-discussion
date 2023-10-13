# Storybook Addon Storybook Discussion
Leave comments for components and MDX documents based on [addon-kit](https://github.com/storybookjs/addon-kit), comments are saved on [supabase](https://supabase.com/) database.

### Usage

#### Installation

```
npm install -D storybook-addon-discussion
```

#### Configuration

```ts
// .storybook/main.ts

const config: StorybookConfig = {
  ...
  addons: [
    ...
    "storybook-addon-discussion"
  ],
  ...
};
export default config;
```

```ts
// .storybook/preview.ts

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    ...
    discussion: {
      supabase: {
        url: "SUPABASE_PROJECT_URL", // example: https://YOUR_PROJECT_UNIQUE_ID.supabase.co
        secret: "PROJECT_API_PUBLIC_KEY",
      },
    },
  },
};

export default preview;
```

