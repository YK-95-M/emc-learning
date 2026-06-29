import Link from 'next/link'

const cards = [
  {
    href: '/emc/02-emission/conducted',
    title: '雑音端子電圧（伝導エミッション）',
    abbr: 'CE',
    standard: 'CISPR 11, CISPR 32',
    freq: '150 kHz – 30 MHz',
    desc: '電源ポートから電源ラインへ流出するノイズ電圧を測定。LISNを使用してシールドルーム内で実施。',
    color: 'bg-blue-500',
  },
  {
    href: '/emc/02-emission/radiated',
    title: '放射エミッション',
    abbr: 'RE',
    standard: 'CISPR 11, CISPR 32, FCC Part 15',
    freq: '30 MHz – 1 GHz+',
    desc: '機器から空間に放射される電磁波を測定。半電波暗室内でアンテナを使って3m/10mで測定。',
    color: 'bg-indigo-500',
  },
  {
    href: '#',
    title: '高調波電流',
    abbr: 'HC',
    standard: 'IEC 61000-3-2',
    freq: '50 Hz – 2 kHz（第40次高調波まで）',
    desc: 'AC電源から引き込む電流の高調波成分を制限。スイッチング電源やインバータで特に重要。',
    color: 'bg-purple-500',
    comingSoon: true,
  },
  {
    href: '#',
    title: '電圧変動・フリッカ',
    abbr: 'VF',
    standard: 'IEC 61000-3-3',
    freq: 'DC – 数Hz（変動周期）',
    desc: '機器の動作による電源電圧の変動・フリッカを制限。電動機や大電流負荷変動機器が対象。',
    color: 'bg-pink-500',
    comingSoon: true,
  },
]

export default function EmissionIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">エミッション試験編</h1>
      <p className="text-gray-600 mb-8 text-sm leading-relaxed">
        エミッション試験は機器が外部に放出するノイズを測定し、規格の限度値以下であることを確認します。
        「出さない」ためのEMI管理の核心部分です。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.title} className="relative">
            {card.comingSoon && (
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">準備中</span>
              </div>
            )}
            <Link
              href={card.href}
              className={`block bg-white rounded-xl border border-gray-200 p-6 ${!card.comingSoon ? 'hover:shadow-md hover:border-emc-primary' : 'opacity-70 cursor-default'} transition-all group`}
              onClick={card.comingSoon ? (e) => e.preventDefault() : undefined}
            >
              <div className="flex items-start gap-3">
                <span className={`${card.color} text-white text-xs font-bold px-2 py-1 rounded shrink-0`}>
                  {card.abbr}
                </span>
                <div>
                  <h2 className={`font-bold text-gray-900 text-sm ${!card.comingSoon ? 'group-hover:text-emc-primary' : ''} transition-colors`}>
                    {card.title}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">{card.standard}</p>
                  <p className="text-xs text-gray-500 mt-1">周波数範囲: {card.freq}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
