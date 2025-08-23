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

interface DSBazaarRecipeDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ISeasonsResponse['ds-bazaar-recipe'] | null>(`${API_ROUTE.SEASONS.DS_BAZAAR_RECIPE}/${id}`));

export async function generateMetadata(props: DSBazaarRecipeDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Seasons DS Bazaar Recipe - ${post.data.name} - Data Reservoir`
  }
}

export default async function DSBazaarRecipeDetail(props: DSBazaarRecipeDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['seasons-ds-bazaar-recipe-detail'], { label: data.name }]}>
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
          Category: data.category,
          Description: data.description,
          "Low Price": data.lowPrice,
          "Medium Price": data.mediumPrice,
          "High Price": data.highPrice
        }} />
      </Section>
    </Section>
  )
}
