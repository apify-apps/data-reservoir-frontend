'use client'

import { DashboardResponse } from '@/model/response/dashboard';
import { Button, Grid, Paper, Title, Text, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import _ from 'lodash';

export default function DashboardPage() {

  let { isLoading, data } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      let j = await (await fetch("/api/v1/dashboard")).json();
      return j as DashboardResponse[]
    }
  });

  if (isLoading || !data) return (<p>Loading...</p>)
  else {

    let totalCategory = new Set(data.map(x => x.category)).size;
    let totalTable = data.length;
    let totalData = data.map(x => x.rowCount).reduce((prev, current) => prev + current, 0);

    let dataByCategory = _.chain(data)
      .groupBy(x => x.category)
      .map((v, k) => ({ category: k, count: v.map(c => c.rowCount).reduce((a, c) => a + c, 0) }))
      .orderBy(x => x.count, 'desc')
      .value();

    return (
      <div className='flex flex-col gap-4'>
        {/* Layer 1 : Angka2 */}
        <div className='grid grid-rows-1 grid-cols-3 gap-4'>
          <Paper shadow='xs' p='lg' bg='gray'>
            <p className='text-xl'>Categories</p>
            <h1 className='text-5xl text font-bold'>{totalCategory}</h1>
          </Paper>
          <Paper shadow='xs' p='lg' bg='gray'>
            <p className='text-xl'>Tables</p>
            <h1 className='text-5xl text font-bold'>{totalTable}</h1>
          </Paper>
          <Paper shadow='xs' p='lg' bg='gray'>
            <p className='text-xl'>Records</p>
            <h1 className='text-5xl text font-bold'>{totalData}</h1>
          </Paper>
        </div>

        {/* Layer 2 : Chart and Table */}
        <div className='grid grid-rows-9 grid-cols-9'>
          <div className='row-span-4 col-span-4'>
            <Paper shadow='xs' p='lg' bg='gray'>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>No.</Table.Th>
                    <Table.Th>Category</Table.Th>
                    <Table.Th>Records</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {
                    dataByCategory.map((el, idx) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{idx + 1}</Table.Td>
                        <Table.Td>{el.category}</Table.Td>
                        <Table.Td>{el.count}</Table.Td>
                      </Table.Tr>
                    ))
                  }
                </Table.Tbody>
              </Table>
            </Paper>
          </div>
        </div>

      </div>
    )
  }
}
