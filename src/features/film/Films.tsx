import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectFilters } from "./filmSlice";
import "./styles.scss";

const Films = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return <div></div>;
};

export default Films;
