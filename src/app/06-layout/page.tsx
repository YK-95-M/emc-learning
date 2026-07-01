import Link from 'next/link'
import Callout from '@/components/Callout'
import BeforeAfterComparison from '@/components/pcb/BeforeAfterComparison'

export const metadata = { title: 'レイアウト設計の実務 | PCB設計学習' }

export default function LayoutDesignPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span><span>06 レイアウト設計の実務</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">レイアウト設計の実務 — 差がつく配置・配線の知識</h1>
        <p className="text-gray-600">良い例・悪い例の対比で、実務で使えるレイアウト知識を身につける。</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でできるようになること</h2>
        <ul className="space-y-1.5">
          {[
            '部品配置の原則（信号の流れ・機構制約・グループ化）を適用できる',
            'ベタGNDとリターンパスの重要性を説明できる',
            'デカップリングコンデンサの正しい配置とサーマルビアの設計ができる',
          ].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">1</span>
          部品配置の原則
        </h2>

        <BeforeAfterComparison
          title="部品配置 — 良い例 vs 悪い例"
          before={{
            label: '悪い例（バラバラ配置）',
            description: '信号の流れを無視した配置。配線が長くなりノイズが増加。コネクタが基板中央にあり、機構設計と干渉しやすい。',
            visual: (
              <svg viewBox="0 0 260 140" className="w-60 h-32">
                <rect x="10" y="10" width="240" height="120" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
                <rect x="150" y="60" width="50" height="35" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="175" y="80" textAnchor="middle" fontSize="8" fill="#bfdbfe">MCU</text>
                <rect x="30" y="80" width="30" height="20" rx="2" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1"/>
                <text x="45" y="93" textAnchor="middle" fontSize="7" fill="white">PWR</text>
                <rect x="100" y="20" width="50" height="20" rx="2" fill="#ca8a04" stroke="#fbbf24" strokeWidth="1"/>
                <text x="125" y="33" textAnchor="middle" fontSize="8" fill="white">Connector</text>
                <rect x="30" y="20" width="40" height="35" rx="2" fill="#0e7490" stroke="#22d3ee" strokeWidth="1"/>
                <text x="50" y="40" textAnchor="middle" fontSize="7" fill="white">Sensor</text>
                <path d="M80,30 L150,65" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2"/>
                <path d="M60,80 L150,75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2"/>
                <path d="M150,60 L150,40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="130" y="130" textAnchor="middle" fontSize="8" fill="#ef4444">長い配線・信号が交差</text>
              </svg>
            ),
          }}
          after={{
            label: '良い例（信号フロー配置）',
            description: '入力→処理→出力の左右フローで配置。コネクタは端に配置。電源は左上に集約。配線が短く整理される。',
            visual: (
              <svg viewBox="0 0 260 140" className="w-60 h-32">
                <rect x="10" y="10" width="240" height="120" rx="4" fill="#0f172a" stroke="#16a34a" strokeWidth="2"/>
                <rect x="15" y="50" width="20" height="40" rx="2" fill="#ca8a04" stroke="#fbbf24" strokeWidth="1"/>
                <text x="25" y="73" textAnchor="middle" fontSize="7" fill="white" transform="rotate(-90,25,73)">CON</text>
                <rect x="40" y="15" width="35" height="22" rx="2" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1"/>
                <text x="58" y="28" textAnchor="middle" fontSize="7" fill="white">PWR</text>
                <rect x="100" y="45" width="60" height="50" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="130" y="73" textAnchor="middle" fontSize="9" fill="#bfdbfe">MCU</text>
                <rect x="190" y="50" width="40" height="40" rx="2" fill="#0e7490" stroke="#22d3ee" strokeWidth="1"/>
                <text x="210" y="73" textAnchor="middle" fontSize="8" fill="white">OUT</text>
                <line x1="35" y1="70" x2="100" y2="70" stroke="#4ade80" strokeWidth="1.5"/>
                <line x1="160" y1="70" x2="190" y2="70" stroke="#4ade80" strokeWidth="1.5"/>
                <line x1="58" y1="37" x2="130" y2="45" stroke="#a78bfa" strokeWidth="1.5"/>
                <text x="130" y="130" textAnchor="middle" fontSize="8" fill="#4ade80">短い配線・左→右の信号フロー</text>
              </svg>
            ),
          }}
        />

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: '信号の流れ', desc: '入力→処理→出力の順に左から右へ配置。配線が交差しない。', icon: '→' },
            { title: 'コネクタは端に', desc: 'コネクタ・スイッチは基板端部に配置。機構設計・ケーブル取り回しを考慮。', icon: '⬛' },
            { title: '電源グループ化', desc: '電源関連（レギュレータ・大容量Cap）は電源入力近くにまとめる。', icon: '⚡' },
          ].map((item, i) => (
            <div key={i} className="bg-teal-50 border border-teal-200 rounded-lg p-3">
              <p className="font-bold text-teal-900 text-sm mb-1">{item.icon} {item.title}</p>
              <p className="text-xs text-teal-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">2</span>
          電源とグランド — リターンパスを意識する
        </h2>

        <BeforeAfterComparison
          title="GND設計 — ベタGND vs スリット入りGND"
          before={{
            label: '悪い例（GNDにスリット）',
            description: 'GND層にスリット（切り欠き）があるとリターン電流が迂回してループ面積が増大。EMIが悪化し信号品質も低下する。',
            visual: (
              <svg viewBox="0 0 260 140" className="w-60 h-32">
                <rect x="10" y="10" width="240" height="120" rx="4" fill="#16a34a" opacity="0.3" stroke="#16a34a" strokeWidth="1"/>
                <text x="130" y="30" textAnchor="middle" fontSize="9" fill="#15803d" fontWeight="bold">GND層（Bottom）</text>
                <rect x="80" y="50" width="120" height="20" fill="#0f172a" stroke="#dc2626" strokeWidth="2"/>
                <text x="140" y="64" textAnchor="middle" fontSize="8" fill="#ef4444">スリット（危険！）</text>
                <path d="M60,60 L60,90 L220,90 L220,60" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2"/>
                <polygon points="218,62 222,60 220,65" fill="#ef4444"/>
                <path d="M60,55 L200,55" stroke="#60a5fa" strokeWidth="2"/>
                <polygon points="198,53 202,55 198,57" fill="#60a5fa"/>
                <text x="130" y="118" textAnchor="middle" fontSize="8" fill="#ef4444">リターン電流が迂回 → ループ面積大 → EMI悪化</text>
              </svg>
            ),
          }}
          after={{
            label: '良い例（完全ベタGND）',
            description: 'スリットなしのベタGNDではリターン電流が信号真下を流れる。ループ面積最小化でEMIが低減される。',
            visual: (
              <svg viewBox="0 0 260 140" className="w-60 h-32">
                <rect x="10" y="10" width="240" height="120" rx="4" fill="#16a34a" opacity="0.3" stroke="#16a34a" strokeWidth="2"/>
                <text x="130" y="30" textAnchor="middle" fontSize="9" fill="#15803d" fontWeight="bold">GND層（完全ベタ）</text>
                <path d="M50,65 L210,65" stroke="#60a5fa" strokeWidth="2.5"/>
                <polygon points="208,63 213,65 208,67" fill="#60a5fa"/>
                <text x="130" y="55" textAnchor="middle" fontSize="8" fill="#60a5fa">信号電流 →</text>
                <path d="M210,75 L50,75" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,2"/>
                <polygon points="52,73 47,75 52,77" fill="#ef4444"/>
                <text x="130" y="85" textAnchor="middle" fontSize="8" fill="#ef4444">← リターン電流（信号直下）</text>
                <text x="130" y="118" textAnchor="middle" fontSize="8" fill="#4ade80">ループ面積最小 → EMI低減</text>
              </svg>
            ),
          }}
        />

        <Callout type="warning" title="GNDのスリットは最大の敵">
          GND層に配線を引くためにスリットを入れるのは厳禁。GNDのカットが必要な場合は分割GNDの設計を見直し、接続点を慎重に管理する。詳細は
          <a href="/emc/05-pcb-design" className="text-blue-600 underline"> EMC基板設計編</a>も参照。
        </Callout>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">3</span>
          デカップリングコンデンサの配置
        </h2>

        <BeforeAfterComparison
          title="デカップリングコンデンサの配置"
          before={{
            label: '悪い例（ICから遠い）',
            description: 'コンデンサがICから遠いと、電源ノイズ吸収の効果が激減する。距離が長いほどインダクタンスが増えフィルタ効果が落ちる。',
            visual: (
              <svg viewBox="0 0 260 140" className="w-60 h-32">
                <rect x="10" y="10" width="240" height="120" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <rect x="90" y="40" width="80" height="60" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="130" y="73" textAnchor="middle" fontSize="9" fill="#bfdbfe">IC</text>
                <text x="130" y="85" textAnchor="middle" fontSize="7" fill="#93c5fd">VCC pin</text>
                <rect x="20" y="55" width="20" height="28" rx="2" fill="#c2410c" stroke="#f97316" strokeWidth="1.5"/>
                <text x="30" y="67" textAnchor="middle" fontSize="6" fill="white">C</text>
                <text x="30" y="75" textAnchor="middle" fontSize="6" fill="white">100n</text>
                <path d="M40,65 L90,65" stroke="#ef4444" strokeWidth="1.5"/>
                <text x="65" y="58" textAnchor="middle" fontSize="8" fill="#ef4444">長い！</text>
                <path d="M40,72 L90,72" stroke="#60a5fa" strokeWidth="1"/>
                <text x="130" y="125" textAnchor="middle" fontSize="8" fill="#ef4444">距離が長い → インダクタンス大 → 効果薄</text>
              </svg>
            ),
          }}
          after={{
            label: '良い例（ICの直近）',
            description: 'コンデンサをICの電源ピンの直近（1mm以内）に配置。ビアを介して電源・GNDベタに接続することで最大限の効果を発揮。',
            visual: (
              <svg viewBox="0 0 260 140" className="w-60 h-32">
                <rect x="10" y="10" width="240" height="120" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <rect x="12" y="12" width="236" height="116" rx="3" fill="#16a34a" opacity="0.1"/>
                <rect x="90" y="35" width="80" height="65" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="130" y="70" textAnchor="middle" fontSize="9" fill="#bfdbfe">IC</text>
                <rect x="108" y="18" width="14" height="16" rx="2" fill="#c2410c" stroke="#f97316" strokeWidth="1.5"/>
                <text x="115" y="27" textAnchor="middle" fontSize="6" fill="white">C</text>
                <line x1="115" y1="34" x2="115" y2="35" stroke="#fbbf24" strokeWidth="2"/>
                <circle cx="108" cy="17" r="3" fill="#f97316" stroke="#c2410c" strokeWidth="1"/>
                <circle cx="122" cy="17" r="3" fill="#4ade80" stroke="#16a34a" strokeWidth="1"/>
                <text x="65" y="20" fontSize="7" fill="#fbbf24">VCC via</text>
                <text x="128" y="20" fontSize="7" fill="#4ade80">GND via</text>
                <text x="130" y="123" textAnchor="middle" fontSize="8" fill="#4ade80">ICの直近配置 → 最大デカップリング効果</text>
              </svg>
            ),
          }}
        />

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-900 mb-2 text-sm">デカップリングの鉄則</h3>
          <ul className="space-y-1 text-xs text-blue-800">
            <li>• すべてのICの電源ピン近傍に 100nF（0.1μF）セラミックCを配置</li>
            <li>• 大電流消費ICには 10μF〜47μF のバルクCapも追加</li>
            <li>• 配置順: IC電源ピン → デカップリングC → ビア → 電源プレーン</li>
            <li>• GNDビアはCapの直下に配置（GNDプレーンへの最短接続）</li>
          </ul>
        </div>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">4</span>
          熱設計・放熱
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 300 140" className="w-72 h-32">
              <rect x="20" y="20" width="260" height="40" rx="2" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5"/>
              <rect x="80" y="10" width="60" height="30" rx="3" fill="#dc2626" stroke="#b91c1c" strokeWidth="2"/>
              <text x="110" y="28" textAnchor="middle" fontSize="9" fill="white">発熱IC</text>
              {[90, 100, 110, 120, 130].map((x, i) => (
                <g key={i}>
                  <rect x={x-2} y="20" width="4" height="40" fill="#f97316" stroke="#c2410c" strokeWidth="0.5"/>
                  <text x={x} y="80" textAnchor="middle" fontSize="6" fill="#c2410c">↓</text>
                </g>
              ))}
              <text x="110" y="72" textAnchor="middle" fontSize="8" fill="#c2410c">サーマルビア</text>
              <rect x="75" y="60" width="70" height="12" rx="1" fill="#f97316" stroke="#c2410c" strokeWidth="1.5"/>
              <text x="110" y="70" textAnchor="middle" fontSize="7" fill="white">銅箔放熱パッド</text>
              {[90, 110, 130].map((x, i) => (
                <line key={i} x1={x} y1="72" x2={x} y2="90" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,1"/>
              ))}
              <text x="110" y="105" textAnchor="middle" fontSize="8" fill="#ef4444">→ 熱を基板全体に拡散</text>
              <rect x="200" y="10" width="50" height="30" rx="3" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1.5"/>
              <text x="225" y="28" textAnchor="middle" fontSize="8" fill="white">GNDパッド</text>
              <line x1="200" y1="25" x2="190" y2="25" stroke="#f97316" strokeWidth="2"/>
              <line x1="225" y1="40" x2="225" y2="50" stroke="#f97316" strokeWidth="2"/>
              <line x1="250" y1="25" x2="260" y2="25" stroke="#f97316" strokeWidth="2"/>
              <text x="225" y="65" textAnchor="middle" fontSize="8" fill="#f97316">サーマルリリーフ</text>
              <text x="225" y="75" textAnchor="middle" fontSize="7" fill="#6b7280">手はんだしやすい</text>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="font-bold text-red-900 text-sm mb-1">サーマルビア</p>
            <p className="text-xs text-red-700">発熱部品の放熱パッド直下に多数のビア（0.3〜0.5mm）を格子状に配置。Bottom面の銅箔に熱を逃がす。</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="font-bold text-orange-900 text-sm mb-1">サーマルリリーフ</p>
            <p className="text-xs text-orange-700">ベタGNDとパッドの接続を細い4本スポークで接続。スポークが熱を遮断し、手はんだ時の熱逃げを防ぐ。</p>
          </div>
        </div>

        <Callout type="tip" title="高発熱部品の設計">
          電流1A以上流すMOSFET・レギュレータ・電源ICは、データシートのθJA（熱抵抗）で温度上昇を計算。
          ΔT = P × θJA で接合部温度を確認（最大Tjより低くなること）。
        </Callout>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">5</span>
          信号配線とループ面積
        </h2>

        <BeforeAfterComparison
          title="ループ面積 — EMCへの影響"
          before={{
            label: '悪い例（大きなループ）',
            description: 'GND配線が遠回りすると電流ループ面積が大きくなり、アンテナとして動作してEMIを放射する。高速信号で特に問題になる。',
            visual: (
              <svg viewBox="0 0 260 140" className="w-60 h-32">
                <rect x="10" y="10" width="240" height="120" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <rect x="30" y="30" width="40" height="30" rx="2" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="50" y="48" textAnchor="middle" fontSize="7" fill="white">Driver</text>
                <rect x="180" y="30" width="40" height="30" rx="2" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1.5"/>
                <text x="200" y="48" textAnchor="middle" fontSize="7" fill="white">Recv</text>
                <path d="M70,40 L180,40" stroke="#60a5fa" strokeWidth="2"/>
                <path d="M180,55 L180,110 L30,110 L30,60" stroke="#4ade80" strokeWidth="2" strokeDasharray="3,2"/>
                <rect x="30" y="40" width="150" height="70" fill="#ef4444" opacity="0.15"/>
                <text x="105" y="80" textAnchor="middle" fontSize="9" fill="#ef4444">大きなループ面積</text>
                <text x="105" y="92" textAnchor="middle" fontSize="8" fill="#ef4444">→ EMI放射大</text>
              </svg>
            ),
          }}
          after={{
            label: '良い例（小さなループ）',
            description: 'GNDベタに信号を並走させるとリターン電流が信号直下を流れ、ループ面積を最小化。EMIを大幅に削減できる。',
            visual: (
              <svg viewBox="0 0 260 140" className="w-60 h-32">
                <rect x="10" y="10" width="240" height="120" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <rect x="12" y="12" width="236" height="116" rx="3" fill="#16a34a" opacity="0.15"/>
                <rect x="30" y="30" width="40" height="30" rx="2" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="50" y="48" textAnchor="middle" fontSize="7" fill="white">Driver</text>
                <rect x="180" y="30" width="40" height="30" rx="2" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1.5"/>
                <text x="200" y="48" textAnchor="middle" fontSize="7" fill="white">Recv</text>
                <path d="M70,45 L180,45" stroke="#60a5fa" strokeWidth="2.5"/>
                <path d="M180,52 L70,52" stroke="#4ade80" strokeWidth="2.5" strokeDasharray="4,2"/>
                <rect x="70" y="45" width="110" height="7" fill="#fbbf24" opacity="0.2"/>
                <text x="125" y="42" textAnchor="middle" fontSize="8" fill="#fbbf24">極小ループ面積</text>
                <text x="125" y="75" textAnchor="middle" fontSize="8" fill="#4ade80">GNDベタで最短リターン</text>
                <text x="125" y="88" textAnchor="middle" fontSize="8" fill="#4ade80">→ EMI最小化</text>
              </svg>
            ),
          }}
        />

        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          ループ面積の最小化はEMC設計の根幹。高速信号（10MHz以上）は特に注意。詳細は
          <a href="/emc/05-pcb-design" className="underline text-blue-600">EMC基板設計編</a>で深く学べる。
        </div>
      </section>

      <section className="mb-8 not-prose">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">作ってみよう</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-amber-700">
            <li>KiCadでGNDベタを作成し、GNDにスリットがないか確認しよう</li>
            <li>ICの電源ピンにデカップリングコンデンサを配置し、最短距離になっているか確認しよう</li>
            <li>信号のリターンパスを意識して、GNDベタを切らない配線を引いてみよう</li>
          </ol>
        </div>
      </section>

      <div className="not-prose flex gap-3 flex-wrap">
        <Link href="/pcb/05-eda-tools" className="text-sm text-gray-500 hover:text-gray-700">← 05 EDAツールで作る</Link>
        <Link href="/pcb/07-manufacturing" className="text-sm text-blue-600 hover:text-blue-800 ml-auto">07 製造と実装 →</Link>
      </div>
    </article>
  )
}
