interface WaveformDiagramProps {
  title: string
  children: React.ReactNode
  caption?: string
}

export function WaveformDiagram({ title, children, caption }: WaveformDiagramProps) {
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
      <div className="bg-gray-200 px-4 py-2 flex items-center gap-2">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">波形図</span>
        <span className="text-sm font-semibold text-gray-800">{title}</span>
      </div>
      <div className="p-4 flex justify-center">{children}</div>
      {caption && (
        <div className="px-4 pb-3 text-xs text-gray-500 text-center">{caption}</div>
      )}
    </div>
  )
}
