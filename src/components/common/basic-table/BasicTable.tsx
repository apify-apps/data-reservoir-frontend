import React, { useMemo, useState } from 'react'
import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, RowData, useReactTable } from '@tanstack/react-table'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { BiCheck } from 'react-icons/bi';
import classNames from 'classnames';

export interface BasicTableProps<T> {
  data: T[],
  columns: ColumnDef<T, any>[],
}

export default function BasicTable<T>(props : BasicTableProps<T>) {

  // const helper = createColumnHelper<Test>();

  const cachedColumn = useMemo(() => props.columns, [props.columns]);
  const [cachedData, _] = useState(props.data);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const reactTable = useReactTable({
    data: cachedData,
    columns: cachedColumn,
    state: {
      columnFilters
    },
    enableColumnFilters: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <table className='relative min-h-96 rounded-md overflow-hidden'>
      <thead className='sticky top-0 bg-bluish-200'>
        {
          reactTable.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {
                headerGroup.headers.map(header => {
                  let sortSymbol =
                    !header.column.getIsSorted() ? '⏸' : 
                      header.column.getIsSorted() === 'asc' ? '🔼' : '🔽';
                  
                  const v = header.column.columnDef.meta?.filterVariant
                  const hasFilter = header.column.getCanFilter() && !!v;
                  return (
                    <th key={header.id} className='p-2'>
                      <div className={classNames('flex flex-col gap-2', {
                        'min-w-32': hasFilter
                      })}>
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
                        <div>
                          {(v === 'select' && hasFilter) && <BasicTableFilter column={header.column}/>}
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

interface BasicTableFilterProps<T> {
  column: Column<T, any>
}

function BasicTableFilter<T>(props: BasicTableFilterProps<T>) {
  const uniq = props.column.getFacetedUniqueValues();
  const pickedValues = props.column.getFilterValue() ? props.column.getFilterValue() as (string | number)[] : [];

  console.log(props.column);
  console.log((pickedValues));
  console.log(props.column.getFilterValue());

  const uniqueValues = useMemo(() => {
    return Array.from<string | number>(uniq.keys()).sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
  }, [uniq]);

  if (uniqueValues.length === 0) return (<></>);

  return (
    <Listbox value={pickedValues} multiple onChange={e => props.column.setFilterValue(e)}>
      <div className='relative'>
        <ListboxButton className='text-sm font-normal bg-gray-700 rounded-sm w-full'>{pickedValues.length} Selected</ListboxButton>
        <ListboxOptions className={'z-50 absolute bottom-auto bg-bluish w-full rounded-md max-h-40 overflow-y-scroll scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600'}>
          {
            uniqueValues.map(x => (
              <ListboxOption className='px-2 py-1 text-left cursor-pointer' value={x} key={x}>
                <div className='hover:bg-gray-600 w-full p-1 rounded-md font-light text-sm flex gap-3'>
                  {pickedValues.includes(x) &&
                    <div className='items-center text-center flex'>
                      <BiCheck className='text-normal'/>
                    </div>
                  }
                  <span className='text-xs'>{x}</span>
                </div>
              </ListboxOption>
            ))
          }
        </ListboxOptions>
      </div>
    </Listbox>
  )

}
