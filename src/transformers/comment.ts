import { IComment } from "@interfaces/comment";
import { Tables } from "@interfaces/supabase";

import { formatRawDateToFriendlyDate } from "@utils/date";

export function transformComment(comment: Tables<"comments_v1">): IComment {
  return {
    id: comment.id,
    author: comment.author,
    storyId: comment.storyid,
    comment: comment.comment,
    createdAt: formatRawDateToFriendlyDate(comment.createdat),
  };
}
