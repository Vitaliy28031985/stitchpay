import { getEarningsChartData } from "@/actions/reports/getEarningsChartData";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const data = await getEarningsChartData();

    return NextResponse.json(data, {
      status: 200,
    });

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Помилка отримання звіту";

    const status =
      message === "Необхідно авторизуватися" ? 401 : 500;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}