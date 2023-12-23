import { useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en";
import dayjs from "dayjs";
import { useAppDispatch } from "../../app/hooks";
import { updateYearSelector } from "../../features/film/filmSlice";

const YearPicker = () => {
  const [year, setYear] = useState<Dayjs | null>(null);

  const dispatch = useAppDispatch();

  const handleOnYearChange = (newValue: Dayjs | null) => {
    setYear(newValue);
    dispatch(updateYearSelector(newValue?.year().toString() || ""));
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
