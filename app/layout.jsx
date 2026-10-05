import { Geist, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'SpeedTrack',
    template: '%s — SpeedTrack',
  },
  description: 'La télémétrie F1 simplifiée — pilotes, écuries, circuits, saisons et règlements.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`dark ${geistSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-white antialiased flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
