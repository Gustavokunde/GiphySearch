import { useEffect, useState } from "react";
import { Giphy } from "../interfaces/Giphy";
import { searchGiphies } from "../services/giphy";

interface Pagination {
  total?: number;
  currentPage?: number;
}

export const useSearchGiphies = (searchValue: string) => {
  const [data, setData] = useState<Giphy[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    if (pagination?.currentPage) getData();
  }, [pagination?.currentPage]);

  const getData = async () => {
    const result = await searchGiphies(searchValue, pagination?.currentPage);

    setData(result.data);
    if (!result.data.length) setPagination(null);
    else
      setPagination((prev) => ({
        ...prev,
        currentPage: pagination?.currentPage || 1,
        total: result.pagination.total_count,
      }));
  };

  const clearData = () => {
    setData([]);
    setPagination(null);
  };

  const onChangePagination = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return {
    getData,
    data,
    clearData,
    pagination: {
      values: pagination,
      setter: onChangePagination,
    },
    onChangePagination,
  };
};
