import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IQueryParams } from "../../utilities";
import { fetchFilms } from "../../features/film/filmAPI";

const SelectType = (props: ISearchInputProps) => {
  const { filterParams, setFilterParams, setData } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setFilterParams((prev: IQueryParams) => {
      return { ...prev, type: event.target.value };
    });
  };

  // useEffect(() => {
  //   fetchFilms(filterParams).then((res) => {
  //     setData(res.Search);
  //     localStorage.setItem("data", JSON.stringify(res.Search));
  //   });
  // }, [filterParams.type]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="type-select-helper-label">Type</InputLabel>
        <Select
          labelId="type-select-helper-label"
          id="type-select-helper"
          value={filterParams.type}
          label="Film, Series, Episode"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="movie">Movie</MenuItem>
          <MenuItem value="series">Tv Series</MenuItem>
          <MenuItem value="episode">Episode</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
    </div>
  );
};

export default SelectType;

interface ISearchInputProps {
  setFilterParams: React.Dispatch<React.SetStateAction<IQueryParams>>;
  filterParams: IQueryParams;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}
