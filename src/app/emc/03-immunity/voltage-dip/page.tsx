import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'

export default function VoltageDipPage() {
  return (
    <TestTemplate
      name="電圧ディップ・瞬停・電圧変動"
      nameEn="Voltage Dips, Short Interruptions and Voltage Variations"
      abbr="Dip"
      standard="IEC 61000-4-11"
      overview={
        <div className="space-y-3">
          <p>電源系統の電圧が一時的に低下（ディップ）・消失（瞬停）・変動した際にEUTが正常動作を維持するか確認する試験。</p>
          <p><strong>模擬している現象：</strong>近隣の大電力機器起動による電圧瞬低、落雷・系統事故による電圧ディップ、電源の瞬時停電。</p>
          <p><strong>不適合の影響：</strong>機器の予期しないリセット・シャットダウン、データ損失、プロセス停止。</p>
          <Callout type="point" title="電圧ディップの発生頻度">
            電圧ディップは実環境で頻繁に発生する（年間数十〜数百回）。特に工場・病院など重要設備では電圧変動耐量が厳しく要求される。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>使用機材：</strong>AC電源シミュレータ（EUT用の電圧波形を任意に生成できる電源）</p>
          <p><strong>試験電圧条件：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2">試験</th>
                  <th className="border border-gray-300 px-3 py-2">残留電圧</th>
                  <th className="border border-gray-300 px-3 py-2">持続時間</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2">電圧ディップ</td><td className="border border-gray-300 px-3 py-2">70 %、40 %、0 % (Unom)</td><td className="border border-gray-300 px-3 py-2">0.5〜25サイクル</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">短時間停電</td><td className="border border-gray-300 px-3 py-2">0 %</td><td className="border border-gray-300 px-3 py-2">250〜5000 ms</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">電圧変動</td><td className="border border-gray-300 px-3 py-2">±10 %</td><td className="border border-gray-300 px-3 py-2">連続</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを定格負荷で動作させる</li>
            <li>各試験条件（電圧レベル × 持続時間）を順次印加</li>
            <li>電圧低下開始タイミング（電源波形の 0°、90°、180°、270°）を変えて各3回</li>
            <li>EUTの動作状態を確認・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D。医療機器・産業用制御機器では C や D が許容されない場合がある。</p>
          <p className="text-sm text-gray-600">IEC 61000-4-11 は定格電流 16 A 以下の機器に適用。16 A 超は IEC 61000-4-34 を確認。</p>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>平滑コンデンサの容量不足：</strong>電源内部の保持時間が短くディップで電源断</li>
            <li><strong>POWERグッド信号の誤発報：</strong>電圧低下でPG信号がアサートされマイコンがリセット</li>
            <li><strong>制御回路への影響：</strong>5V/3.3V系が瞬間的に低下しメモリ・フリップフロップが不定状態に</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>バルクコンデンサの増量：</strong>電源ホールドアップ時間を伸ばし、ディップをブリッジ</li>
            <li><strong>UPS・スーパーキャパシタ：</strong>長時間の停電にも対応できるエネルギー蓄積</li>
            <li><strong>POWERグッド回路の適正化：</strong>適切なディレイ・ヒステリシス設定でリセット誤動作を防止</li>
            <li><strong>ソフトウェアによる状態保持：</strong>電源低下検知→不揮発メモリへ状態保存→復電後に再開</li>
          </ul>
          <Callout type="tip" title="ホールドアップ時間の設計">
            スイッチング電源のホールドアップ時間は平滑コンデンサの容量と最低動作電圧で決まる。IEC 61000-4-11 Level 3 では 20 ms の瞬停に耐える必要がある。設計段階でバルクコンデンサ容量の計算を忘れずに。
          </Callout>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>一次側バルクコンデンサの容量計算：必要ホールドアップ時間から逆算</li>
            <li>POWERグッド信号にRCフィルタ（数ms〜数十msの遅延）でチャタリング防止</li>
            <li>重要なデータは定期的に不揮発メモリ（EEPROM/Flash）に自動保存する設計</li>
          </ul>
        </div>
      }
    />
  )
}
