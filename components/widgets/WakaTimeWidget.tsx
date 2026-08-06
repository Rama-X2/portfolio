'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Code2, ChevronRight, X } from 'lucide-react'

interface WakaTimeWidgetProps {
  avatarFallback: string
  timeText?: string
  languages?: string
  onOpenModal?: () => void
}

// Official WakaTime SVG Logo
const WakaTimeLogo = () => (
  <svg className="w-4 h-4 fill-amber-400 flex-shrink-0" viewBox="0 0 24 24">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm-1 3v6l5.25 3.15.75-1.23-4.5-2.67V7H11z"/>
  </svg>
)

export default function WakaTimeWidget({
  timeText = '39 hrs 34 mins',
  languages = 'TypeScript, PHP & Linux C++',
  onOpenModal,
}: WakaTimeWidgetProps) {
  return (
    <motion.div
      onClick={onOpenModal}
      className="bg-[#0c0d1a] rounded-2xl p-4 text-left border border-amber-500/20 hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      <div className="relative z-10">
        {/* Lappland Decadenza HUD Header */}
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-3">
            <img
              src="https://github.com/Rama-X2.png"
              alt="GitHub Avatar for WakaTime Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/70 shadow-md"
            />
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1.5 line-clamp-1">
                <span>@Rama-X2</span>
              </h4>
              <p className="text-[10px] text-amber-300 font-mono">WakaTime Active Time Log</p>
            </div>
          </div>

          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-amber-500/50 bg-amber-950/70 text-amber-300 tracking-wider">
            {timeText} ✦
          </span>
        </div>

        {/* Compact Activity Card */}
        <div className="bg-black/50 p-2.5 rounded-xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <WakaTimeLogo /> CODING TRACKER
            </span>
            <span className="text-[9px] text-gray-400 font-mono font-semibold flex items-center gap-0.5 group-hover:text-amber-400 transition-colors">
              Detail ✦
            </span>
          </div>
          <p className="text-[11px] font-bold text-white line-clamp-1">
            {languages}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* Full WakaTime Modal Component (Lappland Decadenza Cyber HUD Style) */
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
      className="bg-[#0b0c18] rounded-3xl p-5 sm:p-6 md:p-8 max-w-3xl w-full text-left border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative overflow-hidden space-y-5 max-h-[82vh] overflow-y-auto"
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
          <img
            src="https://github.com/Rama-X2.png"
            alt="WakaTime Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-500/80 shadow-2xl relative z-10"
          />
          <div>
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">// WAKATIME DEVELOPER METRICS</div>
            <h3 className="font-extrabold text-white text-base sm:text-xl md:text-2xl">
              @Rama-X2 • Active Coding Tracker
            </h3>
            <p className="text-xs sm:text-sm text-amber-300 font-medium font-mono">VS Code Active Time Log</p>
          </div>
        </div>

        <a
          href="https://wakatime.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs transition-all shadow-lg shadow-amber-600/30"
        >
          <span>Lihat WakaTime Asli</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">// TOTAL CODING LOG</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-1">{timeText}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">All-Time Active Time Log</div>
        </div>
        <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">// DAILY AVERAGE</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-1">4 hrs 12 mins / day</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Consistent Developer Activity</div>
        </div>
        <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">// PRIMARY IDE EDITOR</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-1">Visual Studio Code</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Linux & Windows Environments</div>
        </div>
      </div>

      {/* Language Distribution Breakdown */}
      <div className="bg-black/40 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
        <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-amber-400" /> // LANGUAGE DISTRIBUTION BREAKDOWN
        </div>

        <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden flex p-0.5 gap-1 border border-white/10">
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
            <div key={idx} className="flex items-center gap-2 text-xs font-mono">
              <span className={`w-3 h-3 rounded-full ${lang.color}`} />
              <span className="text-gray-200 font-semibold">{lang.name}</span>
              <span className="text-gray-400">({lang.percent}%)</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
