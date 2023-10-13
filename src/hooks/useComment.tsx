import { useState, useMemo } from "react";
import { PostgrestError } from "@supabase/supabase-js";

import { Comment_V1_Service } from "@services/supabase/service";
import { IComment } from "@interfaces/comment";
import { IDiscussionParameters } from "@interfaces/supabase";

export function useComment(paramData: IDiscussionParameters) {
  const service = useMemo(
    () =>
      new Comment_V1_Service(paramData.supabase.url, paramData.supabase.secret),
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const saveComment = async (comment: IComment) => {
    setIsLoading(true);
    const response = await service.insert(comment);

    if (response.error) {
      setError(response.error);
    }

    setIsLoading(false);

    return response;
  };

  // const updateComment = async (comment: IComment) => {};

  // const deleteComment = async (comment: IComment) => {};

  return { isLoading, error, saveComment };
}
