import ComingSoon from '@/components/common/coming-soon/ComingSoon'
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { DashboardRequest } from '@/model/request/dashboard';
import { DashboardResponse } from '@/model/response/dashboard';
import { TheSimsCastawayProductResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';
import { Checkbox } from 'flowbite-react';
import React, { useMemo, useState } from 'react'

export default function CastawayProduct() {
  const [data, setData] = useState<TheSimsCastawayProductResponse[]>([]);
  const { isLoading } = useQuery({
    queryKey: ["the-sims-castaway-product"],
    queryFn: async () => {
      let j = await request<TheSimsCastawayProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.CASTAWAY_PRODUCT,
      });
      setData(j.data ?? []);
    }
  });

  const colHelper = createColumnHelper<TheSimsCastawayProductResponse>();
  const columns = useMemo(() => ([
    colHelper.display({
      id: 'index',
      header: "#",
      cell: p => (<div className='text-center font-bold'>{p.row.index + 1}</div>),
    }),
    colHelper.display({
      id: "image",
      cell: p => (
        <div className='flex justify-center w-16 h-16'>
          <img className='w-16 h-16 rounded-md' src={p.row.original.image}></img>
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
      header: "Category"
    }),
    colHelper.accessor('bladder', {
      cell: p => p.getValue(),
      header: "Bladder"
    }),
    colHelper.accessor('energy', {
      cell: p => p.getValue(),
      header: "Energy"
    }),
    colHelper.accessor('hunger', {
      cell: p => p.getValue(),
      header: "Hunger"
    }),
    colHelper.display({
      cell: p => (
        <div className='flex justify-center'>
          <Checkbox className='w-5 h-5' color='gray' disabled checked={p.row.original.eatenRaw}/>
        </div>
      ),
      header: "Eaten Raw",
      sortingFn: (a, b) => 1
    }),
    colHelper.accessor('description', {
      cell: p => (
        <span title={p.getValue()} className='text-sm text-justify line-clamp-3'>{p.getValue()}</span>
      ),
      header: "Description"
    }),
    // colHelper.accessor(x => x.image , {
    //   id: "image",
    //   cell: p => (<img className='w-8 h-8' src={p}></img>),
    //   header: "Image"
    // })
  ]), [colHelper]);

  const table = useReactTable<TheSimsCastawayProductResponse>({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel()
  })


  if (isLoading || !data) return (<Loading />);
  return (
    <Paper className='p-12'>
      <table>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='px-2 py-2'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </Paper>
  )
}
