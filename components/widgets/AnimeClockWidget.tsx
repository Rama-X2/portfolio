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
      className="bg-[#131527] rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-pink-500/40 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between shadow-lg"
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Top Banner / Cover */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-pink-900/60 via-purple-900/60 to-indigo-900/60 border-b border-white/10" />

      <div className="relative z-10 pt-1">
        <div className="flex items-center justify-between mb-2">
          <div className="relative">
            <img
              src="https://github.com/Rama-X2.png"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
              alt="Local Time Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-pink-400/80 shadow-md ring-2 ring-pink-500/30"
            />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full animate-ping" />
          </div>
          <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-pink-500/35 bg-pink-500/15 text-pink-300 font-mono">
            Sukabumi UTC+7
          </span>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug line-clamp-1">
          Sukabumi Local Time
        </h4>
        <p className="text-[10px] text-pink-300 font-medium font-mono">Indonesia Western Standard Time (WIB)</p>
      </div>

      {/* Compact Activity Card */}
      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-pink-400" /> Real-Time Ticker
          </span>
          <span className="text-[9px] text-pink-400 font-mono font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Detail <ChevronRight className="w-3 h-3" />
          </span>
        </div>
        <p className="text-xs sm:text-sm font-extrabold text-white font-mono tracking-wider">
          {liveTime || '18:45:00 WIB'}
        </p>
      </div>
    </motion.div>
  )
}

/* Full Local Time Modal Component */
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
      className="bg-[#0f101d] rounded-3xl p-4 sm:p-6 md:p-8 max-w-3xl w-full text-left border border-pink-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden space-y-4 sm:space-y-5 max-h-[82vh] overflow-y-auto"
    >
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-900 border-b border-white/10" />

      {/* Sticky Close Button */}
      <button
        onClick={onClose}
        className="sticky top-2 float-right z-50 p-2.5 rounded-full bg-black/80 border border-white/20 text-gray-200 hover:text-white hover:bg-black transition-all shadow-lg"
        title="Tutup"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Section */}
      <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 clear-right">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://github.com/Rama-X2.png"
              alt="Local Time Avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-gray-950 shadow-2xl relative z-10"
            />
            <span className="absolute top-0 right-0 w-4 h-4 bg-pink-400 rounded-full animate-ping z-20" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base sm:text-xl md:text-2xl">
              Sukabumi Local Time
            </h3>
            <p className="text-xs sm:text-sm text-pink-300 font-medium font-mono">Indonesia Western Standard Time (WIB)</p>
          </div>
        </div>
      </div>

      {/* Big Digital Clock Display */}
      <div className="bg-black/50 p-5 sm:p-6 rounded-3xl border border-pink-500/40 text-center space-y-2">
        <div className="text-[10px] sm:text-xs font-bold text-pink-300 uppercase tracking-widest">Waktu Indonesia Barat (WIB)</div>
        <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-widest drop-shadow-[0_0_20px_rgba(244,114,182,0.6)]">
          {liveTime || '18:45:00 WIB'}
        </div>
        <div className="text-xs sm:text-sm text-pink-200 font-medium flex items-center justify-center gap-2 pt-1">
          <Calendar className="w-4 h-4 text-pink-400" />
          <span>{liveDate || 'Kamis, 6 Agustus 2026'}</span>
        </div>
      </div>

      {/* Location & Timezone Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Lokasi Developer</div>
            <div className="text-xs sm:text-sm font-bold text-white">Sukabumi, Jawa Barat</div>
          </div>
        </div>

        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Zona Waktu Offset</div>
            <div className="text-xs sm:text-sm font-bold text-white">UTC+07:00 (WIB)</div>
          </div>
        </div>

        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Status Operasional</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400">Aktif & Online</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
