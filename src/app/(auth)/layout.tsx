import BottomNavigation from '@/components/app/bottom-nav/BottomNavigation';
import QueryComponent from '@/components/app/QueryComponent';
import React from 'react'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full h-full p-4 bg-bluish'>
      
      <QueryComponent>
        {children}
        <BottomNavigation/>
      </QueryComponent>
    </div>
  )
}
