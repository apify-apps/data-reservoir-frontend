import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { cache } from 'react'
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { ISeasonsResponse } from '@/model/response/seasons';
import { getStaticParams } from '@/utilities/static';

interface UtensilDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<ISeasonsResponse['ds-mineral-utensil']>(API_ROUTE.SEASONS.DS_MINERAL_UTENSIL);

const grabDetail = cache(async (id: string) => await grabData<ISeasonsResponse['ds-mineral-utensil'] | null>(`${API_ROUTE.SEASONS.DS_MINERAL_UTENSIL}/${id}`));

export async function generateMetadata(props: UtensilDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Seasons DS Mineral Utensil - ${post.data.name} - Data Reservoir`
  }
}

export default async function UtensilDetail(props: UtensilDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['seasons-ds-mineral-utensil-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <Image src={data.image} alt={data.name} fill className='object-contain' />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Price: data.price,
        }} />
      </Section>
    </Section>
  )
}
