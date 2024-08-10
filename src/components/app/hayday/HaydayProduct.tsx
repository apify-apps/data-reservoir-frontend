import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from 'flowbite-react';
import { getStaticIndex, multiSelectFilter } from '@/utilities/table';
import { HayDayProductResponse } from '@/model/response/hayday';

export default function HaydayProduct() {
  const { isLoading, data } = useQuery({
    queryKey: ["hayday-product"],
    queryFn: async () => {
      let j = await request<HayDayProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.HAY_DAY.PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<HayDayProductResponse>();
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
      enableSorting: true,
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
    colHelper.accessor('price', {
      cell: p => p.getValue(),
      header: "Price",
      enableSorting: true
    }),
    colHelper.accessor('level', {
      cell: p => p.getValue(),
      header: "Level",
      enableSorting: true
    }),
    colHelper.accessor('time', {
      cell: p => {
        let s = p.getValue()
        let d = Math.trunc(s / (3600 * 24));

        s %= (3600 * 24);
        let h = Math.trunc(s / 3600).toString().padStart(2, "0");

        s %= 3600
        let m = Math.trunc(s / 60).toString().padStart(2, "0");

        s %= 60;
        let ns = s.toString().padStart(2, "0")
        if (d > 0) return `${d}:${h}:${m}:${ns}`;
        else return `${h}:${m}:${ns}`;
      },
      header: "Time",
      enableSorting: true
    }),
    colHelper.accessor('isRaw', {
      cell: p => (
        <div className='flex justify-center'>
          <Checkbox className='w-5 h-5' color='gray' disabled checked={p.getValue()}/>
        </div>
      ),
      header: "Raw",
      enableSorting: true
    }),
    colHelper.accessor('price', {
      cell: p => p.getValue(),
      header: "Price",
      enableSorting: true
    }),
    colHelper.accessor('xp', {
      cell: p => p.getValue(),
      header: "XP",
      enableSorting: true
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
