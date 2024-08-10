import { DB } from "@/database/client";
import { haydayBuilding } from "@/database/schema";
import { PaginationRequest } from "@/model/request/pagination";
import { NextRequest, NextResponse } from "next/server";
import { newResponse } from "@/utilities/api";

export async function GET(_: NextRequest, params: PaginationRequest) {
  return NextResponse.json(newResponse(
    await DB.select()
      .from(haydayBuilding))
  )
}