import { asc, eq } from 'drizzle-orm';
import { DB } from "@/database/client";
import { pizzaFrenzyTopping, pizzaFrenzyToppingUpgrade } from "@/database/schema";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";
import { PizzaFrenzyToppingDetailResponse } from '@/model/response/pizza-frenzy';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  let id = params.id;
  let resp = await DB.select()
    .from(pizzaFrenzyTopping)
    .innerJoin(pizzaFrenzyToppingUpgrade, eq(pizzaFrenzyTopping.id, pizzaFrenzyToppingUpgrade.toppingId))
    .where(eq(pizzaFrenzyTopping.id, id))
    .orderBy(asc(pizzaFrenzyToppingUpgrade.level));

  return NextResponse.json(newResponse<PizzaFrenzyToppingDetailResponse>(
    {
      ...resp[0].pizza_frenzy_topping,
      upgrades: resp.map(x => x.pizza_frenzy_topping_upgrade)
    }
  ));
}