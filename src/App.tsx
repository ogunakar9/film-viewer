import { useEffect, useState, useCallback } from "react";
import { Counter } from "./features/counter/Counter";
import {
  Table,
  SearchInput,
  YearPicker,
  SkeletonComponent,
} from "./components";
import "./App.scss";
import { BASE_URL } from "./utilities/constants";

function App() {
  const [data, setData] = useState<any[]>([]);

  const fetchFilms = useCallback(async () => {
    try {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const FETCH_URL = `${BASE_URL}${API_KEY}&tt1285016`;

      // const response = await fetch(
      //   `http://www.omdbapi.com/?apikey=${API_KEY}&t=Pokemon`
      // );
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=spider`
      );
      const data = await response.json();
      setData(data.Search);
      localStorage.setItem("data", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const filmData = localStorage.getItem("data");

    if (filmData) {
      console.log(filmData);
      setData(() => JSON.parse(filmData)["Search"]);
    } else {
      fetchFilms();
    }
  }, []);

  return (
    <div className="App">
      <div className="filters">
        <SearchInput />
        <YearPicker />
      </div>
      <Table rows={data} />
      {/* {data && data.length ? <Table rows={data} /> : <SkeletonComponent />} */}
    </div>
  );
}

export default App;
