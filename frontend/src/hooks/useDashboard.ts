import { useQuery } from "@tanstack/react-query";
import { DashboardResponse } from "../types/dashboard.types";
import { getDashboardData } from "../api/dashboard.api";

export const useDashboard = () => {
  const { data, isLoading } = useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
  console.log("Dashboard Data:", data);

  return {
    metrics: data?.metrics,
    rawData: data?.data,
    isLoading,
  };
};
