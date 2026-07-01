import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'
import { BlockMath } from '@/components/Math'

export default function RadiatedEmissionPage() {
  return (
    <TestTemplate
      name="放射エミッション"
      nameEn="Radiated Emission"
      abbr="RE"
      standard="CISPR 11, CISPR 32, FCC Part 15"
      overview={
        <div className="space-y-3">
          <p>機器の筐体・ケーブルから空間に放射される不要電磁波を測定する試験。スペクトラムアナライザと受信アンテナで30 MHz〜1 GHz（製品によっては6 GHz超）の電界強度を計測し、限度値と比較する。</p>
          <p><strong>模擬している現象：</strong>スイッチング電源・クロック・高速デジタル信号から発生したコモンモード電流が、接続ケーブルをアンテナとして駆動し電磁波を放射する現象。</p>
          <p><strong>不適合の影響：</strong>AM/FM放送・携帯電話・Wi-Fi・Bluetoothなどの無線通信への混信。CE/FCC不適合で製品を市場に出荷できない。</p>
          <Callout type="point" title="放射エミッションの主役はケーブル">
            筐体単体の放射は微小。電源ケーブル・信号ケーブルが接続された瞬間に放射が急増する。ケーブルがλ/2でアンテナとして共振するため、コモンモード電流を抑制することが根本対策。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>場所：</strong>半電波暗室（セミアネコイック室）または電波暗室。床面は金属グランドプレーン（セミアネコイック）。</p>
          <p><strong>測定距離：</strong>3 m または 10 m（規格・製品クラスによる）</p>
          <p><strong>使用アンテナ：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>バイコニカルアンテナ：30〜300 MHz</li>
            <li>ログペリオディックアンテナ：200 MHz〜1 GHz</li>
            <li>ダブルリッジドホーンアンテナ：1 GHz超</li>
          </ul>
          <p><strong>EUT配置：</strong>回転台（ターンテーブル）上に設置。0°〜360°回転させ最大放射方向を探索。</p>
          <p><strong>アンテナ高さ：</strong>1〜4 mの範囲でスキャンし、最大値を採用。</p>

          {/* SVG 配置図 */}
          <div className="my-4">
            <svg viewBox="0 0 600 300" className="w-full max-w-xl border rounded bg-gray-50">
              {/* Room outline */}
              <rect x="10" y="10" width="580" height="280" fill="none" stroke="#ccc" strokeWidth="2" rx="4"/>
              <text x="300" y="30" textAnchor="middle" fontSize="12" fill="#888">半電波暗室（セミアネコイック室）</text>

              {/* Ground plane */}
              <rect x="10" y="250" width="580" height="40" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1"/>
              <text x="300" y="270" textAnchor="middle" fontSize="11" fill="#4b5563">金属グランドプレーン（床）</text>

              {/* EUT on turntable */}
              <rect x="220" y="190" width="80" height="55" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2" rx="3"/>
              <text x="260" y="215" textAnchor="middle" fontSize="11" fill="#1e40af">EUT</text>
              <text x="260" y="230" textAnchor="middle" fontSize="9" fill="#1e40af">（被測定機器）</text>
              <ellipse cx="260" cy="250" rx="45" ry="8" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,2"/>
              <text x="260" y="248" textAnchor="middle" fontSize="9" fill="#6b7280">回転台</text>

              {/* Antenna mast */}
              <line x1="480" y1="250" x2="480" y2="60" stroke="#374151" strokeWidth="2"/>
              <rect x="455" y="100" width="50" height="30" fill="#fde68a" stroke="#d97706" strokeWidth="2" rx="2"/>
              <text x="480" y="119" textAnchor="middle" fontSize="10" fill="#92400e">アンテナ</text>
              <text x="530" y="115" fontSize="9" fill="#6b7280">h: 1〜4m</text>
              <text x="530" y="128" fontSize="9" fill="#6b7280">スキャン</text>

              {/* Distance arrow */}
              <line x1="300" y1="218" x2="455" y2="115" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3"/>
              <text x="390" y="165" textAnchor="middle" fontSize="11" fill="#dc2626">3m / 10m</text>

              {/* Cable from EUT */}
              <path d="M260 250 Q260 260 200 260 Q140 260 100 260" fill="none" stroke="#374151" strokeWidth="2"/>
              <text x="160" y="255" fontSize="9" fill="#374151">ケーブル</text>
            </svg>
          </div>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを最悪動作モード（最大クロック動作・最大負荷・最長ケーブル）で動作させる</li>
            <li>水平偏波・垂直偏波それぞれでアンテナをスキャン</li>
            <li>EUTを0°〜360°回転させ、アンテナ高さも1〜4 mでスキャン</li>
            <li>ピーク検波（PK）でプリスキャン → 限度値超え箇所を特定</li>
            <li>超過箇所を準尖頭値（QP）で精測（必要に応じて平均値AVも）</li>
          </ol>
          <Callout type="tip" title="最悪ケース条件の選定">
            測定はEUTの動作モードを変えながら最大放射を探す。クロックをON/OFF、インターフェース通信の有無など、全動作状態を網羅的に確認すること。
          </Callout>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p><strong>CISPR 32 クラスB（住宅環境、10m法）：</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left">周波数範囲</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">限度値（QP）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-3 py-2">30〜230 MHz</td><td className="border border-gray-300 px-3 py-2">30 dBμV/m</td></tr>
                <tr><td className="border border-gray-300 px-3 py-2">230 MHz〜1 GHz</td><td className="border border-gray-300 px-3 py-2">37 dBμV/m</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600">クラスA（産業環境）は10 dB緩和。マージンは6 dB以上を推奨。</p>
          <Callout type="warning" title="規格・限度値の確認">
            製品カテゴリ（IT機器・家電・ISM機器）や適用市場（EU/米国/日本）によって適用規格と限度値が異なります。必ず最新の一次文書を確認してください。
          </Callout>
        </div>
      }
      failures={
        <div className="space-y-3">
          <p><strong>典型的なNGパターン：</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>クロック高調波がケーブルのアンテナ長と共振：</strong>例えば100 MHzクロックの3次高調波300 MHzで、1 mケーブルがλ/2アンテナ（300 MHz時λ/2 ≈ 0.5 m）として動作。経路：クロック（源）→ コモンモード電流 → ケーブル（アンテナ）→ 空間放射</li>
            <li><strong>筐体の開口部からの漏れ：</strong>スリット長がλ/2を超えるとスロットアンテナになる。穴・スリット・ガスケット不良が原因。</li>
            <li><strong>シールドケーブルの接地不良：</strong>ドレイン線（ピッグテール）接地ではなく360°接続が必要。</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>フェライトクランプ（ケーブルに装着）：</strong>コモンモード電流にインピーダンスを付加。経路を断つ対策。</li>
            <li><strong>ケーブルシールドの両端接地：</strong>コモンモード電流をシールドに流してキャンセル。</li>
            <li><strong>筐体の開口部処理：</strong>スリット・開口部を λ/20 以下に分割、導電性ガスケット装着。</li>
            <li><strong>クロック配線のループ面積最小化：</strong>リターンパスをGNDプレーン直下に確保。</li>
            <li><strong>シリーズ抵抗で立ち上がり鈍化：</strong>クロックの高調波成分（高周波）を抑制。</li>
          </ul>
          <Callout type="point" title="対策の順序">
            1. まずケーブルのコモンモードを疑う（フェライトで確認）。2. 次に筐体の開口部を確認。3. 基板上のクロック/高速信号のレイアウトを見直す。
          </Callout>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>クロック・高速信号ラインのリターンパスを確保（グランドプレーンを断ち切らない）</li>
            <li>高速信号のコネクタ近傍にコモンモードチョーク + バイパスコンデンサを配置</li>
            <li>シリーズ終端抵抗でクロックの立ち上がり時間を意図的に鈍化（33〜47Ω目安）</li>
            <li>コネクタシールドを基板GNDに多点・低インピーダンスで接続（ピッグテール禁止）</li>
          </ul>
          <Callout type="tip" title="スペクトラム拡散クロック（SSC）">
            CLKのスペクトラムを意図的に拡散させ、特定周波数のピーク値を下げる手法。ΔfをF中心の±0.5〜1 %程度変調するだけでピークを3〜6 dB下げられる場合がある。ただし通信・タイミング敏感な系では注意が必要。
          </Callout>
        </div>
      }
    />
  )
}
