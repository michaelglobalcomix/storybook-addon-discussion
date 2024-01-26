import React, { useEffect, useRef } from "react";

import { CommentsList } from "@components/CommentsList";
import { CommentBox } from "@components/CommentBox";

import { IComment } from "@interfaces/comment";
import { IDiscussionParameters } from "@interfaces/supabase";
import { useComments } from "@hooks/useComments";

import { TabWrapper, TabInner } from "./TabContent.styles";

interface TabContentProps {
  storyId: string;
  paramData: IDiscussionParameters;
}

export const TabContent: React.FC<TabContentProps> = ({
  storyId,
  paramData,
}) => {
  const { isLoading, error, comments, setComment } = useComments(
    storyId,
    paramData
  );

  // https://github.com/storybookjs/storybook/issues/25322
  // There is an issue in latest storybook which will render a tab, but not make
  // it visible this hack will make it visible by walking up the DOM tree until
  // it finds a specific div and set it to be visible

  const isHiddenContainerDiv = (node: HTMLElement) => {
    if (node.tagName === "DIV" && node.hasAttribute("hidden")) {
      return true;
    }
    return false;
  };

  const shouldStop = (node: HTMLElement) => {
    return node.hasAttribute("role") && node.getAttribute("role") === "main";
  };

  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      let node: HTMLDivElement | HTMLElement = container.current;
      while (!shouldStop(node)) {
        if (isHiddenContainerDiv(node)) {
          node.removeAttribute("hidden");
          break;
        }

        node = node.parentElement;
      }
    }, 10);
  }, []);

  return (
    <TabWrapper ref={container}>
      <TabInner>
        <CommentsList isLoading={isLoading} error={error} comments={comments} />
        <br />
        <hr />
        <CommentBox
          storyId={storyId}
          setComment={(comment: IComment) => setComment(comment)}
          paramData={paramData}
        />
      </TabInner>
    </TabWrapper>
  );
};
