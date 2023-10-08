import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { IInstance } from "@interfaces/base/IInstance";
import { Database } from "@interfaces/supabase";

export class SupabaseInstance implements IInstance<SupabaseClient<Database>> {
  private supabaseUrl = "";
  private supabaseKey = "";
  public getDBInstance() {
    return createClient<Database>(this.supabaseUrl, this.supabaseKey);
  }
}
