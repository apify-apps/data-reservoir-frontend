import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { cache } from 'react'
import Section from '@/components/common/paper/Section';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import SimpleImage from '@/components/common/SimpleImage';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { convertTheSimsRarity } from '@/utilities/general';
import { notFound } from 'next/navigation';
import { getStaticParams } from '@/utilities/static';

interface FourPCMetalDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<ITheSimsResponse['four-pc-metal']>(API_ROUTE.THE_SIMS.FOUR_PC_METAL);

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['four-pc-metal-complete'] | null>(`${API_ROUTE.THE_SIMS.FOUR_PC_METAL}/${id}`));

export async function generateMetadata(props: FourPCMetalDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `The Sims Four PC Metal - ${post.data.name} - Data Reservoir`
  }
}

export default async function FourPCMetalDetail(props: FourPCMetalDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-four-pc-metal-detail'], { label: data.name }]}>
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
          Rarity: convertTheSimsRarity(data.rarity),
          Value: data.value,
          Description: data.description,
        }} />
      </Section>

      {/* Elements */}
      {data.elements.length > 0 && <Grids name="Elements" data={data.elements} />}
    </Section>
  )
}

function Grids({ name, data }: { name: string, data: { name: string, image: string, id: string }[] }) {
  return (
    <Section name={name} variant='h6' className="flex flex-col gap-2">
      <Grid container columns={{ md: 3, xs: 1 }} spacing={'.5rem'}>
        {
          data.map(ing => (
            <Grid size={1} key={ing.id}>
              <Paper className="flex overflow-hidden">
                <Link passHref href={`/the-sims/four-pc-element/${ing.id}`}>
                  <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                    <SimpleImage quality={50} src={ing.image} alt={ing.name}/>
                  </Box>
                </Link>
                <Box className="grow flex">
                  <Box className="grow p-3">
                    <Typography className=''>{ing.name}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  );
}