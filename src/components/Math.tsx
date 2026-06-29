'use client'

import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathProps {
  math: string
}

export function InlineMath({ math }: MathProps) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: false,
  })
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export function BlockMath({ math }: MathProps) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: true,
  })
  return (
    <div
      className="my-4 overflow-x-auto text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
