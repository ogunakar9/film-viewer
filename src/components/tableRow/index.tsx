import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IFilmData } from "../../utilities";
import { useAppDispatch } from "../../app/hooks";
import { getFilmDetail } from "../../features/film/filmSlice";

const TableRowComponent = ({ row }: { row: IFilmData }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRowClick = (id: string) => {
    dispatch(getFilmDetail({ apikey: process.env.REACT_APP_API_KEY, i: id }));
    navigate(`films/${id}`);
  };

  return (
    <TableRow
      hover
      key={row.imdbID}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
      onClick={() => handleRowClick(row.imdbID)}
    >
      <TableCell
        component="th"
        scope="row"
        className="film-table__cell__rating film-table__cell"
      >
        {row.imdbID}
      </TableCell>
      <TableCell
        align="right"
        className="film-table__cell__title film-table__cell"
      >
        <div className="film-table__table-row">
          <img
            src={row.Poster}
            alt={row.Title}
            className="film-table__table-row__img"
          />
          {row.Title}
        </div>
      </TableCell>
      <TableCell className="film-table__cell__year film-table__cell">
        {row.Year}
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
