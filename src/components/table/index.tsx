import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "../skeleton";
import "./styles.scss";
import { ROWS_PER_PAGE } from "../../utilities";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  selectFilmData,
  selectFilters,
  selectFilmsLength,
  selectFilmsList,
} from "../../features/film/filmSlice";

const TableComponent = () => {
  const filters = useAppSelector(selectFilters);
  const filmList = useAppSelector(selectFilmsList);
  const { page } = filters;
  const dispatch = useAppDispatch();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 1 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - filmList.length) : 0;

  // const TableSection = useMemo(() => {
  //   return rows.length ? (
  //     rows?.map((row) => (
  //       <TableRow
  //         key={row.imdbID}
  //         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //       >
  //         <TableCell component="th" scope="row">
  //           {row.Title}
  //         </TableCell>
  //         <TableCell align="right">{row.imdbID}</TableCell>
  //         <TableCell align="right">{row.Year}</TableCell>
  //         <TableCell align="right">{row.imdbRating}</TableCell>
  //       </TableRow>
  //     ))
  //   ) : (
  //     <Skeleton />
  //   );
  // }, [rows]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>IMDB ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filmList?.map((row) => (
            <TableRow
              key={row.imdbID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.imdbID}
              </TableCell>
              <TableCell align="right">
                <div className="table-row">
                  <img
                    src={row.Poster}
                    alt={row.Title}
                    className="table-row__img"
                  />
                  {row.Title}
                </div>
              </TableCell>

              <TableCell>{row.Year}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
