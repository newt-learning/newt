import newtApi from "../api/newtApi";
import moment from "moment";
import { useQuery } from "react-query";

const fetchStatsByPeriod = async (queryKey, period) => {
  const startDate = moment().startOf(period);
  const endDate = moment().endOf(period);

  const { data } = await newtApi.get(
    `/stats/by-${period}/${startDate}.${endDate}`
  );

  let periodStats = {
    [period]: data,
  };
  return periodStats;
};

export default function useStatsByPeriod(period) {
  return useQuery(["stats-by-period", period], fetchStatsByPeriod);
}
