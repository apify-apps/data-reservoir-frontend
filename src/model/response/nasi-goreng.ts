import { nasiGorengFriedRice } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type NasiGorengFriedRiceResponse = InferSelectModel<typeof nasiGorengFriedRice> & {
  level1Image: string,
  level6Image: string
}