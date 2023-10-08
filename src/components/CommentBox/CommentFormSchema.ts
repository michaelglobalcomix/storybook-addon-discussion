import { object, string } from "yup";

import { IComment } from "@interfaces/comment";

const commentSchema = object().shape({
  author: string().required("Required"),
  comment: string().required("Required"),
  storyId: string().required(),
  createdAt: string().required(),
});

export function validateComment(comment: IComment) {
  return commentSchema.validate(comment);
}
