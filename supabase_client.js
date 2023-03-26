import { createClient } from "@supabase/supabase-js";

let client;

const createSupabaseClient = () => {
  if (client) {
    return client;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

export default createSupabaseClient;
