import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'

export default function FlickerPage() {
  return (
    <TestTemplate
      name="電圧変動・フリッカ"
      nameEn="Voltage Fluctuations and Flicker"
      abbr="Flicker"
      standard="IEC 61000-3-3"
      overview={
        <div className="space-y-3">
          <p>機器が動作中に電源ラインに引き起こす電圧変動・フリッカ（照明のちらつき）が規定値以内であることを確認する試験。</p>
          <p><strong>模擬している現象：</strong>モータ起動・大電力負荷のON/OFFによる突入電流や負荷変動が配電系統の電圧を変動させ、同一系統につながった照明がちらつく現象。</p>
          <p><strong>不適合の影響：</strong>照明のフリッカによる視覚的不快感、他機器の電源電圧変動による誤動作。</p>
          <Callout type="point" title="フリッカとは">
            人間の目は8〜10 Hz前後の照度変動に最も敏感。この周波数帯での電圧変動が白熱電球・蛍光灯のちらつきを引き起こす。IEC 61000-3-3 は短期フリッカ値Pstと長期フリッカ値Pltで定量化する。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>場所：</strong>室内（特殊環境不要）</p>
          <p><strong>使用機材：</strong>安定化交流電源、フリッカメータ（IEC 61000-4-15準拠）</p>
          <p><strong>電源インピーダンス：</strong>規定の参照インピーダンス（Zref）に設定</p>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを参照インピーダンスを介して電源に接続</li>
            <li>動作サイクル（起動・定常・停止）を繰り返す</li>
            <li>フリッカメータで短期フリッカ値Pst（10分間）・長期フリッカ値Plt（2時間）を測定</li>
            <li>電圧変動dc・最大相対電圧変動dmax を算出</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>Pst ≤ 1.0（短期フリッカ値）</li>
            <li>Plt ≤ 0.65（長期フリッカ値）</li>
            <li>dc ≤ 3 %、dmax ≤ 4 %（電圧変動）</li>
          </ul>
          <Callout type="warning" title="規格バージョンと適用条件の確認">
            IEC 61000-3-3 は定格電流16 A以下の機器に適用。それを超える場合はIEC 61000-3-11を確認してください。
          </Callout>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>モータ・コンプレッサの起動突入電流：</strong>起動時の大電流が電源電圧を瞬間的に引き下げる</li>
            <li><strong>周期的な大電力負荷のON/OFF：</strong>ヒータ・照明のサイクル動作</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>ソフトスタート回路：</strong>モータ起動時の電流増加を緩やかにする</li>
            <li><strong>突入電流制限抵抗（NTC）：</strong>起動直後の大電流を抑制</li>
            <li><strong>負荷変動の平滑化：</strong>大容量コンデンサやPFCで電源電流を平滑</li>
          </ul>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>モータドライバICのスルーレート設定で起動電流の立ち上がりを制限</li>
            <li>NTCサーミスタを電源入口に配置（突入電流対策）</li>
            <li>大容量負荷のON/OFFはソフトウェアで段階的に制御</li>
          </ul>
        </div>
      }
    />
  )
}
