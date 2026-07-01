import type { Metadata } from 'next'
import './globals.css'
import LayoutClient from '@/components/LayoutClient'

export const metadata: Metadata = {
  title: 'PCB設計 学習サイト',
  description: '電気の初心者が自力で基板を設計できるようになる「見て・触って・作る」学習サイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
