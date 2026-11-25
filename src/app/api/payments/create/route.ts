import { NextResponse } from "next/server";
import { createPayment } from "@/actions/payments/createPayments";
import type { CreatePaymentData } from "@/shared/interfaces/payments";


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
        { error: "Некоректна дата виплати" },
        { status: 400 }
      );
    }

    const date = new Date(body.date);

    if (Number.isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Некоректна дата виплати" },
        { status: 400 }
      );
    }

    // Формуємо дані для серверної функції
    const paymentData: CreatePaymentData = {
      date,
      amount: body.amount,
      kind: body.kind,
      comment: body.comment,
    };

    const payment = await createPayment(paymentData);

    return NextResponse.json(payment, {
      status: 201,
    });

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Помилка сервера";

    const validationErrors = [
      "Введіть коментар!",
      "Некоректна сума",
      "Введіть тип виплат!",
      "Некоректна дата виплати",
    ];

    const status =
      message === "Необхідно авторизуватися"
        ? 401
        : validationErrors.includes(message)
          ? 400
          : 500;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}