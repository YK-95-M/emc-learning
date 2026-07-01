import Link from 'next/link'
import Callout from '@/components/Callout'

export const metadata = { title: '回路を読む・設計する | PCB設計学習' }

export default function CircuitsPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span><span>03 回路を読む・設計する</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">回路を読む・設計する</h1>
        <p className="text-gray-600">回路図記号を覚え、基本回路を設計できるようになる。</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でできるようになること</h2>
        <ul className="space-y-1.5">
          {[
            '主要な回路図記号と実物を対応させられる',
            '分圧・LED点灯・RCフィルタ・電源回路を設計できる',
            '見やすい回路図の描き方の作法を習得できる',
          ].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      {/* Symbol reference */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">1</span>
          回路図記号一覧
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              name: '抵抗', label: 'R',
              svg: (
                <svg viewBox="0 0 80 40" className="w-16 h-8">
                  <line x1="4" y1="20" x2="16" y2="20" stroke="#374151" strokeWidth="2"/>
                  <rect x="16" y="10" width="48" height="20" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
                  <line x1="64" y1="20" x2="76" y2="20" stroke="#374151" strokeWidth="2"/>
                </svg>
              )
            },
            {
              name: 'コンデンサ', label: 'C',
              svg: (
                <svg viewBox="0 0 80 40" className="w-16 h-8">
                  <line x1="4" y1="20" x2="34" y2="20" stroke="#374151" strokeWidth="2"/>
                  <line x1="34" y1="8" x2="34" y2="32" stroke="#374151" strokeWidth="3"/>
                  <line x1="46" y1="8" x2="46" y2="32" stroke="#374151" strokeWidth="3"/>
                  <line x1="46" y1="20" x2="76" y2="20" stroke="#374151" strokeWidth="2"/>
                </svg>
              )
            },
            {
              name: 'インダクタ', label: 'L',
              svg: (
                <svg viewBox="0 0 80 40" className="w-16 h-8">
                  <line x1="4" y1="20" x2="14" y2="20" stroke="#374151" strokeWidth="2"/>
                  <path d="M14,20 C14,10 22,10 22,20 C22,10 30,10 30,20 C30,10 38,10 38,20 C38,10 46,10 46,20 C46,10 54,10 54,20 C54,10 62,10 62,20" stroke="#374151" strokeWidth="2" fill="none"/>
                  <line x1="62" y1="20" x2="76" y2="20" stroke="#374151" strokeWidth="2"/>
                </svg>
              )
            },
            {
              name: 'ダイオード', label: 'D',
              svg: (
                <svg viewBox="0 0 80 40" className="w-16 h-8">
                  <line x1="4" y1="20" x2="28" y2="20" stroke="#374151" strokeWidth="2"/>
                  <polygon points="28,10 28,30 52,20" fill="#fbbf24" stroke="#374151" strokeWidth="2"/>
                  <line x1="52" y1="10" x2="52" y2="30" stroke="#374151" strokeWidth="2.5"/>
                  <line x1="52" y1="20" x2="76" y2="20" stroke="#374151" strokeWidth="2"/>
                </svg>
              )
            },
            {
              name: 'LED', label: 'D (LED)',
              svg: (
                <svg viewBox="0 0 80 50" className="w-16 h-10">
                  <line x1="4" y1="25" x2="24" y2="25" stroke="#374151" strokeWidth="2"/>
                  <polygon points="24,15 24,35 48,25" fill="#fbbf24" stroke="#374151" strokeWidth="2"/>
                  <line x1="48" y1="15" x2="48" y2="35" stroke="#374151" strokeWidth="2.5"/>
                  <line x1="48" y1="25" x2="76" y2="25" stroke="#374151" strokeWidth="2"/>
                  <line x1="54" y1="18" x2="62" y2="10" stroke="#fbbf24" strokeWidth="1.5"/>
                  <line x1="60" y1="22" x2="68" y2="14" stroke="#fbbf24" strokeWidth="1.5"/>
                  <polygon points="61,9 64,13 58,12" fill="#fbbf24"/>
                  <polygon points="67,13 70,17 64,16" fill="#fbbf24"/>
                </svg>
              )
            },
            {
              name: 'NPN Tr', label: 'Q',
              svg: (
                <svg viewBox="0 0 80 60" className="w-16 h-12">
                  <circle cx="45" cy="30" r="22" fill="none" stroke="#374151" strokeWidth="1.5"/>
                  <line x1="4" y1="30" x2="28" y2="30" stroke="#374151" strokeWidth="2"/>
                  <line x1="28" y1="15" x2="28" y2="45" stroke="#374151" strokeWidth="2.5"/>
                  <line x1="28" y1="20" x2="50" y2="10" stroke="#374151" strokeWidth="2"/>
                  <line x1="50" y1="10" x2="50" y2="2" stroke="#374151" strokeWidth="2"/>
                  <line x1="28" y1="40" x2="50" y2="50" stroke="#374151" strokeWidth="2"/>
                  <polygon points="43,44 50,50 45,40" fill="#374151"/>
                  <line x1="50" y1="50" x2="50" y2="58" stroke="#374151" strokeWidth="2"/>
                  <text x="2" y="28" fontSize="8" fill="#374151">B</text>
                </svg>
              )
            },
            {
              name: '電池', label: 'BT',
              svg: (
                <svg viewBox="0 0 80 40" className="w-16 h-8">
                  <line x1="4" y1="20" x2="26" y2="20" stroke="#374151" strokeWidth="2"/>
                  <line x1="26" y1="10" x2="26" y2="30" stroke="#374151" strokeWidth="3"/>
                  <line x1="34" y1="14" x2="34" y2="26" stroke="#374151" strokeWidth="1.5"/>
                  <line x1="42" y1="10" x2="42" y2="30" stroke="#374151" strokeWidth="3"/>
                  <line x1="50" y1="14" x2="50" y2="26" stroke="#374151" strokeWidth="1.5"/>
                  <line x1="54" y1="20" x2="76" y2="20" stroke="#374151" strokeWidth="2"/>
                  <text x="22" y="9" fontSize="8" fill="#ef4444">+</text>
                </svg>
              )
            },
            {
              name: 'GND', label: '⏚',
              svg: (
                <svg viewBox="0 0 80 40" className="w-16 h-8">
                  <line x1="40" y1="4" x2="40" y2="20" stroke="#374151" strokeWidth="2"/>
                  <line x1="24" y1="20" x2="56" y2="20" stroke="#374151" strokeWidth="2.5"/>
                  <line x1="30" y1="26" x2="50" y2="26" stroke="#374151" strokeWidth="2"/>
                  <line x1="36" y1="32" x2="44" y2="32" stroke="#374151" strokeWidth="1.5"/>
                </svg>
              )
            },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-3 bg-white flex flex-col items-center gap-1">
              <div className="h-12 flex items-center justify-center">{item.svg}</div>
              <p className="text-xs font-medium text-gray-900 text-center">{item.name}</p>
              <p className="text-xs text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Basic circuits */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">2</span>
          基本回路パターン
        </h2>

        <div className="space-y-6">
          {/* Voltage divider */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">分圧回路</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                <svg viewBox="0 0 120 160" className="w-32 h-40">
                  <line x1="60" y1="5" x2="60" y2="20" stroke="#374151" strokeWidth="2"/>
                  <line x1="10" y1="5" x2="110" y2="5" stroke="#374151" strokeWidth="1.5" strokeDasharray="4,2"/>
                  <rect x="40" y="20" width="40" height="30" rx="3" fill="white" stroke="#374151" strokeWidth="2"/>
                  <text x="60" y="38" textAnchor="middle" fontSize="11" fill="#374151">R1</text>
                  <line x1="60" y1="50" x2="60" y2="70" stroke="#374151" strokeWidth="2"/>
                  {/* Vout tap */}
                  <line x1="60" y1="70" x2="100" y2="70" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2"/>
                  <text x="105" y="73" fontSize="9" fill="#ef4444">Vout</text>
                  <rect x="40" y="70" width="40" height="30" rx="3" fill="white" stroke="#374151" strokeWidth="2"/>
                  <text x="60" y="88" textAnchor="middle" fontSize="11" fill="#374151">R2</text>
                  <line x1="60" y1="100" x2="60" y2="120" stroke="#374151" strokeWidth="2"/>
                  <line x1="10" y1="120" x2="110" y2="120" stroke="#374151" strokeWidth="1.5" strokeDasharray="4,2"/>
                  <text x="10" y="65" fontSize="9" fill="#374151">Vin</text>
                  <text x="30" y="65" fontSize="10" fill="#374151">{"}"}</text>
                  <text x="30" y="125" fontSize="9" fill="#374151">GND</text>
                </svg>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-mono text-blue-900 font-bold">Vout = Vin × R2 / (R1 + R2)</p>
                </div>
                <p className="text-xs text-gray-600">入力電圧を抵抗比で分割する。ADC入力の電圧スケーリングやバイアス点の設定に使用。</p>
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-xs text-gray-700">例: Vin=5V, R1=R2=10kΩ → Vout = 2.5V</p>
                </div>
              </div>
            </div>
          </div>

          {/* LED circuit */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">LED点灯回路</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                <svg viewBox="0 0 200 100" className="w-48 h-24">
                  <path d="M20,30 L140,30 L140,70 L20,70" stroke="#374151" strokeWidth="2" fill="none"/>
                  {/* Battery */}
                  <line x1="20" y1="30" x2="20" y2="42" stroke="#374151" strokeWidth="2"/>
                  <line x1="10" y1="42" x2="30" y2="42" stroke="#374151" strokeWidth="3"/>
                  <line x1="13" y1="48" x2="27" y2="48" stroke="#374151" strokeWidth="1.5"/>
                  <line x1="20" y1="48" x2="20" y2="70" stroke="#374151" strokeWidth="2"/>
                  <text x="4" y="40" fontSize="8" fill="#ef4444">+</text>
                  <text x="4" y="58" fontSize="8" fill="#3b82f6">−</text>
                  {/* Resistor */}
                  <rect x="50" y="21" width="36" height="18" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
                  <text x="68" y="33" textAnchor="middle" fontSize="9" fill="#374151">R</text>
                  {/* LED */}
                  <polygon points="106,22 106,38 120,30" fill="#fbbf24" stroke="#374151" strokeWidth="2"/>
                  <line x1="120" y1="22" x2="120" y2="38" stroke="#374151" strokeWidth="2.5"/>
                  <line x1="124" y1="26" x2="130" y2="20" stroke="#fbbf24" strokeWidth="1.5"/>
                  <line x1="128" y1="30" x2="135" y2="24" stroke="#fbbf24" strokeWidth="1.5"/>
                  <text x="80" y="60" textAnchor="middle" fontSize="8" fill="#6b7280">+5V → R → LED → GND</text>
                </svg>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="bg-yellow-50 rounded-lg p-3">
                  <p className="text-xs font-mono text-yellow-900 font-bold">R = (Vcc - Vf) / IF</p>
                </div>
                <p className="text-xs text-gray-600">LEDには必ず電流制限抵抗が必要。Vf = LEDの順方向電圧（赤: ~2V、白/青: ~3.3V）。IF = 目標電流（通常5〜20mA）。</p>
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-xs text-gray-700">例: 5V, 赤LED(Vf=2V), IF=10mA → R = (5-2)/0.01 = 300Ω → 330Ω標準品を使用</p>
                </div>
              </div>
            </div>
          </div>

          {/* RC filter */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">RCローパスフィルタ</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div className="flex justify-center">
                <svg viewBox="0 0 200 100" className="w-48 h-24">
                  <line x1="10" y1="50" x2="35" y2="50" stroke="#374151" strokeWidth="2"/>
                  <rect x="35" y="40" width="40" height="20" rx="2" fill="white" stroke="#374151" strokeWidth="2"/>
                  <text x="55" y="53" textAnchor="middle" fontSize="10" fill="#374151">R</text>
                  <line x1="75" y1="50" x2="100" y2="50" stroke="#374151" strokeWidth="2"/>
                  {/* Capacitor */}
                  <line x1="100" y1="35" x2="100" y2="50" stroke="#374151" strokeWidth="2"/>
                  <line x1="90" y1="50" x2="110" y2="50" stroke="#374151" strokeWidth="3"/>
                  <line x1="90" y1="58" x2="110" y2="58" stroke="#374151" strokeWidth="2"/>
                  <line x1="100" y1="58" x2="100" y2="80" stroke="#374151" strokeWidth="2"/>
                  <line x1="85" y1="80" x2="115" y2="80" stroke="#374151" strokeWidth="2"/>
                  {/* Output */}
                  <line x1="100" y1="35" x2="190" y2="35" stroke="#374151" strokeWidth="2"/>
                  <text x="10" y="40" fontSize="8" fill="#3b82f6">Vin</text>
                  <text x="155" y="28" fontSize="8" fill="#ef4444">Vout</text>
                  <text x="55" y="95" textAnchor="middle" fontSize="8" fill="#6b7280">fc = 1/(2πRC)</text>
                </svg>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-mono text-green-900 font-bold">fc = 1 / (2π × R × C)</p>
                </div>
                <p className="text-xs text-gray-600">カットオフ周波数 fc 以上の信号を減衰させる。ノイズフィルタ・ADC入力の帯域制限・電源デカップリングに使用。</p>
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-xs text-gray-700">例: R=1kΩ, C=100nF → fc = 1/(2π×1000×100×10⁻⁹) ≈ 1.6kHz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schematic best practices */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">3</span>
          見やすい回路図の描き方
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-900 mb-2 text-sm">✓ 良い回路図の原則</h3>
            <ul className="space-y-1.5 text-xs text-green-800">
              {[
                '信号は左から右へ流れるように描く',
                '電源（VCC/VDD）は上、GNDは下に配置',
                '配線はなるべく直角に曲げる',
                '交差点には必ず接続点（ジャンクション●）を付ける',
                '部品に必ず値とリファレンス（R1, C2等）を記入',
                '電源フラグ（PWR_FLAG）を入れてERCエラーを防ぐ',
                'バスは名称ラベルで整理する',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-green-500 shrink-0">•</span>{tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="font-bold text-red-900 mb-2 text-sm">✗ 避けるべきこと</h3>
            <ul className="space-y-1.5 text-xs text-red-700">
              {[
                '斜め配線（読みにくい・接続点が分かりにくい）',
                '配線が長すぎて追いかけられない',
                '接続点なしで配線が交差（接続してるのかどうか不明）',
                '部品値の省略（R1だけでΩ値が書いていない）',
                'ページをまたぐ配線の多用（ラベルを使う）',
                '同じ回路ブロックが離れた場所に点在',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-red-500 shrink-0">•</span>{tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="mb-8 not-prose">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">作ってみよう</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-amber-700">
            <li>5V電源から3.3Vを得る分圧回路の抵抗値を計算してみよう（R1:R2 = 1:2 を使う）</li>
            <li>カットオフ周波数 10kHz の RC ローパスフィルタを設計しよう（R=1kΩ固定でCを求める）</li>
            <li>KiCad（またはweb版EDA）を開いて、抵抗とコンデンサだけの分圧回路を描いてみよう</li>
          </ol>
        </div>
      </section>

      <div className="not-prose flex gap-3 flex-wrap">
        <Link href="/pcb/02-components" className="text-sm text-gray-500 hover:text-gray-700">← 02 電子部品図鑑</Link>
        <Link href="/pcb/04-board-structure" className="text-sm text-blue-600 hover:text-blue-800 ml-auto">04 基板のしくみ →</Link>
      </div>
    </article>
  )
}
