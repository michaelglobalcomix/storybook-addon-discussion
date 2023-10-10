import React from "react";
import { PostgrestError } from "@supabase/supabase-js";

import { CommentsWrapper } from "@UI/CommentsWrapper";
import { Spinner } from "@UI/Spinner";

import { IComment } from "@interfaces/comment";

import { ImageContainer, SpinnerContainer } from "./CommentsList.styles";

type TCommentBoxProps = {
  isLoading: boolean;
  error: PostgrestError | null;
  comments: Array<IComment>;
};

export function CommentsList(props: TCommentBoxProps) {
  const { isLoading, error, comments } = props;

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (!isLoading && error) {
    return (
      <ImageContainer>
        <img src="./assets/communication-error.png" alt="Comments Error" />
        <h3>Something went wrong, while loading comments!</h3>
      </ImageContainer>
    );
  }

  if (!isLoading && comments.length === 0) {
    return (
      <ImageContainer>
        <img src="./assets/chat.png" alt="No Comments yet" />
        <h3>No one has written his comment yet! Be the first one!</h3>
      </ImageContainer>
    );
  }

  return <CommentsWrapper comments={comments} />;
}
