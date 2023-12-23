import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en";
import dayjs from "dayjs";
import { IQueryParams } from "../../utilities";
import { fetchFilms } from "../../features/film/filmAPI";

const YearPicker = (props: ISearchInputProps) => {
  const { filterParams, setFilterParams, setData } = props;
  const [year, setYear] = useState<Dayjs | null>(null);

  // useEffect(() => {
  //   fetchFilms(filterParams).then((res) => {
  //     setData(res.Search);
  //     localStorage.setItem("data", JSON.stringify(res.Search));
  //   });
  // }, [filterParams.y]);

  const handleOnYearChange = (newValue: Dayjs | null) => {
    setYear(newValue);

    setFilterParams((prev: IQueryParams) => {
      return { ...prev, y: newValue?.year().toString() };
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker
        label={"Filter By Year"}
        openTo="year"
        format="YYYY"
        views={["year"]}
        maxDate={dayjs(Date.now())}
        value={year}
        onChange={handleOnYearChange}
      />
    </LocalizationProvider>
  );
};

export default YearPicker;

interface ISearchInputProps {
  setFilterParams: React.Dispatch<React.SetStateAction<IQueryParams>>;
  filterParams: IQueryParams;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}
