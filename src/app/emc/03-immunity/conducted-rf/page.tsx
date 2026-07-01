import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'

export default function ConductedRFPage() {
  return (
    <TestTemplate
      name="伝導RFイミュニティ"
      nameEn="Conducted Radio-Frequency Immunity"
      abbr="CS"
      standard="IEC 61000-4-6"
      overview={
        <div className="space-y-3">
          <p>ケーブルが受信アンテナとして機能しRF電流が伝導的に機器内部へ侵入する現象を模擬した試験。周波数範囲は 150 kHz〜80 MHz（放射試験の下限より低い帯域をカバー）。</p>
          <p><strong>模擬している現象：</strong>AM放送（530 kHz〜1.6 MHz）・SW帯・業務無線の電磁界がケーブルに乗り、コモンモード電流として機器へ流入。</p>
          <p><strong>不適合の影響：</strong>アナログ回路へのRF混入による誤動作、通信エラー、センサ誤出力。</p>
          <Callout type="point" title="放射試験と伝導試験の周波数分担">
            80 MHz 以上は波長が短くケーブルがアンテナとして効率的に機能 → 放射試験（IEC 61000-4-3）。
            80 MHz 以下は波長が長く伝導結合が支配的 → 伝導試験（IEC 61000-4-6）。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>使用機材：</strong>RF信号発生器、電力増幅器、結合/デカップリングネットワーク（CDN）または電磁クランプ</p>
          <p><strong>結合方法：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>CDN（Coupling/Decoupling Network）：</strong>電源・信号ラインに直接結合。推奨方法。</li>
            <li><strong>電磁クランプ：</strong>ケーブルを通さず外から誘導結合。CDNが使えない場合。</li>
          </ul>
          <p><strong>試験レベル：</strong>EMF 1〜10 V（レベル1〜3）。民生機器は通常 3 V（レベル2）。</p>
          <p><strong>変調：</strong>1 kHz 正弦波 80 % AM 変調</p>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTの全ポートにCDNを接続</li>
            <li>150 kHz〜80 MHz を 1 % ステップでスイープ</li>
            <li>各周波数で EUT の動作を確認・記録</li>
            <li>電源ポート・信号ポート・通信ポート等すべてに実施</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D。一般的に A または B が要求される。</p>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>電源ラインのフィルタ不足：</strong>150 kHz〜30 MHz帯のコモンモードチョークが未実装または容量不足</li>
            <li><strong>センサ・アナログ入力の無防備：</strong>長い外部配線を持つアナログ入力がRFアンテナとして機能</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>コモンモードチョーク：</strong>伝導RFの主要な対策。150 kHz〜80 MHzで高インピーダンスを持つフェライトコア選定が重要。</li>
            <li><strong>Yコンデンサ：</strong>RF電流をPE（保護接地）へバイパス</li>
            <li><strong>アナログ入力のLPF：</strong>センサ入力前段に低域通過フィルタでRFを除去</li>
          </ul>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>外部から来る長いケーブルはコネクタ近傍でコモンモードチョークを通してから回路へ</li>
            <li>アナログ入力ラインには 1〜10 nF のRFバイパスコンデンサを入力直前に配置</li>
            <li>差動入力の場合はコモンモードチョーク + 差動コンデンサで効果倍増</li>
          </ul>
        </div>
      }
    />
  )
}
