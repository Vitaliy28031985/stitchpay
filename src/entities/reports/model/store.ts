import { create } from "zustand";
import { toast } from "sonner";

import type { ReportsState } from "./type";
import { getEarningsChartDataRequest } from "../api/reports";


export const useReportsStore = create<ReportsState>((set) => ({
  earningsChartData: [],

  isLoadingEarnings: false,

  earningsError: null,

  getEarningsChartData: async () => {
    set({
      isLoadingEarnings: true,
      earningsError: null,
    });

    try {
      const result = await getEarningsChartDataRequest();

      set({
        earningsChartData: result,
      });

    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Не вдалося отримати дані звіту";

      console.error("Get earnings report error:", error);

      set({
        earningsError: message,
      });

      toast.error(message);

    } finally {
      set({
        isLoadingEarnings: false,
      });
    }
  },
}));