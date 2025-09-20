import { API_ROUTE } from '@/constant/api-route'
import { IDashboardResponse } from '@/model/response/dashboard'
import { grabData } from '@/utilities/http'
import React from 'react'
import { Metadata } from 'next'
import Section from '@/components/common/paper/Section'
import { DATASETS_AVAILABLE } from '@/constant/data'
import SimpleRecordTableCards from '@/components/common/simple-dashboard/SimpleRecordTableCards'
import SimpleBarTableChart from '@/components/common/simple-dashboard/SimpleBarTableChart'
import SimpleQuickLink from '@/components/common/simple-dashboard/SimpleQuickLink'

export const metadata: Metadata = {
  title: 'Transaction - Data Reservoir'
}

export default async function Page() {
  const { data } = await grabData<IDashboardResponse>(`${API_ROUTE.DASHBOARD}/transaction`);

  return (
    <Section name="Transaction" variant='h4'>
      <SimpleRecordTableCards response={data}/>
      <SimpleBarTableChart response={data}/>
      <SimpleQuickLink quickLink={DATASETS_AVAILABLE['transaction']} columns={1}/>
    </Section>
  )
}