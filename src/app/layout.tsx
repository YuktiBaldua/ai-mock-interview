import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexProvider } from '@/providers/ConvexProvider'
import { ArcjetProvider } from '@/providers/ArcjetProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Mock Interview Platform',
  description: 'Practice interviews with AI-powered streaming avatars',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConvexProvider>
            <ArcjetProvider>
              {children}
            </ArcjetProvider>
          </ConvexProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
