import { styled } from "@storybook/theming";

const FieldGroupContainer = styled.p(({ theme }) => ({
  margin: 0,
  label: {
    display: "block",
    margin: "0.25rem",
  },
  span: {
    display: "block",
    color: theme.color.warningText,
  },
}));

export { FieldGroupContainer };
