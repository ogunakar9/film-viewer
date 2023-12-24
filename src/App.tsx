import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectFilters, getFilmsWithParams } from "./features/film/filmSlice";

import Films from "./features/film/Films";

import "./App.scss";

function App() {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("filters", filters);
    // dispatch(getFilmsWithParams(filters));
  }, []);

  return (
    <div className="App">
      <Films />
      {/* {data && data.length ? <Table rows={data} /> : <SkeletonComponent />} */}
    </div>
  );
}

export default App;
