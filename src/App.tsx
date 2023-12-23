import { useEffect, useState } from "react";
import { fetchFilms } from "./features/film/filmAPI";
import { Table, SearchInput, YearPicker, TypePicker } from "./components";
import { IQueryParams } from "./utilities";
import "./App.scss";
import { useAppSelector, useAppDispatch } from "./app/hooks";

import { selectFilters, getFilmsWithParams } from "./features/film/filmSlice";

function App() {
  const [data, setData] = useState<any[]>([]);

  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const [filterParams, setFilterParams] = useState<IQueryParams>({
    apikey: process.env.REACT_APP_API_KEY,
    t: "",
    s: "Pokemon",
    y: "",
    type: "",
    page: 1,
  });

  useEffect(() => {
    const filmData = localStorage.getItem("data");

    if (filmData) {
      setData(() => JSON.parse(filmData));
    } else {
      dispatch(getFilmsWithParams(filters));
      // fetchFilms(filterParams).then((res) => {
      //   setData(res.Search);
      //   console.log(res.Search);
      //   localStorage.setItem("data", JSON.stringify(res.Search));
      // });
    }
  }, []);

  return (
    <div className="App">
      <div className="filters">
        <SearchInput
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          setData={setData}
        />
        <YearPicker
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          setData={setData}
        />
        <TypePicker
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          setData={setData}
        />
      </div>
      <Table rows={data} />
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
