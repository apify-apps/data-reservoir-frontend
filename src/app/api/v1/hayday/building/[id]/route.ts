import { DB } from "@/database/client";
import { haydayBuilding, haydayProducer, haydayProduct } from "@/database/schema";
import { HayDayBuildingDetailResponse } from "@/model/response/hayday";
import { newResponse } from "@/utilities/api";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params } : { params : { id: string }}) {
  let id = params.id;

  let building = await DB
    .select()
    .from(haydayBuilding)
    .where(eq(haydayBuilding.id, id))
    .limit(1);
  
  if (building.length === 0) return NextResponse.json({ "message": "not found" }, {
    status: 400
  });
  let actualBuilding = building[0];

  let product = await DB
    .select()
    .from(haydayProducer)
    .innerJoin(haydayProduct, eq(haydayProducer.productId, haydayProduct.id))
    .where(eq(haydayProducer.buildingId, id))
    .orderBy(haydayProduct.level);

  return NextResponse.json(newResponse<HayDayBuildingDetailResponse>({
    ...actualBuilding,
    produces: product.map(x => ({
      category: x.hayday_product.category,
      image: x.hayday_product.image,
      name: x.hayday_product.name,
      level: x.hayday_product.level
    }))
  }));

}