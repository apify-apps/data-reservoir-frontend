import ComingSoon from '@/components/common/coming-soon/ComingSoon'
import Paper from '@/components/common/paper/Paper'
import React from 'react'

export default function DocumentationPage() {
  return (
    <div>
      <Paper className='h-full p-4 min-h-[82svh]'>
        <ComingSoon message='Documentation Page (API and things)'/>
      </Paper>
    </div>
  )
}
