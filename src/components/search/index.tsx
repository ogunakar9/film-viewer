import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IQueryParams } from "../../utilities";
import "./styles.scss";
import { fetchFilms } from "../../features/film/filmAPI";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectFilters,
  getFilmsWithParams,
  updateSearchInput,
} from "../../features/film/filmSlice";

const SearchInput = () => {
  const filters = useAppSelector(selectFilters);
  console.log(filters);
  const dispatch = useAppDispatch();

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(updateSearchInput(e.target.value));
  };

  const handleSearchClick = () => {
    dispatch(getFilmsWithParams(filters));
  };

  //TODO: add enter keypress handler

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        placeholder="Search Films"
        variant="outlined"
        value={filters.s}
        onChange={handleTextChange}
      />
      <Button onClick={handleSearchClick}>Search By Title</Button>
    </Box>
  );
};

export default SearchInput;