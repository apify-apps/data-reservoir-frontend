import { eq, inArray } from 'drizzle-orm';
import { DB } from "@/database/client";
import { nasiGorengFriedRice, nasiGorengFriedRiceLevel } from "@/database/schema";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";
import { NasiGorengFriedRiceResponse } from '@/model/response/nasi-goreng';

export async function GET() {

  const dataMaster = await DB.select()
    .from(nasiGorengFriedRice);
  
  const dataTrans = await DB.select()
    .from(nasiGorengFriedRiceLevel)
    .where(inArray(nasiGorengFriedRiceLevel.level, [1, 6]))

  return NextResponse.json(newResponse<NasiGorengFriedRiceResponse[]>(
    dataMaster.map(fr => (
      {
        ...fr, 
        level1Image: dataTrans.find(x => x.friedRiceId === fr.id && x.level === 1)?.image ?? "",
        level6Image: dataTrans.find(x => x.friedRiceId === fr.id && x.level === 6)?.image ?? ""
      }
    ))
  ))
}