import { styled } from "@storybook/theming";

const Textarea = styled.textarea(({ theme }) => ({
  border: theme.input.border,
  borderRadius: theme.input.borderRadius,
  background: theme.input.background,
  color: theme.input.color,
  borderColor: "#3F4242",
  width: "100%",
  padding: "5px",
}));

export { Textarea };
