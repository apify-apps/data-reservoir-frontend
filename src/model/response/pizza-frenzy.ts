import { haydayBuilding, haydayProduct, pizzaFrenzyTopping, pizzaFrenzyToppingUpgrade } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type PizzaFrenzyToppingResponse = InferSelectModel<typeof pizzaFrenzyTopping>
export type PizzaFrenzyToppingUpgradeResponse = InferSelectModel<typeof pizzaFrenzyToppingUpgrade>

export type PizzaFrenzyToppingDetailResponse = PizzaFrenzyToppingResponse & {
  upgrades: PizzaFrenzyToppingUpgradeResponse[]
}