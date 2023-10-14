import React from "react";
import { useParameter, useStorybookState } from "@storybook/manager-api";

import { TabContent } from "@components/TabContent";
import { IDiscussionParameters } from "@interfaces/supabase";

import { PARAM_KEY } from "./constants";

interface TabProps {
  active: boolean;
}

export const Tab: React.FC<TabProps> = ({ active }) => {
  const state = useStorybookState();
  const paramData = useParameter<IDiscussionParameters | null>(PARAM_KEY, null);

  const { storyId } = state;

  return active && paramData ? <TabContent storyId={storyId} paramData={paramData} /> : null;
};
