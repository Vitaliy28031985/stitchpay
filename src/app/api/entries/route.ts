import { getEntries } from "@/actions/entries/getEntries";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const result = await getEntries();

    return NextResponse.json(result, {
      status: 200,
    });

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Помилка отримання робіт";

    const status =
      message === "Необхідно авторизуватися" ? 401 : 500;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}