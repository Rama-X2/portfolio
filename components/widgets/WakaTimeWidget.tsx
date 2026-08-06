'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Clock, Code2, ChevronRight, X } from 'lucide-react'

interface WakaTimeWidgetProps {
  avatarFallback: string
  timeText?: string
  languages?: string
  onOpenModal?: () => void
}

export default function WakaTimeWidget({
  timeText = '39 hrs 34 mins',
  languages = 'TypeScript, PHP & Linux C++',
  onOpenModal,
}: WakaTimeWidgetProps) {
  return (
    <motion.div
      onClick={onOpenModal}
      className="glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Top Banner / Cover */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-amber-900/80 via-orange-900/80 to-yellow-900/80 border-b border-white/10" />

      <div className="relative z-10 pt-1">
        <div className="flex items-center justify-between mb-2">
          <img
            src="https://github.com/Rama-X2.png"
            alt="GitHub Avatar for WakaTime Profile"
            className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/80 shadow-lg"
          />
          <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/35 bg-amber-500/15 text-amber-300">
            {timeText}
          </span>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug flex items-center gap-1.5 line-clamp-1">
          <span>@Rama-X2 • WakaTime Profile</span>
        </h4>
        <p className="text-[10px] text-amber-300 font-medium font-mono">VS Code Active Time Log</p>
      </div>

      {/* Compact Activity Card */}
      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" /> Coding Tracker
          </span>
          <span className="text-[9px] text-amber-400 font-mono font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Detail <ChevronRight className="w-3 h-3" />
          </span>
        </div>
        <p className="text-[11px] font-bold text-white line-clamp-1">
          {languages}
        </p>
      </div>
    </motion.div>
  )
}

/* Full WakaTime Modal Component (Clean & Mobile Safe) */
export function WakaTimeModalContent({
  timeText = '39 hrs 34 mins',
  languages = 'TypeScript, PHP & Linux C++',
  onClose,
}: {
  timeText?: string
  languages?: string
  onClose: () => void
}) {
  const languageBreakdown = [
    { name: 'TypeScript', percent: 45, color: 'bg-blue-500' },
    { name: 'PHP & Laravel', percent: 30, color: 'bg-indigo-500' },
    { name: 'Linux C++', percent: 15, color: 'bg-purple-500' },
    { name: 'Other Stack', percent: 10, color: 'bg-amber-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[#0f101d] rounded-3xl p-4 sm:p-6 md:p-8 max-w-3xl w-full text-left border border-amber-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden space-y-4 sm:space-y-5 max-h-[82vh] overflow-y-auto"
    >
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-amber-900 via-orange-900 to-yellow-900 border-b border-white/10" />

      {/* Sticky Close Button (Safe for Mobile Address Bars) */}
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
          <img
            src="https://github.com/Rama-X2.png"
            alt="WakaTime Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-gray-950 shadow-2xl relative z-10"
          />
          <div>
            <h3 className="font-extrabold text-white text-base sm:text-xl md:text-2xl">
              @Rama-X2 • WakaTime Developer Profile
            </h3>
            <p className="text-xs sm:text-sm text-amber-300 font-medium font-mono">VS Code Active Time Log</p>
          </div>
        </div>

        <a
          href="https://wakatime.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-lg shadow-amber-600/30"
        >
          <span>Lihat WakaTime Asli</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase">Total Coding Log</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 sm:mt-1">{timeText}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">All-Time Active Time Log</div>
        </div>
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase">Daily Average</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 sm:mt-1">4 hrs 12 mins / day</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Consistent Developer Activity</div>
        </div>
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase">Primary IDE Editor</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 sm:mt-1">Visual Studio Code</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Linux & Windows Environments</div>
        </div>
      </div>

      {/* Language Distribution Breakdown */}
      <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
        <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-amber-400" /> Language Distribution Breakdown
        </div>

        <div className="w-full h-4 bg-black/50 rounded-full overflow-hidden flex p-0.5 gap-1">
          {languageBreakdown.map((lang, idx) => (
            <div
              key={idx}
              style={{ width: `${lang.percent}%` }}
              className={`${lang.color} h-full rounded-full`}
              title={`${lang.name}: ${lang.percent}%`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {languageBreakdown.map((lang, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <span className={`w-3 h-3 rounded-full ${lang.color}`} />
              <span className="text-gray-200 font-semibold">{lang.name}</span>
              <span className="text-gray-400 font-mono">({lang.percent}%)</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
