import StepDiagram from '@/components/pcb/StepDiagram'
import Link from 'next/link'

const steps = [
  {
    title: '回路図作成',
    description: '「何と何をどうつなぐか」を回路図として記述します。EDAツールの回路図エディタで部品記号を配置し、接続線（ネット）を引きます。',
    visual: (
      <svg viewBox="0 0 200 100" className="w-48">
        {/* Simple schematic with battery, resistor, LED */}
        <path d="M30,20 L130,20 L130,80 L30,80" stroke="#374151" strokeWidth="2" fill="none"/>
        <line x1="30" y1="20" x2="30" y2="35" stroke="#374151" strokeWidth="2"/>
        <line x1="18" y1="35" x2="42" y2="35" stroke="#374151" strokeWidth="3"/>
        <line x1="22" y1="42" x2="38" y2="42" stroke="#374151" strokeWidth="1.5"/>
        <line x1="18" y1="48" x2="42" y2="48" stroke="#374151" strokeWidth="3"/>
        <line x1="22" y1="55" x2="38" y2="55" stroke="#374151" strokeWidth="1.5"/>
        <line x1="30" y1="55" x2="30" y2="80" stroke="#374151" strokeWidth="2"/>
        <rect x="68" y="11" width="35" height="18" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
        <text x="85" y="23" fontSize="10" fill="#374151" textAnchor="middle">R</text>
        <polygon points="120,20 140,20 130,34" fill="#fbbf24" stroke="#374151" strokeWidth="1.5"/>
        <line x1="120" y1="34" x2="140" y2="34" stroke="#374151" strokeWidth="2"/>
        <text x="100" y="60" fontSize="9" fill="#6b7280" textAnchor="middle">回路図</text>
      </svg>
    ),
  },
  {
    title: '部品選定・データシート確認',
    description: '回路で使う部品を選び、データシートで定格・フットプリントを確認します。抵抗値、容量、耐圧、パッケージを選定します。',
    visual: (
      <svg viewBox="0 0 200 100" className="w-48">
        <rect x="10" y="10" width="80" height="80" rx="4" fill="white" stroke="#374151" strokeWidth="1.5"/>
        <text x="50" y="30" fontSize="9" fontWeight="bold" fill="#374151" textAnchor="middle">データシート</text>
        <line x1="20" y1="38" x2="80" y2="38" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="20" y="50" fontSize="8" fill="#6b7280">VCC_MAX: 5.5V</text>
        <text x="20" y="62" fontSize="8" fill="#6b7280">IF_MAX: 30mA</text>
        <text x="20" y="74" fontSize="8" fill="#6b7280">VF: 2.0-2.4V</text>
        <rect x="110" y="25" width="75" height="50" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="148" y="45" fontSize="8" fill="#92400e" textAnchor="middle">選定された</text>
        <text x="148" y="57" fontSize="8" fill="#92400e" textAnchor="middle">部品リスト</text>
        <text x="148" y="69" fontSize="9" fill="#b45309" fontWeight="bold" textAnchor="middle">BOM</text>
        <path d="M92,50 L107,50" stroke="#374151" strokeWidth="1.5"/>
        <polygon points="104,47 110,50 104,53" fill="#374151"/>
      </svg>
    ),
  },
  {
    title: 'フットプリント割り当て',
    description: '各部品に「基板上での物理的な形」（フットプリント）を割り当てます。リード部品か表面実装か、パッケージサイズを決めます。',
    visual: (
      <svg viewBox="0 0 200 100" className="w-48">
        {/* Footprint: two pads with courtyard */}
        <rect x="40" y="20" width="120" height="60" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2"/>
        <text x="100" y="35" textAnchor="middle" fontSize="9" fill="#15803d">コートヤード</text>
        {/* Two SMD pads */}
        <rect x="55" y="45" width="30" height="20" rx="2" fill="#f59e0b"/>
        <rect x="115" y="45" width="30" height="20" rx="2" fill="#f59e0b"/>
        <text x="70" y="58" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">1</text>
        <text x="130" y="58" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">2</text>
        {/* Body outline */}
        <rect x="85" y="42" width="30" height="26" rx="2" fill="none" stroke="#374151" strokeWidth="1.5"/>
        <text x="100" y="59" textAnchor="middle" fontSize="9" fill="#374151">R</text>
        <text x="100" y="92" textAnchor="middle" fontSize="9" fill="#6b7280">フットプリント</text>
      </svg>
    ),
  },
  {
    title: '部品配置',
    description: '基板のアウトライン（外形）の中に部品フットプリントを配置します。信号の流れ・機構制約・グループ化を考えながら最適位置を決めます。',
    visual: (
      <svg viewBox="0 0 200 100" className="w-48">
        {/* Board outline */}
        <rect x="10" y="10" width="180" height="80" rx="4" fill="#f8fafc" stroke="#374151" strokeWidth="2.5"/>
        {/* Mounting holes */}
        <circle cx="20" cy="20" r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
        <circle cx="190" cy="20" r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
        <circle cx="20" cy="80" r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
        <circle cx="190" cy="80" r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
        {/* Placed components */}
        <rect x="30" y="30" width="40" height="30" rx="2" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
        <text x="50" y="48" textAnchor="middle" fontSize="8" fill="#1d4ed8">IC</text>
        <rect x="90" y="25" width="20" height="12" rx="1" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <rect x="90" y="60" width="20" height="12" rx="1" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <rect x="130" y="35" width="30" height="20" rx="2" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1"/>
        <text x="145" y="48" textAnchor="middle" fontSize="8" fill="#15803d">Cap</text>
      </svg>
    ),
  },
  {
    title: '配線（ルーティング）',
    description: '配置した部品のパッドを銅のトレース（配線）でつなぎます。信号の種類・電流容量・EMCを考慮しながら最短経路で引きます。',
    visual: (
      <svg viewBox="0 0 200 100" className="w-48">
        <rect x="10" y="10" width="180" height="80" rx="4" fill="#f8fafc" stroke="#374151" strokeWidth="2"/>
        {/* Traces */}
        <path d="M70,45 L90,45 L90,31 L110,31" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M70,50 L90,50 L90,66 L110,66" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M160,45 L145,45" stroke="#3b82f6" strokeWidth="3" fill="none"/>
        {/* Red power trace */}
        <path d="M70,38 L60,38 L60,20 L140,20 L140,38 L160,38" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Components */}
        <rect x="30" y="30" width="40" height="30" rx="2" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
        <rect x="110" y="22" width="20" height="18" rx="1" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <rect x="110" y="57" width="20" height="18" rx="1" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <rect x="145" y="30" width="30" height="30" rx="2" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1"/>
        <text x="50" y="48" textAnchor="middle" fontSize="8" fill="#1d4ed8">IC</text>
        <text x="160" y="48" textAnchor="middle" fontSize="8" fill="#15803d">U2</text>
      </svg>
    ),
  },
  {
    title: 'ガーバー出力・発注',
    description: 'EDAツールから製造用データ（ガーバーファイル）を出力し、PCB製造会社に入稿します。数日〜1週間で基板が届きます。',
    visual: (
      <svg viewBox="0 0 200 100" className="w-48">
        {/* File icons */}
        <rect x="15" y="15" width="40" height="50" rx="3" fill="white" stroke="#374151" strokeWidth="1.5"/>
        <polygon points="40,15 55,30 40,30" fill="#e5e7eb" stroke="#374151" strokeWidth="1"/>
        <text x="35" y="50" textAnchor="middle" fontSize="7" fill="#6b7280">.gbr</text>
        <text x="35" y="60" textAnchor="middle" fontSize="7" fill="#6b7280">ガーバー</text>
        <rect x="60" y="25" width="35" height="40" rx="3" fill="white" stroke="#374151" strokeWidth="1.5"/>
        <text x="77" y="47" textAnchor="middle" fontSize="7" fill="#6b7280">.drl</text>
        <text x="77" y="57" textAnchor="middle" fontSize="7" fill="#6b7280">ドリル</text>
        {/* Arrow */}
        <path d="M100,50 L120,50" stroke="#374151" strokeWidth="1.5"/>
        <polygon points="117,47 123,50 117,53" fill="#374151"/>
        {/* PCB product */}
        <rect x="125" y="20" width="65" height="60" rx="4" fill="#1e3a5f" stroke="#374151" strokeWidth="1.5"/>
        <circle cx="137" cy="32" r="4" fill="none" stroke="#94a3b8" strokeWidth="1"/>
        <circle cx="178" cy="32" r="4" fill="none" stroke="#94a3b8" strokeWidth="1"/>
        <rect x="140" y="42" width="25" height="18" rx="2" fill="#3b82f6" opacity="0.7"/>
        <text x="157" y="78" textAnchor="middle" fontSize="8" fill="#94a3b8">完成基板</text>
      </svg>
    ),
  },
]

export default function IntroPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span>
          <span>00 基板ができるまで</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">基板ができるまで — 全工程の全体像</h1>
        <p className="text-gray-600">まず全体の流れを把握する。詳細は後の章で学ぶ。</p>
      </div>

      {/* Goals */}
      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でわかること</h2>
        <ul className="space-y-1.5">
          {['回路図作成から製造発注までの全工程が図でわかる', 'EDAツール（KiCad等）が何をするツールか理解できる', '次の章から何を学ぶのかロードマップが見える'].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      {/* Step diagram */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4">基板設計の6ステップ</h2>
        <StepDiagram steps={steps} title="基板ができるまでの全工程（クリックで各ステップを確認）" />
      </section>

      {/* What is EDA */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 not-prose">EDAツールとは</h2>
        <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
          <p className="text-sm text-blue-800">
            <strong>EDA（Electronic Design Automation）</strong> は電子設計自動化ツールのこと。
            回路図エディタ・PCBレイアウトエディタ・ガーバー出力が一体になったソフトウェア。
            代表的なツールは <strong>KiCad</strong>（無償）、Altium Designer、Cadence Allegro 等。
          </p>
        </div>

        <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: '回路図エディタ', desc: '部品記号を配置して配線。ERC（電気的ルールチェック）で間違いを検出。', color: 'bg-blue-50 border-blue-200' },
            { title: 'PCBエディタ', desc: 'フットプリントを配置して銅のトレースで接続。DRC（設計ルールチェック）で確認。', color: 'bg-green-50 border-green-200' },
            { title: 'ガーバー出力', desc: '各層の製造データ（.gbr）とドリルデータ（.drl）を出力して製造業者に入稿。', color: 'bg-amber-50 border-amber-200' },
          ].map((item, i) => (
            <div key={i} className={`${item.color} border rounded-lg p-3`}>
              <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section className="not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-3">次のステップ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/pcb/01-basics', label: '01 電気の基礎へ →', desc: '電圧・電流・抵抗から始める' },
            { href: '/pcb', label: '目次に戻る', desc: '全章の一覧を見る' },
          ].map((link, i) => (
            <Link key={i} href={link.href} className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <p className="font-medium text-blue-600">{link.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
