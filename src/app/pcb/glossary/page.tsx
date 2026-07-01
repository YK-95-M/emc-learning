import Link from 'next/link'

export const metadata = { title: '用語集 | PCB設計学習' }

const terms = [
  { term: 'アノード (Anode)', en: 'Anode', def: 'ダイオード/LEDの正極（+側）。電流が流れ込む端子。回路記号の三角形の底辺側。' },
  { term: 'ガーバーファイル', en: 'Gerber File', def: 'PCB製造用の標準データ形式。各層（銅箔・レジスト・シルク・外形等）をRS-274X形式で記述。拡張子 .gbr' },
  { term: 'カソード (Cathode)', en: 'Cathode', def: 'ダイオード/LEDの負極（−側）。電流が流れ出る端子。LEDでは短いリード・フラット側。' },
  { term: 'キルヒホッフの法則', en: "Kirchhoff's Laws", def: 'KVL: 閉ループ内の電圧の代数和 = 0。KCL: 節点(ノード)に流入する電流の和 = 流出する電流の和。' },
  { term: 'クリアランス', en: 'Clearance', def: '異なるネット間の最小空間距離。製造業者の最小クリアランス以上確保する必要がある（通常0.1〜0.2mm）。' },
  { term: 'コートヤード', en: 'Courtyard', def: 'フットプリントの外形領域。実装時に他部品と干渉しないための空間を定義する枠。' },
  { term: 'サーマルビア', en: 'Thermal Via', def: '発熱部品の直下に設けるビア群。熱を反対面の銅箔に逃がすための放熱経路。' },
  { term: 'サーマルリリーフ', en: 'Thermal Relief', def: 'ベタGNDとパッドの接続を細いスポーク（通常4本）で行うパターン。手はんだ時の熱逃げを防ぐ。' },
  { term: 'シルクスクリーン', en: 'Silkscreen', def: '基板表面の印刷層。部品番号・極性マーク・会社名・リビジョン等を印刷。白色が一般的。' },
  { term: 'スルーホール', en: 'Through-hole', def: '基板を貫通する穴。リード部品の足を挿入してはんだ付けする。または層間接続ビアとしても使用。' },
  { term: 'デカップリングコンデンサ', en: 'Decoupling Capacitor', def: 'ICの電源ピン直近に配置する小容量コンデンサ（通常100nF）。電源ノイズを吸収し動作安定化。' },
  { term: 'ネットリスト', en: 'Netlist', def: '回路図の電気的接続情報をテキストで記述したファイル。回路図エディタからPCBエディタへの接続情報の橋渡し。' },
  { term: 'ビア', en: 'Via', def: '基板の層間を電気的に接続するめっき穴。スルーホールビア（全層）・ブラインドビア・バリードビアの種類がある。' },
  { term: 'フットプリント', en: 'Footprint', def: '基板上の部品の「足跡」。パッド・コートヤード・シルクを含む。EDAのライブラリで管理。' },
  { term: 'ベタGND', en: 'Ground Plane / Pour', def: 'GNDネットで埋めた大面積の銅箔領域。リターン電流の低インピーダンス経路を提供しEMIを低減。' },
  { term: 'ランド/パッド', en: 'Land / Pad', def: '部品をはんだ付けするための銅箔の露出領域。ソルダーレジストの開口部。リード部品はスルーホールランド、SMDはSMDパッド。' },
  { term: 'リターンパス', en: 'Return Path', def: '電流が信号源に戻る経路。GNDを通る。リターン電流は可能な限り信号電流の直下を流れようとする。ループ面積の最小化に重要。' },
  { term: 'ループ面積', en: 'Loop Area', def: '信号電流とリターン電流が形成するループの面積。ループ面積が大きいほどEMIが増加する。ベタGNDで最小化。' },
  { term: 'DRC', en: 'Design Rule Check', def: 'PCBレイアウトの設計ルール違反を自動検査する機能。クリアランス・線幅・未配線などを検出。' },
  { term: 'ERC', en: 'Electrical Rule Check', def: '回路図の電気的な矛盾（未接続ピン・電源衝突等）を自動検査する機能。' },
  { term: 'DFM', en: 'Design for Manufacturability', def: '製造しやすさを考慮した設計。製造歩留まりの向上・製造コスト低減・品質安定化を目的とする。' },
  { term: 'EDA', en: 'Electronic Design Automation', def: '電子設計自動化ツール。回路図エディタ・PCBレイアウトツール・シミュレータ等を含む統合設計環境。KiCad等。' },
  { term: 'FR-4', en: 'FR-4', def: 'Flame Retardant 4。ガラス繊維とエポキシ樹脂の積層板。PCBの最も標準的な基材。誘電率約4.5。' },
  { term: 'ENIG', en: 'Electroless Nickel Immersion Gold', def: '無電解ニッケル・浸漬金めっき。平坦で耐腐食性が高い表面処理。ファインピッチBGAに最適。' },
  { term: 'HASL', en: 'Hot Air Solder Leveling', def: '溶融はんだを塗布し熱風で均す表面処理。低コスト・一般用途向け。表面が凸凹になりやすい。' },
]

export default function GlossaryPage() {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term, 'ja'))

  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span><span>用語集</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">PCB設計 用語集</h1>
        <p className="text-gray-600">基板設計でよく使う用語を五十音順で解説。</p>
      </div>

      <div className="not-prose space-y-2">
        {sorted.map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-baseline gap-3 flex-wrap mb-1">
              <span className="font-bold text-gray-900">{item.term}</span>
              <span className="text-xs text-gray-400 font-mono">{item.en}</span>
            </div>
            <p className="text-sm text-gray-600">{item.def}</p>
          </div>
        ))}
      </div>

      <div className="not-prose mt-8 flex gap-3">
        <Link href="/pcb" className="text-sm text-blue-600 hover:text-blue-800">← PCB学習トップへ</Link>
      </div>
    </article>
  )
}
