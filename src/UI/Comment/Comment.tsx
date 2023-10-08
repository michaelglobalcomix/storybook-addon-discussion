import React from "react";

import { IComment } from "@interfaces/comment";

import {
  CommentContainer,
  CommentText,
  CommentCreatedAt,
} from "./Comment.styles";

type TCommentProps = {
  comment: IComment;
};

export function Comment(props: TCommentProps) {
  const { comment } = props;
  const { author, comment: commentText, createdAt } = comment;

  return (
    <CommentContainer>
      <strong>{author}</strong>
      <CommentText>
        <em>{commentText}</em>
      </CommentText>
      <CommentCreatedAt>{createdAt}</CommentCreatedAt>
    </CommentContainer>
  );
}
