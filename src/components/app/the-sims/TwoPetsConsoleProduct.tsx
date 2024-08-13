import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsTwoPetsConsoleProductResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { getStaticIndex, multiSelectFilter } from '@/utilities/table';
import { SIMOLEON_ICON } from '@/utilities/char';

export default function TwoPetsConsoleProduct() {
  const { isLoading, data } = useQuery({
    queryKey: ["the-sims-two-pets-console-product"],
    queryFn: async () => {
      let j = await request<TheSimsTwoPetsConsoleProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<TheSimsTwoPetsConsoleProductResponse>();
  const columns = [
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>),
    }),
    colHelper.display({
      id: "image",
      cell: p => (
        <div className='flex justify-center w-16 h-16'>
          <img className='w-16 h-16 rounded-md' src={p.row.original.image} alt={p.row.original.name}></img>
        </div>
      ),
      header: "Image"
    }),
    colHelper.accessor('name', {
      cell: p => p.getValue(),
      header: "Name",
      filterFn: 'includesString',
      meta: {
        filterVariant: 'search'
      }
    }),
    colHelper.accessor('price', {
      cell: p => `${SIMOLEON_ICON}${p.getValue()}`,
      header: "Price"
    }),
    colHelper.accessor('category', {
      cell: p => p.getValue(),
      header: "Category",
      filterFn: multiSelectFilter,
      enableSorting: true,
      meta: {
        filterVariant: 'select'
      }
    }),
    colHelper.accessor('bladder', {
      cell: p => p.getValue(),
      header: "Bladder",
      enableSorting: true
    }),
    colHelper.accessor('energy', {
      cell: p => p.getValue(),
      header: "Energy",
      enableSorting: true
    }),
    colHelper.accessor('hunger', {
      cell: p => p.getValue(),
      header: "Hunger",
      enableSorting: true
    }),
    colHelper.accessor('description', {
      cell: p => (
        <span title={p.getValue()} className='text-xs text-justify line-clamp-4'>{p.getValue()}</span>
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
