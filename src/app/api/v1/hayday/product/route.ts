import { DB } from "@/database/client";
import { haydayProduct } from "@/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { newResponse } from "@/utilities/api";

export async function GET() {
  return NextResponse.json(newResponse(
    await DB.select()
      .from(haydayProduct))
  )
  // try
  // {
  //   let data = PaginationRequestSchema.validateSync(params);
  //   let resp = await DB.select()
  //     .from(haydayProduct)
  //     .orderBy(asc(haydayProduct.id))
  //     .limit(data.pageSize)
  //     .offset((data.currentPage - 1) * data.pageSize);
    
  //   let total = await DB.select({count: count()})
  //     .from(haydayProduct)
    
  //   return NextResponse.json(newPaginationResponse(
  //     resp, params.pageSize, params.currentPage, total[0].count
  //   ))
    
  // }
  // catch (e) {
  //   if (e instanceof ValidationError)
  //   {
  //     return NextResponse.json(newResponse("", e.errors[0]), {
  //       status: 400
  //     })
  //   }
  // }



}