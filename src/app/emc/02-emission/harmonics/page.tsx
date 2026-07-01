import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'
import { BlockMath } from '@/components/Math'

export default function HarmonicsPage() {
  return (
    <TestTemplate
      name="高調波電流"
      nameEn="Harmonic Current Emissions"
      abbr="HC"
      standard="IEC 61000-3-2"
      overview={
        <div className="space-y-3">
          <p>商用交流電源（50/60 Hz）から機器が引き込む電流の高調波成分（2次〜40次）を測定する試験。整流回路を持つ機器は正弦波でなく歪んだ電流波形を引き込むため、系統に高調波ノイズを注入する。</p>
          <p><strong>模擬している現象：</strong>スイッチング電源（ダイオードブリッジ＋コンデンサ入力）などが電源半サイクルのピーク付近だけ電流を引き込むことで発生する高調波電流。</p>
          <p><strong>不適合の影響：</strong>電力系統の電圧波形歪み、変圧器・ケーブルの過熱、他機器の誤動作・効率低下。</p>
          <Callout type="point" title="力率と高調波の関係">
            高調波電流が多いほど力率（PF）が低下し、同じ有効電力でも電源から大きな電流を引き込む。IEC 61000-3-2 は力率改善（PFC）回路の実装を間接的に要求している。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>場所：</strong>室内（シールドルーム不要）</p>
          <p><strong>使用機材：</strong>安定化交流電源、高調波電流アナライザ（電流センサ＋FFT解析器）</p>
          <p><strong>電源条件：</strong>230 V/50 Hz（欧州）または 120 V/60 Hz（北米）の安定した正弦波電源。THD（電圧歪み）&lt; 0.9 %が要件。</p>
          <p><strong>EUT条件：</strong>定格負荷または最悪ケース負荷で動作させる。</p>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを規定の電源・負荷条件で動作させる</li>
            <li>入力電流波形をサンプリング（最低10サイクル取得）</li>
            <li>FFT解析で2〜40次の各高調波電流成分（実効値）を算出</li>
            <li>各次数の測定値を限度値と比較</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p><strong>IEC 61000-3-2 クラスD（PC・TV・家電 ≤600 W）の代表値：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2">高調波次数</th>
                  <th className="border border-gray-300 px-3 py-2">限度値 [mA/W]</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2">3次（150 Hz）</td><td className="border border-gray-300 px-3 py-2">3.4</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">5次（250 Hz）</td><td className="border border-gray-300 px-3 py-2">1.9</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">7次（350 Hz）</td><td className="border border-gray-300 px-3 py-2">1.0</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">9次（450 Hz）</td><td className="border border-gray-300 px-3 py-2">0.5</td></tr>
              </tbody>
            </table>
          </div>
          <Callout type="warning" title="規格クラスの確認が必須">
            IEC 61000-3-2 にはクラスA〜Dがあり、製品種別によって適用クラスが異なります。また定格入力電力や相数によっても適用規格が変わります。必ず最新版の一次文書を確認してください。
          </Callout>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>コンデンサ入力型整流回路：</strong>ダイオードブリッジ＋大容量平滑コンデンサの構成が3次・5次高調波を多量発生させる最大の原因</li>
            <li><strong>PFCなしの設計：</strong>力率改善回路（アクティブPFCまたはパッシブPFC）が未実装</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>アクティブPFC回路：</strong>昇圧コンバータで入力電流を正弦波に整形。力率を0.99以上にできる。75 W超の機器では事実上必須。</li>
            <li><strong>パッシブPFC：</strong>大型リアクトルで電流歪みを低減。アクティブ比で効果は限定的だが低コスト。</li>
          </ul>
          <BlockMath math="PF = \frac{P}{S} = \frac{P}{V_{rms} \cdot I_{rms}}" />
          <p className="text-sm text-gray-600">PF: 力率、P: 有効電力 [W]、S: 皮相電力 [VA]</p>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>アクティブPFCチップの選定と電源設計段階での組み込み</li>
            <li>PFCインダクタのコア・巻線設計（飽和電流・銅損の最適化）</li>
            <li>PFCスイッチング素子（MOSFET/GaN）のドライブ回路とEMIの両立</li>
          </ul>
        </div>
      }
    />
  )
}
