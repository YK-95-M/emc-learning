import React from 'react'

interface ComponentCardProps {
  name: string
  symbol: React.ReactNode  // SVG symbol
  illustration: React.ReactNode  // SVG real-world illustration
  role: string
  rating?: string
  tip?: string
}

export default function ComponentCard({ name, symbol, illustration, role, rating, tip }: ComponentCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        <div className="p-3 flex flex-col items-center justify-center gap-1">
          <span className="text-xs text-gray-400 font-medium">回路記号</span>
          <div className="w-20 h-16 flex items-center justify-center">{symbol}</div>
        </div>
        <div className="p-3 flex flex-col items-center justify-center gap-1">
          <span className="text-xs text-gray-400 font-medium">実物イメージ</span>
          <div className="w-20 h-16 flex items-center justify-center">{illustration}</div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{role}</p>
        {rating && <p className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-1 mb-1">📐 {rating}</p>}
        {tip && <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">💡 {tip}</p>}
      </div>
    </div>
  )
}
