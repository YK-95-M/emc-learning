'use client'
import React, { useState } from 'react'

interface BeforeAfterComparisonProps {
  before: { label: string; visual: React.ReactNode; description: string }
  after: { label: string; visual: React.ReactNode; description: string }
  title?: string
}

export default function BeforeAfterComparison({ before, after, title }: BeforeAfterComparisonProps) {
  const [showing, setShowing] = useState<'before' | 'after'>('before')
  const current = showing === 'before' ? before : after

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {title && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
      )}

      {/* Toggle */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setShowing('before')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            showing === 'before'
              ? 'bg-red-50 text-red-700 border-b-2 border-red-500'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          ✗ {before.label}
        </button>
        <button
          onClick={() => setShowing('after')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            showing === 'after'
              ? 'bg-green-50 text-green-700 border-b-2 border-green-500'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          ✓ {after.label}
        </button>
      </div>

      {/* Visual */}
      <div className="p-6 flex justify-center bg-gray-50 min-h-[160px] items-center">
        {current.visual}
      </div>

      {/* Description */}
      <div className={`px-4 py-3 ${showing === 'before' ? 'bg-red-50' : 'bg-green-50'}`}>
        <p className={`text-sm ${showing === 'before' ? 'text-red-700' : 'text-green-700'}`}>
          {current.description}
        </p>
      </div>
    </div>
  )
}
