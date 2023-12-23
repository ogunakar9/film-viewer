import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IQueryParams } from "../../utilities";
import "./styles.scss";
import { fetchFilms } from "../../features/film/filmAPI";

const SearchInput = (props: ISearchInputProps) => {
  const { filterParams, setFilterParams, setData } = props;

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterParams((prev: IQueryParams) => {
      return { ...prev, s: e.target.value };
    });
  };

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
        value={filterParams.s}
        onChange={handleTextChange}
      />
      <Button
        onClick={() => {
          fetchFilms(filterParams).then((res) => {
            setData(res.Search);
            console.log(res.Search);
            localStorage.setItem("data", JSON.stringify(res.Search));
          });
        }}
      >
        Search By Title
      </Button>
    </Box>
  );
};

export default SearchInput;

interface ISearchInputProps {
  setFilterParams: React.Dispatch<React.SetStateAction<IQueryParams>>;
  filterParams: IQueryParams;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}
