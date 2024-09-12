import { api } from "./";
const limit = import.meta.env.VITE_PAGINATION_LIMIT;

export const searchGiphies = async (search: string, page: number) => {
  let offset;
  if (page > 1) offset = limit * page;

  const results = await api.get("/", {
    params: {
      q: search,
      limit,
      offset: offset,
    },
  });
  return results.data;
};
