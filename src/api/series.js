import newtApi from "./newtApi";
import { useMutation, useQuery } from "react-query";
import { displayErrorAlert } from "../components/shared/displayErrorAlert";

// API calls
const fetchAllContentAndSeries = async () => {
  const { data } = await newtApi.get("/content-and-series");
  return data;
};
const fetchSeries = async () => {
  const { data } = await newtApi.get("/series");
  return data;
};
const createSeries = async (data) => {
  try {
    await newtApi.post("/series/create", data);
  } catch (error) {
    displayErrorAlert("Sorry, there was an error adding this series.");
  }
};

// React-query bindings
function useFetchAllContentAndSeries() {
  return useQuery("content-and-series", fetchAllContentAndSeries);
}
function useFetchSeries() {
  return useQuery("series", fetchSeries);
}
function useCreateSeries() {
  return useMutation(createSeries);
}

export { useFetchAllContentAndSeries, useFetchSeries, useCreateSeries };
