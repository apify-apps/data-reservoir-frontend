import { haydayBuilding, haydayProduct } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type HayDayProductResponse = InferSelectModel<typeof haydayProduct>
export type HayDayBuildingResponse = InferSelectModel<typeof haydayBuilding>

export type HayDayProductDetailResponse = HayDayProductResponse & {
  ingredient: (Pick<HayDayProductResponse, 'image' | 'name' | 'category'> & { quantity: number })[],
  usedBy: (Pick<HayDayProductResponse, 'image' | 'name' | 'category'> & { quantity: number })[],
  producer?: Pick<HayDayBuildingResponse, 'name' | 'id' | 'image'>
}

export type HayDayBuildingDetailResponse = HayDayBuildingResponse & {
  produces: (Pick<HayDayProductResponse, 'image' | 'name' | 'category' | 'level'>)[],
}