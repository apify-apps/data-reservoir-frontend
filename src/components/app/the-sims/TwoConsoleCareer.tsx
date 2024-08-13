import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsTwoConsoleCareerResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { getStaticIndex, multiSelectFilter } from '@/utilities/table';
import { SIMOLEON_ICON } from '@/utilities/char';

export default function TwoConsoleCareer() {
  const { isLoading, data } = useQuery({
    queryKey: ["the-sims-two-console-career"],
    queryFn: async () => {
      let j = await request<TheSimsTwoConsoleCareerResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.TWO_CONSOLE_CAREER,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<TheSimsTwoConsoleCareerResponse>();
  const columns = [
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>)
      // cell: p => (<div className='text-center font-bold'>{p.row.index + 1}</div>),
    }),
    colHelper.accessor('career', {
      cell: p => p.getValue(),
      header: "Career",
      filterFn: multiSelectFilter,
      enableSorting: true,
      meta: {
        filterVariant: 'select'
      }
    }),
    colHelper.accessor('level', {
      cell: p => p.getValue(),
      header: "Level",
      filterFn: multiSelectFilter,
      enableSorting: true,
      meta: {
        filterVariant: 'select'
      }
    }),
    colHelper.accessor('job', {
      cell: p => p.getValue(),
      header: "Job",
      filterFn: 'includesString',
      meta: {
        filterVariant: 'search'
      }
    }),
    colHelper.accessor('salary', {
      cell: p => `${SIMOLEON_ICON}${p.getValue()}`,
      header: "Salary",
      enableSorting: true
    }),
    colHelper.accessor('description', {
      cell: p => (
        <span title={p.getValue()} className='text-xs text-justify line-clamp-6'>{p.getValue()}</span>
      ),
      header: "Description"
    }),
  ];

  return (
    <Paper className='max-h-[800px] overflow-auto rounded-md'>
      <div className='p-5 inline-block min-w-full'>
      { (isLoading || !data) ? <Loading/> : <BasicTable data={data} columns={columns}/> }
      </div>
    </Paper>
  )
}
