import createSupabaseClient from "../../../../supabase_client";

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};

export default async function handler(request, response) {
  const client = createSupabaseClient();
  const {
    query: { page, limit },
  } = request;
  const { from, to } = getPagination(+page, +limit);

  const { data, count } = await client
    .from("questions")
    .select("*", { count: "exact" })
    .order("title", "asc")
    .range(from, to);

  response.status(200).json({ count, data });
}
