import Link from 'next/link'
import Callout from '@/components/Callout'

export const metadata = { title: '基板のしくみ | PCB設計学習' }

export default function BoardStructurePage() {
  return (
    <article className="prose prose-sm max-w-none">
      <div className="not-prose mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/pcb" className="hover:text-blue-600">PCB設計</Link>
          <span>›</span><span>04 基板のしくみ</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">基板のしくみ — 断面図で構造を理解する</h1>
        <p className="text-gray-600">基板の物理的な構造を断面図で理解し、設計に活かす。</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-5 mb-8 not-prose">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">この章でできるようになること</h2>
        <ul className="space-y-1.5">
          {[
            '基板の積層構造（FR-4・銅箔・レジスト・シルク）を断面図で説明できる',
            'ランド/ビア/フットプリントの意味と役割を理解できる',
            '配線の線幅と電流容量の関係を理解できる',
          ].map((o, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-500 shrink-0">✓</span>{o}
            </li>
          ))}
        </ul>
      </div>

      {/* Section 1: Cross-section */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">1</span>
          基板の積層構造（断面図）
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <p className="text-xs text-gray-500 text-center mb-4">2層基板の断面（実際は厚さ1.6mm程度）</p>
          <div className="flex justify-center">
            <svg viewBox="0 0 500 220" className="w-full max-w-xl">
              {/* Silkscreen top */}
              <rect x="40" y="10" width="420" height="12" rx="1" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
              <text x="15" y="21" fontSize="9" fill="#ca8a04" fontWeight="bold">シルク</text>
              <line x1="35" y1="16" x2="42" y2="16" stroke="#ca8a04" strokeWidth="1"/>
              <text x="230" y="20" textAnchor="middle" fontSize="8" fill="#a16207">シルクスクリーン（白印刷・部品名/極性マーク）</text>

              {/* Solder mask top */}
              <rect x="40" y="22" width="420" height="14" rx="1" fill="#86efac" stroke="#16a34a" strokeWidth="1" opacity="0.8"/>
              <text x="15" y="33" fontSize="9" fill="#16a34a" fontWeight="bold">レジスト</text>
              <line x1="35" y1="29" x2="42" y2="29" stroke="#16a34a" strokeWidth="1"/>
              <text x="230" y="32" textAnchor="middle" fontSize="8" fill="#166534">ソルダーレジスト（緑色のコーティング・はんだが付かない部分）</text>

              {/* Copper top */}
              <rect x="40" y="36" width="420" height="10" rx="0" fill="#f97316" stroke="#c2410c" strokeWidth="0.5" opacity="0.9"/>
              {/* Copper pads - openings in mask */}
              <rect x="100" y="22" width="40" height="24" rx="1" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
              <rect x="240" y="22" width="40" height="24" rx="1" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
              <rect x="380" y="22" width="40" height="24" rx="1" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
              <text x="15" y="45" fontSize="9" fill="#c2410c" fontWeight="bold">銅箔(Top)</text>
              <line x1="35" y1="41" x2="42" y2="41" stroke="#c2410c" strokeWidth="1"/>
              <text x="230" y="44" textAnchor="middle" fontSize="8" fill="#7c2d12">銅箔層（信号・電源の配線・35〜70μm厚）</text>

              {/* FR-4 core */}
              <rect x="40" y="46" width="420" height="100" rx="0" fill="#fef3c7" stroke="#92400e" strokeWidth="1"/>
              <text x="15" y="100" fontSize="9" fill="#92400e" fontWeight="bold">FR-4</text>
              <line x1="35" y1="96" x2="42" y2="96" stroke="#92400e" strokeWidth="1"/>
              {/* FR-4 fiber texture */}
              {[55, 80, 105, 130, 155, 180, 205, 230, 255, 280, 305, 330, 355, 380, 405, 430, 455].map((x, i) => (
                <line key={`v${i}`} x1={x} y1="46" x2={x} y2="146" stroke="#d97706" strokeWidth="0.5" opacity="0.3"/>
              ))}
              {[55, 70, 85, 100, 115, 130].map((y, i) => (
                <line key={`h${i}`} x1="40" y1={y} x2="460" y2={y} stroke="#d97706" strokeWidth="0.5" opacity="0.3"/>
              ))}
              <text x="250" y="100" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">FR-4 ガラスエポキシ基材</text>
              <text x="250" y="115" textAnchor="middle" fontSize="9" fill="#a16207">（ガラス繊維+エポキシ樹脂、絶縁体、標準厚1.6mm）</text>

              {/* Via */}
              <circle cx="310" cy="96" r="8" fill="#f97316" stroke="#c2410c" strokeWidth="1.5"/>
              <circle cx="310" cy="96" r="4" fill="#fef3c7"/>
              <text x="325" y="82" fontSize="9" fill="#c2410c">ビア</text>
              <line x1="322" y1="85" x2="316" y2="90" stroke="#c2410c" strokeWidth="1"/>
              <text x="325" y="93" fontSize="8" fill="#7c2d12">層間接続穴</text>

              {/* Copper bottom */}
              <rect x="40" y="146" width="420" height="10" rx="0" fill="#f97316" stroke="#c2410c" strokeWidth="0.5" opacity="0.9"/>
              <text x="15" y="157" fontSize="9" fill="#c2410c" fontWeight="bold">銅箔(Bot)</text>
              <line x1="35" y1="151" x2="42" y2="151" stroke="#c2410c" strokeWidth="1"/>

              {/* Solder mask bottom */}
              <rect x="40" y="156" width="420" height="14" rx="1" fill="#86efac" stroke="#16a34a" strokeWidth="1" opacity="0.8"/>
              {/* Bottom pads */}
              <rect x="150" y="146" width="40" height="24" rx="1" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
              <rect x="300" y="146" width="40" height="24" rx="1" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
              <text x="230" y="167" textAnchor="middle" fontSize="8" fill="#166534">ソルダーレジスト（裏面）</text>

              {/* Labels on right */}
              <text x="470" y="75" fontSize="8" fill="#6b7280">↑ Top面</text>
              <text x="470" y="100" fontSize="8" fill="#6b7280">   内層</text>
              <text x="470" y="135" fontSize="8" fill="#6b7280">↓ Bot面</text>

              {/* Thickness annotation */}
              <line x1="480" y1="36" x2="480" y2="156" stroke="#6b7280" strokeWidth="1"/>
              <line x1="475" y1="36" x2="485" y2="36" stroke="#6b7280" strokeWidth="1"/>
              <line x1="475" y1="156" x2="485" y2="156" stroke="#6b7280" strokeWidth="1"/>
              <text x="490" y="100" fontSize="8" fill="#6b7280" transform="rotate(90,490,100)">1.6mm</text>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { name: 'シルク', color: 'bg-yellow-100 border-yellow-300', desc: '部品名・極性マーク・基板名の印刷層。実装時の目印。' },
            { name: 'レジスト', color: 'bg-green-100 border-green-300', desc: '銅箔を保護するコーティング。ランド部分は開口されはんだが付く。' },
            { name: '銅箔層', color: 'bg-orange-100 border-orange-300', desc: '電気信号を流す導体。Top/Bottom（と内層）に存在。' },
            { name: 'FR-4', color: 'bg-amber-100 border-amber-300', desc: 'ガラス繊維+エポキシの絶縁基材。標準厚1.6mm。' },
          ].map((item, i) => (
            <div key={i} className={`${item.color} border rounded-lg p-2`}>
              <p className="font-bold text-gray-900 text-xs mb-1">{item.name}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Pads, vias, footprints */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">2</span>
          ランド・パッド・ビア・フットプリント
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">SMDパッド（表面実装）</h3>
            <div className="flex justify-center">
              <svg viewBox="0 0 160 120" className="w-40 h-28">
                {/* PCB surface */}
                <rect x="10" y="40" width="140" height="60" rx="3" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5"/>
                {/* Solder mask (green) */}
                <rect x="10" y="30" width="140" height="70" rx="2" fill="#86efac" stroke="#16a34a" strokeWidth="1" opacity="0.5"/>
                {/* Pads (openings) */}
                <rect x="25" y="50" width="35" height="25" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="2"/>
                <rect x="100" y="50" width="35" height="25" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="2"/>
                {/* Trace between pads */}
                <rect x="60" y="58" width="40" height="9" fill="#f97316" opacity="0.7"/>
                {/* Component body */}
                <rect x="55" y="48" width="50" height="29" rx="3" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
                <text x="80" y="66" textAnchor="middle" fontSize="9" fill="white">0402</text>
                {/* Labels */}
                <text x="43" y="90" textAnchor="middle" fontSize="8" fill="#b45309">パッド</text>
                <text x="80" y="110" textAnchor="middle" fontSize="8" fill="#374151">フットプリント</text>
                <line x1="80" y1="78" x2="80" y2="104" stroke="#374151" strokeWidth="1" strokeDasharray="3,2"/>
              </svg>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">ビア（層間接続）</h3>
            <div className="flex justify-center">
              <svg viewBox="0 0 160 130" className="w-40 h-28">
                {/* Top copper */}
                <rect x="10" y="15" width="140" height="12" fill="#f97316" opacity="0.8"/>
                {/* FR-4 */}
                <rect x="10" y="27" width="140" height="60" fill="#fef3c7" stroke="#92400e" strokeWidth="1"/>
                {/* Bottom copper */}
                <rect x="10" y="87" width="140" height="12" fill="#f97316" opacity="0.8"/>
                {/* Via hole */}
                <rect x="70" y="15" width="20" height="84" fill="#9ca3af" stroke="#6b7280" strokeWidth="1.5"/>
                {/* Via annular ring top */}
                <rect x="60" y="10" width="40" height="18" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="2"/>
                {/* Via annular ring bottom */}
                <rect x="60" y="84" width="40" height="18" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="2"/>
                {/* Via barrel */}
                <rect x="73" y="18" width="14" height="78" fill="#c0c0c0"/>
                {/* Labels */}
                <text x="35" y="23" fontSize="8" fill="#374151">Top銅</text>
                <text x="35" y="60" fontSize="8" fill="#92400e">FR-4</text>
                <text x="35" y="98" fontSize="8" fill="#374151">Bot銅</text>
                <text x="115" y="62" fontSize="8" fill="#6b7280">穴径</text>
                <text x="115" y="72" fontSize="8" fill="#6b7280">0.2mm</text>
                <text x="80" y="118" textAnchor="middle" fontSize="8" fill="#374151">スルーホールビア</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>フットプリント</strong> = 基板上の部品の「足跡」。パッド位置・サイズ・コートヤード・シルクを含む。EDAのライブラリから選ぶ、または部品のデータシートから自作する。<br/>
          <strong>ビアの種類:</strong> スルーホールビア（全層貫通）、ブラインドビア（表層〜内層）、バリードビア（内層間のみ、高コスト）
        </div>
      </section>

      {/* Section 3: Trace width */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">3</span>
          配線の線幅と電流容量
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 400 100" className="w-full max-w-md">
              {/* Three traces with different widths */}
              {[
                { y: 20, w: 4, current: '0.5A', label: '0.1mm (細)' },
                { y: 50, w: 12, current: '2A', label: '0.3mm (標準信号)' },
                { y: 80, w: 24, current: '5A+', label: '0.6mm (電源)' },
              ].map((t, i) => (
                <g key={i}>
                  <rect x="30" y={t.y - t.w/2} width="200" height={t.w} rx={t.w/4} fill="#f97316" stroke="#c2410c" strokeWidth="0.5"/>
                  <text x="240" y={t.y + 4} fontSize="9" fill="#374151">{t.label}</text>
                  <text x="360" y={t.y + 4} fontSize="9" fill="#ef4444">≈{t.current}</text>
                </g>
              ))}
              <text x="30" y="10" fontSize="9" fill="#6b7280">配線幅</text>
              <text x="355" y="10" fontSize="9" fill="#6b7280">電流容量</text>
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { width: '0.1mm', usage: '最小幅（製造限界付近）', current: '≈0.5A', color: 'bg-red-50 border-red-200' },
              { width: '0.2mm', usage: '信号線（一般）', current: '≈1A', color: 'bg-yellow-50 border-yellow-200' },
              { width: '0.5mm〜', usage: '電源・GND配線', current: '≈3A+', color: 'bg-green-50 border-green-200' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} border rounded-lg p-2 text-center`}>
                <p className="font-bold text-sm text-gray-900">{item.width}</p>
                <p className="text-xs text-gray-600 mt-0.5">{item.usage}</p>
                <p className="text-xs font-medium text-gray-800 mt-1">{item.current}</p>
              </div>
            ))}
          </div>
        </div>

        <Callout type="warning" title="電源配線は必ず太く">
          1A以上流す電源ラインは最低0.5mm以上を確保。配線が細いと抵抗増加・発熱・最悪断線。IPC-2221規格またはトレース幅計算ツールで確認すること。
        </Callout>
      </section>

      {/* Section 4: Clearance */}
      <section className="mb-10 not-prose">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">4</span>
          クリアランスと沿面距離
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex justify-center">
            <svg viewBox="0 0 300 100" className="w-72 h-24">
              {/* Two traces */}
              <rect x="20" y="40" width="80" height="20" rx="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
              <rect x="180" y="40" width="80" height="20" rx="3" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5"/>
              {/* Clearance arrow */}
              <line x1="100" y1="50" x2="180" y2="50" stroke="#374151" strokeWidth="1.5"/>
              <polygon points="98,47 103,50 98,53" fill="#374151"/>
              <polygon points="182,47 177,50 182,53" fill="#374151"/>
              <text x="140" y="44" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">クリアランス</text>
              <text x="140" y="66" textAnchor="middle" fontSize="9" fill="#6b7280">配線間距離（最小0.1〜0.2mm）</text>
              <text x="60" y="35" textAnchor="middle" fontSize="8" fill="#1d4ed8">NET A</text>
              <text x="220" y="35" textAnchor="middle" fontSize="8" fill="#b91c1c">NET B</text>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="font-bold text-sm text-blue-900 mb-1">クリアランス（空間距離）</p>
            <p className="text-xs text-blue-700">異なるネット間の最小距離。基板製造業者の最小クリアランス（通常0.1〜0.2mm）以上確保する。DRCで自動検査。</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="font-bold text-sm text-green-900 mb-1">沿面距離（クリープ距離）</p>
            <p className="text-xs text-green-700">表面を這う絶縁距離。高電圧回路では特に重要。AC100Vでは最低3mm以上（安全規格による）。</p>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="mb-8 not-prose">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">確かめよう</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-amber-700">
            <li>2層基板で「Top面の配線」と「Bottom面の配線」をつなぐには何が必要か？</li>
            <li>5V電源で2A流す配線の最小線幅を調べてみよう（IPC-2221またはオンライン計算ツールを使う）</li>
            <li>製造業者の仕様表で「最小配線幅」と「最小ビア径」を調べてみよう</li>
          </ol>
        </div>
      </section>

      <div className="not-prose flex gap-3 flex-wrap">
        <Link href="/pcb/03-circuits" className="text-sm text-gray-500 hover:text-gray-700">← 03 回路を読む・設計する</Link>
        <Link href="/pcb/05-eda-tools" className="text-sm text-blue-600 hover:text-blue-800 ml-auto">05 EDAツールで作る →</Link>
      </div>
    </article>
  )
}
