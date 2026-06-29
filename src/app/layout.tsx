import type { Metadata } from 'next'
import './globals.css'
import LayoutClient from '@/components/LayoutClient'

export const metadata: Metadata = {
  title: 'EMC 電磁両立性 学習サイト',
  description: 'ハードウェアエンジニアのためのEMC学習サイト',
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
