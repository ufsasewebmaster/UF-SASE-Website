'use client'

import type { CSSProperties, FC, PropsWithChildren } from 'react'

type PageProps = Pick<CSSProperties, 'gap' | 'padding' | 'alignItems' | 'justifyContent'> & {
  style?: CSSProperties | undefined
}

export const Page: FC<PropsWithChildren<PageProps>> = ({
  alignItems,
  children,
  gap = '1rem',
  justifyContent,
  padding = '1rem',
  style,
}) => {
  return (
    <div
      className="Page"
      data-testid="Page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        padding,
        alignItems,
        justifyContent,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
