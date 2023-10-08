import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";

import { IService } from "@interfaces/base/IService";
import { IComment } from "@interfaces/comment";
import { Tables } from "@interfaces/supabase";

import { Comment_V1_Data } from "./data";

export class Comment_V1_Service
  implements
    IService<
      Tables<"comments_v1">,
      Promise<PostgrestSingleResponse<Tables<"comments_v1">>>,
      Promise<PostgrestResponse<Tables<"comments_v1">>>
    >
{
  private data: Comment_V1_Data;

  constructor() {
    this.data = new Comment_V1_Data();
  }

  async insert(data: IComment) {
    return await this.data.insert({
      author: data.author,
      comment: data.comment,
      createdat: data.createdAt,
      storyid: data.storyId,
    });
  }

  async update(comment: Tables<"comments_v1">) {
    return await this.data.update(comment);
  }

  async delete(id: number) {
    return await this.data.delete(id);
  }

  async getBy(columnName: keyof Tables<"comments_v1">, value: string) {
    return await this.data.getBy(columnName, value);
  }

  async getAll() {
    return await this.data.getAll();
  }
}
