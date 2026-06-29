import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'
import FrequencyChart from '@/components/FrequencyChart'

// Class B QP limit data for conducted emission (150kHz - 30MHz)
const classBLimitData = [
  { freq: 0.15, limit: 66 },
  { freq: 0.5, limit: 56 },
  { freq: 0.5001, limit: 56 },
  { freq: 5, limit: 56 },
  { freq: 5.0001, limit: 60 },
  { freq: 30, limit: 60 },
]

export default function ConductedEmissionPage() {
  return (
    <TestTemplate
      name="雑音端子電圧（伝導エミッション）"
      nameEn="Conducted Emission (Noise Terminal Voltage)"
      abbr="CE"
      standard="CISPR 11, CISPR 32, IEC 61000-3-2 Class B参考"
      overview={
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-gray-800 mb-1">目的</h3>
            <p className="text-gray-700">
              機器の電源ポートから電源ラインへ流出するノイズ電圧（雑音端子電圧）を測定し、規格の限度値以下であることを確認する試験です。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">現実の現象</h3>
            <p className="text-gray-700">
              スイッチング電源、モータドライバ、DC-DCコンバータなどのスイッチングノイズが電源ラインを伝い、
              同一電源に接続された他機器や電源網全体に混入します。
              これが周辺機器の誤動作やAMラジオへの混信を引き起こします。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded p-3">
              <p className="font-semibold text-gray-700">周波数範囲</p>
              <p className="text-gray-600 mt-1">150 kHz ～ 30 MHz</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="font-semibold text-gray-700">測定単位</p>
              <p className="text-gray-600 mt-1">dBμV（電圧レベル）</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">不適合の影響</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>同一電源に接続された機器の誤動作・リセット</li>
              <li>AM放送（中波：531 kHz – 1,602 kHz）への混信</li>
              <li>EMC規格不適合によるCEマーキング取得不可</li>
            </ul>
          </div>
        </div>
      }
      setup={
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded p-3">
              <p className="font-semibold text-gray-700 mb-1">試験場所</p>
              <p className="text-gray-600">シールドルーム内（外部電磁波を遮断）</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="font-semibold text-gray-700 mb-1">主要機材</p>
              <ul className="text-gray-600 text-xs space-y-0.5">
                <li>• LISN（L線・N線各1個）</li>
                <li>• EMIレシーバ（EMIスキャナ）</li>
                <li>• 基準グランドプレーン（金属板）</li>
                <li>• 絶縁スペーサ（80mm高）</li>
              </ul>
            </div>
          </div>

          {/* Setup SVG */}
          <div className="my-4 flex justify-center">
            <svg width="500" height="200" viewBox="0 0 500 200" className="max-w-full border border-gray-200 rounded bg-gray-50">
              {/* Ground plane */}
              <rect x="10" y="170" width="480" height="20" fill="#9ca3af" rx="2"/>
              <text x="240" y="185" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">基準グランドプレーン</text>

              {/* AC Source */}
              <rect x="20" y="80" width="80" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="60" y="107" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">AC</text>
              <text x="60" y="123" textAnchor="middle" fontSize="10" fill="#92400e">電源</text>

              {/* LISN */}
              <rect x="160" y="80" width="80" height="60" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="200" y="107" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">LISN</text>
              <text x="200" y="123" textAnchor="middle" fontSize="10" fill="#1e40af">×2（L/N）</text>

              {/* EUT */}
              <rect x="300" y="70" width="100" height="70" rx="6" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/>
              <text x="350" y="102" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">EUT</text>
              <text x="350" y="118" textAnchor="middle" fontSize="10" fill="#166534">被測定機器</text>

              {/* Receiver */}
              <rect x="160" y="10" width="80" height="45" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="200" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9d174d">EMI</text>
              <text x="200" y="45" textAnchor="middle" fontSize="10" fill="#9d174d">レシーバ</text>

              {/* Connections */}
              <line x1="100" y1="110" x2="160" y2="110" stroke="#6b7280" strokeWidth="2"/>
              <line x1="240" y1="110" x2="300" y2="110" stroke="#6b7280" strokeWidth="2"/>
              <line x1="200" y1="80" x2="200" y2="55" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 2"/>
              <text x="215" y="70" fontSize="9" fill="#ec4899">RF出力</text>

              {/* Insulator legs */}
              <line x1="310" y1="140" x2="310" y2="170" stroke="#9ca3af" strokeWidth="2"/>
              <line x1="390" y1="140" x2="390" y2="170" stroke="#9ca3af" strokeWidth="2"/>
              <text x="350" y="162" textAnchor="middle" fontSize="9" fill="#6b7280">80mm絶縁</text>

              {/* Labels */}
              <text x="130" y="105" textAnchor="middle" fontSize="9" fill="#6b7280">AC</text>
              <text x="270" y="105" textAnchor="middle" fontSize="9" fill="#6b7280">AC+ノイズ</text>
            </svg>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-2">EUT配置条件</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>EUTは基準グランドプレーン上に絶縁（高さ80mm）して設置</li>
              <li>EUTの電源ケーブルは40cm折りたたみ（過剰なケーブル長を排除）</li>
              <li>LISNのグランドは基準グランドプレーンに直接接続</li>
              <li>測定点: LISNのRF出力ポート（L線・N線それぞれ）</li>
            </ul>
          </div>
        </div>
      }
      procedure={
        <div className="space-y-3 text-sm">
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>EUTを最悪ケース（最大負荷・最悪動作モード）で動作させる</li>
            <li>EMIレシーバをLISNのRF出力に接続する</li>
            <li><strong>ピーク検波（Peak）でプリスキャン</strong>：150 kHz～30 MHzを高速スキャンし、限度値に近い周波数を特定する</li>
            <li><strong>準尖頭値（QP：Quasi-Peak）と平均値（AV：Average）で精測</strong>：プリスキャンで見つかった周波数付近を精密測定する</li>
            <li>L線・N線それぞれで測定し、より厳しい側を記録する</li>
          </ol>
          <div className="bg-gray-50 rounded p-3 mt-3">
            <p className="font-semibold text-gray-700 mb-1 text-xs">検波方式の違い</p>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
              <div><strong>Peak（ピーク）</strong><br/>最大瞬時値。プリスキャン用。測定が速い。</div>
              <div><strong>QP（準尖頭値）</strong><br/>繰り返しに重みづけ。規制の基本。</div>
              <div><strong>AV（平均値）</strong><br/>時間平均。QPより6dB程度低い。</div>
            </div>
          </div>
        </div>
      }
      criteria={
        <div className="space-y-4 text-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-3 py-2 text-left">周波数範囲</th>
                  <th className="px-3 py-2 text-right">QP限度値</th>
                  <th className="px-3 py-2 text-right">AV限度値</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['150 kHz – 500 kHz', '66 → 56 dBμV（傾斜）', '56 → 46 dBμV（傾斜）'],
                  ['500 kHz – 5 MHz', '56 dBμV', '46 dBμV'],
                  ['5 MHz – 30 MHz', '60 dBμV', '50 dBμV'],
                ].map(([freq, qp, av]) => (
                  <tr key={freq} className="even:bg-gray-50 border-b border-gray-200">
                    <td className="px-3 py-2 font-mono">{freq}</td>
                    <td className="px-3 py-2 text-right text-red-600 font-semibold">{qp}</td>
                    <td className="px-3 py-2 text-right text-orange-600 font-semibold">{av}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-1">※ CISPR 32 クラスB（住宅環境向け）。クラスAは10dB緩和。</p>
          </div>

          <FrequencyChart
            title="クラスB 伝導エミッション限度値（QP）"
            data={classBLimitData}
            xLabel="周波数 (MHz)"
            yLabel="dBμV"
          />

          <Callout type="tip" title="設計マージン">
            規格限度値に対して通常6dB以上のマージンを確保することを推奨します。
            製品個体差・量産ばらつき・温度変化による変動を考慮するためです。
          </Callout>
        </div>
      }
      failures={
        <div className="space-y-3 text-sm">
          <ul className="space-y-3">
            {[
              {
                title: 'スイッチング周波数とその高調波のコモンモード漏れ',
                desc: 'スイッチング電源のFET駆動波形の高調波がコモンモードで電源ラインへ漏れる。特に奇数次高調波が強い。',
              },
              {
                title: 'EMIフィルタのYコンデンサ未実装・容量不足',
                desc: 'コモンモードノイズをPEへバイパスするYコンデンサがないと、コモンモード電流が電源ラインに流れる。',
              },
              {
                title: 'LISNのグランドへのボンディング不十分',
                desc: 'EUTのシャーシとグランドプレーンの接続インピーダンスが高いと測定結果が悪化する。',
              },
              {
                title: 'フィルタの入出力カップリング',
                desc: 'フィルタ入力側と出力側のパターン・部品が近接していると、フィルタをバイパスしてノイズが回り込む。',
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-4 text-sm">
          <Callout type="point" title="基本対策の組み合わせ">
            コモンモードチョーク＋Yコンデンサの組み合わせが基本。不適合時はまずコモンモードを疑う。
          </Callout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: 'コモンモードチョーク（電源ライン）',
                desc: 'L線・N線を同じコアに逆方向に巻いたインダクタ。コモンモード電流を高インピーダンスでブロック。ノーマルモード（信号電流）はキャンセルして影響なし。',
                badge: '主役',
                color: 'bg-blue-100 border-blue-300',
              },
              {
                title: 'Yコンデンサ（ライン-PE間）',
                desc: 'ACライン（L・N）とPE（保護接地）の間に接続。コモンモード電流をPEへバイパスする。安全規格による容量制限あり（漏れ電流制約）。',
                badge: '主役',
                color: 'bg-blue-100 border-blue-300',
              },
              {
                title: 'Xコンデンサ（ライン間）',
                desc: 'L線とN線の間に接続。ノーマルモードノイズをバイパス。',
                badge: '補助',
                color: 'bg-gray-100 border-gray-300',
              },
              {
                title: 'スペクトラム拡散（SSC）',
                desc: 'スイッチング周波数を微小変調してエネルギーを分散させ、特定周波数のピークを低減する。',
                badge: '補助',
                color: 'bg-gray-100 border-gray-300',
              },
            ].map((item) => (
              <div key={item.title} className={`border rounded-lg p-3 ${item.color}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-600 bg-white px-1.5 py-0.5 rounded border">
                    {item.badge}
                  </span>
                  <p className="font-semibold text-gray-800 text-xs">{item.title}</p>
                </div>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      }
      pcbDesign={
        <div className="space-y-4 text-sm">
          <ul className="space-y-3">
            {[
              'コモンモードチョークはACコネクタの直後に配置する（コネクタ→CMチョーク→Xコン→Yコン→整流回路の順）',
              'Yコンデンサは安全規格（IEC 60384-14 クラスY1またはY2）を満たす部品を使用すること',
              'フィルタ部品の入力側パターンと出力側パターンが隣接しないようにレイアウトする',
              'EMIフィルタ通過後のノイジーな配線とクリーン側の配線を物理的に離す',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emc-primary font-bold shrink-0">{i + 1}.</span>
                <p className="text-gray-700">{item}</p>
              </li>
            ))}
          </ul>

          <Callout type="tip" title="フィルタのショートサーキット防止">
            基板でフィルタを設計する場合、入力側と出力側のパターンを物理的に離し、フィルタ前後のパターンが容量結合しないようにすること。
            近接していると高周波でフィルタが無効化される。
          </Callout>
        </div>
      }
    />
  )
}
