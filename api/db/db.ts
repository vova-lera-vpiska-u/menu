import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.ts";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing Supabase URL");
}

if (!serviceRoleKey) {
  throw new Error("Missing Supabase Service Role Key");
}

export const db = createClient<Database>(supabaseUrl, serviceRoleKey);
