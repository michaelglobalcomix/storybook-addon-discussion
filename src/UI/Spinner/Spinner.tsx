import React from "react";
import { styled, keyframes } from "@storybook/theming";

const ldsDualRingAnimation = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const SpinnerDiv = styled.div(({ theme }) => ({
  display: "inline-block",
  width: "80px",
  height: "80px",
  ":after": {
    content: `" "`,
    display: "block",
    width: "64px",
    height: "64px",
    margin: "8px",
    borderRadius: "50%",
    border: `6px solid ${theme.color.primary}`,
    borderColor: `${theme.color.primary} transparent ${theme.color.primary} transparent`,
    animation: `${ldsDualRingAnimation} 1.2s linear infinite`,
  },
}));

export function Spinner() {
  return <SpinnerDiv />;
}
