import { createClient } from "@supabase/supabase-js";

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};

export default async function handler(request, response) {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
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
