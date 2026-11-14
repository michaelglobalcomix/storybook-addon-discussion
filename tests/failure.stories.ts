import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/stories/Button";

const meta: Meta<typeof Button> = {
  title: "Fixture/Discussion",
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;

export const LoadError: Story = { args: { label: "Error fixture" } };
export const MissingConfiguration: Story = {
  args: { label: "No configuration fixture" },
  parameters: { discussion: null },
};
