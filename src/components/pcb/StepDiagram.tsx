'use client'
import React, { useState } from 'react'

interface Step {
  title: string
  description: string
  visual: React.ReactNode  // SVG or JSX illustration
}

interface StepDiagramProps {
  steps: Step[]
  title?: string
}

export default function StepDiagram({ steps, title }: StepDiagramProps) {
  const [current, setCurrent] = useState(0)
  const step = steps[current]

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {title && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
      )}

      {/* Step indicators */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-100 overflow-x-auto">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              i === current ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
              i === current ? 'bg-white text-blue-600' : 'bg-gray-300 text-gray-600'
            }`}>{i + 1}</span>
            {s.title}
          </button>
        ))}
      </div>

      {/* Visual */}
      <div className="p-6 flex justify-center bg-gray-50 min-h-[160px] items-center">
        {step.visual}
      </div>

      {/* Description */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-700">{step.description}</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
        >
          ← 前へ
        </button>
        <span className="text-xs text-gray-400">{current + 1} / {steps.length}</span>
        <button
          onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
          disabled={current === steps.length - 1}
          className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
        >
          次へ →
        </button>
      </div>
    </div>
  )
}
