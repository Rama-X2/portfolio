'use client'

import { motion } from 'framer-motion'
import { User, Folder, Award, Mail } from 'lucide-react'

interface QuickNavCardsProps {
  t: any
  navClick: (id: string) => void
}

export default function QuickNavCards({ t, navClick }: QuickNavCardsProps) {
  const cards = [
    { id: 'about', icon: User, label: t.quickCards.about.label, sub: t.quickCards.about.sub, color: '#6366f1' },
    { id: 'projects', icon: Folder, label: t.quickCards.projects.label, sub: t.quickCards.projects.sub, color: '#10b981' },
    { id: 'achievements', icon: Award, label: t.quickCards.achievements.label, sub: t.quickCards.achievements.sub, color: '#f59e0b' },
    { id: 'contact', icon: Mail, label: t.quickCards.contact.label, sub: t.quickCards.contact.sub, color: '#ec4899' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {cards.map((item, i) => (
        <motion.button
          key={item.id}
          onClick={() => navClick(item.id)}
          className="glass-card rounded-xl p-4 md:p-5 text-left hover:shadow-glow transition-all duration-300 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="p-2 rounded-lg w-fit mb-3" style={{ backgroundColor: `${item.color}25` }}>
            <item.icon className="w-5 h-5" style={{ color: item.color }} />
          </div>
          <p className="font-semibold text-white text-sm md:text-base">{item.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
        </motion.button>
      ))}
    </div>
  )
}
