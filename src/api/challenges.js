import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

// API calls
const fetchChallenges = async () => {
  const { data } = await newtApi.get("/challenges");
  return data;
};
const createChallenge = async (data) => {
  return await newtApi.post("/challenges/create", data);
};

// React-query bindings
function useFetchChallenges() {
  return useQuery("challenges", fetchChallenges);
}
function useCreateChallenge() {
  return useMutation(createChallenge, {
    onError: (err) => console.log(error),
    onSettled: () => queryCache.refetchQueries("challenges"),
  });
}

export { useFetchChallenges, useCreateChallenge };
