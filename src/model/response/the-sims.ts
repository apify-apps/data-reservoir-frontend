import { theSimsBustinOutCareer, theSimsCastawayProduct, theSimsFourPcHarvestable, theSimsTwoConsoleCareer, theSimsTwoPetsConsoleCareer, theSimsTwoPetsConsoleProduct } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type TheSimsCastawayProductResponse = InferSelectModel<typeof theSimsCastawayProduct>
export type TheSimsFourPCHarvestableResponse = InferSelectModel<typeof theSimsFourPcHarvestable>
export type TheSimsBustinOutCareerResponse = InferSelectModel<typeof theSimsBustinOutCareer>
export type TheSimsTwoPetsConsoleCareerResponse = InferSelectModel<typeof theSimsTwoPetsConsoleCareer>
export type TheSimsTwoConsoleCareerResponse = InferSelectModel<typeof theSimsTwoConsoleCareer>
export type TheSimsTwoPetsConsoleProductResponse = InferSelectModel<typeof theSimsTwoPetsConsoleProduct>