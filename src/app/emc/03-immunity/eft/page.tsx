import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'
import { WaveformDiagram } from '@/components/WaveformDiagram'

function EFTWaveform() {
  const w = 560
  const h = 220

  // Single pulse: 5ns rise, 50ns width (to 50%), repeated
  // Show one burst packet (15ms) schematically with zoomed inset
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl">
      <text x={w/2} y={16} fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">EFT バースト波形（IEC 61000-4-4）</text>

      {/* ---- Top: Burst envelope (macro view) ---- */}
      <text x={30} y={35} fontSize="10" fill="#6b7280">バースト全体（繰り返し周期 300 ms）</text>

      {/* Time axis */}
      <line x1={30} y1={90} x2={530} y2={90} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
      <defs>
        <marker id="arrowB" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#374151"/>
        </marker>
      </defs>
      <text x={535} y={94} fontSize="10" fill="#6b7280">ms</text>

      {/* Burst on (15ms) ≈ 75px, off (285ms) ≈ rest */}
      {/* Burst block */}
      <rect x={30} y={48} width={75} height={42} fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" rx="2"/>
      {/* Mini pulses inside */}
      {[0,7,14,21,28,35,42,49,56,63].map(dx => (
        <rect key={dx} x={33+dx} y={50} width={4} height={38} fill="#f97316" opacity="0.7" rx="1"/>
      ))}
      <text x={67} y={43} fontSize="9" fill="#f97316" textAnchor="middle">バースト 15 ms</text>

      {/* Pause */}
      <line x1={105} y1={69} x2={500} y2={69} stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x={300} y={65} fontSize="9" fill="#9ca3af" textAnchor="middle">停止期間 285 ms</text>

      {/* Period arrow */}
      <line x1={30} y1={105} x2={500} y2={105} stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrowB)" markerStart="url(#arrowBR)"/>
      <defs>
        <marker id="arrowBR" markerWidth="7" markerHeight="7" refX="2" refY="3" orient="auto">
          <path d="M7,0 L7,6 L0,3 z" fill="#6b7280"/>
        </marker>
      </defs>
      <text x={265} y={118} fontSize="9" fill="#6b7280" textAnchor="middle">繰り返し周期 300 ms</text>

      {/* Tick */}
      {[0,100,200,300].map((ms, i) => (
        <g key={ms}>
          <line x1={30 + i*((500-30)/3)} y1={90} x2={30 + i*((500-30)/3)} y2={95} stroke="#374151" strokeWidth="1"/>
          <text x={30 + i*((500-30)/3)} y={104} fontSize="9" fill="#6b7280" textAnchor="middle">{ms}</text>
        </g>
      ))}

      {/* Divider */}
      <line x1={20} y1={130} x2={540} y2={130} stroke="#e5e7eb" strokeWidth="1"/>

      {/* ---- Bottom: Single pulse zoom ---- */}
      <text x={30} y={146} fontSize="10" fill="#6b7280">単パルス拡大（繰り返し周期 200 µs = 5 kHz）</text>

      {/* Axes */}
      <line x1={50} y1={205} x2={540} y2={205} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
      <line x1={50} y1={205} x2={50} y2={148} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
      <text x={544} y={209} fontSize="10" fill="#6b7280">ns</text>
      <text x={42} y={148} fontSize="10" fill="#6b7280" textAnchor="end">V</text>

      {/* Single EFT pulse: rise 5ns, width 50ns (at 50% level) */}
      {/* Scale: 1ns = 4px, peak height = 45px */}
      {(() => {
        const ox = 70
        const oy = 205
        const ns = 4 // px per ns
        const peak = 45
        const pts = []
        // rise 5ns
        pts.push(`${ox},${oy}`)
        pts.push(`${ox + 5*ns},${oy - peak}`)
        // hold a bit
        pts.push(`${ox + 8*ns},${oy - peak}`)
        // decay to 50% at 50ns
        for (let t = 8; t <= 80; t += 2) {
          const v = peak * Math.exp(-(t - 8) / 30)
          pts.push(`${ox + t*ns},${oy - v}`)
        }
        pts.push(`${ox + 120*ns},${oy}`)
        return (
          <>
            <polyline points={pts.join(' ')} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinejoin="round"/>
            {/* Annotations */}
            {/* Rise time */}
            <line x1={ox} y1={oy+15} x2={ox+5*ns} y2={oy+15} stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrowB)" markerStart="url(#arrowBR)"/>
            <text x={ox+2.5*ns} y={oy+26} fontSize="9" fill="#7c3aed" textAnchor="middle">5 ns</text>
            {/* Width at 50% */}
            <line x1={ox} y1={oy-peak*0.5} x2={ox+50*ns} y2={oy-peak*0.5} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
            <text x={ox+55*ns} y={oy-peak*0.5+4} fontSize="9" fill="#9ca3af">50 %</text>
            <line x1={ox+3*ns} y1={oy+15} x2={ox+50*ns} y2={oy+15} stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arrowB)" markerStart="url(#arrowBR)"/>
            <text x={ox+26*ns} y={oy+26} fontSize="9" fill="#0ea5e9" textAnchor="middle">幅 50 ns（50 %レベル）</text>
          </>
        )
      })()}

      {/* x ticks */}
      {[0,20,40,60,80,100].map(t => (
        <g key={t}>
          <line x1={70+t*4} y1={205} x2={70+t*4} y2={209} stroke="#374151" strokeWidth="1"/>
          <text x={70+t*4} y={215} fontSize="9" fill="#6b7280" textAnchor="middle">{t}</text>
        </g>
      ))}
    </svg>
  )
}

export default function EFTPage() {
  return (
    <TestTemplate
      name="EFT/バースト（電気的ファストトランジェント）"
      nameEn="Electrical Fast Transient / Burst"
      abbr="EFT"
      standard="IEC 61000-4-4"
      overview={
        <div className="space-y-3">
          <p>リレー・スイッチ・接点の開閉時に発生するチャタリングノイズ（バースト状の高速過渡パルス群）を模擬した試験。</p>
          <p><strong>パルス特性：</strong>立ち上がり 5 ns、パルス幅 50 ns（50 % レベル）、バースト持続時間 15 ms、バースト繰り返し周期 300 ms</p>
          <p><strong>模擬している現象：</strong>誘導性負荷（リレーコイル・モータ）の開閉時に接点でアーク放電が繰り返される際の高速パルス群。</p>
          <p><strong>不適合の影響：</strong>マイコンの暴走・リセット、通信エラー、デジタル回路の誤動作。</p>

          <WaveformDiagram title="EFT バースト波形" caption="上：バースト全体の繰り返し構造（15 ms ON / 285 ms OFF）。下：単パルス拡大（立ち上がり 5 ns、幅 50 ns）。">
            <EFTWaveform />
          </WaveformDiagram>

          <Callout type="point" title="EFTはバースト（繰り返し）が特徴">
            単発パルスでは問題にならなくても、高繰り返しバーストによる積分的・熱的効果が誤動作を引き起こす。ESDより低電圧・低エネルギーだが繰り返し数が多い。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>使用機材：</strong>EFT/バースト発生器、容量性結合クランプ（CCC）、デカップリングネットワーク</p>
          <p><strong>電源ポート：</strong>デカップリングネットワーク経由でダイレクト注入</p>
          <p><strong>信号・通信ポート：</strong>容量性結合クランプ（ケーブルを挟む方式）</p>
          <p><strong>試験電圧（電源ポート）：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr><th className="border border-gray-300 px-3 py-2">レベル</th><th className="border border-gray-300 px-3 py-2">ピーク電圧</th></tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2">1</td><td className="border border-gray-300 px-3 py-2">±0.5 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">2</td><td className="border border-gray-300 px-3 py-2">±1 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">3</td><td className="border border-gray-300 px-3 py-2">±2 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">4</td><td className="border border-gray-300 px-3 py-2">±4 kV</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを動作させた状態でEFT発生器を接続</li>
            <li>電源ポートに正負両極性で1分間ずつ印加</li>
            <li>信号・通信ポートは容量性結合クランプで各ケーブルに印加</li>
            <li>印加中のEUT動作状態を継続監視・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D。通常 A または B が要求される。</p>
          <p className="text-sm text-gray-600">産業機器ではCまで許容される場合もある。製品規格・エンドユーザ要件を確認すること。</p>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>電源ラインのコモンモード混入：</strong>高速バーストがコモンモードで電源ラインを通じてマイコン電源・I/O線に混入</li>
            <li><strong>デカップリング不足：</strong>マイコン電源ピンのバイパスコンデンサが不足し、VCC変動がリセットを引き起こす</li>
            <li><strong>通信ラインへの積算的影響：</strong>高繰り返しパルスがRXデータとして誤認識</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>コモンモードチョーク（電源・信号ライン）：</strong>コモンモード電流を高インピーダンスでブロック</li>
            <li><strong>低ESLバイパスコンデンサ（マイコン電源近傍）：</strong>高速過渡電流をローカルに吸収</li>
            <li><strong>フォトカプラ・デジタルアイソレータ：</strong>ガルバニック絶縁でノイズ経路を断ち切る</li>
          </ul>
          <Callout type="point" title="フェライトコアの有効性">
            EFTの代表的なエネルギーは〜10 MHz 帯。この周波数帯でインピーダンスが高いフェライト材を選ぶことが重要。ただしコアの磁気飽和（大電流時）に注意。
          </Callout>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>マイコン・FPGAの電源ピン直近（≤ 2 mm）に 100 nF + 10 μF の低インダクタンスバイパスコンデンサを配置</li>
            <li>I/Oライン入口にコモンモードチョーク + Cフィルタを配置</li>
            <li>コネクタ近傍のグランドを低インピーダンスで筐体GNDに接続</li>
          </ul>
          <Callout type="tip" title="EFTとESDの違い">
            EFT対策はESD対策と似て見えるが、エネルギーの連続性が違う。EFTはバースト（繰り返し）なので熱的な積算効果がある。保護素子の繰り返しエネルギー定格も確認すること。
          </Callout>
        </div>
      }
    />
  )
}
