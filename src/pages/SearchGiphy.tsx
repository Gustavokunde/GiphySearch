import { Button, Pagination, TextField } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import GiphiesList from "../components/GiphiesList";
import { useSearchGiphies } from "../hooks/useSearchGiphies";
import "./styles.css";

const SearchGiphy = () => {
  const [giphyToBeSearched, setGiphyToBeSearched] = useState("");

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setGiphyToBeSearched(value);
  };

  const { clearData, data, getData, pagination } =
    useSearchGiphies(giphyToBeSearched);

  const onChangePagination = (_: unknown, page: number) => {
    pagination.setter(page);
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
        <Button onClick={getData}>Search</Button>
        <Button onClick={clearData}>Clear results</Button>
      </section>
      <section className="cards-section">
        {pagination.values && data.length > 0 ? (
          <GiphiesList data={data} />
        ) : (
          pagination.values && (
            <p>
              No data was found with the text typed, please try another text
            </p>
          )
        )}
      </section>
      <section className="pagination">
        <Pagination
          count={pagination.values?.total}
          page={pagination.values?.currentPage || 1}
          onChange={onChangePagination}
        />
      </section>
    </div>
  );
};

export default SearchGiphy;
