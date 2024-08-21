import { nasiGorengBurnedFood, nasiGorengFriedRice, nasiGorengIngredient, nasiGorengPlate } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type NasiGorengBurnedFoodResponse = InferSelectModel<typeof nasiGorengBurnedFood>;
export type NasiGorengIngredientResponse = InferSelectModel<typeof nasiGorengIngredient>;
export type NasiGorengPlateResponse = InferSelectModel<typeof nasiGorengPlate>;


export type NasiGorengFriedRiceResponse = InferSelectModel<typeof nasiGorengFriedRice> & {
  level1Image: string,
  level6Image: string
}