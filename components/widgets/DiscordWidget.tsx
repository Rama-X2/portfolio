'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface DiscordWidgetProps {
  discordUserId: string
  avatarFallback: string
}

export default function DiscordWidget({ discordUserId, avatarFallback }: DiscordWidgetProps) {
  const [discordData, setDiscordData] = useState<any>(null)

  useEffect(() => {
    if (!discordUserId) return
    const fetchLanyard = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`)
        const json = await res.json()
        if (json && json.success) {
          setDiscordData(json.data)
        }
      } catch (err) {
        // Fallback
      }
    }
    fetchLanyard()
    const interval = setInterval(fetchLanyard, 10000)
    return () => clearInterval(interval)
  }, [discordUserId])

  const rawStatus = discordData?.discord_status
  const status = (rawStatus && rawStatus !== 'offline') ? rawStatus : 'online'
  
  const avatarUrl = discordData?.discord_user?.id && discordData?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`
    : 'https://github.com/Rama-X2.png'

  const activityName = discordData?.activities?.[0]?.name || 'Visual Studio Code'
  const activityDetails = discordData?.activities?.[0]?.details || 'Editing Portfolio.tsx'
  const activityState = discordData?.activities?.[0]?.state || 'Workspace: portfolio-main'

  return (
    <motion.a
      href={`https://discord.com/users/${discordUserId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ y: -3 }}
    >
      {/* Top Banner / Cover */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-pink-900/60 border-b border-white/10" />

      <div className="relative z-10 pt-2">
        <div className="flex items-center justify-between mb-2">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Discord Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400/80 shadow-lg"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
            />
            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-gray-950 ${
              status === 'dnd'
                ? 'bg-red-500'
                : status === 'idle'
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`} />
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider bg-emerald-500/15 border-emerald-500/35 text-emerald-400">
            {status.toUpperCase()}
          </span>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1 line-clamp-1">
          <span>Rama-X2 『 Sukabumi 』</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 flex-shrink-0" />
        </h4>
        <p className="text-[10px] text-indigo-300 font-medium font-mono">@rama_ext</p>
      </div>

      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2 rounded-xl border border-white/5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider">Discord Presence</span>
          <span className="text-[9px] text-emerald-400 font-mono font-semibold">Active</span>
        </div>
        <p className="text-[11px] font-bold text-white line-clamp-1">
          {activityName}
        </p>
        <p className="text-[10px] text-gray-300 line-clamp-1 font-medium">
          {activityDetails}
        </p>
        <p className="text-[9px] text-gray-400 line-clamp-1 font-mono mt-0.5">
          {activityState}
        </p>
      </div>
    </motion.a>
  )
}
