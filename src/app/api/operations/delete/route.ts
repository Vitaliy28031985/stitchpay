import { deleteOperation } from "@/actions/operation/deleteOperation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Некоректний ID операції" },
        { status: 400 }
      );
    }

    const data = await deleteOperation(id);

    return NextResponse.json(data, {
      status: 200,
    });

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Internal Server Error";

    const status =
      message === "Необхідно авторизуватися"
        ? 401
        : message === "Операцію не знайдено!"
          ? 404
          : 500;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}