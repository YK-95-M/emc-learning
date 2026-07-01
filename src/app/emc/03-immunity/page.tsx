import Link from 'next/link'

const tests = [
  {
    href: '/emc/03-immunity/esd',
    abbr: 'ESD',
    name: '静電気放電',
    standard: 'IEC 61000-4-2',
    desc: '人体・物体からの静電気放電を模擬。±2〜8 kV の急峻パルス。',
    color: 'bg-purple-50 border-purple-300',
    badge: 'bg-purple-600',
  },
  {
    href: '/emc/03-immunity/radiated-rf',
    abbr: 'RS',
    name: '放射電磁界イミュニティ',
    standard: 'IEC 61000-4-3',
    desc: '携帯・無線機などの電磁界を模擬。80 MHz〜1 GHz の電界を照射。',
    color: 'bg-blue-50 border-blue-300',
    badge: 'bg-blue-600',
  },
  {
    href: '/emc/03-immunity/eft',
    abbr: 'EFT',
    name: 'EFT/バースト',
    standard: 'IEC 61000-4-4',
    desc: 'リレー・接点開閉のチャタリングノイズを模擬。高速パルスバースト。',
    color: 'bg-yellow-50 border-yellow-300',
    badge: 'bg-yellow-600',
  },
  {
    href: '/emc/03-immunity/surge',
    abbr: 'Surge',
    name: 'サージ',
    standard: 'IEC 61000-4-5',
    desc: '雷誘導・電源系統スイッチングを模擬。1.2/50 μs 高エネルギーパルス。',
    color: 'bg-red-50 border-red-300',
    badge: 'bg-red-600',
  },
  {
    href: '/emc/03-immunity/conducted-rf',
    abbr: 'CS',
    name: '伝導RFイミュニティ',
    standard: 'IEC 61000-4-6',
    desc: 'ケーブルが拾う伝導性RF。150 kHz〜80 MHz をケーブルに注入。',
    color: 'bg-green-50 border-green-300',
    badge: 'bg-green-600',
  },
  {
    href: '/emc/03-immunity/power-freq-magnetic',
    abbr: 'PFMF',
    name: '電源周波数磁界',
    standard: 'IEC 61000-4-8',
    desc: '変圧器・電源近傍の50/60 Hz磁界。磁気センサ搭載機器に特に重要。',
    color: 'bg-indigo-50 border-indigo-300',
    badge: 'bg-indigo-600',
  },
  {
    href: '/emc/03-immunity/voltage-dip',
    abbr: 'Dip',
    name: '電圧ディップ・瞬停',
    standard: 'IEC 61000-4-11',
    desc: '系統電圧の瞬低・停電を模擬。電源保持時間設計の試験。',
    color: 'bg-orange-50 border-orange-300',
    badge: 'bg-orange-600',
  },
]

export default function ImmunityIndexPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">03 イミュニティ試験編</h1>
        <p className="text-gray-600">外部の電磁ノイズに対して機器が耐えられるかを確認する試験群（IEC 61000-4-x シリーズ）。</p>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="font-semibold text-gray-800 mb-2">この編で答えられるようになる問い</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
          <li>ESD・EFT・サージの違いは何か？（エネルギー・波形・発生源）</li>
          <li>性能判定基準 A/B/C/D の意味と、製品への要求水準は？</li>
          <li>各試験のNGに対してどの対策部品・設計が有効か？</li>
        </ol>
      </div>

      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        <strong>⚠ 免責事項：</strong> 各試験の試験レベル・適用条件・判定基準は製品カテゴリ・適用規格版によって異なります。本サイトは概念理解を目的としており、実際の試験では必ず最新の一次規格文書（IEC発行）を参照してください。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tests.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`block border rounded-lg p-4 hover:shadow-md transition-shadow ${t.color}`}
          >
            <div className="flex items-start gap-3">
              <span className={`${t.badge} text-white text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5`}>
                {t.abbr}
              </span>
              <div>
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-500 mb-1">{t.standard}</div>
                <div className="text-sm text-gray-600">{t.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
