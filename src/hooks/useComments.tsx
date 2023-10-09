import { useEffect, useState, useMemo } from "react";
import { PostgrestError } from "@supabase/supabase-js";

import { useParameter } from "@storybook/manager-api";

import { Comment_V1_Service } from "@services/supabase/service";

import { IComment } from "@interfaces/comment";
import { IDiscussionParameters, Tables } from "@interfaces/supabase";

import { transformComment } from "@transformers/comment";

import { PARAM_KEY } from "@/constants";

export function useComments(storyId: string) {
  const paramData = useParameter<IDiscussionParameters>(PARAM_KEY, {
    supabase: {
      url: "http://", // DEFAULTS
      secret: "SECRET_KEY", // DEFAULTS
    },
  });

  const service = useMemo(
    () =>
      new Comment_V1_Service(paramData.supabase.url, paramData.supabase.secret),
    []
  );

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
      return comments.map((comment) => transformComment(comment));
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
    setComments((comments) => [...comments, comment]);
  };

  return { isLoading, error, comments, setComment };
}
