import newtApi from "../api/newtApi";
import { useQuery } from "react-query";

const fetchChallenges = async () => {
  const { data } = await newtApi.get("/challenges");
  return data;
};

export default function useChallenges() {
  return useQuery("challenges", fetchChallenges);
}
