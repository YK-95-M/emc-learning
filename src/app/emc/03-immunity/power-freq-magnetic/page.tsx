import TestTemplate from '@/components/TestTemplate'
import Callout from '@/components/Callout'

export default function PowerFreqMagneticPage() {
  return (
    <TestTemplate
      name="電源周波数磁界イミュニティ"
      nameEn="Power Frequency Magnetic Field Immunity"
      abbr="PFMF"
      standard="IEC 61000-4-8"
      overview={
        <div className="space-y-3">
          <p>商用周波数（50/60 Hz）の磁界中でEUTが正常動作するか確認する試験。変圧器・電力ケーブルの近傍では強い商用周波数磁界が存在する。</p>
          <p><strong>模擬している現象：</strong>発電所・変電設備・大型変圧器・配電盤の近傍で発生する50/60 Hz磁界。</p>
          <p><strong>不適合の影響：</strong>ホールセンサ・フラックスゲートセンサ・磁気コンパスの誤動作、CRT画面の揺れ（現在は主にCRTが対象）。</p>
          <Callout type="point" title="磁界イミュニティの主要被害者">
            磁界に敏感なセンサ（磁気センサ、電流センサ）や、磁界ループを持つ大面積回路が主な影響を受ける。通常のデジタル回路への影響は限定的。
          </Callout>
        </div>
      }
      setup={
        <div className="space-y-3">
          <p><strong>使用機材：</strong>電源周波数磁界発生コイル（1 m × 1 m 平面コイルまたは各軸コイル）、電流増幅器</p>
          <p><strong>試験レベル：</strong>1〜1000 A/m（レベル1〜5）。住宅環境は通常 1〜3 A/m、産業環境は 10〜100 A/m。</p>
          <p><strong>EUT配置：</strong>コイル中心部に設置。3軸（X/Y/Z）それぞれについて印加。</p>
        </div>
      }
      procedure={
        <div className="space-y-3">
          <ol className="list-decimal pl-5 space-y-2">
            <li>EUTを動作状態に設定</li>
            <li>50 または 60 Hz の磁界を X、Y、Z 軸それぞれに印加</li>
            <li>各軸印加中のEUT動作を確認・記録</li>
          </ol>
        </div>
      }
      criteria={
        <div className="space-y-3">
          <p>性能判定基準 A/B/C/D。磁界センサ搭載機器では特に厳しい基準（A）が要求されることが多い。</p>
        </div>
      }
      failures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>磁気センサの磁界による飽和・誤出力：</strong>ホールIC、AMRセンサなどが外部磁界で飽和</li>
            <li><strong>大面積グランドループへの誘導：</strong>基板の大きなループ面積が50/60 Hzを誘起</li>
          </ul>
        </div>
      }
      countermeasures={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>μ金属シールド：</strong>磁界センサを高透磁率材（パーマロイ等）で囲い磁界を迂回させる</li>
            <li><strong>ループ面積の最小化：</strong>大きな電流ループは50/60 Hzの誘導起電力を最小化</li>
            <li><strong>差動センシング：</strong>磁界を差動方式でキャンセル</li>
          </ul>
        </div>
      }
      pcbDesign={
        <div className="space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>磁気センサ周辺のパターンループ面積を最小化</li>
            <li>センサ部品を必要に応じて高透磁率シールドケースに収納</li>
            <li>電源ラインと信号ラインを並走させず物理的に分離</li>
          </ul>
        </div>
      }
    />
  )
}
