import Callout from '@/components/Callout'
import { BlockMath, InlineMath } from '@/components/Math'

export default function CountermeasuresPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">04 対策編</h1>
        <p className="text-gray-600">フィルタ・シールド・グランド・ケーブルの対策を「なぜ効くか」の原理から理解する。</p>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="font-semibold text-gray-800 mb-2">この編で答えられるようになる問い</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
          <li>コモンモードチョークとXコンデンサ・Yコンデンサの役割の違いは？</li>
          <li>ケーブルシールドは両端接地と片端接地のどちらが正しいか？</li>
          <li>1点接地と多点接地はどう使い分けるか？</li>
        </ol>
      </div>

      {/* Section 1: Filter */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          1. フィルタ設計の基本
        </h2>

        <h3 className="text-base font-semibold text-gray-800 mb-2">コモンモードチョーク</h3>
        <p className="text-gray-700 mb-3">
          2本のラインに逆方向（差動）に巻いた2巻線インダクタ。ノーマルモード電流（逆向き）は磁束が打ち消し合うため高インピーダンスにならない。コモンモード電流（同向き）は磁束が加算されて高インピーダンスとなりブロックする。
        </p>
        <div className="my-4">
          <svg viewBox="0 0 400 160" className="w-full max-w-md border rounded bg-gray-50">
            <text x="200" y="20" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">コモンモードチョーク</text>
            {/* Core */}
            <ellipse cx="200" cy="85" rx="30" ry="50" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>
            <text x="200" y="90" textAnchor="middle" fontSize="10" fill="#92400e">コア</text>
            {/* Line 1 */}
            <line x1="50" y1="60" x2="170" y2="60" stroke="#3b82f6" strokeWidth="2"/>
            <path d="M170,60 Q185,60 185,75 Q185,95 200,95 Q215,95 215,75 Q215,60 230,60" fill="none" stroke="#3b82f6" strokeWidth="2"/>
            <line x1="230" y1="60" x2="350" y2="60" stroke="#3b82f6" strokeWidth="2"/>
            <text x="25" y="65" fontSize="10" fill="#3b82f6">L</text>
            {/* Line 2 */}
            <line x1="50" y1="110" x2="170" y2="110" stroke="#ef4444" strokeWidth="2"/>
            <path d="M170,110 Q185,110 185,95 Q185,75 200,75 Q215,75 215,95 Q215,110 230,110" fill="none" stroke="#ef4444" strokeWidth="2"/>
            <line x1="230" y1="110" x2="350" y2="110" stroke="#ef4444" strokeWidth="2"/>
            <text x="25" y="115" fontSize="10" fill="#ef4444">N</text>
            {/* Arrows for CM */}
            <text x="80" y="50" fontSize="9" fill="#374151">→ CM同向き: 高インピーダンス</text>
          </svg>
        </div>

        <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">X コンデンサ・Y コンデンサ</h3>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2">種類</th>
                <th className="border border-gray-300 px-3 py-2">接続</th>
                <th className="border border-gray-300 px-3 py-2">目的</th>
                <th className="border border-gray-300 px-3 py-2">安全規格</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">X コンデンサ</td>
                <td className="border border-gray-300 px-3 py-2">L-N 間</td>
                <td className="border border-gray-300 px-3 py-2">ノーマルモードノイズをバイパス</td>
                <td className="border border-gray-300 px-3 py-2">IEC 60384-14 クラスX</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Y コンデンサ</td>
                <td className="border border-gray-300 px-3 py-2">L-PE、N-PE 間</td>
                <td className="border border-gray-300 px-3 py-2">コモンモードノイズを PE へバイパス</td>
                <td className="border border-gray-300 px-3 py-2">IEC 60384-14 クラスY（耐圧・漏れ電流規定）</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="Yコンデンサは安全規格必須">
          Yコンデンサは PE に接続されるため、ショート時の危険性がある。IEC 60384-14 に適合した安全認定品（クラスY1またはY2）を使用すること。漏れ電流の総和も規定値以内に収めること。
        </Callout>

        <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">LCフィルタのカットオフ周波数</h3>
        <BlockMath math="f_c = \frac{1}{2\pi\sqrt{LC}}" />
        <p className="text-gray-700 text-sm">
          L: インダクタンス [H]、C: キャパシタンス [F]。<InlineMath math="f_c" /> 以上の周波数を減衰させる。必要な減衰量と周波数から L・C を設計する。
        </p>

        <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">フェライトコアのインピーダンス特性</h3>
        <p className="text-gray-700 mb-2">
          フェライトコアは周波数依存のインピーダンス特性を持つ。低周波では損失が少なく（インダクタとして動作）、高周波では損失が増加（抵抗として動作）する。対象周波数帯でインピーダンスが高い材種を選ぶことが重要。
        </p>
        <Callout type="tip" title="材種の選び方">
          Mn-Zn フェライト: ～数十 MHz まで有効（電源ライン・低周波ノイズ向け）。
          Ni-Zn フェライト: 数十 MHz〜 GHz 帯に有効（RF対策・高速信号ライン向け）。
        </Callout>
      </section>

      {/* Section 2: Shield */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          2. シールド
        </h2>

        <h3 className="text-base font-semibold text-gray-800 mb-2">シールドの遮蔽効果</h3>
        <p className="text-gray-700 mb-3">
          シールドによる遮蔽効果（SE）は反射損（R）と吸収損（A）の和。
        </p>
        <BlockMath math="SE = R + A \quad \text{[dB]}" />
        <p className="text-gray-700 text-sm mb-3">
          反射損は導体表面でのインピーダンス不整合（低インピーダンス導体に電磁波が当たると反射）。吸収損は導体内部での減衰（表皮効果）。高周波ほど表皮深さが浅く吸収損が増加する。
        </p>

        <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">開口部・スリットからの漏れ</h3>
        <p className="text-gray-700 mb-2">
          スリット・開口部はスロットアンテナとして機能する。スリット長が λ/2 に近づくと放射が急増する。
        </p>
        <Callout type="point" title="開口部の設計原則">
          開口部の最大寸法を λ/20 以下に抑えることが目安。100 MHz では λ = 3 m なので最大寸法 15 cm 以下。一つの大きな穴より多くの小さな穴の方が遮蔽効果が高い。
        </Callout>

        <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">ケーブルシールドの接地</h3>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2">接地方式</th>
                <th className="border border-gray-300 px-3 py-2">効果</th>
                <th className="border border-gray-300 px-3 py-2">注意点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">両端接地</td>
                <td className="border border-gray-300 px-3 py-2">高周波放射・誘導の遮蔽に有効</td>
                <td className="border border-gray-300 px-3 py-2">グランドループが形成される（低周波ハム誘導）</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">片端接地</td>
                <td className="border border-gray-300 px-3 py-2">低周波グランドループを防ぐ</td>
                <td className="border border-gray-300 px-3 py-2">高周波（HF）の放射遮蔽効果なし</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="片端接地はHF放射を防げない">
          EMCの観点（放射エミッション・放射イミュニティ対策）ではケーブルシールドは両端接地が原則。片端接地は低周波のグランドループハム対策専用と理解すること。
        </Callout>
      </section>

      {/* Section 3: Ground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          3. グランド設計
        </h2>

        <h3 className="text-base font-semibold text-gray-800 mb-2">1点接地（スター接地）と多点接地</h3>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2">方式</th>
                <th className="border border-gray-300 px-3 py-2">特徴</th>
                <th className="border border-gray-300 px-3 py-2">適用</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">1点接地</td>
                <td className="border border-gray-300 px-3 py-2">グランドループが形成されない。低周波干渉を防止。</td>
                <td className="border border-gray-300 px-3 py-2">低周波（数 kHz 以下）のアナログ回路</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">多点接地</td>
                <td className="border border-gray-300 px-3 py-2">グランドインピーダンスが低下。高周波で有利。</td>
                <td className="border border-gray-300 px-3 py-2">高周波（数 MHz 以上）のデジタル回路</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">グランドループ</h3>
        <p className="text-gray-700 mb-2">
          異なる接地点間に電位差が存在するとグランドループが形成され、ループに誘導電流が流れる。この電流が信号線に重畳して誤動作の原因になる。
        </p>
        <Callout type="point" title="グランドループ対策">
          ① フォトカプラ・トランスによるガルバニック絶縁でループを断ち切る。
          ② コモンモードチョークでグランドループ電流を抑制。
          ③ システム全体のグランドを1点で接続（1点接地）。
        </Callout>
      </section>

      {/* Section 4: Cable */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          4. ケーブル・コネクタ対策
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>ツイストペアケーブル：</strong>2本のラインを均一に撚ることで外部磁界の誘導（コモンモード）を各ペアで打ち消す。差動信号に最適。
          </li>
          <li>
            <strong>シールドケーブル：</strong>外部電磁界から信号線を遮蔽。シールドの接地方法（両端/片端）が重要。コネクタでの360°接続が高周波では必須。
          </li>
          <li>
            <strong>フェライトクランプ（クランプコア）：</strong>既存ケーブルに後付けでコモンモードインピーダンスを付加。試験で問題が発見された後の対策として有効。
          </li>
          <li>
            <strong>コネクタの360°シールド接続：</strong>コネクタ部でシールドがピッグテール（ドレイン線のみ）になると、そのインダクタンスが高周波で高インピーダンスになりシールド効果が激減する。金属コネクタシェルに全周で接続すること。
          </li>
        </ul>
        <Callout type="tip" title="ピッグテール接続の危険性">
          シールドケーブルのシールドをピッグテール（細い1本のドレイン線で接続）にすると、100 MHz 以上でインダクタンスが支配的になりシールドが機能しなくなる。金属コネクタシェルへの全周接続が不可欠。
        </Callout>
      </section>
    </div>
  )
}
