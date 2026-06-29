import React from 'react'

interface CalloutProps {
  type: 'point' | 'warning' | 'tip'
  title?: string
  children: React.ReactNode
}

const styles = {
  point: {
    wrapper: 'border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r',
    icon: '●',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    textColor: 'text-blue-700',
  },
  warning: {
    wrapper: 'border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r',
    icon: '⚠',
    iconColor: 'text-orange-600',
    titleColor: 'text-orange-800',
    textColor: 'text-orange-700',
  },
  tip: {
    wrapper: 'border-l-4 border-green-500 bg-green-50 p-4 rounded-r',
    icon: '✓',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    textColor: 'text-green-700',
  },
}

export default function Callout({ type, title, children }: CalloutProps) {
  const s = styles[type]
  return (
    <div className={`my-4 ${s.wrapper}`}>
      <div className="flex items-start gap-2">
        <span className={`text-lg leading-none mt-0.5 ${s.iconColor}`}>{s.icon}</span>
        <div>
          {title && (
            <p className={`font-semibold text-sm mb-1 ${s.titleColor}`}>{title}</p>
          )}
          <div className={`text-sm ${s.textColor}`}>{children}</div>
        </div>
      </div>
    </div>
  )
}
