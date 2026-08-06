'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, Calendar, Sun, ChevronRight, X } from 'lucide-react'

interface AnimeClockWidgetProps {
  avatarFallback: string
  onOpenModal?: () => void
}

export default function AnimeClockWidget({
  avatarFallback,
  onOpenModal,
}: AnimeClockWidgetProps) {
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
      onClick={onOpenModal}
      className="bg-gradient-to-br from-[#1b1e39] via-[#14162d] to-[#0f1124] rounded-2xl p-4 sm:p-4.5 border border-white/10 hover:border-pink-500/50 hover:shadow-[0_8px_30px_rgba(236,72,153,0.25)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      <div>
        {/* Header Row (Profile + Timezone Badge - Zero Black Lines) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src="https://github.com/Rama-X2.png"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', avatarFallback)
                }}
                alt="Local Time Avatar"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-pink-400/80 shadow-md ring-2 ring-pink-500/30 relative z-10"
              />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full animate-ping z-20" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-white text-xs sm:text-sm leading-tight truncate">
                Sukabumi Time
              </h4>
              <p className="text-[11px] text-pink-300/80 font-mono truncate mt-0.5">Indonesia WIB (UTC+7)</p>
            </div>
          </div>

          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border border-pink-500/40 bg-pink-500/20 text-pink-300 flex-shrink-0">
            UTC+7 ✦
          </span>
        </div>

        {/* Compact Activity Card */}
        <div className="bg-[#121429]/95 p-3 rounded-xl border border-white/10 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5 truncate">
              <Clock className="w-3.5 h-3.5 text-pink-400" /> REAL-TIME TICKER
            </span>
            <span className="text-[9px] text-pink-300 font-mono font-semibold flex items-center gap-0.5 group-hover:text-pink-200 transition-colors flex-shrink-0 ml-1">
              Detail ✦
            </span>
          </div>
          <p className="text-xs font-extrabold text-white font-mono tracking-wider truncate">
            {liveTime || '01:02:00 WIB'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* Full Local Time Modal Component (Arknights GFX Vermilion Style - Zero Black Lines) */
export function AnimeClockModalContent({
  onClose,
}: {
  onClose: () => void
}) {
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-gradient-to-b from-[#1c1d3b] via-[#14162e] to-[#0f1124] rounded-3xl p-5 sm:p-8 border border-pink-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative overflow-hidden max-h-[82vh] overflow-y-auto space-y-5"
    >
      {/* Kotak Edge Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl transition-all shadow-md"
        title="Tutup"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Profile Section (Zero Black Banner Strips) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <img
              src="https://github.com/Rama-X2.png"
              alt="Local Time Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-pink-400/80 shadow-2xl relative z-10"
            />
            <span className="absolute top-0 right-0 w-4 h-4 bg-pink-400 rounded-full animate-ping z-20" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest">// CHRONO LOCAL TIME SYSTEM</div>
            <h3 className="font-extrabold text-white text-lg sm:text-2xl mt-0.5">
              Sukabumi Local Time
            </h3>
            <p className="text-xs sm:text-sm text-pink-300 font-medium font-mono mt-0.5">Indonesia Western Standard Time (WIB)</p>
          </div>
        </div>
      </div>

      {/* Dynamic Animated Big Digital Clock Display */}
      <div className="bg-gradient-to-r from-pink-950/80 via-purple-950/80 to-indigo-950/80 p-6 rounded-3xl border border-pink-500/40 text-center space-y-2 relative overflow-hidden shadow-lg group">
        <div className="text-[10px] sm:text-xs font-mono font-bold text-pink-300 uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" /> // WAKTU INDONESIA BARAT (WIB)
        </div>
        <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-widest drop-shadow-[0_0_25px_rgba(244,114,182,0.6)]">
          {liveTime || '01:02:00 WIB'}
        </div>
        <div className="text-xs sm:text-sm text-pink-200 font-mono font-medium flex items-center justify-center gap-2 pt-1">
          <Calendar className="w-4 h-4 text-pink-400" />
          <span>{liveDate || 'Jumat, 7 Agustus 2026'}</span>
        </div>
      </div>

      {/* Location & Timezone Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-[#121429]/90 p-4 rounded-2xl border border-pink-500/30 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-pink-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase">// LOKASI DEVELOPER</div>
            <div className="text-xs sm:text-sm font-bold text-white">Sukabumi, Jawa Barat</div>
          </div>
        </div>

        <div className="bg-[#121429]/90 p-4 rounded-2xl border border-pink-500/30 flex items-center gap-3">
          <Sun className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase">// ZONA WAKTU OFFSET</div>
            <div className="text-xs sm:text-sm font-bold text-white">UTC+07:00 (WIB)</div>
          </div>
        </div>

        <div className="bg-[#121429]/90 p-4 rounded-2xl border border-pink-500/30 flex items-center gap-3">
          <Clock className="w-6 h-6 text-purple-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase">// STATUS OPERASIONAL</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400">Aktif & Online</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
