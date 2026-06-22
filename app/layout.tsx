import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio - Ade Ramadhani Putra',
  description: 'Full Stack Developer & UI/UX Designer | Portfolio of Ade Ramadhani Putra',
  keywords: ['portfolio', 'developer', 'full stack', 'UI/UX', 'Rama', 'Next.js'],
  authors: [{ name: 'Ade Ramadhani Putra' }],
  openGraph: {
    title: 'Portfolio - Ade Ramadhani Putra',
    description: 'Full Stack Developer & UI/UX Designer',
    url: 'https://rama.server.my.id',
    siteName: 'Rama Portfolio',
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
      <body>{children}</body>
    </html>
  )
}
