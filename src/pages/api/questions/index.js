import createSupabaseClient from "../../../../supabase_client";

export default async function handler(request, response) {
  const client = createSupabaseClient();
  const {
    query: { page, limit },
  } = request;
  const from = (+page - 1) * +limit;
  const to = from + +limit - 1;

  console.log({ from, to });

  const { data, count } = await client
    .from("questions")
    .select("*", { count: "exact" })
    .order("title", "asc")
    .range(from, to);

  response.status(200).json({ count, data });
}
