import newtApi from "../api/newtApi";
import moment from "moment";
import { useQuery } from "react-query";

const fetchSummaryStats = async () => {
  const startDate = moment().startOf("week");
  const endDate = moment().endOf("week");

  const { data } = await newtApi.get(`/summary-stats/${startDate}.${endDate}`);
  return data;
};

export default function useSummaryStats() {
  return useQuery("summary-stats", fetchSummaryStats);
}
