import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES as string);
export const DB = drizzle(sql);