import Link from 'next/link'
import Callout from '@/components/Callout'

export const metadata = { title: '製造と実装 | PCB設計学習' }

export default function ManufacturingPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span><span>07 製造と実装</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">製造と実装 — 設計を実物にする</h1>
        <p className="text-gray-600">製造仕様・DFM・実装の要点を理解して、発注できる設計を作る。</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でできるようになること</h2>
        <ul className="space-y-1.5">
          {[
            '製造仕様（最小線幅・ビア・板厚・層数・表面処理）を理解して設計に反映できる',
            'DFM（製造しやすい設計）の考え方を適用できる',
            '実装（手はんだ・リフロー）の要点と部品極性の注意点を説明できる',
          ].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center">1</span>
          製造仕様（代表的な国内・海外ファブ）
        </h2>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-3 py-2 text-left text-xs text-gray-600">パラメータ</th>
                <th className="border border-gray-200 px-3 py-2 text-center text-xs text-gray-600">低コストファブ<br/>(JLCPCB等)</th>
                <th className="border border-gray-200 px-3 py-2 text-center text-xs text-gray-600">標準品質</th>
                <th className="border border-gray-200 px-3 py-2 text-center text-xs text-gray-600">高品質</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['最小配線幅', '0.1mm (4mil)', '0.15mm', '0.1mm'],
                ['最小クリアランス', '0.1mm (4mil)', '0.15mm', '0.1mm'],
                ['最小ビア径（穴）', '0.2mm', '0.3mm', '0.1mm'],
                ['最小ビア径（パッド）', '0.45mm', '0.6mm', '0.25mm'],
                ['最小穴（スルーホール）', '0.3mm', '0.4mm', '0.2mm'],
                ['最大層数', '6〜8層', '12層', '32層以上'],
                ['板厚', '0.4〜3.2mm', '0.8〜3.2mm', 'カスタム'],
                ['表面処理', 'HASL / ENIG', 'HASL / ENIG', '各種'],
              ].map((row, i) => (
                <tr key={i} className={i%2===0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, j) => (
                    <td key={j} className={`border border-gray-200 px-3 py-2 text-xs ${j===0 ? 'font-medium text-gray-700' : 'text-center text-gray-600'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { term: 'HASL', desc: 'Hot Air Solder Leveling。はんだコーティング。低コスト・一般用途。' },
            { term: 'ENIG', desc: 'Electroless Nickel Immersion Gold。平坦・耐腐食性高・BGA・精細ランドに。' },
            { term: 'OSP', desc: '有機保護膜。平坦・低コスト。ただし保存期間短い。' },
            { term: 'Ag（銀）', desc: 'Silver finish。平坦・コスト中程度。RF用途に使われることも。' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-2">
              <p className="font-bold text-sm text-gray-900">{item.term}</p>
              <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center">2</span>
          DFM — 製造しやすい設計
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-900 mb-2 text-sm">DFMの良い実践</h3>
            <ul className="space-y-1.5 text-xs text-green-800">
              {[
                '製造ファブの最小仕様より20%以上余裕を持つ',
                '同じ方向に部品を揃える（リフロー実装効率向上）',
                'ビアをランドの中に入れない（テアドロップを使う）',
                'テストポイントを設けてデバッグ性を確保',
                'コネクタのロック方向・差込方向を明示する',
                'ファイン電極のSMDと手はんだ部品を面分けする',
                '基板端から2mm以上内側に部品を配置',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-green-500 shrink-0">•</span>{tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="font-bold text-red-900 mb-2 text-sm">よくある DFM 問題</h3>
            <ul className="space-y-1.5 text-xs text-red-700">
              {[
                '製造限界ギリギリの線幅（歩留まり低下）',
                'ビア径が小さすぎる（ドリル精度問題）',
                'シルク文字がランドに被る（読めない）',
                '部品が基板端に近すぎる（Vカット・ルーターダメージ）',
                'ハンダブリッジしやすいファインピッチ部品が隣接',
                'テスト/修正が困難なBGA直下に別部品',
                '放熱が不十分なまま発熱部品を密集配置',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-red-500 shrink-0">•</span>{tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center">3</span>
          実装 — はんだ付けの基礎
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">リフローはんだ（SMD主流）</h3>
            <div className="flex justify-center mb-3">
              <svg viewBox="0 0 180 100" className="w-44 h-24">
                <text x="90" y="12" textAnchor="middle" fontSize="8" fill="#374151">リフロープロファイル</text>
                <line x1="20" y1="85" x2="170" y2="85" stroke="#374151" strokeWidth="1.5"/>
                <line x1="20" y1="15" x2="20" y2="85" stroke="#374151" strokeWidth="1.5"/>
                <text x="10" y="88" fontSize="7" fill="#374151">時間→</text>
                <path d="M25,80 L50,65 L80,65 L100,30 L120,25 L140,35 L160,75"
                      stroke="#ef4444" strokeWidth="2" fill="none"/>
                <text x="37" y="78" fontSize="6" fill="#6b7280">予熱</text>
                <text x="65" y="60" fontSize="6" fill="#6b7280">均熱</text>
                <text x="110" y="20" fontSize="6" fill="#ef4444">リフロー</text>
                <text x="150" y="68" fontSize="6" fill="#6b7280">冷却</text>
                <line x1="20" y1="35" x2="170" y2="35" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2"/>
                <text x="163" y="33" fontSize="6" fill="#f59e0b">217°C</text>
              </svg>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• クリームはんだをステンシルで印刷</li>
              <li>• 部品を自動マウンター（またはピンセット）で搭載</li>
              <li>• リフロー炉で260°C前後に加熱・溶融・冷却</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">手はんだのコツ</h3>
            <div className="flex justify-center mb-3">
              <svg viewBox="0 0 160 100" className="w-40 h-24">
                <rect x="50" y="55" width="60" height="20" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
                <rect x="68" y="40" width="24" height="30" rx="1" fill="#374151" stroke="#1f2937" strokeWidth="1"/>
                <line x1="120" y1="30" x2="90" y2="60" stroke="#94a3b8" strokeWidth="3"/>
                <circle cx="90" cy="62" r="4" fill="#ef4444"/>
                <path d="M30,40 C40,45 55,55 65,65" stroke="#9ca3af" strokeWidth="2" fill="none"/>
                <text x="100" y="45" fontSize="8" fill="#f97316">♨</text>
                <text x="25" y="38" fontSize="7" fill="#6b7280">はんだ線</text>
                <text x="125" y="28" fontSize="7" fill="#6b7280">コテ先</text>
                <text x="80" y="90" textAnchor="middle" fontSize="7" fill="#374151">コテ先でランドとリードを加熱→はんだを送る</text>
              </svg>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• ランドとリードの両方をコテで温める</li>
              <li>• フラックス入りはんだ（Sn63Pb37 or Pb-free）を使う</li>
              <li>• 3〜4秒以内に離す（オーバーヒート禁止）</li>
              <li>• 光沢ある富士山形のはんだが理想</li>
            </ul>
          </div>
        </div>

        <Callout type="warning" title="部品の極性に注意">
          電解コンデンサ（+マーク側が長いリード/白帯と逆側）、ダイオード/LED（カソード=K=線/フラット）、IC（1番ピンマーク）の向きを必ずシルクと照合する。逆接続で破損・基板焼損の原因になる。
        </Callout>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center">4</span>
          基板を発注する
        </h2>

        <div className="space-y-3">
          {[
            { step: '1', title: 'ガーバーファイルを圧縮', desc: 'F.Cu.gbr, B.Cu.gbr, F.Mask.gbr, B.Mask.gbr, F.SilkS.gbr, Edge.Cuts.gbr, drill.drl をzip圧縮' },
            { step: '2', title: '製造業者サイトにアップロード', desc: 'JLCPCB, PCBWay, Elecrow等。ガーバービュアで自動チェック。寸法・層数・板厚を確認。' },
            { step: '3', title: '仕様を選択', desc: '層数・板厚（1.6mm標準）・表面処理（HASL or ENIG）・数量・色を選択' },
            { step: '4', title: '入稿・支払い・配送', desc: '設計データを入稿。DFMチェック後に製造開始（1〜5日）。EMS発送で1〜2週間で届く。' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4">
              <span className="w-8 h-8 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center shrink-0">{item.step}</span>
              <div>
                <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 not-prose">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">発注前チェックリスト</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700">
            <li>DRC無エラーを確認したか？</li>
            <li>ガーバービュアで全層を目視確認したか？</li>
            <li>基板外形（Edge.Cuts）が閉じた多角形になっているか？</li>
            <li>部品面（Top/Bottom）のシルクが正しく配置されているか？</li>
            <li>最小線幅/クリアランスが製造仕様に収まっているか？</li>
          </ol>
        </div>
      </section>

      <div className="not-prose flex gap-3 flex-wrap">
        <Link href="/pcb/06-layout" className="text-sm text-gray-500 hover:text-gray-700">← 06 レイアウト設計の実務</Link>
        <Link href="/pcb/08-verification" className="text-sm text-blue-600 hover:text-blue-800 ml-auto">08 検証と総合演習 →</Link>
      </div>
    </article>
  )
}
