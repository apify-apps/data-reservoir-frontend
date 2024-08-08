import { DB } from "@/database/client";
import { theSimsTwoPetsConsoleProduct } from "@/database/schema";
import { appendBase } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    appendBase(await DB.select()
      .from(theSimsTwoPetsConsoleProduct))
  )
}