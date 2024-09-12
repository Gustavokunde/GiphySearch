import { Button, Pagination, TextField } from "@mui/material";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Giphy } from "../interfaces/Giphy";
import { searchGiphies } from "../services/giphy";
import "./styles.css";

interface Giphies {
  data: Giphy[];
  pagination: {
    currentPage: number;
    total: number;
  };
}

const SearchGiphy = () => {
  const [giphyToBeSearched, setGiphyToBeSearched] = useState("");

  const [giphies, setGiphies] = useState<Giphies>({
    data: [],
    pagination: { currentPage: 1, total: 0 },
  });

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setGiphyToBeSearched(value);
  };

  const getGiphies = async () => {
    const result = await searchGiphies(
      giphyToBeSearched,
      giphies.pagination.currentPage
    );

    setGiphies((prev) => ({
      ...prev,
      data: result.data,
      pagination: {
        ...prev.pagination,
        total: result.pagination.total_count,
      },
    }));
  };

  const onSearchClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    getGiphies();
  };

  const onClearResult = () => {
    setGiphies({ data: [], pagination: { currentPage: 1, total: 0 } });
  };

  useEffect(() => {
    if (giphyToBeSearched) getGiphies();
  }, [giphies.pagination.currentPage]);

  const onChangePagination = (_: unknown, value: number) => {
    setGiphies((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, currentPage: value },
    }));
  };

  return (
    <div>
      <h1>Please type a Giphy below:</h1>
      <section className="search-section">
        <TextField
          value={giphyToBeSearched}
          placeholder="Search for a Giphy"
          onChange={onSearchChange}
        />
        <Button onClick={onSearchClick}>Search</Button>
        <Button onClick={onClearResult}>Clear results</Button>
      </section>
      <section className="cards-section">
        {giphies.data.map((giphy) => (
          <div className="card" key={giphy.id}>
            <img
              className="card-image"
              src={giphy.images.downsized.url}
              alt={giphy.title}
            />
          </div>
        ))}
      </section>
      <section className="pagination">
        <Pagination
          count={giphies.pagination.total}
          page={giphies.pagination.currentPage}
          onChange={onChangePagination}
        />
      </section>
    </div>
  );
};

export default SearchGiphy;
