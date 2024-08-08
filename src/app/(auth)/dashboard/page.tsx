'use client'

import { DashboardResponse, DashboardTableResponse } from '@/model/response/dashboard';
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash';
import classNames from 'classnames'
import { produce } from 'immer';
import { Table } from 'flowbite-react'; 
import Paper from '@/components/common/paper/Paper';
import { Chart } from 'chart.js';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import * as d3 from 'd3'
import ComingSoon from '@/components/common/coming-soon/ComingSoon';

interface DashboardPageState {
  pickedCategories: string[]
}

export default function DashboardPage() {

  const [state, setState] = useState<DashboardPageState>({
    pickedCategories: []
  });

  let { isLoading, data } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      let j = await (await fetch("/api/v1/dashboard")).json();
      return j as DashboardResponse[]
    }
  });

  if (isLoading || !data) return (<p className='text-white'>Loading...</p>)
  else {

    let cleanData = data.filter(x => state.pickedCategories.length === 0 || state.pickedCategories.includes(x.category));
    let categories = data.map(x => x.category);
    let totalCategory = new Set(cleanData.map(x => x.category)).size;
    let totalTable = cleanData.length;
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
            <CategoryPicker categories={categories} onClickCategory={onClickCategory} pickedCategories={state.pickedCategories}/>
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
        <div className='grid grid-cols-2 gap-4 max-md:grid-rows-2 max-md:grid-cols-1'>
          <div className='overflow-y-auto overflow-x-hidden rounded-md'>
            <Paper className='p-4 h-80 !justify-start'>
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
                      <tr className='border-gray-700 border-b hover:bg-slate-700' key={idx}>
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
          <div className='row-span-4 h-80 max-md:h-60'>
            <Paper className='h-full'>
              <ComingSoon message='Tree Map'/>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

function TreeMapChart(props: {
  data: DashboardResponse[]
}) {
  return (<></>)
}

function CategoryPicker(props: {
  categories: string[],
  pickedCategories: string[]
  onClickCategory: (category: string, enabled: boolean) => void
}) {
  return (
    <div className='grid grid-cols-3 gap-y-4 gap-x-1'>
      {
        props.categories.map(c => (
          <div className={classNames('p-2 rounded-sm hover:bg-slate-800 border-gray-600 border-2 cursor-pointer', {
            'bg-slate-700 hover:bg-slate-500': props.pickedCategories.includes(c)
          })}
            key={c}
            onClick={() => props.onClickCategory(c, !props.pickedCategories.includes(c))}
          >
            {c}
          </div>
        ))
      }
    </div>
  )
}
