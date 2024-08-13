import { farmFrenzyOneProduct, farmFrenzyThreeProduct, farmFrenzyTwoPizzaProduct, farmFrenzyTwoProduct } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type FarmFrenzyOneProductResponse = InferSelectModel<typeof farmFrenzyOneProduct>
export type FarmFrenzyTwoProductResponse = InferSelectModel<typeof farmFrenzyTwoProduct>
export type FarmFrenzyTwoPizzaProductResponse = InferSelectModel<typeof farmFrenzyTwoPizzaProduct>
export type FarmFrenzyThreeProductResponse = InferSelectModel<typeof farmFrenzyThreeProduct>