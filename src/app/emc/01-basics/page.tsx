import Callout from '@/components/Callout'
import { BlockMath } from '@/components/Math'

export default function BasicsPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">基礎編 — EMCの根幹を理解する</h1>

      {/* Learning questions */}
      <div className="bg-gray-100 rounded-xl p-6 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章の学習問題</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>EMIとEMSの違いは何か、なぜ両方が必要か？</li>
          <li>ノイズが問題になる3つの要素とは何か？</li>
          <li>コモンモードとノーマルモード電流の違いは何か？</li>
        </ol>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emc-primary text-white text-sm font-bold flex items-center justify-center">1</span>
          EMCとは
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>EMC（Electromagnetic Compatibility：電磁両立性）</strong>とは、電子機器が電磁的な観点で周囲と「共存」できる能力のことです。
          具体的には2つの側面があります：
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 not-prose">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="font-bold text-blue-800 mb-1">EMI（Electromagnetic Interference）</p>
            <p className="text-sm text-blue-700">電磁干渉。機器が外部に不要な電磁ノイズを放出しないこと。<strong>エミッション規制</strong>として規定される。</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-bold text-green-800 mb-1">EMS（Electromagnetic Susceptibility / Immunity）</p>
            <p className="text-sm text-green-700">電磁感受性／イミュニティ。機器が外部の電磁ノイズに耐えられること。<strong>イミュニティ規制</strong>として規定される。</p>
          </div>
        </div>

        <Callout type="point" title="EMCの本質">
          EMC = 出さない（EMI）× 耐える（EMS）の両立
        </Callout>

        <h3 className="font-bold text-gray-800 mt-4 mb-2">なぜ規制されるか</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>無線通信（携帯電話・WiFi・AM/FMラジオ）への混信</li>
          <li>医療機器（ペースメーカー等）の誤動作</li>
          <li>航空機・鉄道電子機器への干渉</li>
          <li>法規制：欧州のCEマーキング（EMC指令）、米国のFCC Part 15等</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emc-primary text-white text-sm font-bold flex items-center justify-center">2</span>
          ノイズの3要素モデル
        </h2>
        <p className="text-gray-700 mb-4">
          EMC問題は必ず以下の3要素が揃ったときに発生します。対策は「3つのうちどれを断つか」という発想で考えます。
        </p>

        {/* SVG Diagram */}
        <div className="not-prose my-6 flex justify-center">
          <svg width="520" height="100" viewBox="0 0 520 100" className="max-w-full">
            {/* Source */}
            <rect x="20" y="25" width="120" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
            <text x="80" y="47" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e40af">Source</text>
            <text x="80" y="64" textAnchor="middle" fontSize="11" fill="#1e40af">（ノイズ源）</text>

            {/* Arrow 1 */}
            <line x1="140" y1="50" x2="190" y2="50" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#6b7280"/>
              </marker>
            </defs>

            {/* Path */}
            <rect x="190" y="25" width="120" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
            <text x="250" y="47" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">Path</text>
            <text x="250" y="64" textAnchor="middle" fontSize="11" fill="#92400e">（伝搬経路）</text>

            {/* Arrow 2 */}
            <line x1="310" y1="50" x2="360" y2="50" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)"/>

            {/* Victim */}
            <rect x="360" y="25" width="120" height="50" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
            <text x="420" y="47" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9d174d">Victim</text>
            <text x="420" y="64" textAnchor="middle" fontSize="11" fill="#9d174d">（被害機器）</text>

            {/* Labels below arrows */}
            <text x="165" y="82" textAnchor="middle" fontSize="10" fill="#6b7280">断つ①</text>
            <text x="335" y="82" textAnchor="middle" fontSize="10" fill="#6b7280">断つ②</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 not-prose text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-bold text-blue-800">① Source対策</p>
            <p className="text-blue-700 mt-1">スイッチング波形を鈍らせる、スペクトラム拡散など</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="font-bold text-yellow-800">② Path対策</p>
            <p className="text-yellow-700 mt-1">フィルタ、シールド、ツイストペアなど</p>
          </div>
          <div className="bg-pink-50 p-3 rounded-lg">
            <p className="font-bold text-pink-800">③ Victim対策</p>
            <p className="text-pink-700 mt-1">保護回路、グランド強化、誤動作マージン確保など</p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emc-primary text-white text-sm font-bold flex items-center justify-center">3</span>
          コモンモードとノーマルモード
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-4">
          {/* Normal mode diagram */}
          <div>
            <p className="font-bold text-gray-800 mb-2 text-sm">ノーマルモード（差動モード）</p>
            <svg width="200" height="80" viewBox="0 0 200 80" className="w-full max-w-xs">
              {/* Line 1 */}
              <line x1="20" y1="25" x2="180" y2="25" stroke="#3b82f6" strokeWidth="2"/>
              <text x="10" y="29" fontSize="11" fill="#3b82f6">L1</text>
              {/* Arrow right on L1 */}
              <polygon points="130,19 150,25 130,31" fill="#3b82f6"/>
              {/* Line 2 */}
              <line x1="20" y1="55" x2="180" y2="55" stroke="#ef4444" strokeWidth="2"/>
              <text x="10" y="59" fontSize="11" fill="#ef4444">L2</text>
              {/* Arrow left on L2 */}
              <polygon points="70,49 50,55 70,61" fill="#ef4444"/>
              <text x="100" y="78" textAnchor="middle" fontSize="10" fill="#6b7280">I1 = -I2（逆方向）</text>
            </svg>
            <p className="text-xs text-gray-600 mt-2">2本のラインを逆方向に流れる電流（差動電流）。信号電流はノーマルモード。</p>
          </div>

          {/* Common mode diagram */}
          <div>
            <p className="font-bold text-gray-800 mb-2 text-sm">コモンモード（同相モード）</p>
            <svg width="200" height="80" viewBox="0 0 200 80" className="w-full max-w-xs">
              {/* Line 1 */}
              <line x1="20" y1="25" x2="180" y2="25" stroke="#3b82f6" strokeWidth="2"/>
              <text x="10" y="29" fontSize="11" fill="#3b82f6">L1</text>
              {/* Arrow right on L1 */}
              <polygon points="130,19 150,25 130,31" fill="#3b82f6"/>
              {/* Line 2 */}
              <line x1="20" y1="55" x2="180" y2="55" stroke="#ef4444" strokeWidth="2"/>
              <text x="10" y="59" fontSize="11" fill="#ef4444">L2</text>
              {/* Arrow right on L2 */}
              <polygon points="130,49 150,55 130,61" fill="#ef4444"/>
              <text x="100" y="78" textAnchor="middle" fontSize="10" fill="#6b7280">I1 = I2（同方向）</text>
            </svg>
            <p className="text-xs text-gray-600 mt-2">2本のラインを同方向に流れる電流（同相電流）。グランドを介して戻る。放射の主原因。</p>
          </div>
        </div>

        <p className="text-gray-700 mb-3 text-sm">
          コモンモード電流とノーマルモード電流の関係式：
        </p>
        <BlockMath math="I_{CM} = \frac{I_1 + I_2}{2}" />
        <p className="text-sm text-gray-600 mt-2">
          ノーマルモード電流は I_NM = (I_1 - I_2)/2 で表されます。
          コモンモードは放射の主要原因であり、EMI対策の多くはコモンモード電流の抑制を目的とします。
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emc-primary text-white text-sm font-bold flex items-center justify-center">4</span>
          単位と換算
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          EMC試験では電圧・電界強度・電流をdBスケール（基準値からのデシベル）で扱います。
        </p>

        <BlockMath math="V_{dB\mu V} = 20 \cdot \log_{10}\!\left(\frac{V}{1\,\mu V}\right)" />
        <BlockMath math="E_{dB\mu V/m} = 20 \cdot \log_{10}\!\left(\frac{E}{1\,\mu V/m}\right)" />
        <BlockMath math="I_{dB\mu A} = 20 \cdot \log_{10}\!\left(\frac{I}{1\,\mu A}\right)" />

        <div className="not-prose mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">電圧</th>
                <th className="border border-gray-300 px-4 py-2 text-right">dBμV</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1 μV', '0 dBμV'],
                ['10 μV', '20 dBμV'],
                ['100 μV', '40 dBμV'],
                ['1 mV', '60 dBμV'],
                ['10 mV', '80 dBμV'],
                ['100 mV', '100 dBμV'],
                ['1 V', '120 dBμV'],
              ].map(([v, db]) => (
                <tr key={v} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-1.5 font-mono">{v}</td>
                  <td className="border border-gray-300 px-4 py-1.5 text-right font-mono">{db}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emc-primary text-white text-sm font-bold flex items-center justify-center">5</span>
          規格の全体地図
        </h2>
        <div className="not-prose overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left">規格番号</th>
                <th className="px-4 py-2 text-left">内容</th>
                <th className="px-4 py-2 text-left">適用例</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['CISPR 11', '工業・科学・医療機器（ISM）のエミッション', 'ISM機器、電動工具'],
                ['CISPR 32', 'マルチメディア機器のエミッション', 'PC・テレビ・AV機器'],
                ['CISPR 25', '車載機器のエミッション', '車載電子機器'],
                ['IEC 61000-3-2', '高調波電流（ACポート）', 'AC電源接続機器全般'],
                ['IEC 61000-3-3', '電圧変動・フリッカ', 'AC電源接続機器全般'],
                ['IEC 61000-4-2', 'ESD（静電気放電）イミュニティ', '全般'],
                ['IEC 61000-4-3', 'RF放射イミュニティ', '全般'],
                ['IEC 61000-4-4', 'EFT/バーストイミュニティ', '全般'],
                ['IEC 61000-4-5', 'サージイミュニティ', '全般'],
                ['IEC 61000-4-6', '伝導妨害波イミュニティ', '全般'],
                ['IEC 61000-4-8', '電源周波数磁界イミュニティ', '全般'],
                ['IEC 61000-4-11', '電圧ディップ・停電', 'AC電源接続機器'],
              ].map(([std, desc, app]) => (
                <tr key={std} className="even:bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-2 font-mono text-xs text-emc-primary">{std}</td>
                  <td className="px-4 py-2 text-gray-700">{desc}</td>
                  <td className="px-4 py-2 text-gray-500">{app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="規格の版について">
          規格番号・限度値・適用範囲は版改定で変わります。必ず最新の一次情報（IEC/CISPR発行文書）を確認してください。
          本サイトの内容は学習目的であり、最新版の規格値を保証するものではありません。
        </Callout>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emc-primary text-white text-sm font-bold flex items-center justify-center">6</span>
          試験環境
        </h2>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            {
              name: '全電波暗室（フルアネコイック室）',
              desc: '床・壁・天井すべて電波吸収材で覆う。30 MHz以上の放射エミッション・放射イミュニティ試験に使用。',
            },
            {
              name: '半電波暗室（セミアネコイック室）',
              desc: '床は金属グランドプレーン、壁・天井は吸収材。放射エミッション試験の標準環境。',
            },
            {
              name: 'OATS（Open Area Test Site）',
              desc: '屋外開放試験場。金属グランドプレーン上に機器を設置。セミアネコイック室のリファレンス。',
            },
            {
              name: 'シールドルーム（シールデッドルーム）',
              desc: '外部電磁波を遮断した金属製の部屋。イミュニティ試験（EFT・サージ等）に使用。',
            },
          ].map((item) => (
            <div key={item.name} className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">{item.name}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="not-prose bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-gray-800 text-sm mb-1">
            LISN（Line Impedance Stabilization Network / 疑似電源回路網）
          </p>
          <p className="text-xs text-gray-600">
            電源インピーダンスを50Ωに規定し、被測定物のノイズのみを安定して取り出すための回路網。
            伝導エミッション試験には必須の装置。
          </p>
        </div>

        <Callout type="tip" title="LISNが必要な理由">
          商用電源のインピーダンスは周波数・時間・場所によって変動します。
          そのままでは測定結果の再現性が得られません。LISNは電源ラインに規定のインピーダンス（50Ω）を提供することで、
          どこで測定しても同じ条件を実現します。
        </Callout>
      </section>
    </article>
  )
}
