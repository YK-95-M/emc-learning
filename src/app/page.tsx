import Link from 'next/link'

const learningPath = [
  {
    href: '/pcb/00-intro',
    num: '00',
    title: '基板ができるまで',
    subtitle: '全体像を掴む',
    outcomes: ['回路図から基板製造までの全工程が分かる', 'EDAツールの役割を理解できる', '基板設計の学習ロードマップを把握できる'],
    color: 'border-gray-500', badge: 'bg-gray-500',
  },
  {
    href: '/pcb/01-basics',
    num: '01',
    title: '電気の基礎',
    subtitle: '"電気が見える"を最優先',
    outcomes: ['電圧・電流・抵抗を水流モデルで直感的に理解できる', 'オームの法則を使って電流・電圧を計算できる', '直列・並列回路のキルヒホッフの法則を理解できる'],
    color: 'border-blue-500', badge: 'bg-blue-500',
  },
  {
    href: '/pcb/02-components',
    num: '02',
    title: '電子部品図鑑',
    subtitle: 'イラスト主役の部品学習',
    outcomes: ['主要部品の役割と記号を説明できる', 'データシートから主要パラメータを読める', '部品パッケージの種類を判別できる'],
    color: 'border-green-500', badge: 'bg-green-500',
  },
  {
    href: '/pcb/03-circuits',
    num: '03',
    title: '回路を読む・設計する',
    subtitle: '回路図の読み書き',
    outcomes: ['回路図記号と実物を対応させられる', '基本回路（分圧・LED・フィルタ）を設計できる', '見やすい回路図の描き方を習得できる'],
    color: 'border-indigo-500', badge: 'bg-indigo-500',
  },
  {
    href: '/pcb/04-board-structure',
    num: '04',
    title: '基板のしくみ',
    subtitle: '物理構造を断面図で理解',
    outcomes: ['基板の積層構造（FR-4・銅箔・レジスト・シルク）を説明できる', 'ランド/ビア/フットプリントの意味を理解できる', '配線の線幅と電流容量の関係を計算できる'],
    color: 'border-yellow-500', badge: 'bg-yellow-500',
  },
  {
    href: '/pcb/05-eda-tools',
    num: '05',
    title: 'EDAツールで作る',
    subtitle: 'KiCadで回路図→基板レイアウト',
    outcomes: ['回路図入力からERCまでの工程を実行できる', 'フットプリント割り当てとネットリストを理解できる', '基板レイアウト・ガーバー出力ができる'],
    color: 'border-orange-500', badge: 'bg-orange-500',
  },
  {
    href: '/pcb/06-layout',
    num: '06',
    title: 'レイアウト設計の実務',
    subtitle: '差がつく配置・配線の知識',
    outcomes: ['部品配置の原則を適用できる', 'ベタGNDとリターンパスを理解できる', 'デカップリングと熱設計の配置ルールを説明できる'],
    color: 'border-teal-500', badge: 'bg-teal-500',
  },
  {
    href: '/pcb/07-manufacturing',
    num: '07',
    title: '製造と実装',
    subtitle: '設計を実物にする工程',
    outcomes: ['製造仕様（線幅・ビア・層数）を理解できる', 'DFMの考え方を設計に適用できる', '実装（はんだ・リフロー）の要点を説明できる'],
    color: 'border-pink-500', badge: 'bg-pink-500',
  },
  {
    href: '/pcb/08-verification',
    num: '08',
    title: '検証と総合演習',
    subtitle: '完成させて確かめる',
    outcomes: ['DRC/ERCで設計を検証できる', '設計レビューチェックリストを使える', 'LED点滅基板を0から設計できる'],
    color: 'border-purple-500', badge: 'bg-purple-500',
  },
]

export default function PcbIndexPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">基板設計エンジニア育成コース</h1>
        <p className="text-gray-600 text-lg">電気の初心者から、自力でPCBを設計できるエンジニアへ。「見て・触って・作る」の順で体得する。</p>
      </div>

      {/* Big overview SVG */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 text-center">基板設計の全工程</h2>
        <svg viewBox="0 0 680 120" className="w-full" role="img" aria-label="基板設計の全工程フロー">
          {[
            { x: 10, label: '回路図作成', sub: '部品・接続', color: '#3b82f6', icon: '📐' },
            { x: 120, label: '部品選定', sub: 'データシート', color: '#10b981', icon: '🔧' },
            { x: 230, label: 'フットプリント', sub: 'ランド・パッド', color: '#f59e0b', icon: '📦' },
            { x: 340, label: '部品配置', sub: 'レイアウト', color: '#8b5cf6', icon: '🗺️' },
            { x: 450, label: '配線', sub: '信号・電源・GND', color: '#ec4899', icon: '〰️' },
            { x: 560, label: 'ガーバー出力', sub: '製造データ', color: '#6366f1', icon: '🏭' },
          ].map((item, i) => (
            <g key={i}>
              <rect x={item.x} y={20} width={95} height={70} rx="8" fill="white" stroke={item.color} strokeWidth="2"/>
              <text x={item.x + 47} y={42} textAnchor="middle" fontSize="16">{item.icon}</text>
              <text x={item.x + 47} y={62} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1f2937">{item.label}</text>
              <text x={item.x + 47} y={78} textAnchor="middle" fontSize="9" fill="#6b7280">{item.sub}</text>
              {i < 5 && (
                <polygon points={`${item.x + 100},55 ${item.x + 112},55 ${item.x + 106},62`} fill={item.color} opacity="0.7"/>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Learning path */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">学習ステップ</h2>
      <div className="space-y-4">
        {learningPath.map((chapter) => (
          <Link
            key={chapter.href}
            href={chapter.href}
            className={`block border-l-4 ${chapter.color} bg-white rounded-r-xl shadow-sm hover:shadow-md transition-shadow p-5`}
          >
            <div className="flex items-start gap-4">
              <span className={`${chapter.badge} text-white text-sm font-bold px-2.5 py-1 rounded-full shrink-0`}>
                {chapter.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">{chapter.title}</span>
                  <span className="text-sm text-gray-500">— {chapter.subtitle}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {chapter.outcomes.map((o, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                      <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <svg className="w-5 h-5 text-gray-400 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>EMC編との連携:</strong> 06章「レイアウト設計の実務」では<a href="/emc/05-pcb-design" className="underline">EMC基板設計編</a>と相互リンクしています。
          信号配線・ループ面積・リターンパスの知識はEMCと直結します。
        </p>
      </div>
    </div>
  )
}
