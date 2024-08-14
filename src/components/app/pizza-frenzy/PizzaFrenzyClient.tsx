'use client'

import Loading from "@/components/common/loading/Loading";
import Paper from "@/components/common/paper/Paper";
import { API_ROUTE } from "@/constant/api-route";
import { DashboardRequest } from "@/model/request/dashboard";
import { DashboardResponse } from "@/model/response/dashboard";
import { request } from "@/utilities/http";
import { useQuery } from "@tanstack/react-query";
import PizzaFrenzyTable from "./PizzaFrenzyTable";

export default function PizzaFrenzyClientPage() {
  let { isLoading, data: summaryData } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      let j = await request<DashboardResponse[], DashboardRequest>({
        method: "GET",
        url: API_ROUTE.DASHBOARD,
        data: {
          category: "pizza_frenzy"
        }
      });
      return j.data;
    }
  });

  if (isLoading || !summaryData) return (<Loading/>)
  else {
    let totalTable = summaryData.flatMap(x => x.tables).length;
    let totalData = summaryData.flatMap(x => x.tables).reduce((prev, current) => prev + current.rowCount, 0);

    return (
      <div className='flex flex-col gap-4 text-white'>
        {/* Layer 1 : Angka2 dan filter */}
        <div className='grid grid-cols-2 gap-4'>
          <Paper className='px-6 py-4'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Tables</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalTable}</h1>
          </Paper>
          <Paper className='px-6 py-4'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Records</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalData}</h1>
          </Paper>
        </div>

        <div className='min-h-[100vh]'>
          <PizzaFrenzyTable/>
        </div>
      </div>
    )
  }
}