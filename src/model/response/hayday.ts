import { haydayBuilding, haydayProduct } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type HayDayProductResponse = InferSelectModel<typeof haydayProduct>
export type HayDayBuilding = InferSelectModel<typeof haydayBuilding>

export type HayDayProductDetailResponse = HayDayProductResponse & {
  requiredIn: HayDayProductResponse[],
  producer?: HayDayBuilding
}