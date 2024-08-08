import QueryComponent from '@/components/app/QueryComponent';
import React from 'react'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full min-h-[100svh] p-4'>
      <QueryComponent>
        {children}
      </QueryComponent>
    </div>
  )
}
