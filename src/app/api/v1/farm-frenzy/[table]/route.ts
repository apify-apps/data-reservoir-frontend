import { API_SHORTHAND } from "@/constant/api-route"
import { DB } from "@/database/client";
import { farmFrenzyOneProduct, farmFrenzyThreeProduct, farmFrenzyTwoPizzaProduct, farmFrenzyTwoProduct } from "@/database/schema";
import { newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";

type RouteEndpoint = typeof API_SHORTHAND.FARM_FRENZY[keyof typeof API_SHORTHAND.FARM_FRENZY]
const routeEndpoint = (Object.values(API_SHORTHAND.FARM_FRENZY));

export async function GET(_: NextRequest, { params } : { params : { table: string } }){

  // Cek apakah table masuk dalam type
  if (!routeEndpoint.includes(params.table as RouteEndpoint)) return new NextResponse(null, {
    status: 404
  });

  switch (params.table as RouteEndpoint) {
    case 'one-product':
      return NextResponse.json(newResponse(await DB.select().from(farmFrenzyOneProduct)))
    case 'two-product':
      return NextResponse.json(newResponse(await DB.select().from(farmFrenzyTwoProduct)))
    case 'two-pizza-product':
      return NextResponse.json(newResponse(await DB.select().from(farmFrenzyTwoPizzaProduct)))
    case 'three-product':
      return NextResponse.json(newResponse(await DB.select().from(farmFrenzyThreeProduct)))
  }
}