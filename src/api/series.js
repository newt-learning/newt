import newtApi from "./newtApi";
import { useMutation, useQuery } from "react-query";

// API calls
const fetchSeries = async () => {
  const { data } = await newtApi.get("/series");
  return data;
};
const createSeries = async (data) => {
  try {
    await newtApi.post("/series/create", data);
  } catch (error) {
    console.log(error);
  }
};

// React-query bindings
function useFetchSeries() {
  return useQuery("series", fetchSeries);
}
function useCreateSeries() {
  return useMutation(createSeries);
}

export { useFetchSeries, useCreateSeries };
