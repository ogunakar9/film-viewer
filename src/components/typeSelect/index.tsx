import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectFilters,
  updateTypeSelector,
} from "../../features/film/filmSlice";

const SelectType = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(updateTypeSelector(e.target.value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="type-select-helper-label">Type</InputLabel>
        <Select
          labelId="type-select-helper-label"
          id="type-select-helper"
          value={filters.type}
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
