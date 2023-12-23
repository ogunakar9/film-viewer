import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IFilmData } from "../../utilities/types";
import Skeleton from "../skeleton";
import "./styles.scss";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { selectFilmData, selectFilters } from "../../features/film/filmSlice";

const TableComponent = ({ rows }: { rows: IFilmData[] }) => {
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

  const filmData = useAppSelector(selectFilmData);

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
          {filmData.Search?.map((row) => (
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
