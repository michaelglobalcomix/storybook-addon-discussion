import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { Database } from "@interfaces/supabase";

export class SupabaseInstance {
  private static dbInstance: SupabaseClient;

  private constructor() {}

  public static getDBInstance(url: string, secret: string): SupabaseClient {
    if (!SupabaseInstance.dbInstance) {
      SupabaseInstance.dbInstance = createClient<Database>(url, secret);
    }

    return SupabaseInstance.dbInstance;
  }
}
