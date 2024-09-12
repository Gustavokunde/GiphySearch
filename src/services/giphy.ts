import { api } from "./";
const limit = import.meta.env.VITE_PAGINATION_LIMIT;

export const searchGiphies = async (search: string, page?: number) => {
  let offset = 0;

  if (page && page > 1) offset = (page - 1) * limit + 1;

  const results = await api.get("/", {
    params: {
      q: search,
      limit,
      offset: offset,
    },
  });
  return results.data;
};
