'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimeClockWidgetProps {
  avatarFallback: string
}

export default function AnimeClockWidget({ avatarFallback }: AnimeClockWidgetProps) {
  const [liveTime, setLiveTime] = useState<string>('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta',
      })
      setLiveTime(timeStr)
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-pink-500/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.44 }}
      whileHover={{ y: -3 }}
    >
      {/* Top Anime Banner / Cover (Lappland Arknights Cyber Cover) */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-pink-900/70 via-purple-900/70 to-indigo-900/70 border-b border-white/10" />

      <div className="relative z-10 pt-2">
        <div className="flex items-center justify-between mb-2">
          <div className="relative">
            <img
              src="https://github.com/Rama-X2.png"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
              alt="Lappland Arknights Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-pink-400/80 shadow-lg ring-2 ring-pink-500/30"
            />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full animate-ping" />
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-pink-500/35 bg-pink-500/15 text-pink-300 font-mono">
            Sukabumi UTC+7
          </span>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm leading-snug line-clamp-1">
          Sukabumi Local Time
        </h4>
        <p className="text-[10px] text-pink-300 font-medium font-mono">Arknights Lappland Vibe</p>
      </div>

      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2 rounded-xl border border-white/5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-bold text-pink-300 uppercase tracking-wider">Live Time Ticker</span>
          <span className="text-[9px] text-pink-400 font-mono font-semibold">Real-Time</span>
        </div>
        <p className="text-xs sm:text-sm font-extrabold text-white font-mono tracking-wider">
          {liveTime || '03:30:00 WIB'}
        </p>
        <p className="text-[10px] text-gray-300 line-clamp-1 font-medium mt-0.5">
          West Java, Indonesia (WIB)
        </p>
      </div>
    </motion.div>
  )
}
