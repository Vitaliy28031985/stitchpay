import { NextResponse } from "next/server";

export function handleError(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : "Внутрішня помилка сервера";

  const status =
    message === "Необхідно авторизуватися"
      ? 401
      : [
          "Введіть назву операції",
          "Некоректна ціна операції",
        ].includes(message)
        ? 400
        : 500;

  return NextResponse.json(
    { error: message },
    { status }
  );
}