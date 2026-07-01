import Callout from '@/components/Callout'
import { BlockMath, InlineMath } from '@/components/Math'

const checklist = [
  { id: 1, text: '電源コネクタ直後にEMIフィルタ（CMチョーク＋X/Yコンデンサ）が配置されているか' },
  { id: 2, text: 'フィルタの入力パターンと出力パターンが物理的に隣接していないか（フィルタのショートサーキット防止）' },
  { id: 3, text: 'グランドプレーンに断ち切り（スリット）がないか。特に信号ラインの直下' },
  { id: 4, text: '高速信号のリターンパス直下にグランドの不連続（スリット・ビア空白）がないか' },
  { id: 5, text: 'I/Oコネクタ直後にESD保護素子が配置されているか' },
  { id: 6, text: 'クロックラインにシリーズ終端抵抗（33〜47Ω）があるか' },
  { id: 7, text: '各ICの電源ピン直近（≤ 2 mm）にデカップリングコンデンサ（100 nF）があるか' },
  { id: 8, text: 'ケーブルコネクタのシールドが基板GNDに低インピーダンス（ピッグテール禁止）で接続されているか' },
  { id: 9, text: '信号ケーブルのリターン線がループ面積を最小化しているか（往路と復路を近接させているか）' },
  { id: 10, text: 'スイッチング電源のパワーループ（MOSFET-ダイオード-コンデンサ）が最小面積か' },
  { id: 11, text: 'クロック・高速発振器の直下や近傍にグランドプレーンが連続しているか' },
  { id: 12, text: 'アナログ電源とデジタル電源が適切に分離（もしくはフィルタリング）されているか' },
]

export default function PCBDesignPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">05 基板設計への応用編</h1>
        <p className="text-gray-600">EMCを試験場ではなく設計段階で作り込む。原理を理解して先回り対策を。</p>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="font-semibold text-gray-800 mb-2">この編で答えられるようになる問い</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
          <li>放射の大きさはループ面積・周波数・電流とどう関係するか？</li>
          <li>グランドプレーンを分割するとなぜ危険か？</li>
          <li>デカップリングコンデンサはなぜICの電源ピン直近に置くのか？</li>
        </ol>
      </div>

      {/* 1. Return current & loop area */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          1. リターン電流とループ面積
        </h2>
        <p className="text-gray-700 mb-3">
          電流は往路だけでなく必ず復路（リターン電流）を流れる。この往路と復路が作るループ面積が小さいほど放射は少なくなる。
        </p>
        <BlockMath math="E \propto I \cdot A \cdot f^2" />
        <p className="text-gray-700 text-sm mb-3">
          E: 電界強度、I: 電流 [A]、A: ループ面積 [m²]、f: 周波数 [Hz]。
          周波数の2乗に比例するため、高速クロックほどループ面積の管理が重要。
        </p>

        <div className="my-4">
          <svg viewBox="0 0 500 180" className="w-full max-w-lg border rounded bg-gray-50">
            <text x="250" y="20" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">リターン電流とループ面積</text>

            {/* Bad example */}
            <text x="120" y="45" textAnchor="middle" fontSize="11" fill="#dc2626">✗ ループ面積 大</text>
            <rect x="40" y="55" width="60" height="30" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" rx="2"/>
            <text x="70" y="73" textAnchor="middle" fontSize="9" fill="#1e40af">IC</text>
            <line x1="100" y1="65" x2="200" y2="65" stroke="#374151" strokeWidth="1.5"/>
            <rect x="200" y="55" width="40" height="30" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" rx="2"/>
            <text x="220" y="73" textAnchor="middle" fontSize="9" fill="#065f46">負荷</text>
            <line x1="220" y1="85" x2="220" y2="130" stroke="#374151" strokeWidth="1.5"/>
            <line x1="220" y1="130" x2="70" y2="130" stroke="#374151" strokeWidth="1.5"/>
            <line x1="70" y1="130" x2="70" y2="85" stroke="#374151" strokeWidth="1.5"/>
            <rect x="40" y="120" width="160" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1" strokeDasharray="3,2"/>
            <text x="120" y="133" textAnchor="middle" fontSize="9" fill="#d97706">大ループ → 放射大</text>

            {/* Good example */}
            <text x="380" y="45" textAnchor="middle" fontSize="11" fill="#059669">✓ ループ面積 小</text>
            <rect x="300" y="55" width="60" height="30" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" rx="2"/>
            <text x="330" y="73" textAnchor="middle" fontSize="9" fill="#1e40af">IC</text>
            <line x1="360" y1="65" x2="420" y2="65" stroke="#374151" strokeWidth="1.5"/>
            <rect x="420" y="55" width="40" height="30" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" rx="2"/>
            <text x="440" y="73" textAnchor="middle" fontSize="9" fill="#065f46">負荷</text>
            {/* Return path close to signal */}
            <line x1="360" y1="75" x2="420" y2="75" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2"/>
            <text x="390" y="95" textAnchor="middle" fontSize="9" fill="#ef4444">リターン（直下GND）</text>
            <text x="390" y="130" textAnchor="middle" fontSize="9" fill="#059669">小ループ → 放射小</text>
          </svg>
        </div>

        <Callout type="point" title="リターン電流の最短経路">
          高周波リターン電流は「最短経路」ではなく「インピーダンスが最も低い経路」を流れる。グランドプレーン上では信号ライン直下の経路が最低インピーダンスになる。グランドプレーンに不連続（スリット・ビア空白）があると迂回してループ面積が拡大する。
        </Callout>
      </section>

      {/* 2. Ground plane */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          2. グランドプレーンとスティッチングビア
        </h2>
        <p className="text-gray-700 mb-3">
          連続したベタGNDプレーン（グランド層）はリターン電流の低インピーダンス経路を提供し、放射を抑制する基板設計の最重要要素。
        </p>

        <h3 className="text-base font-semibold text-gray-800 mb-2">グランドプレーン分割の危険性</h3>
        <p className="text-gray-700 mb-2">
          「アナログGNDとデジタルGNDを分けるべき」という誤解から、グランドプレーンを分割するケースがある。しかし分割ライン（スリット）を高速信号が跨ぐと、リターン電流が迂回して巨大なループを形成し放射が爆増する。
        </p>
        <Callout type="warning" title="グランド分割の誤解">
          アナログ/デジタルGNDの分割は低周波（数 kHz 以下）では有効だが、高速信号が跨ぐと逆効果。現代の高速基板設計では「1枚の連続GNDプレーン＋レイアウトで分離」が推奨される。
        </Callout>

        <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">スティッチングビア</h3>
        <p className="text-gray-700 mb-2">
          多層基板でGNDプレーンが複数ある場合、各GNDプレーンを低インピーダンスで接続するビア。λ/20 間隔を目安に配置し、GND面間の電位差を抑制する。
        </p>
        <p className="text-sm text-gray-600">
          目安: 1 GHz では λ ≈ 30 cm → スティッチングビアは 1.5 cm 間隔以下。
        </p>
      </section>

      {/* 3. Decoupling */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          3. デカップリング / バイパスコンデンサ
        </h2>
        <p className="text-gray-700 mb-3">
          ICのスイッチング動作は瞬時に大電流を要求する。電源ラインの配線インピーダンスを通じて電流を供給しようとすると電圧が変動（ノイズ発生）する。デカップリングコンデンサはIC直近にエネルギーを蓄え、この過渡電流をローカルに供給する。
        </p>
        <Callout type="point" title="デカップリングは近いほど良い">
          デカップリングコンデンサはICの電源ピンから2 mm 以内が原則。遠くなるほど直列インダクタンス（配線インダクタンス）が増加し、高周波での効果が低下する。
        </Callout>
        <p className="text-gray-700 mb-3 mt-3">
          コンデンサの自己共振周波数（SRF）以上では容量成分ではなくインダクタとして動作する。
        </p>
        <BlockMath math="f_{SRF} = \frac{1}{2\pi\sqrt{L_{ESL} \cdot C}}" />
        <p className="text-gray-700 text-sm mb-3">
          <InlineMath math="L_{ESL}" />: コンデンサの等価直列インダクタンス [H]。SRFを高めるには低ESL品（チップコンデンサ、多端子品）を選ぶ。
        </p>
        <p className="text-gray-700">
          容量値の組み合わせ例：電源ピン直近に 100 nF（高周波用）＋基板全体に 10 μF（低周波用）の組み合わせが一般的。
        </p>
      </section>

      {/* 4. Clock & High-speed signals */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          4. クロック・高速信号の引き回し
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>グランドプレーン直上に配線：</strong>リターン電流が信号ライン直下を流れるようにGNDプレーン連続層の直上（または直下）に信号を配線する。
          </li>
          <li>
            <strong>スペクトラム拡散クロック（SSC）：</strong>CLK周波数を ±0.5〜1 % 変調して拡散。特定周波数のピークを3〜6 dB低減できる。ただしタイミング敏感な系（USB・PCIe等）では適用範囲に制限がある。
          </li>
          <li>
            <strong>シリーズ終端抵抗（33〜47Ω）：</strong>クロックラインの立ち上がり時間を意図的に鈍化させ高次高調波成分を抑制。ソース終端（ドライバ側）に配置。
          </li>
          <li>
            <strong>グランドビアの活用：</strong>信号ビアの近傍にグランドビアを配置し、リターン電流が確実に層間を移動できるようにする。
          </li>
        </ul>
      </section>

      {/* 5. Checklist */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          5. 設計レビューチェックリスト
        </h2>
        <p className="text-gray-600 text-sm mb-4">基板レビュー時に確認するEMC観点のチェックポイント。</p>
        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-center w-6 h-6 border-2 border-gray-400 rounded shrink-0 mt-0.5">
                <span className="text-xs text-gray-400">{item.id}</span>
              </div>
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <Callout type="tip" title="チェックリストの使い方" >
          このリストは設計段階での自己レビュー用。試験前の事前チェックとして活用し、全項目 Yes にしてから試験に臨むことで初回合格率が大幅に向上する。
        </Callout>
      </section>
    </div>
  )
}
