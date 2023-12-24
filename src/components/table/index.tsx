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
import Chip from "@mui/material/Chip";

import { ROWS_PER_PAGE } from "../../utilities";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectFilters,
  selectFilmsLength,
  selectFilmsList,
  updatePage,
  getFilmsWithParams,
  selectFilmData,
  selectStatus,
} from "../../features/film/filmSlice";
import { TableRowComponent } from "../../components";
import "./styles.scss";

const TableComponent = () => {
  const [nextDisabled, setNextDisabled] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const status = useAppSelector(selectStatus);
  const filters = useAppSelector(selectFilters);
  const filmList = useAppSelector(selectFilmsList);
  const filmData = useAppSelector(selectFilmData);
  const totalFilmsLength = useAppSelector(selectFilmsLength);
  const { page } = filters;
  const dispatch = useAppDispatch();

  //TODO: refactor getfilmswithparams to be called from redux for page update
  const handlePageIncrease = () => {
    setNextDisabled(true);
    setPrevDisabled(true);
    dispatch(updatePage(filters.page + 1));
    dispatch(getFilmsWithParams({ ...filters, page: filters.page + 1 }));
  };

  const handlePageDecrease = () => {
    setNextDisabled(true);
    setPrevDisabled(true);
    dispatch(updatePage(page - 1));
    dispatch(getFilmsWithParams({ ...filters, page: filters.page - 1 }));
  };

  useEffect(() => {
    const totalFilmsLengthInt = parseInt(totalFilmsLength);
    if (!totalFilmsLengthInt) return;

    if ((page + 1) * ROWS_PER_PAGE >= totalFilmsLengthInt) {
      setNextDisabled(true);
    } else if (status === "idle") {
      setNextDisabled(false);
    }

    if (page > 1 && status === "idle") {
      setPrevDisabled(false);
    } else {
      setPrevDisabled(true);
    }
  }, [page, totalFilmsLength, status]);

  const NoDataComponent = () => {
    if (filmData?.Error) {
      return (
        <TableRow className="nodata-cmp">
          <TableCell className="nodata-cmp__cell" align="center">
            <Chip
              label={filmData.Error}
              color="error"
              className="nodata-cmp__cell__chip"
            />
          </TableCell>
        </TableRow>
      );
    }

    return status !== "loading" ? (
      <TableRow className="nodata-cmp">
        <TableCell className="nodata-cmp__cell" align="center">
          <Chip label="There are no results to display!" color="error" />
        </TableCell>
      </TableRow>
    ) : (
      <></>
    );
  };

  //TODO: add enhanced toolbar with active filters here
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
          {!filmList?.length ? (
            <NoDataComponent />
          ) : status === "idle" ? (
            filmList.map((row) => (
              <TableRowComponent row={row} key={row.imdbID} />
            ))
          ) : (
            <></>
          )}
          {filmList?.length && status === "idle" && filmList?.length < 10 ? (
            <TableRow
              style={{
                height: (ROWS_PER_PAGE - filmList?.length) * 82,
              }}
            >
              {Array.from({ length: ROWS_PER_PAGE - filmList?.length }).map(
                (_, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      border: 0,
                    }}
                  />
                )
              )}
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
        <TableFooter>
          <TableRow style={{ height: "73px" }}>
            <TableCell align="right" className="table__pagination"></TableCell>
            <TableCell align="right" className="table__pagination"></TableCell>
            <TableCell align="right" className="film-table__pagination">
              {status === "idle" && filmList?.length ? (
                <>
                  <IconButton
                    onClick={handlePageDecrease}
                    disabled={prevDisabled}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                  <span className="film-table__pagination__page">{page}</span>
                  <IconButton
                    onClick={handlePageIncrease}
                    disabled={nextDisabled}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </>
              ) : (
                <></>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
