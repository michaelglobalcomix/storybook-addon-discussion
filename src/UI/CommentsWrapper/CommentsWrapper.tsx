import React from "react";

import { Comment } from "@UI/Comment";

import { IComment } from "@interfaces/comment";

import {
  CommentsWrapperContainer,
  CommentWrapper,
} from "./CommentsWrapper.styles";

type TCommentsWrapperProps = {
  comments: Array<IComment>;
};

export function CommentsWrapper(props: TCommentsWrapperProps) {
  const { comments } = props;

  return (
    <CommentsWrapperContainer>
      {comments.map((comment) => (
        <CommentWrapper key={comment.id}>
          <Comment comment={comment} />
        </CommentWrapper>
      ))}
    </CommentsWrapperContainer>
  );
}
