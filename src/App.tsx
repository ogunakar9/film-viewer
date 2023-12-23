import { useEffect, useState } from "react";

import { Table, SearchInput, YearPicker, TypePicker } from "./components";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectFilters, getFilmsWithParams } from "./features/film/filmSlice";
import Button from "@mui/material/Button";

import "./App.scss";

function App() {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filmData = localStorage.getItem("data");

    if (filmData) {
      // setData(() => JSON.parse(filmData));
    } else {
      // dispatch(getFilmsWithParams(filters));
      //
      // fetchFilms(filterParams).then((res) => {
      //   setData(res.Search);
      //   console.log(res.Search);
      //   localStorage.setItem("data", JSON.stringify(res.Search));
      // });
    }
  }, []);

  const handleSearchClick = () => {
    dispatch(getFilmsWithParams(filters));
  };

  return (
    <div className="App">
      <div className="filters">
        <SearchInput />
        <YearPicker />
        {/* <TypePicker /> */}
        <Button onClick={handleSearchClick}>Apply Filters</Button>
      </div>
      <Table />
      {/* {data && data.length ? <Table rows={data} /> : <SkeletonComponent />} */}
    </div>
  );
}

export default App;

// if (responseData?.Search) {
//   setData(responseData.Search);
//   localStorage.setItem("data", JSON.stringify(responseData.Search));
// } else {
//   setData([responseData]);
//   localStorage.setItem("data", JSON.stringify([responseData.Search]));
// }
