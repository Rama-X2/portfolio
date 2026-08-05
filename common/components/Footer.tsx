'use client'

import { Language } from '../types'

interface FooterProps {
  lang: Language
  name: string
}

export default function Footer({ lang, name }: FooterProps) {
  const yearRange = `2025 – ${new Date().getFullYear()}`
  return (
    <footer className="mt-12 py-6 text-center text-xs text-gray-500 border-t border-white/5">
      <p>
        Copyright © {yearRange} <span className="text-gray-300 font-semibold">{name} (Rama-X2)</span>. {lang === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi undang-undang.'}
      </p>
    </footer>
  )
}
