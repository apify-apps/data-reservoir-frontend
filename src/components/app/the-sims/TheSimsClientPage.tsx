'use client'

import BustinOutCareer from "@/components/app/the-sims/BustinOutCareer";
import CastawayProduct from "@/components/app/the-sims/CastawayProduct";
import FourPCHarvestable from "@/components/app/the-sims/FourPCHarvestable";
import TwoConsoleCareer from "@/components/app/the-sims/TwoConsoleCareer";
import TwoPetsConsoleCareer from "@/components/app/the-sims/TwoPetsConsoleCareer";
import TwoPetsConsoleProduct from "@/components/app/the-sims/TwoPetsConsoleProduct";
import Loading from "@/components/common/loading/Loading";
import Paper from "@/components/common/paper/Paper";
import Picker from "@/components/common/picker/Picker";
import { API_ROUTE } from "@/constant/api-route";
import { TheSimsTableLabel, TheSimsTableType } from "@/constant/tables";
import { DashboardRequest } from "@/model/request/dashboard";
import { DashboardResponse } from "@/model/response/dashboard";
import { request } from "@/utilities/http";
import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useState } from "react";

interface TheSimsClientPageState {
  pickedTable: TheSimsTableType | null
}

export default function TheSimsClientPage() {
  const [state, setState] = useState<TheSimsClientPageState>({
    pickedTable: 'the_sims_castaway_product'
  });

  let { isLoading, data: summaryData } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      let j = await request<DashboardResponse[], DashboardRequest>({
        method: "GET",
        url: API_ROUTE.DASHBOARD,
        data: {
          category: "the_sims"
        }
      });
      return j.data;
    }
  });

  if (isLoading || !summaryData) return (<Loading/>)
  else {
    let totalTable = summaryData.flatMap(x => x.tables).filter(x => !state.pickedTable || state.pickedTable === x.tableName).length;
    let totalData = summaryData.flatMap(x => x.tables).filter(x => !state.pickedTable || state.pickedTable === x.tableName).reduce((prev, current) => prev + current.rowCount, 0);

    let onClickCategory = (pickedTable: string, enabled: boolean) => {
      setState(produce(s => {
        if (enabled) s.pickedTable = pickedTable as TheSimsTableType
        else s.pickedTable = null
      }))
    }

    let a = Object.entries(TheSimsTableLabel).map(([k, v]) => ({ label: v, value: k }));

    return (
      <div className='flex flex-col gap-4 text-white'>
        {/* Layer 1 : Angka2 dan filter */}
        <div className='grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-lg:grid-rows-2'>
          <Paper className='px-6'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Tables</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalTable}</h1>
          </Paper>
          <Paper className='px-6'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Records</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalData}</h1>
          </Paper>
          <Paper className='px-4 col-span-2 p-4 text-xs max-lg:col-span-2'>
            <Picker options={a} onClickCategory={onClickCategory} singleOption selected={state.pickedTable}/>
          </Paper>
        </div>

        {/* Layer 2 : Table dan Treemap */}
        <div className='min-h-[100vh]'>
          {/* { state.pickedTable === "the_sims_castaway_product" && <CastawayProduct/> } */}
          { state.pickedTable === "the_sims_castaway_product" && <CastawayProduct/> }
          { state.pickedTable === "the_sims_four_pc_harvestable" && <FourPCHarvestable/> }
          { state.pickedTable === "the_sims_bustin_out_career" && <BustinOutCareer/> }
          { state.pickedTable === "the_sims_two_console_career" && <TwoConsoleCareer/> }
          { state.pickedTable === "the_sims_two_pets_console_career" && <TwoPetsConsoleCareer/> }
          { state.pickedTable === "the_sims_two_pets_console_product" && <TwoPetsConsoleProduct/> }
        </div>
      </div>
    )
  }
}