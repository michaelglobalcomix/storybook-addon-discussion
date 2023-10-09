import React, { useMemo, useState, useRef, useEffect } from "react";
import { ValidationError } from "yup";

import { FieldGroup } from "@UI/FieldGroup";
import { Textbox } from "@UI/Textbox";
import { Textarea } from "@UI/Textarea";

import { IComment } from "@interfaces/comment";

import { useComment } from "@hooks/useComment";

import { transformComment } from "@transformers/comment";

import { validateComment } from "./CommentFormSchema";

import {
  CommentBoxFormContainer,
  CommentButtonsSectionContainer,
} from "./CommentBox.styles";

type TCommentBoxProps = {
  storyId: string;
  setComment: (comment: IComment) => void;
};

export function CommentBox(props: TCommentBoxProps) {
  const { storyId, setComment } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoading, error, saveComment } = useComment();

  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    if (error) {
      alert(error?.message);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const author = (elements.namedItem("author") as HTMLInputElement).value;
    const comment = (elements.namedItem("comment") as HTMLInputElement).value;

    const commentData: IComment = {
      author: author.trim(),
      comment: comment.trim(),
      storyId,
      createdAt: new Date().toISOString(),
    };

    try {
      await validateComment(commentData);

      // SAVE NEW COMMENT INTO DB
      const response = await saveComment(commentData);
      // success message

      if (response.data) {
        // SAVE NEW COMMENT INTO LOCAL STATE
        setComment(transformComment(response.data));

        // CLEAR FORM
        formRef.current.reset();
        formRef.current.scrollIntoView({ behavior: "instant" });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const { path, message } = error;
        setFormErrors({ [path as string]: message });
      }
    }
  };

  return (
    <CommentBoxFormContainer onSubmit={handleSubmit} ref={formRef}>
      <h3>Write your feedback / comment / question</h3>
      <hr />
      <FieldGroup name="author" label="Author" error={formErrors.author}>
        <Textbox type="text" required aria-label="Author Name" />
      </FieldGroup>
      <FieldGroup name="comment" label="Comment" error={formErrors.comment}>
        <Textarea rows={4} required aria-label="Comment"></Textarea>
      </FieldGroup>
      <CommentButtonsSectionContainer>
        <input type="reset" value="Reset" disabled={isLoading} />
        <input type="submit" value="Submit" disabled={isLoading} />
      </CommentButtonsSectionContainer>
    </CommentBoxFormContainer>
  );
}
