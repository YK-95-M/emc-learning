'use client'
import { useEffect, useRef, useState } from 'react'

interface CurrentFlowAnimationProps {
  speed?: number  // 1-5, default 3
  color?: string  // default '#ef4444' (red for conventional current)
  label?: string
}

export default function CurrentFlowAnimation({ speed = 3, color = '#ef4444', label }: CurrentFlowAnimationProps) {
  const [dots, setDots] = useState<number[]>([0, 0.2, 0.4, 0.6, 0.8])
  const frameRef = useRef<number>()
  const lastRef = useRef<number>(0)

  const pathLength = 360 // approximate perimeter in px

  useEffect(() => {
    const step = (ts: number) => {
      if (!lastRef.current) lastRef.current = ts
      const dt = ts - lastRef.current
      lastRef.current = ts
      const increment = (speed * dt) / (pathLength * 10)
      setDots(prev => prev.map(d => (d + increment) % 1))
      frameRef.current = requestAnimationFrame(step)
    }
    frameRef.current = requestAnimationFrame(step)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [speed, pathLength])

  // Convert progress (0-1) to x,y on the rectangular path
  // Top: (80,40) to (220,40) = 140px
  // Right: (220,40) to (220,120) = 80px
  // Bottom: (220,120) to (80,120) = 140px
  // Left: (80,120) to (80,40) = 80px
  // Total: 440px
  const getPos = (t: number): [number, number] => {
    const total = 440
    const d = t * total
    if (d < 140) return [80 + d, 40]
    if (d < 220) return [220, 40 + (d - 140)]
    if (d < 360) return [220 - (d - 220), 120]
    return [80, 120 - (d - 360)]
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 300 160" className="w-full max-w-sm" role="img" aria-label="電流の流れアニメーション">
        {/* Wires */}
        <path d="M80,40 L220,40 L220,120 L80,120" stroke="#374151" strokeWidth="3" fill="none" />

        {/* Battery symbol (left side) */}
        <line x1="80" y1="40" x2="80" y2="65" stroke="#374151" strokeWidth="3"/>
        <line x1="68" y1="65" x2="92" y2="65" stroke="#374151" strokeWidth="4"/>
        <line x1="73" y1="72" x2="87" y2="72" stroke="#374151" strokeWidth="2"/>
        <line x1="68" y1="78" x2="92" y2="78" stroke="#374151" strokeWidth="4"/>
        <line x1="73" y1="85" x2="87" y2="85" stroke="#374151" strokeWidth="2"/>
        <line x1="80" y1="85" x2="80" y2="120" stroke="#374151" strokeWidth="3"/>
        <text x="58" y="62" className="text-xs" fontSize="12" fill="#ef4444" fontWeight="bold">+</text>
        <text x="58" y="95" className="text-xs" fontSize="12" fill="#3b82f6" fontWeight="bold">−</text>
        <text x="30" y="85" fontSize="10" fill="#6b7280">電池</text>

        {/* Resistor symbol (right side, zigzag) */}
        <line x1="220" y1="40" x2="220" y2="55" stroke="#374151" strokeWidth="3"/>
        <polyline points="220,55 213,60 227,65 213,70 227,75 213,80 227,85 220,90"
                  stroke="#374151" strokeWidth="3" fill="none"/>
        <line x1="220" y1="90" x2="220" y2="120" stroke="#374151" strokeWidth="3"/>
        <text x="232" y="78" fontSize="10" fill="#6b7280">R</text>
        <text x="228" y="88" fontSize="9" fill="#6b7280">抵抗</text>

        {/* Current direction arrow on top wire */}
        <polygon points="148,34 155,40 148,46" fill={color} opacity="0.7"/>

        {/* Animated dots */}
        {dots.map((t, i) => {
          const [x, y] = getPos(t)
          return <circle key={i} cx={x} cy={y} r="5" fill={color} opacity="0.9"/>
        })}

        {/* Labels */}
        <text x="130" y="30" fontSize="10" fill={color} textAnchor="middle">電流の向き →</text>
      </svg>
      {label && <p className="text-xs text-gray-500 text-center">{label}</p>}
    </div>
  )
}
