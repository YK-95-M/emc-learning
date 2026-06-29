import Link from 'next/link'

const sections = [
  {
    href: '/emc/01-basics',
    num: '01',
    title: '基礎編',
    description: 'EMCの根幹を理解する。EMI/EMS、ノイズの3要素、コモンモード/ノーマルモード、規格体系を習得。',
    color: 'bg-blue-600',
  },
  {
    href: '/emc/02-emission',
    num: '02',
    title: 'エミッション試験編',
    description: '機器が放出するノイズの測定方法。伝導エミッション、放射エミッション、高調波電流試験を解説。',
    color: 'bg-indigo-600',
  },
  {
    href: '/emc/03-immunity',
    num: '03',
    title: 'イミュニティ試験編',
    description: '外来電磁ノイズへの耐性試験。ESD・EFT・サージ・RF誘導など7種類の試験を詳解。',
    color: 'bg-purple-600',
  },
  {
    href: '/emc/04-countermeasures',
    num: '04',
    title: '対策編',
    description: 'フィルタ設計、シールド、グランド設計、ケーブル対策。原理から実践まで。',
    color: 'bg-green-600',
  },
  {
    href: '/emc/05-pcb-design',
    num: '05',
    title: '基板設計編',
    description: 'リターン電流、デカップリング、クロック配線、設計レビューチェックリスト。',
    color: 'bg-teal-600',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-12 text-center py-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl text-white px-8">
        <div className="inline-block bg-white bg-opacity-20 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
          Hardware Engineer Guide
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          EMC 電磁両立性<br className="md:hidden" /> 学習サイト
        </h1>
        <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
          現象の理解 → 試験の意味 → 対策の原理 → 基板設計へ。<br />
          ハードウェアエンジニアが現場で使えるEMC知識を体系的に学べます。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/emc"
            className="bg-emc-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            学習を始める
          </Link>
          <Link
            href="/emc/glossary"
            className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors border border-white border-opacity-30"
          >
            用語集を見る
          </Link>
        </div>
      </div>

      {/* Section Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">学習コンテンツ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-emc-primary transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${s.color} text-white text-lg font-bold w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}
                >
                  {s.num}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-emc-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <strong>注意:</strong>{' '}
        本サイトの内容は学習目的です。実際の試験・規格適合判断は必ず最新の一次情報（IEC/CISPR発行文書）および認定試験機関にご確認ください。
      </div>
    </div>
  )
}
