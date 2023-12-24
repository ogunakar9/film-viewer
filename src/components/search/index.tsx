import { KeyboardEvent, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectFilters,
  updateSearchInput,
  getFilmsWithParams,
} from "../../features/film/filmSlice";

const SearchInput = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(updateSearchInput(e.target.value));
  };

  const handleEnterKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(getFilmsWithParams(filters));
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch", ml: 0 },
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
        onKeyDown={handleEnterKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchInput;
