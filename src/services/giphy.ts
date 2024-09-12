import { api } from "./";
const limit = import.meta.env.VITE_PAGINATION_LIMIT;

export const searchGiphies = async (search: string, page: number) => {
  const results = await api.get("/", {
    params: { q: search, limit, offset: page * limit },
  });
  return results.data;
};
