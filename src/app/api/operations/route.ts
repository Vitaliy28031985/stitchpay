import { getOperations } from "@/actions/operation/getOperation";
import { handleError } from "@/shared/utils/handleError";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const operations = await getOperations();

    return NextResponse.json({
      data: operations,
    });
  } catch (error) {
    return handleError(error);
  }
}