import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Rama-X2',
  description:
    'Full Stack Developer & UI/UX Designer | Portfolio profesional Ade Ramadhani Putra. Spesialis web development, server management, dan optimasi sistem.',
  keywords: ['portfolio', 'full stack developer', 'UI/UX designer', 'Rama', 'Next.js', 'web developer sukabumi'],
  authors: [{ name: 'Ade Ramadhani Putra' }],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Rama-X2',
    description: 'Full Stack Developer & UI/UX Designer',
    url: 'https://rama.server.my.id',
    siteName: 'Ade Ramadhani Portfolio',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0c0a1e" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
