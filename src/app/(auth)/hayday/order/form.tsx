'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { formOptions } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import React from 'react'
import { z } from 'zod'
import { MonthsArray } from '@/constant/date';
import { makeSearchParam } from '@/utilities/general';

const dj = new Date().getFullYear();
const yearChoices = [dj, dj - 1].reduce<{ label: string, value: number }[]>((acc, curr) => [...acc, { label: curr.toString(), value: curr }], []);

const schema = z.object({
  year: z.union([z.null(), z.number().gte(2020)]).optional(),
  month: z.union([z.null(), z.number().gte(1).lte(12)]).optional()
});

export type HaydayOrderFormSchema = z.infer<typeof schema>;

export default function HaydayOrderForm({ param }: { param: HaydayOrderFormSchema }) {
  const defaultValues = formOptions({
    defaultValues: {
      month: param.month,
      year: param.year
    } as HaydayOrderFormSchema,
    validators: {
      onChange: schema
    }
  });

  const router = useRouter();
  const form = useAppForm({
    ...defaultValues,
    onSubmit: async ({ value }) => {
      router.push(`/hayday/order?${makeSearchParam(value)}`);
    }
  });

  return (
    <Box
      component='form'
      onSubmit={e => { e.preventDefault(); e.stopPropagation(); form.handleSubmit() }}
      className="flex flex-col grow gap-2"
    >
      <Box className="gap-2 flex grow">
        <form.AppField name='month' validators={{
          onChangeListenTo: ['year'],
          onChange: ({ value, fieldApi }) => {
            return (!fieldApi.form.getFieldValue('year') && !!value) ? { message: 'Both must be filled' } : undefined;
          }
        }} children={(field) => (
          <field.SimpleSelect label='Month' choices={MonthsArray}/>
        )} />
        <form.AppField name='year' validators={{
          onChangeListenTo: ['month'],
          onChange: ({ value, fieldApi }) => {
            return (!fieldApi.form.getFieldValue('month') && !!value) ? { message: 'Both must be filled' } : undefined;
          }
        }} children={(field) => (
          <field.SimpleSelect label='Year' choices={yearChoices}/>
        )} />
        <form.AppForm>
          <form.SimpleResetButton label='Reset'/>
        </form.AppForm>
        <form.AppForm>
          <form.SimpleSubmitButton label='Search'/>
        </form.AppForm>
      </Box>
    </Box>
  )
}
