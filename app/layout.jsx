import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'SpeedTrack',
    template: '%s | SpeedTrack',
  },
  description:
    'La référence F1 — pilotes, écuries, circuits, saisons et règlements au même endroit.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
