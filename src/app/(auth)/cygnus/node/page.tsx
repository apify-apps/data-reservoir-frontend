import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoProductForm, { NodeFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';

export const metadata: Metadata = {
  title: 'Cygnus Node - Data Reservoir'
}

export default async function TwoProduct() {
  const sp = await getSearchParam<NodeFormSchema>();
  const { data, pagination } = await grabData<ICygnusResponse['node'][]>(API_ROUTE.CYGNUS.NODE, {
    name: sp.name ?? "",
    category: sp.category,
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Cygnus Node' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-node']}>
      <TwoProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data.map(x => ({ ...x, image: x.image[0] }))} link='/cygnus/node'/>
    </Section>
  )
}
