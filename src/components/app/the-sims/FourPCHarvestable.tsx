import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsFourPCHarvestableResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
// import { multiSelectFilter } from '@/utilities/table';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from 'flowbite-react';

export default function FourPCHarvestable() {
  const { isLoading, data } = useQuery({
    queryKey: ["the-sims-four-pc-harvestable"],
    queryFn: async () => {
      let j = await request<TheSimsFourPCHarvestableResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.FOUR_PC_HARVESTABLE,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<TheSimsFourPCHarvestableResponse>();
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
    colHelper.accessor('form', {
      cell: p => p.getValue(),
      header: "Form",
      filterFn: 'arrIncludesSome',
      meta: {
        enableSorting: true,
        filterVariant: 'select'
      }
    }),
    colHelper.display({
      cell: p => `${p.row.original.baseValue} - ${p.row.original.perfectValue}`,
      header: "Base - Perfect Value",
      meta: {
        enableSorting: true
      }
    }),
    colHelper.accessor('verticalGarden', {
      cell: p => (
        <div className='flex justify-center'>
          <Checkbox className='w-5 h-5' color='gray' disabled checked={p.getValue()}/>
        </div>
      ),
      header: "Vertical Garden",
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
    <Paper className='max-h-[800px] overflow-auto rounded-md'>
      <div className='p-5 inline-block'>
        <BasicTable data={data} columns={columns}/>
      </div>
    </Paper>
  )
}
