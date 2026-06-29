import Link from 'next/link'

const learningPath = [
  {
    href: '/emc/01-basics',
    num: '01',
    title: '基礎編',
    subtitle: 'EMCの根幹を理解する',
    outcomes: [
      'EMIとEMSの違いを説明できる',
      'ノイズの3要素モデル（Source/Path/Victim）で問題を整理できる',
      'コモンモードとノーマルモードを区別できる',
      'dBμVへの換算ができる',
      '主要EMC規格の体系を把握できる',
    ],
    color: 'border-blue-500',
    badge: 'bg-blue-500',
  },
  {
    href: '/emc/02-emission',
    num: '02',
    title: 'エミッション試験編',
    subtitle: 'ノイズを測定する',
    outcomes: [
      '伝導エミッション試験の目的・セットアップを説明できる',
      'LISNの役割を理解できる',
      '放射エミッション試験のアンテナと測定方法を理解できる',
      '限度値（クラスA/B）を読める',
      '不適合時の主要原因を挙げられる',
    ],
    color: 'border-indigo-500',
    badge: 'bg-indigo-500',
  },
  {
    href: '/emc/03-immunity',
    num: '03',
    title: 'イミュニティ試験編',
    subtitle: 'ノイズに耐える',
    outcomes: [
      'ESD・EFT・サージの違いを説明できる',
      '各試験の波形・電圧レベルを把握できる',
      '性能判定基準A/B/C/Dを理解できる',
      '各試験の主要不適合原因を説明できる',
    ],
    color: 'border-purple-500',
    badge: 'bg-purple-500',
  },
  {
    href: '/emc/04-countermeasures',
    num: '04',
    title: '対策編',
    subtitle: 'ノイズを抑制する',
    outcomes: [
      'コモンモードチョークの原理を説明できる',
      'X/Yコンデンサの役割を区別できる',
      'シールドの効果と開口部の影響を理解できる',
      'グランド設計の基本方針を述べられる',
    ],
    color: 'border-green-500',
    badge: 'bg-green-500',
  },
  {
    href: '/emc/05-pcb-design',
    num: '05',
    title: '基板設計編',
    subtitle: 'PCBに落とし込む',
    outcomes: [
      'リターン電流とループ面積の関係を説明できる',
      'デカップリングコンデンサの配置原則を適用できる',
      'グランドプレーンのスリット問題を判断できる',
      '設計レビューチェックリストを使える',
    ],
    color: 'border-teal-500',
    badge: 'bg-teal-500',
  },
]

export default function EmcIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">EMC 学習トップ</h1>
      <p className="text-gray-600 mb-8 text-sm leading-relaxed">
        各セクションを順番に進めることで、EMCの現象理解から基板設計への適用まで体系的に習得できます。
      </p>

      <div className="space-y-4">
        {learningPath.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block bg-white rounded-xl border-l-4 ${item.color} border border-gray-200 p-6 hover:shadow-md transition-shadow group`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`${item.badge} text-white text-sm font-bold w-9 h-9 rounded-full flex items-center justify-center shrink-0`}
              >
                {item.num}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-900 group-hover:text-emc-primary transition-colors">
                  {item.title}
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    — {item.subtitle}
                  </span>
                </h2>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    このセクションを終えると…
                  </p>
                  <ul className="space-y-1">
                    {item.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-gray-300 group-hover:text-emc-primary transition-colors shrink-0 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
        <strong>学習の進め方:</strong> 01基礎編から順番に進めることを推奨します。
        各ページは独立した参照資料としても利用できます。
      </div>
    </div>
  )
}
