import { useEffect, useState, useMemo } from "react";
import { PostgrestError } from "@supabase/supabase-js";

import { Comment_V1_Service } from "@services/supabase/service";
import { IComment } from "@interfaces/comment";

import { Tables } from "@interfaces/supabase";

const formatDateToFriendlyDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

export function useComments(storyId: string) {
  const service = useMemo(() => new Comment_V1_Service(), []);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [comments, setComments] = useState<Array<IComment>>([]);

  // hide this and the interfaces in useHook
  useEffect(() => {
    fetchComments();
  }, []);

  const transformComments = (
    comments: Array<Tables<"comments_v1">>
  ): Array<IComment> => {
    if (comments) {
      return comments.map((comment) => {
        const friendlyCreatedAt = formatDateToFriendlyDate(comment.createdat);

        return {
          id: comment.id,
          storyId: comment.storyid,
          author: comment.author,
          comment: comment.comment,
          createdAt: friendlyCreatedAt,
        };
      });
    }

    return [];
  };

  const fetchComments = async () => {
    const response = await service.getBy("storyid", storyId);

    if (response.error) {
      setError(response.error);
    } else {
      setComments(transformComments(response.data));
    }

    setIsLoading(false);
  };

  const setComment = async (comment: IComment) => {
    setComments((comments) => [
      ...comments,
      {
        ...comment,
        createdAt: formatDateToFriendlyDate(comment.createdAt),
      },
    ]);
  };

  return { isLoading, error, comments, setComment };
}
