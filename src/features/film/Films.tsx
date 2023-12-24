import Button from "@mui/material/Button";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Table, SearchInput, YearPicker, TypePicker } from "../../components";
import { selectFilters, getFilmsWithParams, updatePage } from "./filmSlice";

const Films = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleFormSubmit = () => {
    dispatch(updatePage(1));
    dispatch(getFilmsWithParams({ ...filters, page: 1 }));
  };

  return (
    <div className="App">
      <div className="filters">
        <SearchInput />
        <YearPicker />
        <TypePicker />
        <Button onClick={handleFormSubmit}>Apply Filters</Button>
      </div>
      <Table />
    </div>
  );
};

export default Films;
