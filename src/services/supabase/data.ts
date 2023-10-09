import {
  SupabaseClient,
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";

import { IData } from "@interfaces/base/IData";
import { Database, Tables, TablesInsert, DbResult } from "@interfaces/supabase";

import { SupabaseInstance } from "./instance";

export class Comment_V1_Data
  implements
    IData<
      Tables<"comments_v1">,
      TablesInsert<"comments_v1">,
      Promise<PostgrestSingleResponse<Tables<"comments_v1">>>,
      Promise<PostgrestResponse<Tables<"comments_v1">>>
    >
{
  private db: SupabaseClient<Database>;

  constructor(url: string, secret: string) {
    this.db = SupabaseInstance.getDBInstance(url, secret);
  }

  async insert(comment: TablesInsert<"comments_v1">) {
    const query = this.db
      .from("comments_v1")
      .insert(comment)
      .select("*")
      .limit(1)
      .single();

    const insertedComment: DbResult<typeof query> = await query;

    return insertedComment;
  }

  async update(comment: Tables<"comments_v1">) {
    const query = this.db
      .from("comments_v1")
      .update(comment)
      .eq("id", comment.id)
      .select("*")
      .limit(1)
      .single();

    const updatedComment: DbResult<typeof query> = await query;

    return updatedComment;
  }

  async delete(id: number) {
    const query = this.db.from("comments_v1").delete().eq("id", id);

    const updatedComment: DbResult<typeof query> = await query;

    return updatedComment;
  }

  async getBy(columnName: string, value: string) {
    const query = this.db.from("comments_v1").select("*").eq(columnName, value);

    const comment: DbResult<typeof query> = await query;

    return comment;
  }

  async getAll() {
    const query = this.db.from("comments_v1").select("*");

    const comment: DbResult<typeof query> = await query;

    return comment;
  }
}
