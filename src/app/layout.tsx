export const metadata = {
  title: 'MockMate - AI Interview Prep',
  description: 'Master your next technical interview',
}
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { ConvexClientProvider } from "@/providers/ConvexProvider"
import "./globals.css" 

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}