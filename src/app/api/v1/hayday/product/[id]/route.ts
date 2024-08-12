import { appendBase } from '@/utilities/api';
import { DB } from "@/database/client";
import { haydayBuilding, haydayIngredient, haydayProducer, haydayProduct } from "@/database/schema";
import { HayDayProductDetailResponse } from "@/model/response/hayday";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params : { id: string }}) {
  let id = params.id;

  let product = await DB
    .select()
    .from(haydayProduct)
    .where(eq(haydayProduct.id, id))
    .limit(1);

  let ingredient = await DB
    .select()
    .from(haydayIngredient)
    .innerJoin(haydayProduct, eq(haydayIngredient.ingredientId, haydayProduct.id))
    .where(eq(haydayIngredient.productId, id));

  let usage = await DB
    .select()
    .from(haydayIngredient)
    .innerJoin(haydayProduct, eq(haydayIngredient.productId, haydayProduct.id))
    .where(eq(haydayIngredient.ingredientId, id));

  let producer = await DB
    .select()
    .from(haydayProducer)
    .innerJoin(haydayBuilding, eq(haydayProducer.buildingId, haydayBuilding.id))
    .where(eq(haydayProducer.productId, id))
    .limit(1);
  
  let actualProducer = producer?.[0];
  
  return NextResponse.json<HayDayProductDetailResponse>(appendBase({
    ...product[0],
    ingredient: ingredient.map(x => ({
      category: x.hayday_product.category,
      image: x.hayday_product.image,
      name: x.hayday_product.name,
      quantity: x.hayday_ingredient.quantity
    })),
    usedBy: usage.map(x => ({
      category: x.hayday_product.category,
      image: x.hayday_product.image,
      name: x.hayday_product.name,
      quantity: x.hayday_ingredient.quantity
    })),
    producer: actualProducer && {
      id: actualProducer.hayday_building.id,
      image: actualProducer.hayday_building.image,
      name: actualProducer.hayday_building.name,
    }
  }));
}