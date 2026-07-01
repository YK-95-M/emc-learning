import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'
import { BlockMath } from '@/components/Math'
import { WaveformDiagram } from '@/components/WaveformDiagram'

function SurgeWaveform() {
  const w = 560
  const h = 200
  const ox = 55
  const oy = 160

  // Voltage: 1.2/50µs  (rise 1.2µs, 50% at 50µs from start)
  // Current: 8/20µs    (rise 8µs, 50% at 20µs from start)
  // Scale: 1µs = 5px, normalize peak to 50px height
  const µs = 5

  const vPts: string[] = []
  const iPts: string[] = []

  for (let t = 0; t <= 80; t += 0.5) {
    // Voltage 1.2/50µs  α=1.44e6, β=4.76e4  (double exp)
    const vn = 1.037 * (Math.exp(-t / 68.2) - Math.exp(-t / 0.405))
    const ipn = (Math.exp(-t / 17.5) - Math.exp(-t / 4.0))

    const px = ox + t * µs
    vPts.push(`${px},${oy - Math.max(0, vn) * 56}`)
    iPts.push(`${px},${oy - Math.max(0, ipn) * 105}`)
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl">
      <text x={w/2} y={14} fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">サージ波形（IEC 61000-4-5）</text>

      {/* Grid */}
      {[0, 20, 40, 60, 80].map(t => (
        <line key={t} x1={ox+t*µs} y1={20} x2={ox+t*µs} y2={oy} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,2"/>
      ))}
      {[25, 50, 75, 100].map(pct => (
        <line key={pct} x1={ox} y1={oy - pct*0.56} x2={ox+80*µs} y2={oy - pct*0.56} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,2"/>
      ))}

      {/* Axes */}
      <line x1={ox} y1={oy} x2={ox+80*µs+20} y2={oy} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrS)"/>
      <line x1={ox} y1={oy+5} x2={ox} y2={15} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrS)"/>
      <defs>
        <marker id="arrS" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#374151"/>
        </marker>
      </defs>
      <text x={ox+80*µs+25} y={oy+4} fontSize="10" fill="#6b7280">µs</text>
      <text x={ox-5} y={16} fontSize="10" fill="#6b7280" textAnchor="end">%</text>

      {/* Ticks */}
      {[0,20,40,60,80].map(t => (
        <g key={t}>
          <line x1={ox+t*µs} y1={oy} x2={ox+t*µs} y2={oy+4} stroke="#374151" strokeWidth="1"/>
          <text x={ox+t*µs} y={oy+13} fontSize="9" fill="#6b7280" textAnchor="middle">{t}</text>
        </g>
      ))}
      {[50, 100].map(p => (
        <g key={p}>
          <line x1={ox-4} y1={oy-p*0.56} x2={ox} y2={oy-p*0.56} stroke="#374151" strokeWidth="1"/>
          <text x={ox-7} y={oy-p*0.56+4} fontSize="9" fill="#6b7280" textAnchor="end">{p}</text>
        </g>
      ))}

      {/* Current waveform 8/20µs (blue) */}
      <polyline points={iPts.join(' ')} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round"/>
      {/* Voltage waveform 1.2/50µs (red) */}
      <polyline points={vPts.join(' ')} fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinejoin="round"/>

      {/* Legend */}
      <rect x={ox+5} y={22} width={12} height={3} fill="#dc2626" rx="1"/>
      <text x={ox+20} y={27} fontSize="10" fill="#dc2626">電圧波形 1.2 / 50 µs</text>
      <rect x={ox+5} y={34} width={12} height={3} fill="#3b82f6" rx="1"/>
      <text x={ox+20} y={39} fontSize="10" fill="#3b82f6">電流波形 8 / 20 µs</text>

      {/* Annotations: voltage rise 1.2µs */}
      <line x1={ox+1.2*µs} y1={oy-56} x2={ox+1.2*µs} y2={oy+20} stroke="#dc2626" strokeWidth="1" strokeDasharray="3,2"/>
      <text x={ox+1.2*µs+2} y={oy+22} fontSize="9" fill="#dc2626">1.2 µs</text>

      {/* voltage 50% at 50µs */}
      <line x1={ox+50*µs} y1={oy-56*0.5} x2={ox+50*µs} y2={oy+20} stroke="#dc2626" strokeWidth="1" strokeDasharray="3,2"/>
      <text x={ox+50*µs-2} y={oy+22} fontSize="9" fill="#dc2626" textAnchor="end">50 µs</text>

      {/* current rise 8µs */}
      <line x1={ox+8*µs} y1={oy-105} x2={ox+8*µs} y2={oy-108} stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,2"/>
      <text x={ox+8*µs+2} y={oy-110} fontSize="9" fill="#3b82f6">8 µs</text>

      {/* current 50% at 20µs */}
      <line x1={ox+20*µs} y1={oy-52.5} x2={ox+20*µs} y2={oy-56} stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,2"/>
      <text x={ox+20*µs+2} y={oy-58} fontSize="9" fill="#3b82f6">20 µs</text>
    </svg>
  )
}

export default function SurgePage() {
  return (
    <TestTemplate
      name="サージ（雷・電源切替）"
      nameEn="Surge Immunity"
      abbr="Surge"
      standard="IEC 61000-4-5"
      overview={
        <div className="space-y-3">
          <p>落雷の誘導や電源系統の大電流遮断時に発生するマイクロ秒オーダーの高エネルギーパルスを模擬した試験。</p>
          <p><strong>波形：</strong>電圧波形 1.2/50 μs（前縁 1.2 μs、後縁 50 μs）、電流波形 8/20 μs</p>
          <p><strong>模擬している現象：</strong>直撃雷・誘導雷による系統サージ、大型電気設備のON/OFFによる開閉過電圧。</p>
          <p><strong>不適合の影響：</strong>半導体素子の絶縁破壊・永久損傷、電解コンデンサの爆発、システムの永久停止。</p>

          <WaveformDiagram title="サージ波形（1.2/50 µs 電圧波形・8/20 µs 電流波形）" caption="コンビネーション波サージ発生器が出力する代表的な波形。100 % = 規定ピーク電圧/電流値。">
            <SurgeWaveform />
          </WaveformDiagram>

          <Callout type="warning" title="サージはESD/EFTよりはるかに高エネルギー">
            EFTのパルスエネルギーが μJ オーダーなのに対し、サージは mJ〜J オーダー。保護素子（MOV/TVS）のエネルギー吸収定格の選定が最重要。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>使用機材：</strong>コンビネーション波サージ発生器、結合/デカップリングネットワーク（CDN）</p>
          <p><strong>印加ポート：</strong>電源ポート（AC入力）、I/Oポート</p>
          <p><strong>試験電圧：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr><th className="border border-gray-300 px-3 py-2">レベル</th><th className="border border-gray-300 px-3 py-2">試験電圧（線間）</th><th className="border border-gray-300 px-3 py-2">試験電圧（線-PE間）</th></tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2">1</td><td className="border border-gray-300 px-3 py-2">±0.5 kV</td><td className="border border-gray-300 px-3 py-2">±0.5 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">2</td><td className="border border-gray-300 px-3 py-2">±1 kV</td><td className="border border-gray-300 px-3 py-2">±2 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">3</td><td className="border border-gray-300 px-3 py-2">±2 kV</td><td className="border border-gray-300 px-3 py-2">±4 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">4</td><td className="border border-gray-300 px-3 py-2">±4 kV</td><td className="border border-gray-300 px-3 py-2">±4 kV</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>印加タイミング：</strong>電源波形の 0°、90°、180°、270° で各極性 3〜5 回</p>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを電源ON・動作状態にする</li>
            <li>CDN を電源ポートに接続（L-N 間、L-PE 間、N-PE 間）</li>
            <li>各組み合わせ × 各タイミング角度 × 正負両極性で印加</li>
            <li>印加後の動作状態を確認・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D。電源系機器では通常 B 以上が要求される（C まで許容の場合もある）。</p>
          <p>D（永久損傷）は絶対にNG。</p>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>MOV/TVSの未実装・選定ミス：</strong>クランプ電圧が回路耐圧を超えている、またはエネルギー定格不足</li>
            <li><strong>保護素子のリードインダクタンス：</strong>スルーホール型MOVはリード長が長いと高速パルスに対応できない</li>
            <li><strong>GNDの電位上昇：</strong>サージ電流がGND配線を通る際の電圧降下でIC電源が一瞬過電圧に</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>MOV（Metal Oxide Varistor）：</strong>一次保護。大エネルギー吸収。AC電源入口に配置。</li>
            <li><strong>TVSダイオード：</strong>二次保護。高精度クランプ電圧。MOV後段に配置。</li>
            <li><strong>段階的保護：</strong>MOV → コモンモードチョーク → Yコンデンサ → TVS の順で段階フィルタ構成</li>
          </ul>
          <BlockMath math="E = \frac{1}{2} C V^2" />
          <p className="text-sm text-gray-600">E: エネルギー [J]、C: 結合容量 [F]、V: サージ電圧 [V]。保護素子の吸収エネルギー定格と比較する。</p>
          <Callout type="warning" title="MOVは消耗品">
            MOVは繰り返しサージで劣化し、クランプ電圧が下がる。定格エネルギーを大きめに選定し、寿命設計も行うこと。
          </Callout>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>MOVは電源コネクタ直後（基板入口）に実装。リード型よりチップ型（SMD）が低インダクタンスで有利。</li>
            <li>大電流経路（MOV〜GND）のパターン幅を十分に確保（1 kVサージで数十 A が流れる）</li>
            <li>保護素子のGNDリターンを他の回路GNDと分けて合流させる（スター接続）</li>
          </ul>
          <Callout type="tip" title="保護の多段化">
            MOV（大エネルギー）→ インピーダンス（チョーク/抵抗）→ TVS（精密クランプ）の多段が効果的。各段が協調して動作するように電圧定格を揃えること。
          </Callout>
        </div>
      }
    />
  )
}
