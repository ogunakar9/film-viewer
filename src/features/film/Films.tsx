import Button from "@mui/material/Button";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Table, SearchInput, YearPicker, TypePicker } from "../../components";
import { selectFilters, getFilmsWithParams } from "./filmSlice";
import "./styles.scss";

const Films = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleFormSubmit = () => {
    dispatch(getFilmsWithParams(filters));
  };

  return (
    <div>
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
