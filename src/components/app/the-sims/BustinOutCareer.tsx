import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsBustinOutCareerResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
// import { multiSelectFilter } from '@/utilities/table';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from 'flowbite-react';

export default function BustinOutCareer() {
  const { isLoading, data } = useQuery({
    queryKey: ["the-sims-bustin-out-career"],
    queryFn: async () => {
      let j = await request<TheSimsBustinOutCareerResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.BUSTIN_OUT_CAREER,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<TheSimsBustinOutCareerResponse>();
  const columns = [
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1}</div>)
      // cell: p => (<div className='text-center font-bold'>{p.row.index + 1}</div>),
    }),
    colHelper.accessor('career', {
      cell: p => p.getValue(),
      header: "Career",
      filterFn: 'arrIncludesSome',
      meta: {
        enableSorting: true,
        filterVariant: 'select'
      }
    }),
    colHelper.accessor('level', {
      cell: p => p.getValue(),
      header: "Level",
      filterFn: (row, colIdx, pickedValue: (string | number)[]) => {
        let v = row.getValue(colIdx);
        return pickedValue.length === 0 || pickedValue.includes(v as (string | number));
      },
      meta: {
        enableSorting: true,
        filterVariant: 'select'
      }
    }),
    colHelper.accessor('job', {
      cell: p => p.getValue(),
      header: "Job"
    }),
    colHelper.accessor('salary', {
      cell: p => `§${p.getValue()}`,
      header: "Salary",
      meta: {
        enableSorting: true
      }
    }),
    colHelper.accessor('description', {
      cell: p => (
        <span title={p.getValue()} className='text-xs text-justify line-clamp-6'>{p.getValue()}</span>
      ),
      header: "Description"
    }),
  ];

  if (isLoading || !data) return (<Loading />);
  return (
    <Paper className='max-h-[800px] overflow-auto rounded-md'>
      <div className='p-5 inline-block'>
        <BasicTable data={data} columns={columns}/>
      </div>
    </Paper>
  )
}
