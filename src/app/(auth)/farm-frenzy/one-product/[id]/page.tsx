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
import { IFarmFrenzyResponse } from '@/model/response/farm-frenzy';
import SimpleImage from '@/components/common/SimpleImage';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { getStaticParams } from '@/utilities/static';

interface OneProductDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<IFarmFrenzyResponse['one']>(API_ROUTE.FARM_FRENZY.ONE_PRODUCT);

const grabDetail = cache(async (id: string) => await grabData<IFarmFrenzyResponse['one-detail'] | null>(`${API_ROUTE.FARM_FRENZY.ONE_PRODUCT}/${id}`));

export async function generateMetadata(props: OneProductDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Farm Frenzy One Product - ${post.data.name} - Data Reservoir`
  }
}

export default async function OneProductDetail(props: OneProductDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['farm-frenzy-one-product-detail'], { label: data.name }]}>
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
          Size: data.size
        }} />
      </Section>

      {/* Recipe */}
      {data.recipe && <Grids name='Recipe' data={[data.recipe]} />}

      {/* Used In */}
      {data.usage && <Grids name='Usage' data={[data.usage]} />}
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
                <Link passHref href={`/farm-frenzy/one-product/${ing.id}`}>
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