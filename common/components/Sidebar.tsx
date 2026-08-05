'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle } from 'lucide-react'
import { SectionNav } from '../types'

interface SidebarProps {
  sections: SectionNav[]
  activeSection: string
  navClick: (id: string) => void
  contactText: string
  quickMsgText: string
}

export default function Sidebar({
  sections,
  activeSection,
  navClick,
  contactText,
  quickMsgText,
}: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-60 p-5 m-4 mr-0 rounded-2xl sidebar-glass flex-shrink-0 sticky top-[88px] h-[calc(100vh-104px)] self-start overflow-y-auto custom-scrollbar">
      <div className="space-y-1">
        {sections.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => navClick(s.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeSection === s.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ x: 4 }}
          >
            <s.icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{s.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Contact quick card */}
      <div className="mt-4 p-4 rounded-xl glass-card">
        <h3 className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">{contactText}</h3>
        <div className="space-y-2">
          <button
            onClick={() => navClick('contact')}
            className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors w-full text-left"
          >
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span className="truncate">{quickMsgText}</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
