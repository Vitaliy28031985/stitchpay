import { NextResponse } from "next/server";

import type { CreateEntryData } from "@/shared/interfaces/entries";
import { createEntries } from "@/actions/entries/createEntries";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Некоректні вхідні дані" },
        { status: 400 }
      );
    }

    // Перевіряємо дату
    if (typeof body.date !== "string") {
      return NextResponse.json(
        { error: "Некоректна дата операції" },
        { status: 400 }
      );
    }

    const date = new Date(body.date);

    if (Number.isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Некоректна дата операції" },
        { status: 400 }
      );
    }

    // Формуємо об'єкт для серверної функції
    const entryData: CreateEntryData = {
      name: body.name,
      price: body.price,
      qty: body.qty,
      model: body.model,
      date,
    };

    const entry = await createEntries(entryData);

    return NextResponse.json(entry, {
      status: 201,
    });

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Помилка сервера";

    const status =
      message === "Необхідно авторизуватися"
        ? 401
        : message.startsWith("Некорект") ||
            message === "Введіть назву операції"
          ? 400
          : 500;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}