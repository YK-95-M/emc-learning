import Link from 'next/link'
import Callout from '@/components/Callout'

export const metadata = { title: '検証と総合演習 | PCB設計学習' }

export default function VerificationPage() {
  const reviewChecklist = [
    { category: '回路図', items: ['すべてのネットが接続されERCエラーが0か', 'すべての部品に値・フットプリントが設定されているか', '電源・GNDの接続が正しいか', 'バイパスコンデンサ（100nF）が全VCC近傍にあるか'] },
    { category: 'レイアウト', items: ['DRCエラーが0か（クリアランス・幅違反なし）', 'すべてのラッツネストが配線済みか', '電源ライン幅は十分か（1A以上→0.5mm以上）', 'GNDベタがあり適切なビアで接続されているか', 'デカップリングCがICの直近に配置されているか', 'コネクタ・スイッチが基板端に配置されているか', '部品の向き・極性マークが正しいか'] },
    { category: '製造', items: ['ガーバー全層をビュアで目視確認したか', '基板外形（Edge.Cuts）が閉じているか', 'シルクがランドに被っていないか', '最小線幅・ビアが製造仕様内か', '板厚・層数・表面処理の指定が正しいか'] },
  ]

  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span><span>08 検証と総合演習</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">検証と総合演習 — 完成させて確かめる</h1>
        <p className="text-gray-600">DRC/ERCと設計レビューで品質を確認し、総合演習で1枚を完成させる。</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でできるようになること</h2>
        <ul className="space-y-1.5">
          {[
            'DRC/ERCで設計を自動検証し、エラーを修正できる',
            '設計レビューチェックリストで品質を確認できる',
            'LED点滅回路の基板を0から設計・発注できる',
          ].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center">1</span>
          DRC / ERC とは
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-900 mb-2">ERC（電気的ルールチェック）</h3>
            <p className="text-sm text-blue-700 mb-2">回路図の電気的な矛盾を検出する。</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 未接続ピン（フローティング入力）</li>
              <li>• 電源の衝突（VCC直結のGND等）</li>
              <li>• 接続先のないネット</li>
              <li>• 同一ネット名の不一致</li>
            </ul>
            <div className="mt-2 bg-blue-100 rounded p-2">
              <p className="text-xs text-blue-800 font-medium">KiCad操作: Inspect → Electrical Rules Checker</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-900 mb-2">DRC（設計ルールチェック）</h3>
            <p className="text-sm text-green-700 mb-2">PCBレイアウトの物理的なルール違反を検出する。</p>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• クリアランス違反（配線間距離）</li>
              <li>• 最小配線幅違反</li>
              <li>• 未配線のネット（ラッツネスト残り）</li>
              <li>• ビアの最小サイズ違反</li>
              <li>• シルクのランドへの重なり</li>
            </ul>
            <div className="mt-2 bg-green-100 rounded p-2">
              <p className="text-xs text-green-800 font-medium">KiCad操作: Inspect → Design Rules Checker</p>
            </div>
          </div>
        </div>

        <Callout type="point" title="DRC/ERCはゼロエラーを目指す">
          警告(Warning)は場合によっては許容できるものもあるが、エラー(Error)は必ず修正する。DRCエラーのある基板を発注すると製造不良・動作不良の原因になる。
        </Callout>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center">2</span>
          設計レビューチェックリスト
        </h2>

        <div className="space-y-4">
          {reviewChecklist.map((section, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className={`px-4 py-2 ${i===0 ? 'bg-blue-50 border-b border-blue-200' : i===1 ? 'bg-green-50 border-b border-green-200' : 'bg-pink-50 border-b border-pink-200'}`}>
                <h3 className={`font-bold text-sm ${i===0 ? 'text-blue-900' : i===1 ? 'text-green-900' : 'text-pink-900'}`}>{section.category}</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 px-4 py-2.5">
                    <div className={`w-4 h-4 rounded border-2 shrink-0 ${i===0 ? 'border-blue-400' : i===1 ? 'border-green-400' : 'border-pink-400'}`}/>
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center">3</span>
          実機デバッグの考え方
        </h2>

        <div className="space-y-3">
          {[
            { step: '電源確認', desc: 'まずVCC/GND間の電圧を確認。逆接・短絡がないか確認する。電流制限した電源で最初は動作させる。', icon: '⚡' },
            { step: '目視確認', desc: 'はんだブリッジ・未はんだ（コールドジョイント）・部品の向き誤りを確認。拡大鏡orマクロ撮影で確認。', icon: '🔍' },
            { step: '分割デバッグ', desc: '回路ブロックを分割して順番に動作確認。問題箇所を特定してから修正する。', icon: '🔪' },
            { step: 'テストポイント活用', desc: '設計段階で設けたテストポイントにオシロスコープ・テスターのプローブを当てて測定。', icon: '📏' },
            { step: '波形確認', desc: 'オシロスコープで信号波形・電源リプルを確認。期待する波形と実際を比較する。', icon: '〰️' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <p className="font-bold text-gray-900 text-sm">{item.step}</p>
                <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center">4</span>
          総合演習：LED点滅回路の基板を設計する
        </h2>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-purple-900 mb-3">演習仕様</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-purple-800 mb-2">回路仕様</p>
              <ul className="space-y-1 text-xs text-purple-700">
                <li>• 電源: USB Type-C 5V入力</li>
                <li>• マイコン: ATtiny85（DIP-8）</li>
                <li>• LED: 赤色LED × 1（5mm リード）</li>
                <li>• 電流制限抵抗: 330Ω</li>
                <li>• デカップリングC: 100nF（0402）</li>
                <li>• バルクC: 10μF（0805電解）</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-purple-800 mb-2">基板仕様</p>
              <ul className="space-y-1 text-xs text-purple-700">
                <li>• サイズ: 40mm × 30mm 以内</li>
                <li>• 2層基板</li>
                <li>• 板厚: 1.6mm</li>
                <li>• 表面処理: HASL（低コスト）</li>
                <li>• 最小線幅: 0.2mm以上</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {[
            '回路図を描き、ERCを実行してエラーゼロにする',
            '全部品にフットプリントを割り当てる',
            'PCBエディタに取り込み、40×30mm内に部品を配置する',
            'デカップリングCをATtiny85のVCC直近に配置する',
            '全ネットを配線し、Bottom面にGNDベタを張る',
            'DRCを実行してエラーゼロを確認する',
            'ガーバーファイルを出力してビュアで確認する',
            '（任意）JLCPCBに発注して実物を作る',
          ].map((task, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 border-2 border-purple-400 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-purple-600">{i+1}</span>
              </div>
              <p className="text-sm text-gray-700">{task}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 not-prose">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-blue-900 mb-3">学習の次のステップ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/emc/05-pcb-design', label: 'EMC基板設計編', desc: 'ノイズ・EMI観点からの設計深化' },
              { href: '/emc', label: 'EMC学習コース', desc: '電磁両立性の本格的な学習' },
              { href: '/pcb/06-layout', label: 'レイアウト実務を再習', desc: '設計の質をさらに高める' },
              { href: '/pcb', label: 'PCB学習トップ', desc: '各章を復習する' },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors block">
                <p className="font-medium text-blue-700 text-sm">{link.label} →</p>
                <p className="text-xs text-blue-600 mt-0.5">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="not-prose flex gap-3 flex-wrap">
        <Link href="/pcb/07-manufacturing" className="text-sm text-gray-500 hover:text-gray-700">← 07 製造と実装</Link>
        <Link href="/pcb" className="text-sm text-blue-600 hover:text-blue-800 ml-auto">PCB学習トップへ →</Link>
      </div>
    </article>
  )
}
