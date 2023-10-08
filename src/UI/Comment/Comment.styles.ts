import { styled } from "@storybook/theming";

const CommentContainer = styled.span(({ theme }) => ({
  display: "grid",
  flexDirection: "column",
  margin: 0,
  padding: "0.5rem",
  borderRadius: theme.appBorderRadius,
  backgroundColor: theme.background.app,
  color: theme.color.primary,
}));

const CommentText = styled.span({
  paddingInlineStart: "1rem",
  margin: "1rem 0",
  display: "block",
});

const CommentCreatedAt = styled.small({
  textAlign: "end",
});

export { CommentContainer, CommentText, CommentCreatedAt };
