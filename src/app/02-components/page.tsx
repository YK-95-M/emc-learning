import Link from 'next/link'
import Callout from '@/components/Callout'

export const metadata = { title: '電子部品図鑑 | PCB設計学習' }

export default function ComponentsPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span>
          <span>02 電子部品図鑑</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">電子部品図鑑 — イラストで覚える</h1>
        <p className="text-gray-600">実物と回路記号を並べて学ぶ。各部品の「何をする部品か」を最優先で理解する。</p>
      </div>

      {/* Goals */}
      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でできるようになること</h2>
        <ul className="space-y-1.5">
          {[
            '主要な電子部品の役割・回路記号・実物を対応させられる',
            'データシートから最大定格・代表特性の見方が分かる',
            '表面実装（SMD）とリード部品の違いを判別できる',
          ].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      {/* Resistor */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">R</span>
          抵抗（レジスタ）
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">回路記号（JIS）</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 100 50" className="w-28 h-16">
                <line x1="5" y1="25" x2="20" y2="25" stroke="#374151" strokeWidth="2.5"/>
                <rect x="20" y="12" width="60" height="26" rx="3" fill="white" stroke="#374151" strokeWidth="2.5"/>
                <line x1="80" y1="25" x2="95" y2="25" stroke="#374151" strokeWidth="2.5"/>
                <text x="50" y="30" textAnchor="middle" fontSize="11" fill="#374151">R</text>
              </svg>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">実物（カラーコード付き）</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 120 60" className="w-32 h-16">
                {/* Resistor body */}
                <line x1="10" y1="30" x2="30" y2="30" stroke="#9ca3af" strokeWidth="2"/>
                <line x1="90" y1="30" x2="110" y2="30" stroke="#9ca3af" strokeWidth="2"/>
                <rect x="30" y="18" width="60" height="24" rx="10" fill="#e8d5a3"/>
                {/* Color bands */}
                <rect x="40" y="18" width="8" height="24" rx="1" fill="#f97316"/>
                <rect x="52" y="18" width="8" height="24" rx="1" fill="#f97316"/>
                <rect x="64" y="18" width="8" height="24" rx="1" fill="#a16207"/>
                <rect x="76" y="18" width="6" height="24" rx="1" fill="#fbbf24"/>
                <text x="60" y="54" textAnchor="middle" fontSize="8" fill="#6b7280">470Ω (黄紫茶金)</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>役割:</strong> 電流を制限する・電圧を分割する・プルアップ/プルダウン。基板上で最も多く使う部品。
          <br/><strong>定格の見方:</strong> 抵抗値（Ω/kΩ/MΩ）・精度（±1%等）・消費電力（1/4W等）・パッケージ（0402/0603/0805等）
        </div>
        <Callout type="tip" title="カラーコードの読み方">
          帯の色 → 数値（黒0 茶1 赤2 橙3 黄4 緑5 青6 紫7 灰8 白9）。4帯の場合、1〜2桁目＋乗数＋許容差。
          470Ω = 黄(4)紫(7)茶(×10)金(±5%)
        </Callout>
      </section>

      {/* Capacitor */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">C</span>
          コンデンサ（キャパシタ）
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">回路記号</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 100 60" className="w-28 h-16">
                <line x1="5" y1="30" x2="42" y2="30" stroke="#374151" strokeWidth="2.5"/>
                <line x1="42" y1="10" x2="42" y2="50" stroke="#374151" strokeWidth="3"/>
                <line x1="58" y1="10" x2="58" y2="50" stroke="#374151" strokeWidth="3"/>
                <line x1="58" y1="30" x2="95" y2="30" stroke="#374151" strokeWidth="2.5"/>
                <text x="50" y="58" textAnchor="middle" fontSize="9" fill="#374151">C</text>
              </svg>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">充放電のしくみ</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 120 60" className="w-32 h-16">
                {/* Capacitor plates */}
                <line x1="10" y1="30" x2="50" y2="30" stroke="#9ca3af" strokeWidth="1.5"/>
                <rect x="50" y="10" width="8" height="40" rx="1" fill="#3b82f6"/>
                <rect x="62" y="10" width="8" height="40" rx="1" fill="#ef4444"/>
                <line x1="70" y1="30" x2="110" y2="30" stroke="#9ca3af" strokeWidth="1.5"/>
                {/* Charge symbols */}
                <text x="54" y="28" fontSize="12" fill="white" fontWeight="bold">+</text>
                <text x="66" y="28" fontSize="12" fill="white" fontWeight="bold">−</text>
                <text x="54" y="56" textAnchor="middle" fontSize="7" fill="#6b7280">充電中</text>
                <text x="76" y="56" textAnchor="middle" fontSize="7" fill="#6b7280">蓄積</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-3">
          <strong>役割:</strong> 電荷を蓄える・交流を通す直流を遮断・ノイズフィルタ・デカップリング（電源のノイズ吸収）。<br/>
          <strong>種類:</strong> セラミック（高周波デカップリング）・電解（大容量バイパス・有極性）・フィルム（精度が必要な場合）
        </div>
        <Callout type="point" title="デカップリングコンデンサ">
          ICの電源ピン近くに配置し、ICの動作による電源電圧の揺れを吸収する。基板設計で最重要の部品の一つ。
        </Callout>
      </section>

      {/* Inductor */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center">L</span>
          インダクタ（コイル）
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">回路記号</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 120 50" className="w-32 h-14">
                <line x1="5" y1="25" x2="20" y2="25" stroke="#374151" strokeWidth="2.5"/>
                <path d="M20,25 C20,10 35,10 35,25 C35,10 50,10 50,25 C50,10 65,10 65,25 C65,10 80,10 80,25 C80,10 95,10 95,25"
                      stroke="#374151" strokeWidth="2.5" fill="none"/>
                <line x1="95" y1="25" x2="110" y2="25" stroke="#374151" strokeWidth="2.5"/>
                <text x="57" y="45" textAnchor="middle" fontSize="9" fill="#374151">L</text>
              </svg>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">磁界のしくみ</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 120 60" className="w-32 h-16">
                {/* Coil */}
                <path d="M20,35 C20,20 30,20 30,35 C30,20 40,20 40,35 C40,20 50,20 50,35 C50,20 60,20 60,35 C60,20 70,20 70,35 C70,20 80,20 80,35 C80,20 90,20 90,35"
                      stroke="#7c3aed" strokeWidth="2.5" fill="none"/>
                {/* Magnetic field loops */}
                <ellipse cx="55" cy="35" rx="45" ry="18" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,3" opacity="0.6"/>
                <text x="55" y="58" textAnchor="middle" fontSize="8" fill="#7c3aed">磁界を蓄える</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
          <strong>役割:</strong> 電流変化に抵抗（磁界にエネルギーを蓄える）・直流は通す交流を遮断・EMIフィルタ・電源のエネルギー蓄積（DC-DCコンバータ）<br/>
          <strong>単位:</strong> ヘンリー [H]（実用はμH〜mH）
        </div>
      </section>

      {/* Diode / LED */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-yellow-500 text-white text-sm font-bold flex items-center justify-center">D</span>
          ダイオード・LED
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">回路記号と電流の向き</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 120 60" className="w-32 h-16">
                <line x1="10" y1="30" x2="40" y2="30" stroke="#374151" strokeWidth="2.5"/>
                <polygon points="40,15 40,45 70,30" fill="#fbbf24" stroke="#374151" strokeWidth="2"/>
                <line x1="70" y1="15" x2="70" y2="45" stroke="#374151" strokeWidth="3"/>
                <line x1="70" y1="30" x2="110" y2="30" stroke="#374151" strokeWidth="2.5"/>
                {/* Current arrow */}
                <polygon points="25,26 35,30 25,34" fill="#ef4444"/>
                <text x="30" y="20" fontSize="8" fill="#ef4444">順方向</text>
                {/* Block arrow */}
                <text x="85" y="22" fontSize="8" fill="#6b7280">逆方向</text>
                <text x="85" y="32" fontSize="8" fill="#6b7280">×ブロック</text>
                <text x="55" y="56" textAnchor="middle" fontSize="9" fill="#374151">アノード(A)→カソード(K)</text>
              </svg>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">LED（発光ダイオード）</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 120 70" className="w-32 h-16">
                <line x1="10" y1="35" x2="35" y2="35" stroke="#374151" strokeWidth="2.5"/>
                <polygon points="35,20 35,50 60,35" fill="#fbbf24" stroke="#374151" strokeWidth="2"/>
                <line x1="60" y1="20" x2="60" y2="50" stroke="#374151" strokeWidth="3"/>
                <line x1="60" y1="35" x2="110" y2="35" stroke="#374151" strokeWidth="2.5"/>
                {/* Light rays */}
                <line x1="72" y1="22" x2="80" y2="12" stroke="#fbbf24" strokeWidth="2"/>
                <line x1="78" y1="26" x2="90" y2="18" stroke="#fbbf24" strokeWidth="2"/>
                <polygon points="79,11 83,15 75,14" fill="#fbbf24"/>
                <polygon points="89,17 92,22 86,20" fill="#fbbf24"/>
                <text x="55" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">電流で発光</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
          <strong>ダイオードの役割:</strong> 一方向にしか電流を流さない（整流・保護・逆電圧防止）<br/>
          <strong>LEDの特徴:</strong> 順方向電圧 Vf（赤: ~2V、青/白: ~3.3V）が存在。必ず電流制限抵抗が必要。<br/>
          <strong>極性:</strong> アノード(+長い足)とカソード(-短い足/フラット側)を間違えないこと
        </div>
      </section>

      {/* Transistor / FET */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center">Q</span>
          トランジスタ・FET
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">NPNトランジスタ（スイッチ動作）</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 120 100" className="w-32 h-24">
                {/* Circle */}
                <circle cx="60" cy="50" r="35" fill="none" stroke="#374151" strokeWidth="2"/>
                {/* Base */}
                <line x1="5" y1="50" x2="35" y2="50" stroke="#374151" strokeWidth="2.5"/>
                {/* Vertical bar */}
                <line x1="35" y1="30" x2="35" y2="70" stroke="#374151" strokeWidth="3"/>
                {/* Collector */}
                <line x1="35" y1="35" x2="65" y2="20" stroke="#374151" strokeWidth="2.5"/>
                <line x1="65" y1="20" x2="65" y2="5" stroke="#374151" strokeWidth="2.5"/>
                {/* Emitter with arrow */}
                <line x1="35" y1="65" x2="65" y2="80" stroke="#374151" strokeWidth="2.5"/>
                <line x1="65" y1="80" x2="65" y2="95" stroke="#374151" strokeWidth="2.5"/>
                <polygon points="55,74 65,80 59,67" fill="#374151"/>
                {/* Labels */}
                <text x="5" y="47" fontSize="9" fill="#374151">B</text>
                <text x="70" y="12" fontSize="9" fill="#374151">C</text>
                <text x="70" y="94" fontSize="9" fill="#374151">E</text>
              </svg>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-2 text-center">「電気で動くスイッチ」</p>
            <div className="flex justify-center">
              <svg viewBox="0 0 140 100" className="w-36 h-24">
                {/* Switch analogy */}
                <rect x="10" y="30" width="40" height="40" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                <text x="30" y="48" textAnchor="middle" fontSize="8" fill="#1d4ed8">小電流</text>
                <text x="30" y="60" textAnchor="middle" fontSize="8" fill="#1d4ed8">（制御）</text>
                <path d="M52,50 L65,50" stroke="#374151" strokeWidth="1.5"/>
                <polygon points="62,47 68,50 62,53" fill="#374151"/>
                {/* Switch */}
                <rect x="70" y="10" width="60" height="80" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
                <line x1="90" y1="30" x2="90" y2="70" stroke="#374151" strokeWidth="1.5"/>
                <line x1="120" y1="30" x2="120" y2="70" stroke="#374151" strokeWidth="1.5"/>
                {/* Switch contacts */}
                <line x1="90" y1="50" x2="110" y2="40" stroke="#374151" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="120" cy="40" r="3" fill="#374151"/>
                <text x="100" y="80" textAnchor="middle" fontSize="8" fill="#15803d">大電流</text>
                <text x="100" y="90" textAnchor="middle" fontSize="8" fill="#15803d">（負荷）</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
          <strong>トランジスタ (BJT):</strong> ベース電流でコレクタ電流を制御。NPN型は最も一般的。電流増幅（hFE）。<br/>
          <strong>FET（MOSFET）:</strong> ゲート電圧でドレイン電流を制御。デジタル回路・スイッチング電源に多用。ゲートに電流不要。<br/>
          <strong>用途:</strong> スイッチング（LED/モーター駆動）・信号増幅・電源制御
        </div>
      </section>

      {/* IC/OpAmp */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">IC</span>
          IC・オペアンプ・レギュレータ
        </h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              title: '集積回路（IC）',
              desc: '多数のトランジスタ・抵抗・コンデンサを1チップに集積。マイコン・ロジックIC・ドライバIC等。',
              color: 'bg-indigo-50 border-indigo-200',
            },
            {
              title: 'オペアンプ',
              desc: '高利得差動増幅器。帰還回路で増幅・フィルタ・比較器・ADCバッファ等を構成。VCC/VEE/IN+/IN-/OUT。',
              color: 'bg-blue-50 border-blue-200',
            },
            {
              title: '電圧レギュレータ',
              desc: '入力電圧を安定した出力電圧に変換。LDO（低ドロップアウト）はVin-Voutの差が小さくても動作。',
              color: 'bg-green-50 border-green-200',
            },
          ].map((item, i) => (
            <div key={i} className={`${item.color} border rounded-xl p-3`}>
              <p className="font-bold text-sm text-gray-900 mb-1">{item.title}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <Callout type="tip" title="ICのデカップリング">
          すべてのICの電源ピン（VCC/VDD）の直近に100nF（0.1μF）のセラミックコンデンサを配置する。これが基板設計の基本ルール。
        </Callout>
      </section>

      {/* Datasheet reading */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-gray-500 text-white text-sm font-bold flex items-center justify-center">📄</span>
          データシートの読み方
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">まず確認する項目</h3>
              <ul className="space-y-1.5 text-sm">
                {[
                  ['最大定格', '(Absolute Maximum Ratings) 絶対に超えてはいけない値', '#ef4444'],
                  ['推奨動作条件', '(Recommended Operating Conditions) 通常使用する範囲', '#3b82f6'],
                  ['代表特性', '(Typical Performance) 代表的な動作特性のグラフ', '#10b981'],
                  ['ピン配置', '(Pin Configuration) 各ピンの機能を確認', '#f59e0b'],
                  ['パッケージ図', '(Package Outline) フットプリント設計に必要な外形寸法', '#8b5cf6'],
                ].map(([title, desc, color], i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{backgroundColor: color}}/>
                    <span>
                      <span className="font-medium text-gray-900">{title}</span>
                      <span className="text-gray-500 text-xs"> — {desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">よくある失敗と対策</h3>
              <ul className="space-y-2 text-sm">
                {[
                  ['最大定格超過', '動作保証外。必ずデレーティング（最大値の70-80%で使用）する'],
                  ['電源電圧の確認不足', 'VCCの範囲とICの耐圧を必ず照合'],
                  ['フットプリント不一致', 'パッケージ図の寸法で自前のフットプリントを作成 or ライブラリを確認'],
                  ['入出力電圧レベル不一致', '3.3V出力を5V入力に繋ぐと動作しないことも。VOH/VIHを確認'],
                ].map(([title, desc], i) => (
                  <li key={i} className="bg-red-50 rounded p-2">
                    <p className="font-medium text-red-800 text-xs">{title}</p>
                    <p className="text-red-600 text-xs">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="mb-8 not-prose">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">確かめよう</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-amber-700">
            <li>赤色LEDのデータシートで Vf（順方向電圧）と IF_max（最大電流）を調べてみよう</li>
            <li>5V電源でIF = 10mAになる電流制限抵抗値を計算してみよう（ヒント: R = (V-Vf)/I）</li>
            <li>上の計算で選んだ抵抗の消費電力 P = I²R を求め、定格 1/4W に収まるか確認しよう</li>
          </ol>
        </div>
      </section>

      <div className="not-prose flex gap-3 flex-wrap">
        <Link href="/pcb/01-basics" className="text-sm text-gray-500 hover:text-gray-700">← 01 電気の基礎</Link>
        <Link href="/pcb/03-circuits" className="text-sm text-blue-600 hover:text-blue-800 ml-auto">03 回路を読む・設計する →</Link>
      </div>
    </article>
  )
}
