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
      className="bg-gradient-to-br from-[#1b1e38] via-[#15172d] to-[#111324] rounded-2xl text-left border border-pink-500/30 hover:border-pink-500/70 hover:shadow-[0_8px_30px_rgba(236,72,153,0.3)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      {/* Vermilion GFX Wavy Pink Header Cover */}
      <div className="relative h-16 w-full bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-950 overflow-hidden border-b border-pink-500/30">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-8 text-[#15172d] fill-current" viewBox="0 0 1440 320">
          <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="absolute top-2 right-3">
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border border-pink-500/50 bg-pink-950/80 text-pink-300 backdrop-blur-md">
            UTC+7 ✦
          </span>
        </div>
      </div>

      <div className="relative z-10 px-4 pb-4 -mt-7">
        <div className="flex items-end justify-between mb-3">
          <div className="flex items-end gap-3">
            <div className="relative">
              <img
                src="https://github.com/Rama-X2.png"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', avatarFallback)
                }}
                alt="Local Time Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-pink-400/80 shadow-lg ring-2 ring-pink-500/30 relative z-10"
              />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full animate-ping z-20" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1.5 line-clamp-1">
                <span>Sukabumi Time</span>
              </h4>
              <p className="text-[10px] text-pink-300 font-mono">Indonesia WIB (UTC+7)</p>
            </div>
          </div>
        </div>

        {/* Compact Activity Card */}
        <div className="bg-[#121427]/95 p-3 rounded-xl border border-pink-500/25 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-pink-400" /> REAL-TIME TICKER
            </span>
            <span className="text-[9px] text-pink-300 font-mono font-semibold flex items-center gap-0.5 group-hover:text-pink-200 transition-colors">
              Detail ✦
            </span>
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-white font-mono tracking-wider">
            {liveTime || '19:10:00 WIB'}
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
      className="bg-gradient-to-b from-[#1c1d3b] via-[#14162e] to-[#0f1124] rounded-3xl text-left border border-pink-500/50 shadow-[0_25px_70px_rgba(236,72,153,0.3)] relative overflow-hidden max-h-[82vh] overflow-y-auto"
    >
      {/* Top Vermilion GFX Header Cover */}
      <div className="relative h-28 w-full bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-950 overflow-hidden border-b border-pink-500/40">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-12 text-[#1c1d3b] fill-current" viewBox="0 0 1440 320">
          <path d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,165.3C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-2.5 rounded-full bg-black/80 border border-white/20 text-gray-200 hover:text-white hover:bg-black transition-all shadow-lg"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 pb-6 sm:px-8 sm:pb-8 -mt-14 space-y-5 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src="https://github.com/Rama-X2.png"
                alt="Local Time Avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#1c1d3b] shadow-2xl relative z-10"
              />
              <span className="absolute top-0 right-0 w-4 h-4 bg-pink-400 rounded-full animate-ping z-20" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest">// CHRONO LOCAL TIME SYSTEM</div>
              <h3 className="font-extrabold text-white text-lg sm:text-2xl">
                Sukabumi Local Time
              </h3>
              <p className="text-xs sm:text-sm text-pink-300 font-medium font-mono">Indonesia Western Standard Time (WIB)</p>
            </div>
          </div>
        </div>

        {/* Big Digital Clock Display */}
        <div className="bg-[#121429]/90 p-6 rounded-3xl border border-pink-500/40 text-center space-y-2">
          <div className="text-[10px] sm:text-xs font-mono font-bold text-pink-300 uppercase tracking-widest">// WAKTU INDONESIA BARAT (WIB)</div>
          <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-widest drop-shadow-[0_0_25px_rgba(244,114,182,0.6)]">
            {liveTime || '19:10:00 WIB'}
          </div>
          <div className="text-xs sm:text-sm text-pink-200 font-mono font-medium flex items-center justify-center gap-2 pt-1">
            <Calendar className="w-4 h-4 text-pink-400" />
            <span>{liveDate || 'Kamis, 6 Agustus 2026'}</span>
          </div>
        </div>

        {/* Location & Timezone Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
