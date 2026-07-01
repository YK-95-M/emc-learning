const terms = [
  { term: 'EMC', kana: 'イーエムシー', definition: 'Electromagnetic Compatibility（電磁両立性）。機器が外部に電磁ノイズを放出せず（EMI）、かつ外部ノイズに耐える（EMS）両立性。' },
  { term: 'EMI', kana: 'イーエムアイ', definition: 'Electromagnetic Interference（電磁妨害）。機器が外部に放出する不要電磁ノイズ。エミッション規制の対象。' },
  { term: 'EMS', kana: 'イーエムエス', definition: 'Electromagnetic Susceptibility / Immunity（電磁感受性/イミュニティ）。外部ノイズに対する機器の耐性。' },
  { term: 'CISPR', kana: 'シスプル', definition: 'Comité International Spécial des Perturbations Radioélectriques。国際無線障害特別委員会。EMCエミッション規格（CISPR 11/32等）を発行。' },
  { term: 'ESD', kana: 'イーエスディー', definition: 'Electrostatic Discharge（静電気放電）。帯電した物体が別の物体に触れた際の急峻な電荷移動。IEC 61000-4-2 で試験される。' },
  { term: 'EFT', kana: 'イーエフティー', definition: 'Electrical Fast Transient（電気的ファストトランジェント）。リレー・接点開閉時のチャタリングを模擬した高速パルスバースト。IEC 61000-4-4。' },
  { term: 'LISN', kana: 'リスン', definition: 'Line Impedance Stabilization Network（疑似電源回路網）。電源インピーダンスを規定値（50Ω）に安定させ、EUTの電源ノイズのみを安定測定するための回路。伝導エミッション試験で使用。' },
  { term: 'コモンモード', kana: 'こもんもーど', definition: 'Common Mode。2本の信号線を同じ方向（同相）に流れる電流。意図しない経路（筐体・グランド）を流れ、放射の主要因になる。' },
  { term: 'ノーマルモード', kana: 'のーまるもーど', definition: 'Normal Mode（差動モード）。2本の信号線を逆方向に流れる電流。信号・電力の本来の伝送経路。' },
  { term: 'クラスA', kana: 'くらすえー', definition: '産業環境向けのEMC限度値クラス。住宅環境向けクラスBより緩い限度値が適用される（10 dB程度緩い）。' },
  { term: 'クラスB', kana: 'くらすびー', definition: '住宅環境向けのEMC限度値クラス。人体や放送設備への影響を防ぐためクラスAより厳しい限度値が設定される。' },
  { term: '準尖頭値 (QP)', kana: 'じゅんせんとうち', definition: 'Quasi-Peak。繰り返しパルス状のノイズに対し、人間の聴覚の特性を模したEMI測定用検波方式。エミッション試験の最終判定に使用。' },
  { term: '平均値 (AV)', kana: 'へいきんち', definition: 'Average Value。時間平均による検波方式。QP測定と組み合わせて伝導エミッションの判定に使用。' },
  { term: 'ピーク値', kana: 'ぴーくち', definition: 'Peak Value。測定信号の瞬時最大値を捕捉する検波方式。プリスキャン（高速スクリーニング）に使用。' },
  { term: 'dBμV', kana: 'でしべるまいくろぼると', definition: '電圧の対数表現。0 dBμV = 1 μV。V_dBμV = 20 × log10(V/1μV)。EMI測定の基本単位。' },
  { term: 'dBμV/m', kana: 'でしべるまいくろぼるとぱーめーとる', definition: '電界強度の対数表現。放射エミッション測定で使用。E_dBμV/m = 20 × log10(E/1μV/m)。' },
  { term: '電波暗室', kana: 'でんぱあんしつ', definition: '内壁に電波吸収体（電波吸収材）を貼り付けた部屋。外部電磁波を遮断しつつ内部の反射を除去。放射エミッション・イミュニティ試験に使用。' },
  { term: 'シールドルーム', kana: 'しーるどるーむ', definition: 'Faradayケージ。金属板・金属メッシュで囲まれた部屋。外部電磁波を遮断する。イミュニティ試験・伝導試験に使用。' },
  { term: 'OATS', kana: 'おーえーてぃーえす', definition: 'Open Area Test Site（オープンサイト）。屋外の平坦な導体面上で実施する放射測定サイト。反射波の影響が少ない。' },
  { term: 'バイコニカルアンテナ', kana: 'ばいこにかるあんてな', definition: '30〜300 MHzの受信に使用するアンテナ。二重コーン形状。放射エミッション試験で広く使用される。' },
  { term: 'ログペリオディックアンテナ', kana: 'ろぐぺりおでぃっくあんてな', definition: '200 MHz〜1 GHz の広帯域受信アンテナ。周波数に応じて有効なエレメントが変化する。放射エミッション試験で使用。' },
  { term: 'MOV', kana: 'えむおーぶい', definition: 'Metal Oxide Varistor（金属酸化物バリスタ）。電圧が動作電圧を超えると低抵抗になりエネルギーを吸収する素子。サージ一次保護として使用。消耗品。' },
  { term: 'TVS', kana: 'てぃーぶいえす', definition: 'Transient Voltage Suppressor（トランジェント電圧サプレッサ）。ツェナーダイオードの高電力版。高速・精密なクランプ電圧。ESD/サージ二次保護に使用。' },
  { term: 'コモンモードチョーク', kana: 'こもんもーどちょーく', definition: '2本のラインに逆方向に巻いた2巻線インダクタ。コモンモード電流に高インピーダンスを呈し、ノーマルモード電流には影響を与えない。EMIフィルタの基本素子。' },
  { term: 'Xコンデンサ', kana: 'えっくすこんでんさ', definition: 'AC電源のL-N間に接続するコンデンサ。ノーマルモードノイズをバイパスする。IEC 60384-14 クラスX品を使用（短絡時の安全性を確保）。' },
  { term: 'Yコンデンサ', kana: 'わいこんでんさ', definition: 'AC電源のL-PE間またはN-PE間に接続するコンデンサ。コモンモードノイズを保護接地（PE）へバイパスする。IEC 60384-14 クラスY品（安全認定品）が必須。' },
  { term: 'フェライトコア', kana: 'ふぇらいとこあ', definition: 'フェライト（酸化鉄系磁性材料）製のコア。高周波での磁気損失を利用してノイズを熱変換する。クランプ型（後付け）とビーズ型（基板実装）がある。' },
  { term: 'リターン電流', kana: 'りたーんでんりゅう', definition: '信号・電力電流の復路（帰還電流）。往路と復路が形成するループ面積が放射強度に直結する。グランドプレーンで最低インピーダンス経路を提供する。' },
  { term: 'グランドプレーン', kana: 'ぐらんどぷれーん', definition: '多層基板の内層または外層に設けた連続した銅箔グランド層。リターン電流の低インピーダンス経路を提供しEMIを抑制する基板設計の要。' },
  { term: 'デカップリングコンデンサ', kana: 'でかっぷりんぐこんでんさ', definition: 'ICの電源ピン直近に配置し、スイッチング動作による過渡電流をローカルに供給するコンデンサ。電源ラインのインピーダンスを下げ、ノイズを抑制する。' },
  { term: 'スティッチングビア', kana: 'すてぃっちんぐびあ', definition: '多層基板の複数のグランドプレーン間を接続するビア。λ/20 間隔で配置しグランド面間の電位差を抑制する。高周波EMI対策の重要な設計要素。' },
]

export default function GlossaryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">用語集</h1>
        <p className="text-gray-600">EMC学習に登場する主要用語の定義一覧。本文中の初出用語はツールチップでも参照できます。</p>
      </div>

      <div className="space-y-3">
        {terms.map((t) => (
          <div key={t.term} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-base font-bold text-gray-900">{t.term}</span>
              <span className="text-sm text-gray-400">（{t.kana}）</span>
            </div>
            <p className="text-sm text-gray-700">{t.definition}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
