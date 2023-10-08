import React from "react";

import { CommentsList } from "@components/CommentsList";
import { CommentBox } from "@components/CommentBox";

import { IComment } from "@interfaces/comment";
import { useComments } from "@hooks/useComments";

import { TabWrapper, TabInner } from "./TabContent.styles";

interface TabContentProps {
  storyId: string;
}

export const TabContent: React.FC<TabContentProps> = ({ storyId }) => {
  const { isLoading, error, comments, setComment } = useComments(storyId);

  return (
    <TabWrapper>
      <TabInner>
        <CommentsList isLoading={isLoading} error={error} comments={comments} />
        <br />
        <hr />
        <CommentBox
          storyId={storyId}
          setComment={(comment: IComment) => setComment(comment)}
        />
      </TabInner>
    </TabWrapper>
  );
};
