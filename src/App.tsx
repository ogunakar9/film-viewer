import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Table,
  SearchInput,
  YearPicker,
  SkeletonComponent,
  TypePicker,
} from "./components";
import "./App.scss";
import { BASE_URL } from "./utilities/constants";

function App() {
  const [data, setData] = useState<any[]>([]);

  const fetchFilms = async () => {
    const params = {
      // t: "Pokemon",
      s: "Spider",
      apikey: process.env.REACT_APP_API_KEY,
    };
    try {
      const response = await axios.get(BASE_URL, { params });
      const responseData = response.data;
      if (responseData?.Search) {
        setData(responseData.Search);
        localStorage.setItem("data", JSON.stringify(responseData.Search));
      } else {
        setData([responseData]);
        localStorage.setItem("data", JSON.stringify([responseData.Search]));
      }

      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const filmData = localStorage.getItem("data");

    if (filmData) {
      setData(() => JSON.parse(filmData));
    } else {
      fetchFilms();
    }
  }, []);

  return (
    <div className="App">
      <div className="filters">
        <SearchInput />
        <YearPicker />
        <TypePicker />
      </div>
      <Table rows={data} />
      {/* {data && data.length ? <Table rows={data} /> : <SkeletonComponent />} */}
    </div>
  );
}

export default App;
