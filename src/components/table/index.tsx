import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IFilmData } from "../../utilities/types";
import Skeleton from "../skeleton";

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

  //TODO: add poster
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">IMDB ID</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.imdbID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Title}
              </TableCell>
              <TableCell align="right">{row.imdbID}</TableCell>
              <TableCell align="right">{row.Year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
