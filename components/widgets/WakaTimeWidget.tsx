'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface WakaTimeWidgetProps {
  avatarFallback: string
  timeText?: string
  languages?: string
}

export default function WakaTimeWidget({
  avatarFallback,
  timeText = '39 hrs 34 mins',
  languages = 'TypeScript, PHP & Linux C++',
}: WakaTimeWidgetProps) {
  return (
    <motion.a
      href="https://wakatime.com"
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card rounded-2xl p-3.5 sm:p-4 md:p-4.5 text-left border border-white/10 hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
      whileHover={{ y: -3 }}
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <img
            src={avatarFallback}
            alt="WakaTime Avatar"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-amber-500/40 shadow-md"
          />
          <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/35 bg-amber-500/15 text-amber-300">
            {timeText}
          </span>
        </div>
        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug flex items-center gap-1 line-clamp-1">
          <span>WakaTime Profile</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400 flex-shrink-0" />
        </h4>
      </div>
      <div className="mt-2.5 pt-2 border-t border-white/10">
        <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">Coding Tracker</div>
        <p className="text-[11px] sm:text-xs text-gray-200 font-medium line-clamp-1">
          {languages}
        </p>
        <p className="text-[10px] text-gray-400 line-clamp-1">
          All-Time Active Time Log
        </p>
      </div>
    </motion.a>
  )
}
