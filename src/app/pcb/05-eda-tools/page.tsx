import Link from 'next/link'
import Callout from '@/components/Callout'
import StepDiagram from '@/components/pcb/StepDiagram'

export const metadata = { title: 'EDAツールで作る | PCB設計学習' }

export default function EdaToolsPage() {
  const steps = [
    {
      title: '回路図入力',
      description: 'EDAの回路図エディタで部品記号を配置し、配線（ネット）を引きます。各部品にリファレンス（R1, C1等）と値を入力します。',
      visual: (
        <svg viewBox="0 0 280 140" className="w-64 h-32">
          <rect x="10" y="5" width="260" height="130" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
          <rect x="10" y="5" width="260" height="18" rx="4" fill="#334155"/>
          <text x="140" y="17" textAnchor="middle" fontSize="9" fill="#94a3b8">Schematic Editor</text>
          <rect x="10" y="23" width="260" height="14" fill="#1e293b"/>
          {['File','Edit','Place','Tools'].map((m, i) => (
            <text key={i} x={20 + i*50} y="33" fontSize="8" fill="#94a3b8">{m}</text>
          ))}
          <rect x="10" y="37" width="260" height="98" fill="#0f172a"/>
          {[50,80,110,140,170,200,230,260].map((x, i) => (
            <line key={i} x1={x} y1="37" x2={x} y2="135" stroke="#1e293b" strokeWidth="0.5"/>
          ))}
          {[50,65,80,95,110,125].map((y, i) => (
            <line key={i} x1="10" y1={y} x2="270" y2={y} stroke="#1e293b" strokeWidth="0.5"/>
          ))}
          <line x1="40" y1="85" x2="80" y2="85" stroke="#60a5fa" strokeWidth="1.5"/>
          <rect x="80" y="78" width="30" height="14" rx="2" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="95" y="88" textAnchor="middle" fontSize="7" fill="#93c5fd">R1</text>
          <line x1="110" y1="85" x2="140" y2="85" stroke="#60a5fa" strokeWidth="1.5"/>
          <polygon points="140,78 140,92 155,85" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
          <line x1="155" y1="78" x2="155" y2="92" stroke="#fbbf24" strokeWidth="2"/>
          <line x1="155" y1="85" x2="200" y2="85" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="95" y="73" textAnchor="middle" fontSize="7" fill="#64748b">470Ω</text>
          <text x="147" y="73" textAnchor="middle" fontSize="7" fill="#64748b">D1</text>
        </svg>
      ),
    },
    {
      title: 'ERC（電気的ルールチェック）',
      description: 'ERC（Electrical Rules Check）を実行し、未接続ピン・電源衝突・フローティング入力などの電気的な矛盾を検出します。',
      visual: (
        <svg viewBox="0 0 280 140" className="w-64 h-32">
          <rect x="10" y="5" width="260" height="130" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
          <rect x="10" y="5" width="260" height="18" rx="4" fill="#334155"/>
          <text x="140" y="17" textAnchor="middle" fontSize="9" fill="#94a3b8">ERC Results</text>
          <rect x="10" y="23" width="260" height="112" fill="#0f172a"/>
          <rect x="20" y="32" width="240" height="16" rx="2" fill="#16a34a" opacity="0.2"/>
          <text x="30" y="43" fontSize="9" fill="#4ade80">✓ No errors found — all nets connected</text>
          <rect x="20" y="52" width="240" height="16" rx="2" fill="#ca8a04" opacity="0.2"/>
          <text x="30" y="63" fontSize="9" fill="#fbbf24">⚠ Pin unconnected: U1 pin 4 (VCC)</text>
          <rect x="20" y="72" width="240" height="16" rx="2" fill="#dc2626" opacity="0.2"/>
          <text x="30" y="83" fontSize="9" fill="#f87171">✗ Power pin conflict: GND vs VCC</text>
          <text x="30" y="110" fontSize="8" fill="#64748b">修正してから次のステップへ進む</text>
        </svg>
      ),
    },
    {
      title: 'フットプリント割り当て',
      description: '各部品のシンボルに、基板上での物理的な形（フットプリント）を紐付けます。パッケージサイズ（0402/0603/SOT-23等）をここで決定。',
      visual: (
        <svg viewBox="0 0 280 140" className="w-64 h-32">
          <rect x="10" y="5" width="260" height="130" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
          <rect x="10" y="5" width="260" height="18" rx="4" fill="#334155"/>
          <text x="140" y="17" textAnchor="middle" fontSize="9" fill="#94a3b8">Footprint Assignment</text>
          <rect x="10" y="23" width="260" height="112" fill="#0f172a"/>
          <rect x="15" y="30" width="250" height="12" fill="#1e293b"/>
          <text x="20" y="39" fontSize="7" fill="#94a3b8">Ref</text>
          <text x="60" y="39" fontSize="7" fill="#94a3b8">Value</text>
          <text x="130" y="39" fontSize="7" fill="#94a3b8">Footprint</text>
          {[
            ['R1', '470Ω', 'Resistor_SMD:R_0402'],
            ['R2', '10kΩ', 'Resistor_SMD:R_0603'],
            ['D1', 'LED_red', 'LED_SMD:LED_0603'],
            ['C1', '100nF', 'Capacitor_SMD:C_0402'],
            ['U1', 'ATtiny85', 'Package_DIP:DIP-8_W7.62mm'],
          ].map(([ref, val, fp], i) => (
            <g key={i}>
              <rect x="15" y={44+i*14} width="250" height="13" fill={i%2===0 ? '#0f172a' : '#1e293b'}/>
              <text x="20" y={53+i*14} fontSize="8" fill="#60a5fa">{ref}</text>
              <text x="60" y={53+i*14} fontSize="8" fill="#94a3b8">{val}</text>
              <text x="130" y={53+i*14} fontSize="7" fill="#4ade80">{fp}</text>
            </g>
          ))}
        </svg>
      ),
    },
    {
      title: 'PCBレイアウト（配置）',
      description: 'ネットリストを読み込み、フットプリントを基板エディタに取り込みます。ラッツネスト（接続すべき線）を見ながら部品を最適な位置に配置します。',
      visual: (
        <svg viewBox="0 0 280 140" className="w-64 h-32">
          <rect x="10" y="5" width="260" height="130" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
          <rect x="10" y="5" width="260" height="18" rx="4" fill="#334155"/>
          <text x="140" y="17" textAnchor="middle" fontSize="9" fill="#94a3b8">PCB Editor — Layout</text>
          <rect x="10" y="23" width="260" height="112" fill="#0f172a"/>
          <rect x="40" y="35" width="180" height="90" rx="3" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2"/>
          <line x1="80" y1="65" x2="160" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" opacity="0.6"/>
          <line x1="80" y1="65" x2="120" y2="55" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" opacity="0.6"/>
          <line x1="120" y1="55" x2="160" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" opacity="0.6"/>
          <rect x="65" y="56" width="30" height="18" rx="2" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1"/>
          <text x="80" y="68" textAnchor="middle" fontSize="7" fill="#bfdbfe">U1</text>
          <rect x="112" y="47" width="16" height="10" rx="1" fill="#c2410c" stroke="#f97316" strokeWidth="1"/>
          <text x="120" y="55" textAnchor="middle" fontSize="6" fill="white">R1</text>
          <rect x="148" y="83" width="16" height="10" rx="1" fill="#c2410c" stroke="#f97316" strokeWidth="1"/>
          <text x="156" y="91" textAnchor="middle" fontSize="6" fill="white">D1</text>
          <text x="50" y="32" fontSize="8" fill="#fbbf24">ラッツネスト（未配線）</text>
        </svg>
      ),
    },
    {
      title: '配線（ルーティング）',
      description: 'ラッツネストに従って銅のトレースを引きます。電源はできるだけ太く（0.5mm以上）、信号は0.2mm前後。GNDはベタ塗りが基本です。',
      visual: (
        <svg viewBox="0 0 280 140" className="w-64 h-32">
          <rect x="10" y="5" width="260" height="130" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
          <rect x="10" y="5" width="260" height="18" rx="4" fill="#334155"/>
          <text x="140" y="17" textAnchor="middle" fontSize="9" fill="#94a3b8">PCB Editor — Routing</text>
          <rect x="10" y="23" width="260" height="112" fill="#0f172a"/>
          <rect x="40" y="35" width="180" height="90" rx="3" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
          <rect x="42" y="37" width="176" height="86" rx="2" fill="#16a34a" opacity="0.15"/>
          <path d="M95,65 L120,65 L120,52 L128,52" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M95,72 L140,72 L140,90 L148,90" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <rect x="65" y="56" width="30" height="18" rx="2" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1"/>
          <text x="80" y="68" textAnchor="middle" fontSize="7" fill="#bfdbfe">U1</text>
          <rect x="128" y="47" width="16" height="10" rx="1" fill="#c2410c" stroke="#f97316" strokeWidth="1"/>
          <rect x="148" y="85" width="16" height="10" rx="1" fill="#c2410c" stroke="#f97316" strokeWidth="1"/>
          <text x="55" y="32" fontSize="8" fill="#ef4444">電源(赤)</text>
          <text x="130" y="32" fontSize="8" fill="#60a5fa">信号(青)</text>
          <text x="200" y="32" fontSize="8" fill="#4ade80">GNDべた</text>
        </svg>
      ),
    },
    {
      title: 'DRC・ガーバー出力',
      description: 'DRC（Design Rule Check）でクリアランス・線幅違反を検査。問題なければ各層のガーバーファイル（.gbr）とドリルデータ（.drl）を出力します。',
      visual: (
        <svg viewBox="0 0 280 140" className="w-64 h-32">
          <rect x="10" y="5" width="260" height="130" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
          <rect x="10" y="5" width="260" height="18" rx="4" fill="#334155"/>
          <text x="140" y="17" textAnchor="middle" fontSize="9" fill="#94a3b8">Gerber Output Files</text>
          <rect x="10" y="23" width="260" height="112" fill="#0f172a"/>
          {[
            ['F.Cu.gbr', 'Top銅箔層', '#f97316'],
            ['B.Cu.gbr', 'Bottom銅箔層', '#f97316'],
            ['F.Mask.gbr', 'Topレジスト', '#4ade80'],
            ['B.Mask.gbr', 'Botレジスト', '#4ade80'],
            ['F.SilkS.gbr', 'Topシルク', '#fbbf24'],
            ['drill.drl', 'ドリルデータ', '#94a3b8'],
            ['Edge.Cuts.gbr', '外形', '#f472b6'],
          ].map(([file, desc, color], i) => (
            <g key={i}>
              <rect x="20" y={30+i*13} width="240" height="12" rx="1" fill="#1e293b"/>
              <rect x="20" y={30+i*13} width="4" height="12" rx="1" fill={color}/>
              <text x="30" y={39+i*13} fontSize="8" fill={color}>{file}</text>
              <text x="140" y={39+i*13} fontSize="8" fill="#64748b">{desc}</text>
            </g>
          ))}
        </svg>
      ),
    },
  ]

  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span><span>05 EDAツールで作る</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">EDAツールで作る — 回路図から製造データまで</h1>
        <p className="text-gray-600">KiCadを例にした設計フローを、ステップ図解で理解する。</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でできるようになること</h2>
        <ul className="space-y-1.5">
          {[
            '回路図入力からERC・フットプリント割り当てまでの工程を実行できる',
            'PCBエディタでの配置・配線・ベタGNDの手順を理解できる',
            'ガーバーファイルを出力して製造業者に入稿できる',
          ].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4">設計フロー（全6ステップ）</h2>
        <StepDiagram steps={steps} title="KiCadでの設計フロー（各ステップをクリック）" />
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">A</span>
          KiCad の画面構成
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'KiCad プロジェクトマネージャ', desc: '回路図/PCBエディタを起動するハブ。プロジェクトファイル(.kicad_pro)を管理。', icon: '🏠' },
            { name: '回路図エディタ (Schematic Editor)', desc: '部品記号の配置・配線・ERC実行。ファイル形式: .kicad_sch', icon: '📐' },
            { name: 'PCBエディタ (PCB Editor)', desc: 'フットプリント配置・配線・ベタ・DRC・ガーバー出力。.kicad_pcb', icon: '🗺️' },
            { name: 'フットプリントエディタ', desc: 'カスタムフットプリントの作成・編集。データシートの外形寸法から作成。', icon: '📦' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white">
              <p className="font-bold text-gray-900 mb-1 text-sm">{item.icon} {item.name}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">B</span>
          ベタGND（銅箔べた塗り）
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 300 140" className="w-72 h-32">
              <rect x="20" y="10" width="260" height="120" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
              <rect x="22" y="12" width="256" height="116" rx="3" fill="#16a34a" opacity="0.2"/>
              <rect x="50" y="40" width="60" height="40" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5"/>
              <text x="80" y="63" textAnchor="middle" fontSize="9" fill="#bfdbfe">MCU</text>
              <rect x="46" y="36" width="68" height="48" rx="3" fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="3,2"/>
              <path d="M110,60 L160,60 L160,45 L180,45" stroke="#ef4444" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <rect x="180" y="38" width="50" height="14" rx="2" fill="#c2410c" stroke="#f97316" strokeWidth="1"/>
              <text x="205" y="48" textAnchor="middle" fontSize="8" fill="white">VREG</text>
              <circle cx="150" cy="90" r="5" fill="#f97316" stroke="#c2410c" strokeWidth="1.5"/>
              <circle cx="150" cy="90" r="2.5" fill="#4ade80"/>
              <text x="162" y="93" fontSize="8" fill="#4ade80">GNDビア</text>
              <text x="80" y="128" textAnchor="middle" fontSize="8" fill="#4ade80">GNDベタ（Bottom面）</text>
            </svg>
          </div>
          <p className="text-xs text-gray-600 text-center">GNDベタはノイズを低減し、リターン電流経路を短くする。全ICのGNDピンを確実に接続。</p>
        </div>
        <Callout type="point" title="ベタGNDの作り方（KiCad）">
          PCBエディタで「Add Filled Zone」を選択 → GNDネットを指定 → 基板外形を囲む → 「B」キーで塗りつぶし更新。
          ビアを適切に打ってGND接続を確保する。
        </Callout>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">C</span>
          チェックリスト：レイアウト完了前に確認
        </h2>
        <div className="space-y-2">
          {[
            ['回路図', 'すべてのピンが接続されERC無エラーか'],
            ['回路図', 'すべての部品にフットプリントが割り当てられているか'],
            ['レイアウト', 'すべてのラッツネストが配線されているか（DRC無エラー）'],
            ['レイアウト', '電源ラインが十分な幅か（1A以上なら0.5mm以上）'],
            ['レイアウト', 'すべてのICの電源ピン近傍にデカップリングCoがあるか'],
            ['レイアウト', 'GNDベタが貼られGNDビアが適切に打たれているか'],
            ['ガーバー', 'ガーバービュアで全層を目視確認したか'],
            ['発注', '製造仕様（最小線幅・ビア・板厚・層数）を確認したか'],
          ].map(([category, item], i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-3">
              <div className={`w-14 shrink-0 text-xs text-center py-0.5 rounded font-medium ${category === '回路図' ? 'bg-blue-100 text-blue-700' : category === 'レイアウト' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {category}
              </div>
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 not-prose">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">作ってみよう</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-amber-700">
            <li>KiCad（無償）をインストールし、新規プロジェクトを作成してみよう</li>
            <li>抵抗(R)とLEDの直列回路を回路図エディタで描き、ERCを実行しよう</li>
            <li>各部品にフットプリントを割り当て、PCBエディタに取り込んで配置してみよう</li>
          </ol>
        </div>
      </section>

      <div className="not-prose flex gap-3 flex-wrap">
        <Link href="/pcb/04-board-structure" className="text-sm text-gray-500 hover:text-gray-700">← 04 基板のしくみ</Link>
        <Link href="/pcb/06-layout" className="text-sm text-blue-600 hover:text-blue-800 ml-auto">06 レイアウト設計の実務 →</Link>
      </div>
    </article>
  )
}
