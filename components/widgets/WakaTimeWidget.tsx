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
      className="bg-gradient-to-br from-[#1c1e3a] via-[#15172d] to-[#111324] rounded-2xl text-left border-0 hover:shadow-[0_8px_30px_rgba(245,158,11,0.3)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      {/* Vermilion GFX Wavy Amber Header Cover */}
      <div className="relative h-14 w-full bg-gradient-to-r from-amber-900 via-orange-900 to-yellow-950 overflow-hidden">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-7 text-[#15172d] fill-current" viewBox="0 0 1440 320">
          <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="absolute top-2 right-2.5">
          <span className="text-[8px] sm:text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border border-amber-500/50 bg-amber-950/80 text-amber-300 backdrop-blur-md">
            {timeText} ✦
          </span>
        </div>
      </div>

      <div className="relative z-10 px-3.5 pb-3.5 -mt-6">
        <div className="flex items-end gap-2.5 mb-2.5">
          <img
            src="https://github.com/Rama-X2.png"
            alt="GitHub Avatar for WakaTime Profile"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-amber-400/80 shadow-md relative z-10 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-white text-xs sm:text-sm leading-tight truncate">
              @Rama-X2
            </h4>
            <p className="text-[10px] text-amber-300 font-mono truncate">WakaTime Active Time Log</p>
          </div>
        </div>

        {/* Compact Activity Card */}
        <div className="bg-[#121427]/95 p-2.5 rounded-xl space-y-1 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 truncate">
              <WakaTimeLogo /> CODING TRACKER
            </span>
            <span className="text-[9px] text-amber-300 font-mono font-semibold flex items-center gap-0.5 group-hover:text-amber-200 transition-colors flex-shrink-0 ml-1">
              Detail ✦
            </span>
          </div>
          <p className="text-[11px] font-bold text-white truncate">
            {languages}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* Full WakaTime Modal Component (Arknights GFX Vermilion Style) */
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
      className="bg-gradient-to-b from-[#1c1d3b] via-[#14162e] to-[#0f1124] rounded-3xl text-left border-0 shadow-[0_25px_70px_rgba(245,158,11,0.3)] relative overflow-hidden max-h-[82vh] overflow-y-auto"
    >
      {/* Top Vermilion GFX Header Cover */}
      <div className="relative h-24 sm:h-28 w-full bg-gradient-to-r from-amber-900 via-orange-900 to-yellow-950 overflow-hidden">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-10 sm:h-12 text-[#1c1d3b] fill-current" viewBox="0 0 1440 320">
          <path d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,165.3C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
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
            <img
              src="https://github.com/Rama-X2.png"
              alt="WakaTime Avatar"
              className="w-18 h-18 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#1c1d3b] shadow-2xl relative z-10 flex-shrink-0"
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
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs transition-all shadow-lg shadow-amber-600/30"
          >
            <span>Lihat WakaTime Asli</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Dynamic Animated Stats Cards (Blue Circle Fix) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-gradient-to-br from-amber-950/60 to-orange-950/60 p-4 rounded-2xl border border-amber-500/40 relative overflow-hidden group">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center justify-between">
              <span>// TOTAL CODING LOG</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-1">{timeText}</div>
            <div className="text-[10px] text-gray-300 mt-0.5">All-Time Active Time Log</div>
          </div>

          <div className="bg-gradient-to-br from-amber-950/60 to-orange-950/60 p-4 rounded-2xl border border-amber-500/40 relative overflow-hidden group">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center justify-between">
              <span>// DAILY AVERAGE</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-1">4 hrs 12 mins / day</div>
            <div className="text-[10px] text-gray-300 mt-0.5">Consistent Developer Activity</div>
          </div>

          <div className="bg-gradient-to-br from-amber-950/60 to-orange-950/60 p-4 rounded-2xl border border-amber-500/40 relative overflow-hidden group">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center justify-between">
              <span>// PRIMARY IDE EDITOR</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-1">Visual Studio Code</div>
            <div className="text-[10px] text-gray-300 mt-0.5">Linux & Windows Environments</div>
          </div>
        </div>

        {/* Language Distribution Breakdown */}
        <div className="bg-[#121429]/90 p-4 sm:p-5 rounded-2xl space-y-3">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-amber-400" /> // LANGUAGE DISTRIBUTION BREAKDOWN
          </div>

          <div className="w-full h-4 bg-[#0b0d1e] rounded-full overflow-hidden flex p-0.5 gap-1 border border-white/10">
            {languageBreakdown.map((lang, idx) => (
              <div
                key={idx}
                style={{ width: `${lang.percent}%` }}
                className={`${lang.color} h-full rounded-full animate-pulse`}
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
      </div>
    </motion.div>
  )
}
