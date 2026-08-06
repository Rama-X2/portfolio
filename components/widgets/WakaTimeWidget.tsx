'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Clock, Code2, Cpu, ChevronDown, X } from 'lucide-react'

interface WakaTimeWidgetProps {
  avatarFallback: string
  timeText?: string
  languages?: string
  isExpanded?: boolean
  onToggle?: () => void
}

export default function WakaTimeWidget({
  timeText = '39 hrs 34 mins',
  languages = 'TypeScript, PHP & Linux C++',
  isExpanded = false,
  onToggle,
}: WakaTimeWidgetProps) {
  const languageBreakdown = [
    { name: 'TypeScript', percent: 45, color: 'bg-blue-500' },
    { name: 'PHP & Laravel', percent: 30, color: 'bg-indigo-500' },
    { name: 'Linux C++', percent: 15, color: 'bg-purple-500' },
    { name: 'Other Stack', percent: 10, color: 'bg-amber-500' },
  ]

  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
        isExpanded ? 'col-span-2 lg:col-span-4 ring-2 ring-amber-500/50 bg-amber-950/40' : ''
      }`}
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
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/35 bg-amber-500/15 text-amber-300">
              {timeText}
            </span>
            {isExpanded && (
              <span className="p-1 bg-white/10 rounded-full text-gray-300 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug flex items-center gap-1.5 line-clamp-1">
          <span>@Rama-X2 • WakaTime Profile</span>
        </h4>
        <p className="text-[10px] text-amber-300 font-medium font-mono">VS Code Active Time Log</p>
      </div>

      {/* COMPACT VIEW SUMMARY */}
      {!isExpanded && (
        <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> Coding Tracker
            </span>
            <span className="text-[9px] text-amber-400 font-mono font-semibold flex items-center gap-0.5">
              Klik Tampilan Penuh <ChevronDown className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] font-bold text-white line-clamp-1">
            {languages}
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
            {/* Main Stats Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-[10px] font-bold text-amber-300 uppercase">Total Coding Log</div>
                <div className="text-lg font-extrabold text-white mt-0.5">{timeText}</div>
                <div className="text-[9px] text-gray-400">All-Time VS Code Active Time</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-[10px] font-bold text-amber-300 uppercase">Daily Average</div>
                <div className="text-lg font-extrabold text-white mt-0.5">4 hrs 12 mins / day</div>
                <div className="text-[9px] text-gray-400">Consistent Developer Log</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-[10px] font-bold text-amber-300 uppercase">Primary IDE Editor</div>
                <div className="text-lg font-extrabold text-white mt-0.5">Visual Studio Code</div>
                <div className="text-[9px] text-gray-400">Linux & Windows Environments</div>
              </div>
            </div>

            {/* Language Breakdown Bars */}
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-2.5">
              <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-amber-400" /> Language Distribution Breakdown
              </div>

              {/* Progress Multi-Bar */}
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden flex p-0.5 gap-0.5">
                {languageBreakdown.map((lang, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${lang.percent}%` }}
                    className={`${lang.color} h-full rounded-full`}
                    title={`${lang.name}: ${lang.percent}%`}
                  />
                ))}
              </div>

              {/* Legend List */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {languageBreakdown.map((lang, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                    <span className="text-gray-200 font-semibold">{lang.name}</span>
                    <span className="text-gray-400 text-[10px] font-mono">({lang.percent}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons inside Expanded View */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <a
                href="https://wakatime.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-lg shadow-amber-600/30"
              >
                <span>Lihat Statistik WakaTime Asli</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

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
