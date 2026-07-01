import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'
import { WaveformDiagram } from '@/components/WaveformDiagram'

function ESDWaveform() {
  // IEC 61000-4-2: rise ~1ns, peak at ~2ns, decay to 50% at ~30ns, long tail ~60ns
  // Stylized double-exponential current pulse
  const w = 560
  const h = 200
  const ox = 60  // origin x
  const oy = 160 // origin y
  const xScale = 4.5  // px per ns
  const yScale = 1.3  // px per A

  // Generate waveform points (approximate IEC 61000-4-2 shape, 8kV contact)
  // Peak ~30A at ~2ns, decays with two time constants
  const points: string[] = []
  for (let t = 0; t <= 100; t += 0.5) {
    let i: number
    if (t < 0.5) {
      i = 0
    } else if (t < 2) {
      i = 30 * (t / 2) ** 0.7  // fast rise
    } else if (t < 5) {
      i = 30 * Math.exp(-(t - 2) / 4)  // fast decay
    } else {
      i = 16 * Math.exp(-(t - 5) / 30)  // slow tail
    }
    const px = ox + t * xScale
    const py = oy - i * yScale
    points.push(`${px},${py}`)
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl">
      {/* Grid lines */}
      {[0, 10, 20, 30].map(a => (
        <line key={a} x1={ox} y1={oy - a * yScale} x2={ox + 100 * xScale} y2={oy - a * yScale}
          stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3"/>
      ))}
      {[0, 20, 40, 60, 80, 100].map(t => (
        <line key={t} x1={ox + t * xScale} y1={20} x2={ox + t * xScale} y2={oy}
          stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3"/>
      ))}

      {/* Axes */}
      <line x1={ox} y1={oy} x2={ox + 100 * xScale + 20} y2={oy} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrowGray)"/>
      <line x1={ox} y1={oy + 5} x2={ox} y2={15} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrowGray)"/>
      <defs>
        <marker id="arrowGray" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#374151"/>
        </marker>
      </defs>

      {/* Axis labels */}
      <text x={ox + 100 * xScale + 25} y={oy + 4} fontSize="11" fill="#6b7280">ns</text>
      <text x={ox - 5} y={12} fontSize="11" fill="#6b7280" textAnchor="end">A</text>

      {/* Tick marks & labels */}
      {[20, 40, 60, 80, 100].map(t => (
        <g key={t}>
          <line x1={ox + t * xScale} y1={oy} x2={ox + t * xScale} y2={oy + 4} stroke="#374151" strokeWidth="1"/>
          <text x={ox + t * xScale} y={oy + 14} fontSize="10" fill="#6b7280" textAnchor="middle">{t}</text>
        </g>
      ))}
      {[10, 20, 30].map(a => (
        <g key={a}>
          <line x1={ox - 4} y1={oy - a * yScale} x2={ox} y2={oy - a * yScale} stroke="#374151" strokeWidth="1"/>
          <text x={ox - 7} y={oy - a * yScale + 4} fontSize="10" fill="#6b7280" textAnchor="end">{a}</text>
        </g>
      ))}

      {/* Waveform */}
      <polyline points={points.join(' ')} fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinejoin="round"/>

      {/* Annotations */}
      {/* Peak */}
      <line x1={ox + 2 * xScale} y1={oy - 30 * yScale} x2={ox + 2 * xScale} y2={oy - 30 * yScale - 30} stroke="#dc2626" strokeWidth="1" strokeDasharray="3,2"/>
      <text x={ox + 2 * xScale + 4} y={oy - 30 * yScale - 32} fontSize="10" fill="#dc2626">ピーク ~30 A</text>
      <text x={ox + 2 * xScale + 4} y={oy - 30 * yScale - 20} fontSize="10" fill="#dc2626">（8 kV接触放電時）</text>

      {/* Rise time */}
      <line x1={ox} y1={oy + 25} x2={ox + 2 * xScale} y2={oy + 25} stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrowPurple)" markerStart="url(#arrowPurpleR)"/>
      <defs>
        <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#7c3aed"/>
        </marker>
        <marker id="arrowPurpleR" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L6,6 L0,3 z" fill="#7c3aed"/>
        </marker>
      </defs>
      <text x={ox + 1 * xScale} y={oy + 38} fontSize="10" fill="#7c3aed" textAnchor="middle">立ち上がり &lt;1 ns</text>

      {/* Title */}
      <text x={w / 2} y={14} fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">ESD 放電電流波形（IEC 61000-4-2）</text>
    </svg>
  )
}

export default function ESDPage() {
  return (
    <TestTemplate
      name="静電気放電（ESD）"
      nameEn="Electrostatic Discharge"
      abbr="ESD"
      standard="IEC 61000-4-2"
      overview={
        <div className="space-y-3">
          <p>人体や帯電した物体が機器の表面に触れた際の瞬間的な電荷移動（静電気放電）を模擬した試験。立ち上がり時間 &lt; 1 ns の急峻なパルスを発生させる。</p>
          <p><strong>模擬している現象：</strong>人体が歩行・摩擦などで帯電し（数 kV に達することもある）、機器に触れた際に瞬時に放電する現象。</p>
          <p><strong>不適合の影響：</strong>半導体入力部の絶縁破壊（永久損傷）、マイコンのリセット・暴走、データ化け。</p>
          <Callout type="warning" title="ESDは立ち上がりが極めて速い">
            IEC 61000-4-2 の放電電流は 30 A/ns 以上の立ち上がりを持つ。これは EFT や サージとは桁違いに速く、インダクタンス成分（配線・リード）が防護の妨げになる。
          </Callout>

          <WaveformDiagram title="ESD 放電電流波形" caption="IEC 61000-4-2 / 8 kV 接触放電時の代表的な電流波形。ピーク約 30 A、立ち上がり < 1 ns。">
            <ESDWaveform />
          </WaveformDiagram>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>使用機材：</strong>ESDシミュレータ（ESDガン）、水平カップリングプレーン（HCP）、垂直カップリングプレーン（VCP）、基準グランドプレーン</p>
          <p><strong>放電種別：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>接触放電（Contact Discharge）：</strong>ESDガン先端を直接EUTに接触させて放電。導電部に適用。</li>
            <li><strong>気中放電（Air Discharge）：</strong>先端を近づけて自然放電させる。非導電部・指定できない部位に適用。</li>
          </ul>
          <p><strong>試験電圧：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr><th className="border border-gray-300 px-3 py-2">レベル</th><th className="border border-gray-300 px-3 py-2">接触放電</th><th className="border border-gray-300 px-3 py-2">気中放電</th></tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2">1</td><td className="border border-gray-300 px-3 py-2">±2 kV</td><td className="border border-gray-300 px-3 py-2">±2 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">2</td><td className="border border-gray-300 px-3 py-2">±4 kV</td><td className="border border-gray-300 px-3 py-2">±4 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">3</td><td className="border border-gray-300 px-3 py-2">±6 kV</td><td className="border border-gray-300 px-3 py-2">±8 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">4</td><td className="border border-gray-300 px-3 py-2">±8 kV</td><td className="border border-gray-300 px-3 py-2">±15 kV</td></tr>
              </tbody>
            </table>
          </div>

          <div className="my-4">
            <svg viewBox="0 0 500 220" className="w-full max-w-lg border rounded bg-gray-50">
              <rect x="10" y="180" width="480" height="20" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1"/>
              <text x="250" y="195" textAnchor="middle" fontSize="10" fill="#4b5563">基準グランドプレーン</text>
              <rect x="150" y="130" width="200" height="15" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
              <text x="250" y="142" textAnchor="middle" fontSize="9" fill="#1e40af">水平カップリングプレーン（HCP）</text>
              <rect x="195" y="75" width="110" height="55" fill="#d1fae5" stroke="#059669" strokeWidth="2" rx="3"/>
              <text x="250" y="105" textAnchor="middle" fontSize="11" fill="#065f46">EUT</text>
              <rect x="60" y="85" width="100" height="25" fill="#fde68a" stroke="#d97706" strokeWidth="2" rx="3"/>
              <text x="110" y="101" textAnchor="middle" fontSize="10" fill="#92400e">ESDガン</text>
              <line x1="160" y1="97" x2="195" y2="97" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowRed)"/>
              <defs>
                <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#dc2626"/>
                </marker>
              </defs>
              <text x="177" y="90" fontSize="9" fill="#dc2626">放電</text>
              <rect x="360" y="60" width="15" height="120" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
              <text x="368" y="55" textAnchor="middle" fontSize="9" fill="#92400e">VCP</text>
              <text x="250" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">ESD 試験配置図</text>
            </svg>
          </div>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを動作させた状態でESDガンを準備</li>
            <li>操作者が触れる可能性のあるすべての部位に放電（操作パネル、コネクタ、筐体など）</li>
            <li>各点に <strong>正極性10回、負極性10回</strong>（放電間隔 ≥ 1秒）</li>
            <li>HCP・VCPへの間接放電も実施（机・壁からの静電気を模擬）</li>
            <li>各放電後にEUTの動作状態を確認・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p><strong>性能判定基準（IEC 61000-4-2）：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr><th className="border border-gray-300 px-3 py-2">基準</th><th className="border border-gray-300 px-3 py-2">内容</th></tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2 font-semibold text-green-700">A</td><td className="border border-gray-300 px-3 py-2">試験中も試験後も正常動作継続</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2 font-semibold text-yellow-700">B</td><td className="border border-gray-300 px-3 py-2">試験中に一時的な機能低下があるが、試験後は自己回復</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2 font-semibold text-orange-700">C</td><td className="border border-gray-300 px-3 py-2">試験中に機能停止するが、操作者の介入（再起動等）で回復</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2 font-semibold text-red-700">D</td><td className="border border-gray-300 px-3 py-2">機器の損傷・データ破壊など回復不能</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600">一般的な民生機器では A または B が要求される。製品仕様書に要求基準を明記すること。</p>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>I/Oポートへの直接サージ電流：</strong>コネクタから半導体入力部への電流経路が短く、保護素子がない</li>
            <li><strong>気中放電によるEMP：</strong>急峻な電流パルスが基板上に電磁誘導し、GNDラインに電位差を発生させる</li>
            <li><strong>筐体と基板GNDの接続不良：</strong>放電電流がGNDに流れず内部回路に迂回する</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>TVSダイオード（トランジェント電圧サプレッサ）：</strong>I/Oポート直後に配置。クランプ電圧を回路耐圧以下に抑える。</li>
            <li><strong>ESD保護IC：</strong>多チャンネル保護をワンチップで実現。容量が小さく高速信号ラインにも使用可。</li>
            <li><strong>筐体-GND の多点低インピーダンス接続：</strong>放電電流を素早く基準電位に戻す。</li>
          </ul>
          <Callout type="warning" title="TVSの定格確認">
            ESD 8 kV 試験ではピーク電流が約 30 A に達する。TVS のピーク電流定格（I_PP）が不足すると素子自体が破壊される。動作電圧・クランプ電圧・I_PP を必ず確認すること。
          </Callout>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>ESD保護素子はコネクタ直後に配置し、保護素子〜コネクタ間のトレースを最短に（長いトレースのインダクタンスがパルスを通してしまう）</li>
            <li>保護素子のGNDリターンパスを太く・短く引く</li>
            <li>I/Oラインに直列抵抗（33〜100Ω）を入れてピーク電流を制限</li>
          </ul>
          <Callout type="tip" title="保護素子の配置順序">
            コネクタ → TVS/保護IC → シリーズ抵抗 → IC入力 の順が基本。シリーズ抵抗より前に保護素子を置くことで、IC入力ピンへの電圧を確実にクランプできる。
          </Callout>
        </div>
      }
    />
  )
}
