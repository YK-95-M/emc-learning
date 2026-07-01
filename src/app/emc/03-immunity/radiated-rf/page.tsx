import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'
import { WaveformDiagram } from '@/components/WaveformDiagram'

function RSWaveform() {
  const w = 520
  const h = 180
  // Show AM modulated CW: carrier at e.g. 80MHz, 80% AM modulated by 1kHz sine
  // Stylized envelope view
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg">
      <text x={w/2} y={14} fontSize="12" fontWeight="bold" fill="#1f2937" textAnchor="middle">照射電界波形（80 % AM変調）</text>

      {/* Axes */}
      <line x1={40} y1={145} x2={490} y2={145} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrRF)"/>
      <line x1={40} y1={148} x2={40} y2={22} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrRF)"/>
      <defs>
        <marker id="arrRF" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#374151"/>
        </marker>
      </defs>
      <text x={494} y={149} fontSize="10" fill="#6b7280">t</text>
      <text x={32} y={22} fontSize="10" fill="#6b7280" textAnchor="end">E</text>

      {/* AM envelope (1kHz modulation, 80%) */}
      {/* Upper envelope */}
      {(() => {
        const pts: string[] = []
        const pts2: string[] = []
        for (let x = 0; x <= 440; x += 1) {
          const t = x / 440  // 0..1 = 1 cycle of 1kHz modulation
          const mod = 0.8 * Math.sin(2 * Math.PI * t)  // 80% AM
          const env = 1 + mod   // envelope (0.2 to 1.8)
          const baseY = 145
          const amp = 50
          pts.push(`${40 + x},${baseY - amp * env}`)
          pts2.push(`${40 + x},${baseY + amp * env * 0.05}`) // keep near baseline
        }
        // Draw filled envelope
        return (
          <>
            {/* Upper envelope line */}
            <polyline points={pts.join(' ')} fill="none" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round"/>
            {/* Lower envelope (mirror) */}
            <polyline points={pts.map(p => {
              const [x, y] = p.split(',').map(Number)
              return `${x},${145 - (145 - Number(y)) * -1 + 145}`
            }).join(' ')} fill="none" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round"
            style={{display:'none'}}
            />
          </>
        )
      })()}

      {/* Carrier (stylized high-freq fill between envelopes) */}
      {(() => {
        const segments = []
        for (let x = 0; x <= 440; x += 4) {
          const t = x / 440
          const mod = 0.8 * Math.sin(2 * Math.PI * t)
          const env = 1 + mod
          const amp = 50 * env
          const y1 = 145 - amp
          const y2 = 145 + amp
          segments.push(
            <line key={x} x1={40+x} y1={y1} x2={40+x} y2={y2} stroke="#93c5fd" strokeWidth="1.5" opacity="0.7"/>
          )
        }
        return segments
      })()}

      {/* Envelope outline (top and bottom) */}
      {(() => {
        const topPts: string[] = []
        const botPts: string[] = []
        for (let x = 0; x <= 440; x += 2) {
          const t = x / 440
          const mod = 0.8 * Math.sin(2 * Math.PI * t)
          const env = (1 + mod)
          const amp = 50 * env
          topPts.push(`${40+x},${145 - amp}`)
          botPts.push(`${40+x},${145 + amp}`)
        }
        return (
          <>
            <polyline points={topPts.join(' ')} fill="none" stroke="#dc2626" strokeWidth="2"/>
            <polyline points={botPts.join(' ')} fill="none" stroke="#dc2626" strokeWidth="2"/>
          </>
        )
      })()}

      {/* Carrier label */}
      <text x={260} y={148+14} fontSize="10" fill="#3b82f6" textAnchor="middle">搬送波（試験周波数、例：150 MHz）</text>

      {/* Modulation period arrow */}
      <line x1={40} y1={165} x2={480} y2={165} stroke="#374151" strokeWidth="1" markerEnd="url(#arrRF)" markerStart="url(#arrRFr)"/>
      <defs>
        <marker id="arrRFr" markerWidth="7" markerHeight="7" refX="2" refY="3" orient="auto">
          <path d="M7,0 L7,6 L0,3 z" fill="#374151"/>
        </marker>
      </defs>
      <text x={260} y={176} fontSize="10" fill="#374151" textAnchor="middle">変調周期 1 ms（1 kHz AM変調）</text>

      {/* 80% AM annotation */}
      <line x1={40} y1={95} x2={40} y2={55} stroke="#dc2626" strokeWidth="1" strokeDasharray="3,2"/>
      <text x={42} y={52} fontSize="10" fill="#dc2626">80 % AM変調</text>
      <text x={42} y={63} fontSize="10" fill="#dc2626">（最小：20 %, 最大：180 %）</text>
    </svg>
  )
}

export default function RadiatedRFPage() {
  return (
    <TestTemplate
      name="放射電磁界イミュニティ"
      nameEn="Radiated Radio-Frequency Electromagnetic Field Immunity"
      abbr="RS"
      standard="IEC 61000-4-3"
      overview={
        <div className="space-y-3">
          <p>携帯電話・業務用無線機・放送波など実環境で存在する電磁界を模擬した試験。規定レベルの電界（V/m）を照射し、EUTが正常動作を維持するか確認する。</p>
          <p><strong>周波数範囲：</strong>80 MHz〜1 GHz（製品によっては 2.7 GHz または 6 GHz まで）</p>
          <p><strong>模擬している現象：</strong>携帯電話（800 MHz〜2.1 GHz）、Wi-Fi（2.4/5 GHz）、業務無線、放送波など実際の電磁環境。</p>
          <p><strong>不適合の影響：</strong>携帯電話を近づけると機器が誤動作する、工場無線機の使用中にPLCが停止するなど。</p>

          <WaveformDiagram title="照射電界波形（1 kHz / 80 % AM 変調）" caption="試験周波数の搬送波を 1 kHz 正弦波で 80 % AM 変調した信号を照射。変調は最悪ケースの干渉を模擬。">
            <RSWaveform />
          </WaveformDiagram>

          <Callout type="point" title="イミュニティ試験は「耐える」側">
            エミッション試験と逆で、外部から電磁界を「当てる」試験。機器が壊れるのではなく「誤動作しないか」を確認する。判定は性能基準A/B/C/D。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>場所：</strong>電波暗室（フルアネコイック室）またはシールドルーム内のセル（GTEM セルなど）</p>
          <p><strong>使用機材：</strong>信号発生器、電力増幅器、送信アンテナ（バイコニカル/ログペリ/ホーン）、電界センサ（フィールドプローブ）</p>
          <p><strong>変調：</strong>1 kHz 正弦波 80 % AM 変調（最悪ケース変調を模擬）</p>
          <p><strong>試験電界強度：</strong>レベル1〜4 で 1〜30 V/m（製品規格により異なる。民生機器は通常 3 V/m）</p>
          <p><strong>EUT配置：</strong>通常動作状態で配置。水平・垂直偏波それぞれ照射。</p>

          {/* Anechoic chamber SVG */}
          <div className="my-4">
            <svg viewBox="0 0 500 220" className="w-full max-w-lg border rounded bg-gray-50">
              <text x={250} y={18} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">放射イミュニティ 試験配置図</text>
              {/* Room */}
              <rect x={10} y={25} width={480} height={185} fill="none" stroke="#9ca3af" strokeWidth="2" rx="4"/>
              {/* Absorbers on walls */}
              {[0,1,2,3,4,5,6,7,8,9].map(i => (
                <polygon key={`t${i}`} points={`${20+i*46},25 ${43+i*46},25 ${31+i*46},38`} fill="#6b7280" opacity="0.4"/>
              ))}
              {[0,1,2,3,4,5,6,7,8,9].map(i => (
                <polygon key={`b${i}`} points={`${20+i*46},210 ${43+i*46},210 ${31+i*46},197`} fill="#6b7280" opacity="0.4"/>
              ))}
              {/* EUT */}
              <rect x={300} y={95} width={80} height={60} fill="#d1fae5" stroke="#059669" strokeWidth="2" rx="3"/>
              <text x={340} y={128} textAnchor="middle" fontSize="11" fill="#065f46">EUT</text>
              {/* Antenna */}
              <rect x={80} y={105} width={50} height={35} fill="#fde68a" stroke="#d97706" strokeWidth="2" rx="3"/>
              <text x={105} y={122} textAnchor="middle" fontSize="10" fill="#92400e">送信</text>
              <text x={105} y={133} textAnchor="middle" fontSize="10" fill="#92400e">アンテナ</text>
              {/* Wave arrows */}
              {[-20,0,20].map(dy => (
                <line key={dy} x1={130} y1={122+dy} x2={298} y2={125+dy*0.2} stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrRF2)" opacity="0.7"/>
              ))}
              <defs>
                <marker id="arrRF2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#dc2626"/>
                </marker>
              </defs>
              <text x={214} y={105} textAnchor="middle" fontSize="10" fill="#dc2626">E field (V/m)</text>
              {/* Field probe */}
              <circle cx={210} cy={125} r={8} fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
              <text x={210} y={150} textAnchor="middle" fontSize="9" fill="#7c3aed">フィールドプローブ</text>
            </svg>
          </div>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>フィールドプローブで電界を均一化（ユニフォミティ校正）</li>
            <li>EUTを規定の動作状態に設定し、モニタリングシステムを接続</li>
            <li>規定周波数を1 % ステップでスイープしながら照射</li>
            <li>水平偏波・垂直偏波それぞれ照射</li>
            <li>各周波数・偏波でEUTの動作状態を確認・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D。民生機器・産業機器で要求基準が異なる。一般的に A または B が要求される。</p>
          <Callout type="warning" title="製品規格を確認">
            IEC 61000-4-3 は基本試験規格。実際に適用するレベル・周波数範囲は製品規格（IEC 61000-6-1/2 等の汎用EMC規格または個別製品規格）で規定される。
          </Callout>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>ケーブルでのRF電流誘導：</strong>電界がケーブルに乗りコモンモード電流としてICへ流れ込む</li>
            <li><strong>アナログ回路の検波効果：</strong>RF成分が非線形素子で復調され、DC誤差・低周波ノイズとして影響</li>
            <li><strong>リセットラインや制御ラインへの誘導：</strong>ケーブルが長いほど受信アンテナとして機能</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>コモンモードチョーク＋バイパスコンデンサ：</strong>ケーブルから乗ったRF電流をフィルタ</li>
            <li><strong>シールドケーブル＋両端接地：</strong>ケーブルへの誘導自体を防ぐ</li>
            <li><strong>筐体シールド強化：</strong>開口部を減らし金属筐体でRFを遮蔽</li>
            <li><strong>入力部のRFデカップリング：</strong>アナログ入力前段に低域フィルタでRF成分を除去</li>
          </ul>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>アナログ入力ライン（センサ・ADC前段）に 100 pF〜1 nF のコンデンサでRFバイパス</li>
            <li>長いI/Oケーブルのコネクタ近傍にコモンモードチョーク配置</li>
            <li>リセット・割り込みラインにシュミットトリガバッファと RC フィルタで誤動作防止</li>
          </ul>
          <Callout type="tip" title="アナログ回路のRF検波">
            オペアンプ・コンパレータ入力はGBWを超える周波数でも入力段が非線形動作し、RFを整流（検波）することがある。入力部に数百 pF のコンデンサを入れてRFを除去するのが基本対策。
          </Callout>
        </div>
      }
    />
  )
}
