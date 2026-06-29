'use client'

import { useState } from 'react'

interface TooltipProps {
  term: string
  definition: string
  children: React.ReactNode
}

export default function Tooltip({ definition, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dotted border-gray-500 cursor-help"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
      >
        {children}
      </span>
      {visible && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 shadow-lg pointer-events-none">
          {definition}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </span>
      )}
    </span>
  )
}
