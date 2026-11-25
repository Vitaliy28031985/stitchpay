import type { EarningsChartItem } from "@/shared/interfaces/reports";

export async function getEarningsChartDataRequest(): Promise<EarningsChartItem[]> {

  const response = await fetch("/api/reports/earnings", {
    method: "GET",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Не вдалося отримати дані звіту"
    );
  }

  return result as EarningsChartItem[];
}