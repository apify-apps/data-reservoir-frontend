import BottomNavigation from '@/components/app/bottom-nav/BottomNavigation';
import QueryComponent from '@/components/app/QueryComponent';
import { Button } from 'flowbite-react';
import React from 'react'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full h-full min-h-[95svh] p-4 bg-bluish pb-24'>
      <QueryComponent>
        {children}
        <BottomNavigation/>
      </QueryComponent>
    </div>
  )
}
