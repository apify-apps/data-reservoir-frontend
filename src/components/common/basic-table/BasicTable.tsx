import React, { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, RowData, useReactTable } from '@tanstack/react-table'

export interface BasicTableProps<T> {
  data: T[],
  columns: ColumnDef<T, any>[],
}

export default function BasicTable<T>(props : BasicTableProps<T>) {

  // const helper = createColumnHelper<Test>();

  const cachedColumn = useMemo(() => props.columns, [props.columns]);
  const [cachedData, _] = useState(props.data);

  const reactTable = useReactTable({
    data: cachedData,
    columns: cachedColumn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <table className='relative'>
      <thead className='sticky top-0 bg-bluish-200'>
        {
          reactTable.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {
                headerGroup.headers.map(header => {
                  let sortSymbol =
                    !header.column.getIsSorted() ? '⏸' : 
                    header.column.getIsSorted() === 'asc' ? '🔼' : '🔽';
                  return (
                    <th key={header.id} className='px-2'>
                      <div>
                        <div className='flex justify-center gap-2'>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {
                            header.column.columnDef.meta?.enableSorting && (
                              <div title='Hold shift while clicking for multisort' className='cursor-pointer hover:bg-slate-700 rounded-sm content-center' onClick={header.column.getToggleSortingHandler()}>
                                {sortSymbol}
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </th>
                  )
                })
              }
            </tr>
          ))
        }
      </thead>
      <tbody>
        {
          reactTable.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {
                row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='px-2 py-2'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

function BasicTableFilter() {
  
}
