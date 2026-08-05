'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { PersonalInfo, Language, SectionNav } from '../types'

interface HeaderProps {
  personal: PersonalInfo
  lang: Language
  handleLangChange: (newLang: Language) => void
  navClick: (id: string) => void
  activeSection: string
  sections: SectionNav[]
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export default function Header({
  personal,
  lang,
  handleLangChange,
  navClick,
  activeSection,
  sections,
  menuOpen,
  setMenuOpen,
}: HeaderProps) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 header-glass px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <motion.button
          className="flex items-center gap-2 md:gap-3"
          onClick={() => navClick('home')}
          whileHover={{ scale: 1.04 }}
        >
          <div className="avatar-ring w-9 h-9 md:w-10 md:h-10 flex-shrink-0">
            <Image
              src={personal.avatar}
              alt={personal.name}
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-left hidden xs:block">
            <p className="text-sm font-bold leading-tight gradient-text">{personal.name}</p>
            <p className="text-[10px] text-gray-400 leading-tight">{personal.title}</p>
          </div>
        </motion.button>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Language Switcher Pill (Desktop) */}
            <div className="flex items-center p-0.5 bg-white/5 border border-white/10 rounded-xl mr-2">
              <button
                onClick={() => handleLangChange('id')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'id'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                onClick={() => handleLangChange('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => navClick(s.id)}
                className={`nav-btn ${activeSection === s.id ? 'nav-btn-active' : ''}`}
              >
                <s.icon className="w-4 h-4" />
                <span>{s.name}</span>
              </button>
            ))}
          </nav>

          {/* Language Switcher Pill (Mobile) */}
          <div className="flex md:hidden items-center p-0.5 bg-white/5 border border-white/10 rounded-xl">
            <button
              onClick={() => handleLangChange('id')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                lang === 'id'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => handleLangChange('en')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                lang === 'en'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-current" />
                <div className="w-6 h-0.5 bg-current" />
                <div className="w-6 h-0.5 bg-current" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile dropdown nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="fixed top-[62px] right-4 w-44 md:hidden z-30 p-1.5 rounded-xl glass-card shadow-glow bg-[#0c0a1e]/95 origin-top-right"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => navClick(s.id)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg mb-0.5 transition-all text-xs ${
                  activeSection === s.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <s.icon className="w-4 h-4" />
                <span className="font-medium">{s.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
