// A mock function to mimic making an async request for data
import axios from "axios";
import { BASE_URL, IQueryParams, IDetailQueryParams } from "../../utilities";
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const fetchFilms = async (params: IQueryParams | IDetailQueryParams) => {
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
