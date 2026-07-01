import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'

export default function EFTPage() {
  return (
    <TestTemplate
      name="EFT/バースト（電気的ファストトランジェント）"
      nameEn="Electrical Fast Transient / Burst"
      abbr="EFT"
      standard="IEC 61000-4-4"
      overview={
        <div className="space-y-3">
          <p>リレー・スイッチ・接点の開閉時に発生するチャタリングノイズ（バースト状の高速過渡パルス群）を模擬した試験。</p>
          <p><strong>パルス特性：</strong>立ち上がり 5 ns、パルス幅 50 ns、バースト持続時間 15 ms、バースト繰り返し周期 300 ms</p>
          <p><strong>模擬している現象：</strong>誘導性負荷（リレーコイル・モータ）の開閉時に接点でアーク放電が繰り返される際の高速パルス群。</p>
          <p><strong>不適合の影響：</strong>マイコンの暴走・リセット、通信エラー、デジタル回路の誤動作。</p>
          <Callout type="point" title="EFTはバースト（繰り返し）が特徴">
            単発パルスでは問題にならなくても、高繰り返しバーストによる積分的・熱的効果が誤動作を引き起こす。ESDより低電圧・低エネルギーだが繰り返し数が多い。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>使用機材：</strong>EFT/バースト発生器、容量性結合クランプ（CCC）、デカップリングネットワーク</p>
          <p><strong>電源ポート：</strong>デカップリングネットワーク経由でダイレクト注入</p>
          <p><strong>信号・通信ポート：</strong>容量性結合クランプ（ケーブルを挟む方式）</p>
          <p><strong>試験電圧（電源ポート）：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr><th className="border border-gray-300 px-3 py-2">レベル</th><th className="border border-gray-300 px-3 py-2">ピーク電圧</th></tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2">1</td><td className="border border-gray-300 px-3 py-2">±0.5 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">2</td><td className="border border-gray-300 px-3 py-2">±1 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">3</td><td className="border border-gray-300 px-3 py-2">±2 kV</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">4</td><td className="border border-gray-300 px-3 py-2">±4 kV</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを動作させた状態でEFT発生器を接続</li>
            <li>電源ポートに正負両極性で1分間ずつ印加</li>
            <li>信号・通信ポートは容量性結合クランプで各ケーブルに印加</li>
            <li>印加中のEUT動作状態を継続監視・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D（ESDと同定義）。通常 A または B が要求される。</p>
          <p className="text-sm text-gray-600">産業機器ではCまで許容される場合もある。製品規格・エンドユーザ要件を確認すること。</p>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>電源ラインのコモンモード混入：</strong>高速バーストがコモンモードで電源ラインを通じてマイコン電源・I/O線に混入</li>
            <li><strong>デカップリング不足：</strong>マイコン電源ピンのバイパスコンデンサが不足し、VCC変動がリセットを引き起こす</li>
            <li><strong>通信ラインへの積算的影響：</strong>高繰り返しパルスがRXデータとして誤認識</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>コモンモードチョーク（電源・信号ライン）：</strong>コモンモード電流を高インピーダンスでブロック</li>
            <li><strong>低ESLバイパスコンデンサ（マイコン電源近傍）：</strong>高速過渡電流をローカルに吸収</li>
            <li><strong>フォトカプラ・デジタルアイソレータ：</strong>ガルバニック絶縁でノイズ経路を断ち切る</li>
          </ul>
          <Callout type="point" title="フェライトコアの有効性">
            EFTの代表的なエネルギーは〜10 MHz 帯。この周波数帯でインピーダンスが高いフェライト材を選ぶことが重要。ただしコアの磁気飽和（大電流時）に注意。
          </Callout>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>マイコン・FPGAの電源ピン直近（≤ 2 mm）に 100 nF + 10 μF の低インダクタンスバイパスコンデンサを配置</li>
            <li>I/Oライン入口にコモンモードチョーク + Cフィルタを配置</li>
            <li>コネクタ近傍のグランドを低インピーダンスで筐体GNDに接続</li>
          </ul>
          <Callout type="tip" title="EFTとESDの違い">
            EFT対策はESD対策と似て見えるが、エネルギーの連続性が違う。EFTは繰り返し（バースト）なので熱的な積算効果がある。保護素子の繰り返しエネルギー定格も確認すること。
          </Callout>
        </div>
      }
    />
  )
}
