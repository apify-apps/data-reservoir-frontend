import { DB } from "@/database/client";
import { pizzaFrenzyTopping } from "@/database/schema";
import { PaginationRequest } from "@/model/request/pagination";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, params: PaginationRequest) {
  return NextResponse.json(newResponse(
    await DB.select()
      .from(pizzaFrenzyTopping))
  )
}