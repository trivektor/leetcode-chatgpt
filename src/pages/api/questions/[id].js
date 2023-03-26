import createSupabaseClient from "../../../../supabase_client";

export default async function handler(request, response) {
  const client = createSupabaseClient();
  const {
    query: { id },
  } = request;

  const { data } = await client
    .from("questions")
    .select("*")
    .eq("id", id)
    .limit(1);

  response.status(200).json(data[0]);
}
