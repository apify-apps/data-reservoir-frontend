import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsCastawayProductResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
// import { multiSelectFilter } from '@/utilities/table';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Checkbox } from 'flowbite-react';
import React, { useMemo, useState } from 'react'

interface ColumnFilter {
  id: string,
  value: string
}
type ColumnFilterState = ColumnFilter[];

export default function CastawayProductNew() {
  const { isLoading, data } = useQuery({
    queryKey: ["the-sims-castaway-product"],
    queryFn: async () => {
      let j = await request<TheSimsCastawayProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.CASTAWAY_PRODUCT,
      });
      return (j?.data?.slice(0, 50) ?? []);
    }
  });

  const colHelper = createColumnHelper<TheSimsCastawayProductResponse>();
  const columns = [
    colHelper.display({
      id: 'index',
      header: "#",
      cell: p => (<div className='text-center font-bold'>{p.row.index + 1}</div>),
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
      header: "Name"
    }),
    colHelper.accessor('category', {
      cell: p => p.getValue(),
      header: "Category",
      filterFn: (a, b, c: string[]) => {
        return c.length === 0 || c.includes(b);
      },
      enableColumnFilter: true,
      meta: {
        enableSorting: true,
        filterVariant: 'select'
      }
    }),
    colHelper.accessor('bladder', {
      cell: p => p.getValue(),
      header: "Bladder",
      meta: {
        enableSorting: true
      }
    }),
    colHelper.accessor('energy', {
      cell: p => p.getValue(),
      header: "Energy",
      meta: {
        enableSorting: true
      }
    }),
    colHelper.accessor('hunger', {
      cell: p => p.getValue(),
      header: "Hunger",
      meta: {
        enableSorting: true
      }
    }),
    colHelper.accessor('eatenRaw', {
      cell: p => (
        <div className='flex justify-center'>
          <Checkbox className='w-5 h-5' color='gray' disabled checked={p.getValue()}/>
        </div>
      ),
      header: "Eaten Raw",
      meta: {
        enableSorting: true
      }
    }),
    colHelper.accessor('description', {
      cell: p => (
        <span title={p.getValue()} className='text-xs text-justify line-clamp-4'>{p.getValue()}</span>
      ),
      header: "Description"
    }),
  ];

  if (isLoading || !data) return (<Loading />);
  return (
    <Paper className='max-h-[800px] overflow-auto'>
      <div className='p-5 inline-block'>
        <BasicTable data={data} columns={columns}/>

      </div>
    </Paper>
  )
}
