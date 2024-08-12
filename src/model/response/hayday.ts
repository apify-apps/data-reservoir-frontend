import { haydayBuilding, haydayProduct } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type HayDayProductResponse = InferSelectModel<typeof haydayProduct>
export type HayDayBuilding = InferSelectModel<typeof haydayBuilding>

export type HayDayProductDetailResponse = HayDayProductResponse & {
  ingredient: (Pick<HayDayProductResponse, 'image' | 'name' | 'category'> & { quantity: number })[],
  usedBy: (Pick<HayDayProductResponse, 'image' | 'name' | 'category'> & { quantity: number })[],
  producer?: Pick<HayDayBuilding, 'name' | 'id' | 'image'>
}