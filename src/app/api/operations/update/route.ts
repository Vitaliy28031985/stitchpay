import { updateOperation } from "@/actions/operation/updateOperatain";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, name, price } = body;

    if (!id || !name || price === undefined) {
      return NextResponse.json(
        { error: "Відсутні обов'язкові поля" },
        { status: 400 }
      );
    }

    const data = await updateOperation({
      id,
      name,
      price: Number(price),
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}