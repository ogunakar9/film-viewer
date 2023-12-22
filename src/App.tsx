import React, { useEffect, useState, useCallback } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Table from "./Table";
import "./App.scss";
import { BASE_URL } from "./utilities/constants";

function App() {
  const [data, setData] = useState<any[]>([]);

  const fetchFilms = useCallback(async () => {
    try {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const FETCH_URL = `${BASE_URL}${API_KEY}&tt1285016`;

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&t=Pokemon`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchFilms();
  }, []);

  console.log("data", data);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
      <Table />
    </div>
  );
}

export default App;
