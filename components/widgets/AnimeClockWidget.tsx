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
      className="glass-card rounded-2xl p-3.5 sm:p-4 md:p-4.5 text-left border border-white/10 hover:border-pink-500/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.44 }}
      whileHover={{ y: -3 }}
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="relative">
            <img
              src="https://raw.githubusercontent.com/Rama-X2/portfolio/main/public/gambar-proyek/anime-avatar.png"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
              alt="Anime Mascot"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-pink-500/40 shadow-md ring-2 ring-pink-500/30"
            />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-400 rounded-full animate-ping" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-500/35 bg-pink-500/15 text-pink-300">
            Sukabumi UTC+7
          </span>
        </div>
        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug line-clamp-1">
          Anime Vibe Clock
        </h4>
      </div>
      <div className="mt-2.5 pt-2 border-t border-white/10">
        <div className="text-[10px] font-bold text-pink-300 uppercase tracking-wider mb-0.5">Live Local Time</div>
        <p className="text-xs sm:text-sm font-extrabold text-white font-mono tracking-wider">
          {liveTime || '03:18:14 WIB'}
        </p>
        <p className="text-[10px] text-gray-400 line-clamp-1">
          West Java, Indonesia (WIB)
        </p>
      </div>
    </motion.div>
  )
}
