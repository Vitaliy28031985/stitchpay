import type { EarningsChartItem } from "@/shared/interfaces/reports";

export interface ReportsState {
  earningsChartData: EarningsChartItem[];

  isLoadingEarnings: boolean;

  earningsError: string | null;

  getEarningsChartData: () => Promise<void>;
}