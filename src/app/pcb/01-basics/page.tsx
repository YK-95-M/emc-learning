import Link from 'next/link'
import Callout from '@/components/Callout'
import CurrentFlowAnimation from '@/components/pcb/CurrentFlowAnimation'
import InteractiveCircuit from '@/components/pcb/InteractiveCircuit'

export const metadata = { title: '電気の基礎 | PCB設計学習' }

export default function BasicsPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span>
          <span>01 電気の基礎</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">電気の基礎 — "電気が見える"を最優先</h1>
        <p className="text-gray-600">水流モデルで電気の動きを直感的に理解する。</p>
      </div>

      {/* Goals */}
      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でできるようになること</h2>
        <ul className="space-y-1.5">
          {[
            '電圧・電流・抵抗を水流モデルで直感的に説明できる',
            'オームの法則 V=IR を使って電流・電圧・抵抗を計算できる',
            '直列・並列回路の合成抵抗とキルヒホッフの法則を理解できる',
          ].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      {/* Section 1: Voltage, Current, Resistance */}
      <section className="mb-12 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">1</span>
          電圧・電流・抵抗
        </h2>

        {/* Water model SVG */}
        <div className="bg-blue-50 rounded-xl p-6 mb-4">
          <p className="text-sm font-semibold text-blue-800 mb-3 text-center">水流モデル — 電気を水に例えて理解する</p>
          <div className="flex justify-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-lg">
              {/* Water tank (battery) on left */}
              <rect x="10" y="20" width="60" height="140" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2"/>
              <rect x="10" y="20" width="60" height="50" rx="4" fill="#3b82f6" opacity="0.3"/>
              {/* Water level */}
              <rect x="12" y="85" width="56" height="73" rx="2" fill="#60a5fa" opacity="0.6"/>
              <text x="40" y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">高水位</text>
              <text x="40" y="115" textAnchor="middle" fontSize="10" fill="#1e40af">低水位</text>
              <text x="40" y="175" textAnchor="middle" fontSize="9" fill="#3b82f6">電池（電圧源）</text>

              {/* Pressure arrow */}
              <line x1="40" y1="65" x2="40" y2="75" stroke="#1d4ed8" strokeWidth="2"/>
              <polygon points="37,73 40,80 43,73" fill="#1d4ed8"/>

              {/* Pipe - top */}
              <rect x="70" y="45" width="130" height="20" rx="2" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>

              {/* Narrow section (resistor) */}
              <rect x="200" y="35" width="60" height="40" rx="4" fill="#fde68a" stroke="#f59e0b" strokeWidth="2"/>
              <rect x="215" y="45" width="30" height="20" rx="2" fill="#fbbf24" opacity="0.7"/>
              <text x="230" y="58" textAnchor="middle" fontSize="9" fill="#92400e">狭い管</text>
              <text x="230" y="85" textAnchor="middle" fontSize="8" fill="#d97706">抵抗</text>

              {/* Pipe - right of resistor */}
              <rect x="260" y="45" width="110" height="20" rx="2" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>

              {/* Return pipe - bottom */}
              <rect x="70" y="115" width="300" height="20" rx="2" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5"/>

              {/* Right tank */}
              <rect x="345" y="55" width="40" height="95" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
              <rect x="347" y="100" width="36" height="49" rx="2" fill="#93c5fd" opacity="0.6"/>

              {/* Flow arrows on top pipe */}
              <polygon points="110,48 120,55 110,62" fill="#2563eb" opacity="0.8"/>
              <polygon points="155,48 165,55 155,62" fill="#2563eb" opacity="0.8"/>
              <polygon points="275,48 285,55 275,62" fill="#2563eb" opacity="0.8"/>
              <polygon points="320,48 330,55 320,62" fill="#2563eb" opacity="0.8"/>

              {/* Return arrows */}
              <polygon points="270,118 260,125 270,132" fill="#93c5fd"/>
              <polygon points="170,118 160,125 170,132" fill="#93c5fd"/>

              {/* Labels */}
              <text x="135" y="38" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="bold">電流（水の流れ）→</text>

              {/* Voltage label */}
              <line x1="55" y1="55" x2="55" y2="110" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2"/>
              <polygon points="52,108 55,115 58,108" fill="#ef4444"/>
              <text x="62" y="87" fontSize="9" fill="#ef4444" fontWeight="bold">V</text>
              <text x="55" y="155" textAnchor="middle" fontSize="9" fill="#ef4444">電圧（水圧）</text>
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { term: '電圧 V', unit: 'ボルト [V]', analogy: '水圧（高低差）', color: 'bg-red-100 border-red-300 text-red-800' },
              { term: '電流 I', unit: 'アンペア [A]', analogy: '水の流量', color: 'bg-blue-100 border-blue-300 text-blue-800' },
              { term: '抵抗 R', unit: 'オーム [Ω]', analogy: '管の細さ', color: 'bg-amber-100 border-amber-300 text-amber-800' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} border rounded-lg p-2 text-center`}>
                <p className="font-bold text-sm">{item.term}</p>
                <p className="text-xs">{item.unit}</p>
                <p className="text-xs opacity-80 mt-1">≈ {item.analogy}</p>
              </div>
            ))}
          </div>
        </div>

        <CurrentFlowAnimation label="電流が導線を流れる様子（アニメーション）" />
      </section>

      {/* Section 2: Ohm's Law */}
      <section className="mb-12 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">2</span>
          オームの法則
        </h2>

        <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-4">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 300 120" className="w-72">
              {/* Triangle diagram V=IR */}
              <polygon points="150,10 50,100 250,100" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5"/>
              {/* Dividing lines */}
              <line x1="150" y1="55" x2="50" y2="100" stroke="#3b82f6" strokeWidth="1.5"/>
              <line x1="150" y1="55" x2="250" y2="100" stroke="#3b82f6" strokeWidth="1.5"/>
              <line x1="50" y1="55" x2="250" y2="55" stroke="#3b82f6" strokeWidth="1.5"/>
              {/* V */}
              <text x="150" y="45" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ef4444">V</text>
              {/* I */}
              <text x="90" y="85" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#3b82f6">I</text>
              {/* R */}
              <text x="210" y="85" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#f59e0b">R</text>
              {/* Labels */}
              <text x="150" y="115" textAnchor="middle" fontSize="10" fill="#6b7280">上を隠す→ V = I × R</text>
              <text x="60" y="115" textAnchor="middle" fontSize="9" fill="#3b82f6">I = V/R</text>
              <text x="240" y="115" textAnchor="middle" fontSize="9" fill="#f59e0b">R = V/I</text>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 mb-1">V = I × R</p>
            <p className="text-sm text-gray-500">電圧 = 電流 × 抵抗</p>
          </div>
        </div>

        <Callout type="tip" title="計算例">
          5V電源に470Ω抵抗をつなぐと？　I = V/R = 5/470 ≈ 10.6mA
        </Callout>

        <div className="mt-4">
          <InteractiveCircuit />
        </div>
      </section>

      {/* Section 3: Series / Parallel */}
      <section className="mb-12 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">3</span>
          直列・並列回路
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Series */}
          <div className="border border-gray-200 rounded-xl p-4 bg-white">
            <h3 className="font-bold text-gray-900 mb-3 text-center">直列接続</h3>
            <div className="flex justify-center mb-3">
              <svg viewBox="0 0 200 120" className="w-44">
                <path d="M20,40 L160,40 L160,80 L20,80 Z" stroke="#374151" strokeWidth="2" fill="none"/>
                {/* R1 */}
                <rect x="45" y="31" width="30" height="18" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
                <text x="60" y="43" textAnchor="middle" fontSize="9" fill="#374151">R1</text>
                {/* R2 */}
                <rect x="95" y="31" width="30" height="18" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
                <text x="110" y="43" textAnchor="middle" fontSize="9" fill="#374151">R2</text>
                {/* Battery */}
                <line x1="20" y1="40" x2="20" y2="52" stroke="#374151" strokeWidth="2"/>
                <line x1="12" y1="52" x2="28" y2="52" stroke="#374151" strokeWidth="3"/>
                <line x1="15" y1="58" x2="25" y2="58" stroke="#374151" strokeWidth="1.5"/>
                <line x1="20" y1="58" x2="20" y2="80" stroke="#374151" strokeWidth="2"/>
                {/* Current arrows (same) */}
                <text x="35" y="30" fontSize="8" fill="#ef4444">→ I</text>
                <text x="85" y="30" fontSize="8" fill="#ef4444">→ I</text>
                <text x="100" y="100" textAnchor="middle" fontSize="9" fill="#374151">R合成 = R1 + R2</text>
                <text x="100" y="112" textAnchor="middle" fontSize="8" fill="#6b7280">電流は同じ、電圧は分かれる</text>
              </svg>
            </div>
            <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 text-center">
              R<sub>合成</sub> = R<sub>1</sub> + R<sub>2</sub> + … 電流は全体で同一
            </div>
          </div>

          {/* Parallel */}
          <div className="border border-gray-200 rounded-xl p-4 bg-white">
            <h3 className="font-bold text-gray-900 mb-3 text-center">並列接続</h3>
            <div className="flex justify-center mb-3">
              <svg viewBox="0 0 200 120" className="w-44">
                {/* Main wires */}
                <line x1="20" y1="60" x2="60" y2="60" stroke="#374151" strokeWidth="2"/>
                <line x1="140" y1="60" x2="180" y2="60" stroke="#374151" strokeWidth="2"/>
                <line x1="60" y1="35" x2="140" y2="35" stroke="#374151" strokeWidth="2"/>
                <line x1="60" y1="85" x2="140" y2="85" stroke="#374151" strokeWidth="2"/>
                <line x1="60" y1="35" x2="60" y2="85" stroke="#374151" strokeWidth="1.5"/>
                <line x1="140" y1="35" x2="140" y2="85" stroke="#374151" strokeWidth="1.5"/>
                {/* R1 top branch */}
                <rect x="80" y="27" width="30" height="16" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
                <text x="95" y="38" textAnchor="middle" fontSize="9" fill="#374151">R1</text>
                {/* R2 bottom branch */}
                <rect x="80" y="77" width="30" height="16" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
                <text x="95" y="88" textAnchor="middle" fontSize="9" fill="#374151">R2</text>
                {/* Battery */}
                <line x1="20" y1="45" x2="20" y2="75" stroke="#374151" strokeWidth="2"/>
                <line x1="12" y1="55" x2="28" y2="55" stroke="#374151" strokeWidth="3"/>
                <line x1="15" y1="62" x2="25" y2="62" stroke="#374151" strokeWidth="1.5"/>
                {/* Current split arrow */}
                <text x="50" y="33" fontSize="7" fill="#ef4444">I1↑</text>
                <text x="50" y="90" fontSize="7" fill="#ef4444">I2↓</text>
                <text x="95" y="108" textAnchor="middle" fontSize="8" fill="#6b7280">電圧は同じ、電流は分かれる</text>
              </svg>
            </div>
            <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 text-center">
              1/R<sub>合成</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> 電圧は全体で同一
            </div>
          </div>
        </div>

        <Callout type="point" title="キルヒホッフの法則">
          KVL: ループ内の電圧の合計 = 0（直列回路）　KCL: ノードに入る電流 = 出る電流（並列回路）
        </Callout>
      </section>

      {/* Quiz / challenge */}
      <section className="mb-8 not-prose">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">作ってみよう</h3>
          <p className="text-sm text-amber-800 mb-3">上のインタラクティブ回路で試してみよう：</p>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-amber-700">
            <li>抵抗を 330Ω に設定したとき、電流は何mAか？</li>
            <li>LEDを安全に点灯させる（5〜20mA）ための抵抗値の範囲を求めよ</li>
            <li>抵抗が大きくなると明るさはどう変わるか確認しよう</li>
          </ol>
        </div>
      </section>

      <div className="not-prose flex gap-3 flex-wrap">
        <Link href="/pcb/00-intro" className="text-sm text-gray-500 hover:text-gray-700">← 00 基板ができるまで</Link>
        <Link href="/pcb/02-components" className="text-sm text-blue-600 hover:text-blue-800 ml-auto">02 電子部品図鑑 →</Link>
      </div>
    </article>
  )
}
