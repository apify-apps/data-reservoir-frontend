import { API_SHORTHAND } from "@/constant/api-route";
import { DB } from "@/database/client";
import { theSimsBustinOutCareer, theSimsCastawayProduct, theSimsFourPcHarvestable, theSimsTwoConsoleCareer, theSimsTwoPetsConsoleCareer, theSimsTwoPetsConsoleProduct } from "@/database/schema";
import { appendBase } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

type RouteEndpoint = typeof API_SHORTHAND.THE_SIMS[keyof typeof API_SHORTHAND.THE_SIMS]
const routeEndpoint = (Object.values(API_SHORTHAND.THE_SIMS))

export async function GET(request: NextRequest, { params } : { params : { table: string } }){

  // Cek apakah table masuk dalam type
  if (!routeEndpoint.includes(params.table as RouteEndpoint)) return new NextResponse(null, {
    status: 404
  });

  switch (params.table as RouteEndpoint) {
    case 'castaway-product':
      return NextResponse.json(appendBase(await DB.select().from(theSimsCastawayProduct)))
    case 'four-pc-harvestable':
      return NextResponse.json(appendBase(await DB.select().from(theSimsFourPcHarvestable)))
    case 'two-pets-console-product':
      return NextResponse.json(appendBase(await DB.select().from(theSimsTwoPetsConsoleProduct)))
    case 'bustin-out-career':
      return NextResponse.json(appendBase(await DB.select().from(theSimsBustinOutCareer)))
    case 'two-console-career':
      return NextResponse.json(appendBase(await DB.select().from(theSimsTwoConsoleCareer)))
    case 'two-pets-console-career':
      return NextResponse.json(appendBase(await DB.select().from(theSimsTwoPetsConsoleCareer)))
  }
}