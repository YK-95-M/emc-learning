'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavItem {
  href: string
  label: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  { href: '/', label: 'トップ' },
  {
    href: '/pcb',
    label: 'PCB設計 学習トップ',
    children: [
      { href: '/pcb/00-intro', label: '00 基板ができるまで' },
      {
        href: '/pcb/01-basics',
        label: '01 電気の基礎',
        children: [
          { href: '/pcb/01-basics/voltage-current', label: '電圧・電流・抵抗' },
          { href: '/pcb/01-basics/ohms-law', label: 'オームの法則・電力' },
          { href: '/pcb/01-basics/series-parallel', label: '直列・並列・KVL/KCL' },
        ]
      },
      {
        href: '/pcb/02-components',
        label: '02 電子部品図鑑',
        children: [
          { href: '/pcb/02-components/resistor', label: '抵抗' },
          { href: '/pcb/02-components/capacitor', label: 'コンデンサ' },
          { href: '/pcb/02-components/inductor', label: 'インダクタ' },
          { href: '/pcb/02-components/diode', label: 'ダイオード・LED' },
          { href: '/pcb/02-components/transistor', label: 'トランジスタ・FET' },
          { href: '/pcb/02-components/ic', label: 'IC・オペアンプ' },
          { href: '/pcb/02-components/datasheet', label: 'データシートの読み方' },
        ]
      },
      { href: '/pcb/03-circuits', label: '03 回路を読む・設計する' },
      { href: '/pcb/04-board-structure', label: '04 基板のしくみ' },
      { href: '/pcb/05-eda-tools', label: '05 EDAツールで作る' },
      { href: '/pcb/06-layout', label: '06 レイアウト設計の実務' },
      { href: '/pcb/07-manufacturing', label: '07 製造と実装' },
      { href: '/pcb/08-verification', label: '08 検証と総合演習' },
      { href: '/pcb/glossary', label: '用語集' },
    ]
  },
  {
    href: '/emc',
    label: 'EMC 学習トップ',
    children: [
      {
        href: '/emc/01-basics',
        label: '01 基礎編',
      },
      {
        href: '/emc/02-emission',
        label: '02 エミッション試験編',
        children: [
          { href: '/emc/02-emission/conducted', label: '雑音端子電圧' },
          { href: '/emc/02-emission/radiated', label: '放射エミッション' },
        ],
      },
      {
        href: '/emc/03-immunity',
        label: '03 イミュニティ試験編',
        children: [
          { href: '/emc/03-immunity/esd', label: 'ESD' },
          { href: '/emc/03-immunity/eft', label: 'EFT/バースト' },
          { href: '/emc/03-immunity/surge', label: 'サージ' },
        ],
      },
      { href: '/emc/04-countermeasures', label: '04 対策編' },
      { href: '/emc/05-pcb-design', label: '05 基板設計編' },
      { href: '/emc/glossary', label: '用語集' },
    ],
  },
]

interface NavSidebarProps {
  currentPath: string
}

function NavItemComponent({
  item,
  currentPath,
  depth,
}: {
  item: NavItem
  currentPath: string
  depth: number
}) {
  const isActive = currentPath === item.href
  const hasChildren = item.children && item.children.length > 0
  const isParentOfActive =
    hasChildren && item.children!.some((c) => currentPath.startsWith(c.href))
  const [open, setOpen] = useState(isParentOfActive || depth === 0)

  return (
    <li>
      <div className="flex items-center">
        <Link
          href={item.href}
          className={`flex-1 block px-3 py-1.5 rounded text-sm transition-colors ${
            isActive
              ? 'bg-emc-primary text-white font-semibold'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          } ${depth > 0 ? 'ml-' + depth * 3 : ''}`}
          style={{ marginLeft: depth * 12 }}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-gray-400 hover:text-white"
            aria-label="toggle"
          >
            <svg
              className={`w-3 h-3 transition-transform ${open ? 'rotate-90' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && open && (
        <ul className="mt-0.5 space-y-0.5">
          {item.children!.map((child) => (
            <NavItemComponent
              key={child.href}
              item={child}
              currentPath={currentPath}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function NavSidebar({ currentPath }: NavSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <nav className="p-4">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          学習サイト
        </span>
      </div>
      <ul className="space-y-1">
        {navItems.map((item) => (
          <NavItemComponent
            key={item.href}
            item={item}
            currentPath={currentPath}
            depth={0}
          />
        ))}
      </ul>
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-gray-900 px-4 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">学習サイト</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-300 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-10 bg-black bg-opacity-50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-20 w-64 h-full bg-gray-900 overflow-y-auto transform transition-transform pt-12 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-gray-900 min-h-screen overflow-y-auto">
        {sidebarContent}
      </aside>
    </>
  )
}
