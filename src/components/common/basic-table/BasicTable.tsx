import React from 'react'
import { createColumnHelper, useReactTable } from '@tanstack/react-table'

export interface BasicTableProps {

}

interface Test {
  name: string,
  number: number
}

export default function BasicTable() {

  const helper = createColumnHelper<Test>();


  return (
    <div>BasicTable</div>
  )
}
