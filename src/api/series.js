import newtApi from "./newtApi";
import { useMutation } from "react-query";

// API calls
const createSeries = async (data) => {
  try {
    await newtApi.post("/series/create", data);
  } catch (error) {
    console.log(error);
  }
};

// React-query bindings
function useCreateSeries() {
  return useMutation(createSeries);
}

export { useCreateSeries };
