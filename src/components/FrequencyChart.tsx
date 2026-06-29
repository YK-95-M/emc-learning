'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface FrequencyChartProps {
  title: string
  data: { freq: number; value?: number; limit?: number }[]
  xLabel?: string
  yLabel?: string
  xUnit?: string
  yUnit?: string
}

// Convert frequency in MHz to log10 scale position
function freqToLog(freq: number): number {
  return Math.log10(freq)
}

// Format tick back to readable frequency
function formatFreqTick(logVal: number): string {
  const freq = Math.pow(10, logVal)
  if (freq < 1) return freq.toFixed(2)
  if (freq < 10) return freq.toFixed(1)
  if (freq < 1000) return String(Math.round(freq))
  return (freq / 1000).toFixed(0) + 'G'
}

export default function FrequencyChart({
  title,
  data,
  xLabel = '周波数 (MHz)',
  yLabel = 'dBμV',
}: FrequencyChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    logFreq: freqToLog(d.freq),
  }))

  const logTicks = [
    Math.log10(0.15),
    Math.log10(1),
    Math.log10(10),
    Math.log10(100),
    Math.log10(1000),
  ]

  const hasValue = data.some((d) => d.value !== undefined)
  const hasLimit = data.some((d) => d.limit !== undefined)

  return (
    <div className="my-6">
      {title && (
        <p className="text-sm font-semibold text-gray-700 mb-2 text-center">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="logFreq"
            type="number"
            domain={['auto', 'auto']}
            ticks={logTicks}
            tickFormatter={formatFreqTick}
            label={{ value: xLabel, position: 'insideBottom', offset: -10, fontSize: 12 }}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              fontSize: 12,
            }}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)} ${yLabel}`,
              name,
            ]}
            labelFormatter={(logVal: number) =>
              `${Math.pow(10, logVal).toFixed(2)} MHz`
            }
          />
          <Legend verticalAlign="top" />
          {hasLimit && (
            <Line
              type="stepAfter"
              dataKey="limit"
              name="限度値"
              stroke="#e02424"
              strokeDasharray="5 5"
              dot={false}
              strokeWidth={2}
            />
          )}
          {hasValue && (
            <Line
              type="monotone"
              dataKey="value"
              name="測定値"
              stroke="#1a56db"
              dot={false}
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
