import Button from "@mui/material/Button";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Table, SearchInput, YearPicker, TypePicker } from "../../components";
import { selectFilters, getFilmsWithParams } from "./filmSlice";
import "./styles.scss";

const Films = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleSearchClick = () => {
    dispatch(getFilmsWithParams(filters));
  };

  return (
    <div>
      <div className="filters">
        <SearchInput />
        <YearPicker />
        <TypePicker />
        <Button onClick={handleSearchClick}>Apply Filters</Button>
      </div>
      <Table />
    </div>
  );
};

export default Films;
