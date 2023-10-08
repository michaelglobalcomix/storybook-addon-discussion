import { useState, useMemo } from "react";
import { PostgrestError } from "@supabase/supabase-js";

import { Comment_V1_Service } from "@services/supabase/service";
import { IComment } from "@interfaces/comment";

export function useComment(storyId: string) {
  const service = useMemo(() => new Comment_V1_Service(), []);

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
