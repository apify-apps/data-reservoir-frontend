import { DB } from "@/database/client";
import { nasiGorengIngredient } from "@/database/schema";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(newResponse(
    await DB.select()
      .from(nasiGorengIngredient))
  )
}