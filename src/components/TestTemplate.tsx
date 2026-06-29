import React from 'react'

interface TestTemplateProps {
  name: string
  nameEn: string
  abbr: string
  standard: string
  overview: React.ReactNode
  setup: React.ReactNode
  procedure: React.ReactNode
  criteria: React.ReactNode
  failures: React.ReactNode
  countermeasures: React.ReactNode
  pcbDesign: React.ReactNode
}

const sections = [
  { key: 'overview', label: '概要' },
  { key: 'setup', label: '試験セットアップ' },
  { key: 'procedure', label: '試験手順' },
  { key: 'criteria', label: '合否判定基準' },
  { key: 'failures', label: 'よくある不適合原因' },
  { key: 'countermeasures', label: '対策' },
  { key: 'pcbDesign', label: '基板設計のポイント' },
] as const

export default function TestTemplate({
  name,
  nameEn,
  abbr,
  standard,
  overview,
  setup,
  procedure,
  criteria,
  failures,
  countermeasures,
  pcbDesign,
}: TestTemplateProps) {
  const content: Record<string, React.ReactNode> = {
    overview,
    setup,
    procedure,
    criteria,
    failures,
    countermeasures,
    pcbDesign,
  }

  return (
    <article>
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="bg-emc-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {abbr}
          </span>
          <span className="text-xs text-gray-500 font-mono">{standard}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{name}</h1>
        <p className="text-gray-500 text-sm">{nameEn}</p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {sections.map((section, idx) => (
          <section key={section.key}>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emc-primary text-white text-sm font-bold shrink-0">
                {idx + 1}
              </span>
              {section.label}
            </h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              {content[section.key]}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
