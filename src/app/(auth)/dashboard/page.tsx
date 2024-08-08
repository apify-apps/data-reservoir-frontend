'use client'

import { DashboardResponse } from '@/model/response/dashboard';
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import _ from 'lodash';
import classNames from 'classnames'
import { produce } from 'immer';
import Paper from '@/components/common/paper/Paper';
import ComingSoon from '@/components/common/coming-soon/ComingSoon';
import TableBarChart from '@/components/app/dashboard/TableBarChart';
import { getCategoryColorClass } from '@/utilities/color';
import TableTreeMap from '@/components/app/dashboard/TableTreeMap';
import Loading from '@/components/common/loading/Loading';
import { BaseResponse } from '@/model/response/base';
import { API_ROUTE } from '@/constant/api-route';
import Picker from '@/components/common/picker/Picker';
import { request } from '@/utilities/http';

interface DashboardPageState {
  pickedCategories: string[]
}

export default function DashboardPage() {
  const [state, setState] = useState<DashboardPageState>({
    pickedCategories: []
  });

  let { isLoading, data } = useQuery({
    queryKey: ["the-sims-summary"],
    queryFn: async () => {
      let j = await request<DashboardResponse[], {}>({
        method: "GET",
        url: API_ROUTE.DASHBOARD,
      });
      return j.data
    }
  });

  if (isLoading || !data) return (<Loading/>)
  else {

    let cleanData = data.filter(x => state.pickedCategories.length === 0 || state.pickedCategories.includes(x.category));
    let categories = data.map(x => x.category);
    let totalCategory = new Set(cleanData.map(x => x.category)).size;
    let totalTable = cleanData.flatMap(x => x.tables).length;
    let totalData = cleanData.flatMap(x => x.tables).reduce((prev, current) => prev + current.rowCount, 0);
    let categorySummary = cleanData.map(x => ({
      category: x.category,
      rowCount: x.tables.reduce((prev, current) => prev + current.rowCount, 0)
    }))

    // Data yang diambil harus berdasarkan kategori yang diambil
    
    let onClickCategory = (category: string, enabled: boolean) => {
      setState(produce(s => {
        if (enabled) s.pickedCategories.push(category);
        else s.pickedCategories = s.pickedCategories.filter(x => x !== category);
      }))
    }

    return (
      <div className='flex flex-col gap-4 text-white'>
        {/* Layer 1 : Angka2 dan filter */}
        <div className='grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-lg:grid-rows-2'>
          <Paper className='px-4 col-span-2 p-4 text-xs max-lg:col-span-3'>
            <Picker options={categories} onClickCategory={onClickCategory} singleOption={false} selected={state.pickedCategories}/>
          </Paper>
          <Paper className='px-6'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Categories</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalCategory}</h1>
          </Paper>
          <Paper className='px-6'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Tables</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalTable}</h1>
          </Paper>
          <Paper className='px-6'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Records</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalData}</h1>
          </Paper>
        </div>

        {/* Layer 2 : Table dan Treemap */}
        <div className='grid grid-cols-2 grid-rows-1 gap-4 max-md:grid-rows-2 max-md:grid-cols-1 min-h-80'>
          <div className='overflow-y-auto overflow-x-hidden rounded-md'>
            <Paper className='p-4 !justify-start'>
              <table>
                <thead className='text-md border-b-2 border-gray-700'>
                  <tr>
                    <th className='pb-3'>No.</th>
                    <th className='pb-3'>Category</th>
                    <th className='pb-3'>Records</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    categorySummary.map((el, idx) => (
                      <tr className={classNames('border-gray-700 border-b category-table', getCategoryColorClass(el.category))} key={idx}>
                        <td className='px-2 py-2 text-center font-bold'>{idx + 1}</td>
                        <td className='px-2 py-2 '>{el.category}</td>
                        <td className='px-2 py-2 '>{el.rowCount}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </Paper>
          </div>
          <div>
            <Paper className='h-full p-4'>
              {/* <ComingSoon message='Tree Map'/> */}
              <TableTreeMap data={data}/>
            </Paper>
          </div>
        </div>

        {/* Layer 3 : Pie Chart + Bar Chart */}
        <div className='grid grid-cols-2 grid-rows-1 gap-4 max-md:grid-rows-2 max-md:grid-cols-1 min-h-80'>
          <div className='overflow-y-auto overflow-x-hidden rounded-md'>
            <Paper className='h-full p-4'>
              <ComingSoon message='Pie Chart (Category Record)'/>
            </Paper>
          </div>
          <div>
            <Paper className='h-full p-4'>
              <TableBarChart data={cleanData.flatMap(x => x.tables.flatMap(y => ({...y, category: x.category})))}/>
              {/* <ComingSoon message='Bar Chart (Records per Table)'/> */}
            </Paper>
          </div>
        </div>

      </div>
    )
  }
}