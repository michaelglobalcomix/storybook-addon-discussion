import React from "react";
import { useStorybookState } from "@storybook/manager-api";

import { TabContent } from "@components/TabContent";

interface TabProps {
  active: boolean;
}

export const Tab: React.FC<TabProps> = ({ active }) => {
  const state = useStorybookState();

  const { storyId } = state;

  return active ? <TabContent storyId={storyId} /> : null;
};
