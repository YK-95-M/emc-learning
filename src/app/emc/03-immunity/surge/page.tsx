import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'
import { BlockMath } from '@/components/Math'

export default function SurgePage() {
  return (
    <TestTemplate
      name="サージ（雷・電源切替）"
      nameEn="Surge Immunity"
      abbr="Surge"
      standard="IEC 61000-4-5"
      overview={
        <div className="space-y-3">
          <p>落雷の誘導や電源系統の大電流遮断時に発生するマイクロ秒オーダーの高エネルギーパルスを模擬した試験。</p>
          <p><strong>波形：</strong>電圧波形 1.2/50 μs（前縁 1.2 μs、後縁 50 μs）、電流波形 8/20 μs</p>
          <p><strong>模擬している現象：</strong>直撃雷・誘導雷による系統サージ、大型電気設備のON/OFFによる開閉過電圧。</p>
          <p><strong>不適合の影響：</strong>半導体素子の絶縁破壊・永久損傷、電解コンデンサの爆発、システムの永久停止。</p>
          <Callout type="warning" title="サージはESD/EFTよりはるかに高エネルギー">
            EFTのパルスエネルギーが μJ オーダーなのに対し、サージは mJ〜J オーダー。保護素子（MOV/TVS）のエネルギー吸収定格の選定が最重要。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>使用機材：</strong>コンビネーション波サージ発生器、結合/デカップリングネットワーク（CDN）</p>
          <p><strong>印加ポート：</strong>電源ポート（AC入力）、I/Oポート</p>
          <p><strong>試験電圧：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr><th className="border border-gray-300 px-3 py-2">レベル</th><th className="border border-gray-300 px-3 py-2">試験電圧（線間）</th><th className="border border-gray-300 px-3 py-2">試験電圧（線-PE間）</th></tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2">1</td><td className="border border-gray-300 px-3 py-2">±0.5 kV</td><td className="border border-gray-300 px-3 py-2">±0.5 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">2</td><td className="border border-gray-300 px-3 py-2">±1 kV</td><td className="border border-gray-300 px-3 py-2">±2 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">3</td><td className="border border-gray-300 px-3 py-2">±2 kV</td><td className="border border-gray-300 px-3 py-2">±4 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">4</td><td className="border border-gray-300 px-3 py-2">±4 kV</td><td className="border border-gray-300 px-3 py-2">±4 kV</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>印加タイミング：</strong>電源波形の 0°、90°、180°、270° で各極性 3〜5 回</p>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを電源ON・動作状態にする</li>
            <li>CDN を電源ポートに接続（L-N 間、L-PE 間、N-PE 間）</li>
            <li>各組み合わせ × 各タイミング角度 × 正負両極性で印加</li>
            <li>印加後の動作状態を確認・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D。電源系機器では通常 B 以上が要求される（C まで許容の場合もある）。</p>
          <p>D（永久損傷）は絶対にNG。</p>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>MOV/TVSの未実装・選定ミス：</strong>クランプ電圧が回路耐圧を超えている、またはエネルギー定格不足</li>
            <li><strong>保護素子のリードインダクタンス：</strong>スルーホール型MOVはリード長が長いと高速パルスに対応できない（動作遅延）</li>
            <li><strong>GNDの電位上昇：</strong>サージ電流がGND配線を通る際の電圧降下でIC電源が一瞬過電圧に</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>MOV（Metal Oxide Varistor）：</strong>一次保護。大エネルギー吸収が得意。AC電源入口に配置。</li>
            <li><strong>TVSダイオード：</strong>二次保護。高精度クランプ電圧。MOV後段に配置。</li>
            <li><strong>段階的保護：</strong>MOV → コモンモードチョーク → Yコンデンサ → TVS の順で段階フィルタ構成</li>
          </ul>
          <BlockMath math="E = \frac{1}{2} C V^2" />
          <p className="text-sm text-gray-600">E: エネルギー [J]、C: 結合容量 [F]、V: サージ電圧 [V]。保護素子の吸収エネルギー定格と比較する。</p>
          <Callout type="warning" title="MOVは消耗品">
            MOVは繰り返しサージで劣化し、クランプ電圧が下がる（低電圧で導通し始める）。定格エネルギーを大きめに選定し、寿命設計も行うこと。
          </Callout>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>MOVは電源コネクタ直後（基板入口）に実装。リード型よりチップ型（SMD）が低インダクタンスで有利。</li>
            <li>大電流経路（MOV〜GND）のパターン幅を十分に確保（1 kVサージで数十 A が流れる）</li>
            <li>保護素子のGNDリターンを他の回路GNDと分けて合流させる（スター接続）</li>
          </ul>
          <Callout type="tip" title="保護の多段化">
            一段の保護素子で全エネルギーを吸収しようとするより、MOV（大エネルギー）→ インピーダンス（チョーク/抵抗）→ TVS（精密クランプ）の多段が効果的。各段が協調して動作するように電圧定格を揃えること。
          </Callout>
        </div>
      }
    />
  )
}
