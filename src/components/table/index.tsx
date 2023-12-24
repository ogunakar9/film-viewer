import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

import { ROWS_PER_PAGE } from "../../utilities";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectFilters,
  selectFilmsLength,
  selectFilmsList,
  updatePage,
  getFilmsWithParams,
  getFilmDetail,
  selectSelectedFilm,
} from "../../features/film/filmSlice";
import "./styles.scss";

const TableComponent = () => {
  const navigate = useNavigate();

  const [nextDisabled, setNextDisabled] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const filters = useAppSelector(selectFilters);
  const filmList = useAppSelector(selectFilmsList);
  const totalFilmsLength = useAppSelector(selectFilmsLength);
  const selectedFilm = useAppSelector(selectSelectedFilm);
  const { page } = filters;
  const dispatch = useAppDispatch();

  console.log("selectedFilm", selectedFilm);

  //TODO: refactor getfilmswithparams to be called from redux for page update
  const handlePageIncrease = () => {
    setNextDisabled(true);
    dispatch(updatePage(filters.page + 1));
    dispatch(getFilmsWithParams({ ...filters, page: filters.page + 1 }));
    setNextDisabled(false);
  };

  const handlePageDecrease = () => {
    setPrevDisabled(true);
    dispatch(updatePage(page - 1));
    dispatch(getFilmsWithParams({ ...filters, page: filters.page - 1 }));
    setPrevDisabled(false);
  };

  useEffect(() => {
    const totalFilmsLengthInt = parseInt(totalFilmsLength);
    if (!totalFilmsLengthInt) return;

    if ((page + 1) * ROWS_PER_PAGE >= totalFilmsLengthInt) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (page > 1) {
      setPrevDisabled(false);
    } else {
      setPrevDisabled(true);
    }
  }, [page, totalFilmsLength]);

  const handleRowClick = (id: string) => {
    dispatch(getFilmDetail({ apikey: process.env.REACT_APP_API_KEY, i: id }));
    navigate(`films/${id}`);
    //TODO: reroute to film details page
  };

  //TODO: fix table layout shift on page change width issue
  //TODO: add enhanced toolbar here
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="film table">
        <TableHead>
          <TableRow>
            <TableCell>IMDB ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ height: "800px" }}>
          {filmList?.map((row) => (
            <TableRow
              hover
              key={row.imdbID}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
              onClick={() => handleRowClick(row.imdbID)}
            >
              <TableCell component="th" scope="row">
                {row.imdbID}
              </TableCell>
              <TableCell align="right">
                <div className="film-table__table-row">
                  <img
                    src={row.Poster}
                    alt={row.Title}
                    className="film-table__table-row__img"
                  />
                  {row.Title}
                </div>
              </TableCell>

              <TableCell>{row.Year}</TableCell>
            </TableRow>
          ))}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 92 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" className="table__pagination"></TableCell>
            <TableCell align="right" className="table__pagination"></TableCell>
            <TableCell align="right" className="film-table__pagination">
              <IconButton onClick={handlePageDecrease} disabled={prevDisabled}>
                <KeyboardArrowLeft />
              </IconButton>
              <span className="film-table__pagination__page">{page}</span>
              <IconButton onClick={handlePageIncrease} disabled={nextDisabled}>
                <KeyboardArrowRight />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
