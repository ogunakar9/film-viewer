import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles.scss";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("Pokemon");

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
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
        value={searchTerm}
        onChange={handleTextChange}
      />
      <Button>Search By Title</Button>
    </Box>
  );
};

export default SearchInput;
