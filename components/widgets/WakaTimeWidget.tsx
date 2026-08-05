'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface WakaTimeWidgetProps {
  avatarFallback: string
  timeText?: string
  languages?: string
}

export default function WakaTimeWidget({
  timeText = '39 hrs 34 mins',
  languages = 'TypeScript, PHP & Linux C++',
}: WakaTimeWidgetProps) {
  return (
    <motion.a
      href="https://wakatime.com"
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
      whileHover={{ y: -3 }}
    >
      {/* Top Banner / Cover */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-amber-900/60 via-orange-900/60 to-yellow-900/60 border-b border-white/10" />

      <div className="relative z-10 pt-2">
        <div className="flex items-center justify-between mb-2">
          <img
            src="https://github.com/Rama-X2.png"
            alt="GitHub Avatar for WakaTime Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-amber-400/80 shadow-lg"
          />
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-500/35 bg-amber-500/15 text-amber-300">
            {timeText}
          </span>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1 line-clamp-1">
          <span>@Rama-X2 • WakaTime</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400 flex-shrink-0" />
        </h4>
        <p className="text-[10px] text-amber-300 font-medium font-mono">Coding Time Tracker</p>
      </div>

      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2 rounded-xl border border-white/5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider">Top Languages</span>
          <span className="text-[9px] text-amber-400 font-mono font-semibold">Active Log</span>
        </div>
        <p className="text-[11px] font-bold text-white line-clamp-1">
          {languages}
        </p>
        <p className="text-[10px] text-gray-300 line-clamp-1 font-medium">
          VS Code All-Time Active Log
        </p>
      </div>
    </motion.a>
  )
}
