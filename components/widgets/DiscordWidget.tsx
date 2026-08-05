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
    const interval = setInterval(fetchLanyard, 12000)
    return () => clearInterval(interval)
  }, [discordUserId])

  const status = discordData?.discord_status || 'offline'
  const username = discordData?.discord_user?.username ? `@${discordData.discord_user.username}` : '@rama_ext'
  const avatarUrl = discordData?.discord_user?.id && discordData?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`
    : avatarFallback

  const statusColor = status === 'dnd'
    ? 'bg-red-500/15 border-red-500/35 text-red-400'
    : status === 'idle'
    ? 'bg-amber-500/15 border-amber-500/35 text-amber-400'
    : status === 'online'
    ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400'
    : 'bg-indigo-500/15 border-indigo-500/35 text-indigo-300'

  return (
    <motion.a
      href={`https://discord.com/users/${discordUserId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card rounded-2xl p-3.5 sm:p-4 md:p-4.5 text-left border border-white/10 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ y: -3 }}
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Discord Profile Avatar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/20 shadow-md"
            />
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-950 ${
              status === 'dnd'
                ? 'bg-red-500'
                : status === 'idle'
                ? 'bg-amber-400'
                : status === 'online'
                ? 'bg-emerald-400'
                : 'bg-gray-400'
            }`} />
          </div>
          <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${statusColor}`}>
            {status.toUpperCase()}
          </span>
        </div>
        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug flex items-center gap-1 line-clamp-1">
          <span>{username}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 flex-shrink-0" />
        </h4>
      </div>
      <div className="mt-2.5 pt-2 border-t border-white/10">
        <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-0.5">Discord Presence</div>
        <p className="text-[11px] sm:text-xs text-gray-200 font-medium line-clamp-1">
          {discordData?.activities?.[0]?.name
            ? `${discordData.activities[0].name}`
            : 'VS Code & Gaming Activity'}
        </p>
        <p className="text-[10px] text-gray-400 line-clamp-1">
          {discordData?.activities?.[0]?.details || 'Active in Community'}
        </p>
      </div>
    </motion.a>
  )
}
