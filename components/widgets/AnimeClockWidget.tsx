'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Calendar, Sun, ChevronDown, X } from 'lucide-react'

interface AnimeClockWidgetProps {
  avatarFallback: string
  isExpanded?: boolean
  onToggle?: () => void
}

export default function AnimeClockWidget({
  avatarFallback,
  isExpanded = false,
  onToggle,
}: AnimeClockWidgetProps) {
  const [liveTime, setLiveTime] = useState<string>('')
  const [liveDate, setLiveDate] = useState<string>('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta',
      })
      const dateStr = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Jakarta',
      })
      setLiveTime(timeStr)
      setLiveDate(dateStr)
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-pink-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
        isExpanded ? 'col-span-2 lg:col-span-4 ring-2 ring-pink-500/50 bg-pink-950/40' : ''
      }`}
    >
      {/* Top Anime Banner / Cover (Lappland Arknights Cyber Cover) */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-pink-900/80 via-purple-900/80 to-indigo-900/80 border-b border-white/10" />

      <div className="relative z-10 pt-1">
        <div className="flex items-center justify-between mb-2">
          <div className="relative">
            <img
              src="https://github.com/Rama-X2.png"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
              alt="Lappland Arknights Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-pink-400/80 shadow-lg ring-2 ring-pink-500/30"
            />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full animate-ping" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-pink-500/35 bg-pink-500/15 text-pink-300 font-mono">
              Sukabumi UTC+7
            </span>
            {isExpanded && (
              <span className="p-1 bg-white/10 rounded-full text-gray-300 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug line-clamp-1">
          Sukabumi Local Time
        </h4>
        <p className="text-[10px] text-pink-300 font-medium font-mono">Arknights Lappland Cyber Vibe</p>
      </div>

      {/* COMPACT VIEW SUMMARY */}
      {!isExpanded && (
        <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-pink-400" /> Real-Time Ticker
            </span>
            <span className="text-[9px] text-pink-400 font-mono font-semibold flex items-center gap-0.5">
              Klik Tampilan Penuh <ChevronDown className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-white font-mono tracking-wider">
            {liveTime || '16:30:00 WIB'}
          </p>
        </div>
      )}

      {/* EXPANDED FULL VIEW TEMPLATE */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 mt-4 pt-3 border-t border-white/10 space-y-4"
          >
            {/* Big Digital Clock Display */}
            <div className="bg-black/40 p-4 rounded-2xl border border-pink-500/30 text-center space-y-1">
              <div className="text-[10px] font-bold text-pink-300 uppercase tracking-widest">Waktu Indonesia Barat (WIB)</div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-widest drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">
                {liveTime || '16:30:00 WIB'}
              </div>
              <div className="text-xs text-pink-200 font-medium flex items-center justify-center gap-1.5 pt-1">
                <Calendar className="w-3.5 h-3.5 text-pink-400" />
                <span>{liveDate || 'Kamis, 6 Agustus 2026'}</span>
              </div>
            </div>

            {/* Location & Timezone Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase">Lokasi Developer</div>
                  <div className="text-xs font-bold text-white">Sukabumi, Jawa Barat</div>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
                <Sun className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase">Zona Waktu Offset</div>
                  <div className="text-xs font-bold text-white">UTC+07:00 (WIB)</div>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase">Status Operasional</div>
                  <div className="text-xs font-bold text-emerald-400">Aktif & Online</div>
                </div>
              </div>
            </div>

            {/* Action Buttons inside Expanded View */}
            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (onToggle) onToggle()
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 font-semibold text-xs transition-all"
              >
                Tutup Tampilan Penuh
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
