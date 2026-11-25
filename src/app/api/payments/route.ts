
import { getPayments } from "@/actions/payments/getPayments";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const data = await getPayments();

        return NextResponse.json(data);

    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Помилка отримання платежів";

        const status = message === "Необхідно авторизуватися"
            ? 401
            : 500;

        return NextResponse.json(
            { message },
            { status }
        );
    }
}
