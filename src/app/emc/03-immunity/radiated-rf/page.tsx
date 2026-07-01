import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'

export default function RadiatedRFPage() {
  return (
    <TestTemplate
      name="放射電磁界イミュニティ"
      nameEn="Radiated Radio-Frequency Electromagnetic Field Immunity"
      abbr="RS"
      standard="IEC 61000-4-3"
      overview={
        <div className="space-y-3">
          <p>携帯電話・業務用無線機・放送波など実環境で存在する電磁界を模擬した試験。規定レベルの電界（V/m）を照射し、EUTが正常動作を維持するか確認する。</p>
          <p><strong>周波数範囲：</strong>80 MHz〜1 GHz（製品によっては 2.7 GHz または 6 GHz まで）</p>
          <p><strong>模擬している現象：</strong>携帯電話（800 MHz〜2.1 GHz）、Wi-Fi（2.4/5 GHz）、業務無線、放送波など実際の電磁環境。</p>
          <p><strong>不適合の影響：</strong>携帯電話を近づけると機器が誤動作する、工場無線機の使用中にPLCが停止するなど。</p>
          <Callout type="point" title="イミュニティ試験は「耐える」側">
            エミッション試験と逆で、外部から電磁界を「当てる」試験。機器が壊れるのではなく「誤動作しないか」を確認する。判定は性能基準A/B/C/D。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>場所：</strong>電波暗室（フルアネコイック室）またはシールドルーム内のセル（GTEM セルなど）</p>
          <p><strong>使用機材：</strong>信号発生器、電力増幅器、送信アンテナ（バイコニカル/ログペリ/ホーン）、電界センサ（フィールドプローブ）</p>
          <p><strong>変調：</strong>1 kHz 正弦波 80 % AM 変調（最悪ケース変調を模擬）</p>
          <p><strong>試験電界強度：</strong>レベル1〜4 で 1〜30 V/m（製品規格により異なる。民生機器は通常 3 V/m）</p>
          <p><strong>EUT配置：</strong>通常動作状態で配置。水平・垂直偏波それぞれ照射。</p>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>フィールドプローブで電界を均一化（ユニフォミティ校正）</li>
            <li>EUTを規定の動作状態に設定し、モニタリングシステムを接続</li>
            <li>規定周波数を1 % ステップでスイープしながら照射</li>
            <li>水平偏波・垂直偏波それぞれ照射</li>
            <li>各周波数・偏波でEUTの動作状態を確認・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D。民生機器・産業機器で要求基準が異なる。一般的に A または B が要求される。</p>
          <Callout type="warning" title="製品規格を確認">
            IEC 61000-4-3 は基本試験規格。実際に適用するレベル・周波数範囲は製品規格（IEC 61000-6-1/2 等の汎用EMC規格または個別製品規格）で規定される。
          </Callout>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>ケーブルでのRF電流誘導：</strong>電界がケーブルに乗りコモンモード電流としてICへ流れ込む</li>
            <li><strong>アナログ回路の検波効果：</strong>RF成分が非線形素子（ダイオード・トランジスタ接合）で復調され、DC誤差・低周波ノイズとして影響</li>
            <li><strong>リセットラインや制御ラインへの誘導：</strong>ケーブルが長いほど受信アンテナとして機能</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>コモンモードチョーク＋バイパスコンデンサ：</strong>ケーブルから乗ったRF電流をフィルタ</li>
            <li><strong>シールドケーブル＋両端接地：</strong>ケーブルへの誘導自体を防ぐ</li>
            <li><strong>筐体シールド強化：</strong>開口部を減らし金属筐体でRFを遮蔽</li>
            <li><strong>入力部のRFデカップリング：</strong>アナログ入力前段に低域フィルタでRF成分を除去</li>
          </ul>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>アナログ入力ライン（センサ・ADC前段）に 100 pF〜1 nF のコンデンサでRFバイパス</li>
            <li>長いI/Oケーブルのコネクタ近傍にコモンモードチョーク配置</li>
            <li>リセット・割り込みラインにシュミットトリガバッファと RC フィルタで誤動作防止</li>
          </ul>
          <Callout type="tip" title="アナログ回路のRF検波">
            オペアンプ・コンパレータ入力はGBW（利得帯域幅積）を超える周波数でも入力段が非線形動作し、RFを整流（検波）することがある。入力部に数百 pF のコンデンサを入れてRFを除去するのが基本対策。
          </Callout>
        </div>
      }
    />
  )
}
