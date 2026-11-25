
import { createOperation } from "@/actions/operation/createOperation";
import { handleError } from "@/shared/utils/handleError";
import { NextResponse } from "next/server";







export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Некоректний формат JSON" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Некоректні дані операції" },
        { status: 400 }
      );
    }

    const payload = body as {
      name?: unknown;
      price?: unknown;
    };

    if (
      typeof payload.name !== "string" ||
      typeof payload.price !== "number"
    ) {
      return NextResponse.json(
        { error: "Некоректні дані операції" },
        { status: 400 }
      );
    }

    const operation = await createOperation({
      name: payload.name,
      price: payload.price,
    });

    return NextResponse.json(
      { data: operation },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}
