'use client'
import { useState } from 'react'

export default function InteractiveCircuit() {
  const [resistance, setResistance] = useState(470)
  const voltage = 5  // fixed 5V supply
  const ledForwardVoltage = 2  // LED Vf
  const current = Math.max(0, (voltage - ledForwardVoltage) / resistance * 1000)  // mA
  const brightness = Math.min(1, current / 20)  // normalize to 20mA max
  const ledColor = `rgba(234, 179, 8, ${0.15 + brightness * 0.85})`
  const ledGlow = brightness > 0.1 ? `drop-shadow(0 0 ${brightness * 12}px rgba(234, 179, 8, 0.8))` : 'none'

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-700">インタラクティブ: LED点灯回路</span>
      </div>

      <div className="p-4">
        {/* Circuit SVG */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 320 160" className="w-full max-w-xs">
            {/* Wires */}
            <path d="M60,40 L200,40 L200,120 L60,120" stroke="#374151" strokeWidth="2.5" fill="none"/>

            {/* Battery */}
            <line x1="60" y1="40" x2="60" y2="60" stroke="#374151" strokeWidth="2.5"/>
            <line x1="48" y1="60" x2="72" y2="60" stroke="#374151" strokeWidth="4"/>
            <line x1="53" y1="67" x2="67" y2="67" stroke="#374151" strokeWidth="2"/>
            <line x1="48" y1="73" x2="72" y2="73" stroke="#374151" strokeWidth="4"/>
            <line x1="53" y1="80" x2="67" y2="80" stroke="#374151" strokeWidth="2"/>
            <line x1="60" y1="80" x2="60" y2="120" stroke="#374151" strokeWidth="2.5"/>
            <text x="28" y="58" fontSize="10" fill="#ef4444" fontWeight="bold">+</text>
            <text x="28" y="90" fontSize="10" fill="#3b82f6" fontWeight="bold">−</text>
            <text x="22" y="74" fontSize="9" fill="#6b7280">5V</text>

            {/* Resistor (top wire) */}
            <line x1="100" y1="40" x2="115" y2="40" stroke="#374151" strokeWidth="2.5"/>
            <rect x="115" y="31" width="40" height="18" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
            <text x="135" y="44" fontSize="9" fill="#374151" textAnchor="middle">R</text>
            <line x1="155" y1="40" x2="200" y2="40" stroke="#374151" strokeWidth="2.5"/>

            {/* LED (right side) */}
            <line x1="200" y1="40" x2="200" y2="60" stroke="#374151" strokeWidth="2.5"/>
            {/* LED triangle symbol */}
            <polygon points="188,60 212,60 200,75" fill={ledColor} stroke="#374151" strokeWidth="2" style={{filter: ledGlow}}/>
            <line x1="188" y1="75" x2="212" y2="75" stroke="#374151" strokeWidth="2"/>
            <line x1="208" y1="70" x2="215" y2="64" stroke="#374151" strokeWidth="1.5"/>
            <line x1="212" y1="68" x2="219" y2="62" stroke="#374151" strokeWidth="1.5"/>
            <line x1="200" y1="75" x2="200" y2="120" stroke="#374151" strokeWidth="2.5"/>

            {/* Current label */}
            <text x="130" y="30" fontSize="9" fill="#6b7280" textAnchor="middle">
              I = {current.toFixed(1)} mA
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
              <span>抵抗値 R</span>
              <span className="text-blue-600">{resistance} Ω</span>
            </label>
            <input
              type="range" min="100" max="2000" step="100" value={resistance}
              onChange={e => setResistance(Number(e.target.value))}
              className="w-full mt-1"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>100Ω</span><span>2000Ω</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-xs text-blue-500">電圧</div>
              <div className="font-bold text-blue-700">{voltage}V</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-xs text-gray-500">電流</div>
              <div className="font-bold text-gray-700">{current.toFixed(1)}mA</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-2">
              <div className="text-xs text-yellow-600">明るさ</div>
              <div className="font-bold text-yellow-700">{Math.round(brightness * 100)}%</div>
            </div>
          </div>

          {current > 20 && (
            <div className="text-xs bg-red-50 text-red-600 rounded p-2">
              ⚠️ 20mA超過 — LEDが破損する可能性があります
            </div>
          )}
          {current < 1 && resistance < 2000 && (
            <div className="text-xs bg-amber-50 text-amber-600 rounded p-2">
              💡 電流が少なすぎてLEDがほとんど光りません
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
