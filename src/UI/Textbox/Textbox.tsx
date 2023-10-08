import { styled } from "@storybook/theming";

const Textbox = styled.input(({ theme }) => ({
  border: theme.input.border,
  borderRadius: theme.input.borderRadius,
  background: theme.input.background,
  color: theme.input.color,
  height: "32px",
  width: "100%",
  padding: "5px",
}));

export { Textbox };
