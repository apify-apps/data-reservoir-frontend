import classNames from 'classnames'
import React, { ReactNode } from 'react'

export default function Paper({children, className}: {children: ReactNode, className?: string}) {
  return (
    <div className={classNames('text-white bg-blackish flex flex-col justify-center rounded-md', className ?? "")}>
      {children}
    </div>
  )
}
