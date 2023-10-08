import { styled } from "@storybook/theming";

const CommentBoxFormContainer = styled.form(({ theme }) => ({
  padding: "0.5rem",
  borderRadius: theme.appBorderRadius,
  backgroundColor: theme.background.app,
  color: theme.color.primary,

  h3: {
    margin: 0,
    marginBottom: "0.5rem",
  },

  ">p": {
    marginBottom: "0.5rem",
  },
}));

const CommentButtonsSectionContainer = styled.section(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
  alignItems: "center",

  "input[type=submit]": {
    cursor: "pointer",
    outline: 0,
    padding: "5px 16px",
    border: theme.input.border,
    borderRadius: theme.input.borderRadius,
    color: "#ffffff",
    backgroundColor: "#2ea44f",
    ":hover": {
      backgroundColor: "#2c974b",
      transitionDuration: "0.1s",
    },
  },

  "input[type=reset]": {
    cursor: "pointer",
    outline: 0,
    padding: "5px 16px",
    border: theme.input.border,
    borderRadius: theme.input.borderRadius,
    color: "#24292e",
    backgroundColor: "#fafbfc",
    ":hover": {
      backgroundColor: "#f3f4f6",
      transitionDuration: "0.1s",
    },
  },
}));

export { CommentBoxFormContainer, CommentButtonsSectionContainer };
