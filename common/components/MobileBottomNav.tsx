'use client'

import { motion } from 'framer-motion'
import { SectionNav } from '../types'

interface MobileBottomNavProps {
  sections: SectionNav[]
  activeSection: string
  navClick: (id: string) => void
}

export default function MobileBottomNav({
  sections,
  activeSection,
  navClick,
}: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 mobile-bottom-nav md:hidden flex justify-around items-center px-2 py-2">
      {sections.map((s) => {
        const isActive = activeSection === s.id
        return (
          <button
            key={s.id}
            onClick={() => navClick(s.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-200 font-normal'
            }`}
          >
            <s.icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110' : ''}`} />
            <span className="text-[10px]">{s.name}</span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="w-1.5 h-1.5 rounded-full bg-primary absolute -bottom-0.5"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
