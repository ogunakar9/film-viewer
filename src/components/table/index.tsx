import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Skeleton from "../skeleton";
import "./styles.scss";
import { ROWS_PER_PAGE } from "../../utilities";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";

import {
  selectFilmData,
  selectFilters,
  selectFilmsLength,
  selectFilmsList,
  updatePage,
  getFilmsWithParams,
} from "../../features/film/filmSlice";

const TableComponent = () => {
  const [nextDisabled, setNextDisabled] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const filters = useAppSelector(selectFilters);
  const filmList = useAppSelector(selectFilmsList);
  const totalFilmsLength = useAppSelector(selectFilmsLength);
  const { page } = filters;
  const dispatch = useAppDispatch();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = ROWS_PER_PAGE - (filmList?.length || 0);

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
              key={row.imdbID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
