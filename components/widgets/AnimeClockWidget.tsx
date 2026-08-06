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
      className="bg-gradient-to-br from-[#1c1e3a] via-[#15172d] to-[#111324] rounded-2xl text-left border-0 hover:shadow-[0_8px_30px_rgba(236,72,153,0.3)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      {/* Vermilion GFX Wavy Pink Header Cover */}
      <div className="relative h-14 w-full bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-950 overflow-hidden">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-7 text-[#15172d] fill-current" viewBox="0 0 1440 320">
          <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="absolute top-2 right-2.5">
          <span className="text-[8px] sm:text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border border-pink-500/50 bg-pink-950/80 text-pink-300 backdrop-blur-md">
            UTC+7 ✦
          </span>
        </div>
      </div>

      <div className="relative z-10 px-3.5 pb-3.5 -mt-6">
        <div className="flex items-end gap-2.5 mb-2.5">
          <div className="relative flex-shrink-0">
            <img
              src="https://github.com/Rama-X2.png"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
              alt="Local Time Avatar"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-pink-400/80 shadow-md ring-2 ring-pink-500/30 relative z-10"
            />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full animate-ping z-20" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-white text-xs sm:text-sm leading-tight truncate">
              Sukabumi Time
            </h4>
            <p className="text-[10px] text-pink-300 font-mono truncate">Indonesia WIB (UTC+7)</p>
          </div>
        </div>

        {/* Compact Activity Card */}
        <div className="bg-[#121427]/95 p-2.5 rounded-xl space-y-1 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1 truncate">
              <Clock className="w-3.5 h-3.5 text-pink-400" /> REAL-TIME TICKER
            </span>
            <span className="text-[9px] text-pink-300 font-mono font-semibold flex items-center gap-0.5 group-hover:text-pink-200 transition-colors flex-shrink-0 ml-1">
              Detail ✦
            </span>
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-white font-mono tracking-wider truncate">
            {liveTime || '00:50:00 WIB'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* Full Local Time Modal Component (Arknights GFX Vermilion Style) */
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
      className="bg-gradient-to-b from-[#1c1d3b] via-[#14162e] to-[#0f1124] rounded-3xl text-left border-0 shadow-[0_25px_70px_rgba(236,72,153,0.3)] relative overflow-hidden max-h-[82vh] overflow-y-auto"
    >
      {/* Top Vermilion GFX Header Cover */}
      <div className="relative h-24 sm:h-28 w-full bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-950 overflow-hidden">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-10 sm:h-12 text-[#1c1d3b] fill-current" viewBox="0 0 1440 320">
          <path d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,165.3C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>

        {/* Kotak Edge Close Button (Orange Circle Fix) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl transition-all shadow-md"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 pb-5 sm:px-8 sm:pb-8 -mt-12 sm:-mt-14 space-y-4 sm:space-y-5 relative z-10">
        {/* Header Section (Borderless & Seamless - Green Circle Fix) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-3.5">
            <div className="relative flex-shrink-0">
              <img
                src="https://github.com/Rama-X2.png"
                alt="Local Time Avatar"
                className="w-18 h-18 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#1c1d3b] shadow-2xl relative z-10"
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

        {/* Dynamic Animated Big Digital Clock Display (Blue Circle Fix) */}
        <div className="bg-gradient-to-r from-pink-950/80 via-purple-950/80 to-indigo-950/80 p-6 rounded-3xl border border-pink-500/40 text-center space-y-2 relative overflow-hidden shadow-lg group">
          <div className="text-[10px] sm:text-xs font-mono font-bold text-pink-300 uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" /> // WAKTU INDONESIA BARAT (WIB)
          </div>
          <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-widest drop-shadow-[0_0_25px_rgba(244,114,182,0.6)]">
            {liveTime || '00:50:00 WIB'}
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
      </div>
    </motion.div>
  )
}
