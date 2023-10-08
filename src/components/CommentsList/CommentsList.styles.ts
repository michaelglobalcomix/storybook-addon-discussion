import { styled } from "@storybook/theming";

const SpinnerContainer = styled.div({ textAlign: "center" });

const ImageContainer = styled.section(({ theme }) => ({
  textAlign: "center",
  color: theme.color.negative,
}));

export { SpinnerContainer, ImageContainer };
