import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio – Ade Ramadhani Putra',
  description:
    'Full Stack Developer & UI/UX Designer | Portfolio profesional Ade Ramadhani Putra. Spesialis web development, server management, dan optimasi sistem.',
  keywords: ['portfolio', 'full stack developer', 'UI/UX designer', 'Rama', 'Next.js', 'web developer sukabumi'],
  authors: [{ name: 'Ade Ramadhani Putra' }],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Portfolio – Ade Ramadhani Putra',
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0c0a1e" />
      </head>
      <body>{children}</body>
    </html>
  )
}
