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
      className="bg-[#0c0d1a] rounded-2xl p-4 text-left border border-pink-500/20 hover:border-pink-500/60 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      <div className="relative z-10">
        {/* Lappland Decadenza HUD Header */}
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://github.com/Rama-X2.png"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', avatarFallback)
                }}
                alt="Local Time Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-pink-500/70 shadow-md ring-2 ring-pink-500/30"
              />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full animate-ping" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1.5 line-clamp-1">
                <span>Sukabumi Time</span>
              </h4>
              <p className="text-[10px] text-pink-300 font-mono">Indonesia WIB (UTC+7)</p>
            </div>
          </div>

          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-pink-500/50 bg-pink-950/70 text-pink-300 tracking-wider">
            UTC+7 ✦
          </span>
        </div>

        {/* Compact Activity Card */}
        <div className="bg-black/50 p-2.5 rounded-xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-pink-400" /> REAL-TIME TICKER
            </span>
            <span className="text-[9px] text-gray-400 font-mono font-semibold flex items-center gap-0.5 group-hover:text-pink-400 transition-colors">
              Detail ✦
            </span>
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-white font-mono tracking-wider">
            {liveTime || '18:55:00 WIB'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* Full Local Time Modal Component (Lappland Decadenza Cyber HUD Style) */
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
      className="bg-[#0b0c18] rounded-3xl p-5 sm:p-6 md:p-8 max-w-3xl w-full text-left border border-pink-500/40 shadow-[0_0_50px_rgba(236,72,153,0.25)] relative overflow-hidden space-y-5 max-h-[82vh] overflow-y-auto"
    >
      {/* Sticky Close Button */}
      <button
        onClick={onClose}
        className="sticky top-2 float-right z-50 p-2.5 rounded-full bg-black/80 border border-white/20 text-gray-200 hover:text-white hover:bg-black transition-all shadow-lg"
        title="Tutup"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Section */}
      <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 clear-right">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://github.com/Rama-X2.png"
              alt="Local Time Avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-pink-500/80 shadow-2xl relative z-10"
            />
            <span className="absolute top-0 right-0 w-4 h-4 bg-pink-400 rounded-full animate-ping z-20" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest">// CHRONO LOCAL TIME SYSTEM</div>
            <h3 className="font-extrabold text-white text-base sm:text-xl md:text-2xl">
              Sukabumi Local Time
            </h3>
            <p className="text-xs sm:text-sm text-pink-300 font-medium font-mono">Indonesia Western Standard Time (WIB)</p>
          </div>
        </div>
      </div>

      {/* Big Digital Clock Display */}
      <div className="bg-black/60 p-6 rounded-3xl border border-pink-500/40 text-center space-y-2">
        <div className="text-[10px] sm:text-xs font-mono font-bold text-pink-300 uppercase tracking-widest">// WAKTU INDONESIA BARAT (WIB)</div>
        <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-widest drop-shadow-[0_0_25px_rgba(244,114,182,0.6)]">
          {liveTime || '18:55:00 WIB'}
        </div>
        <div className="text-xs sm:text-sm text-pink-200 font-mono font-medium flex items-center justify-center gap-2 pt-1">
          <Calendar className="w-4 h-4 text-pink-400" />
          <span>{liveDate || 'Kamis, 6 Agustus 2026'}</span>
        </div>
      </div>

      {/* Location & Timezone Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-black/40 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-pink-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase">// LOKASI DEVELOPER</div>
            <div className="text-xs sm:text-sm font-bold text-white">Sukabumi, Jawa Barat</div>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <Sun className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase">// ZONA WAKTU OFFSET</div>
            <div className="text-xs sm:text-sm font-bold text-white">UTC+07:00 (WIB)</div>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
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
