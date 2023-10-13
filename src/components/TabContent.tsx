import React from "react";

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

  return (
    <TabWrapper>
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
