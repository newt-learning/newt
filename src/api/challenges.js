import newtApi from "./newtApi";
import { useQuery } from "react-query";

// API calls
const fetchChallenges = async () => {
  const { data } = await newtApi.get("/challenges");
  return data;
};

// React-query bindings
function useFetchChallenges() {
  return useQuery("challenges", fetchChallenges);
}

export { useFetchChallenges };
