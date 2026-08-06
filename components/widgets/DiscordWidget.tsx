'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Music, Code } from 'lucide-react'

interface DiscordWidgetProps {
  discordUserId: string
  avatarFallback: string
}

export default function DiscordWidget({ discordUserId, avatarFallback }: DiscordWidgetProps) {
  const [lanyardData, setLanyardData] = useState<any>(null)

  useEffect(() => {
    if (!discordUserId) return

    // 1. Initial REST API Fetch
    const fetchLanyardRest = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`)
        const json = await res.json()
        if (json && json.success && json.data) {
          setLanyardData(json.data)
        }
      } catch (err) {
        // Fallback
      }
    }

    fetchLanyardRest()

    // 2. WebSocket Real-Time Connection
    let ws: WebSocket | null = null
    let heartbeatInterval: NodeJS.Timeout | null = null

    try {
      ws = new WebSocket('wss://api.lanyard.rest/socket')

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          const { op, d, t } = message

          // Opcode 1: Hello from Lanyard server (send initialize & setup heartbeat)
          if (op === 1) {
            const interval = d.heartbeat_interval
            heartbeatInterval = setInterval(() => {
              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }))
              }
            }, interval)

            // Send Initialize (op 2) with subscribe_to_id
            ws.send(
              JSON.stringify({
                op: 2,
                d: {
                  subscribe_to_id: discordUserId,
                },
              })
            )
          }

          // Opcode 0: Event (INIT_STATE or PRESENCE_UPDATE)
          if (op === 0 && (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE')) {
            if (t === 'INIT_STATE' && d && d[discordUserId]) {
              setLanyardData(d[discordUserId])
            } else if (t === 'PRESENCE_UPDATE' && d && (d.user_id === discordUserId || d.discord_user?.id === discordUserId)) {
              setLanyardData((prev: any) => ({ ...prev, ...d }))
            }
          }
        } catch (err) {
          // JSON parse error
        }
      }
    } catch (err) {
      // WS Connection error
    }

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval)
      if (ws) ws.close()
    }
  }, [discordUserId])

  // Extract Discord User details
  const status = lanyardData?.discord_status || 'online'
  const discordUser = lanyardData?.discord_user
  const username = discordUser?.username ? `@${discordUser.username}` : '@rama_ext'
  const displayName = discordUser?.global_name || 'Rama-X2 『 Sukabumi 』'
  
  const avatarUrl = discordUser?.id && discordUser?.avatar
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`
    : 'https://github.com/Rama-X2.png'

  // Extract Spotify Activity if playing
  const spotify = lanyardData?.spotify
  const isListeningSpotify = lanyardData?.listening_to_spotify && spotify

  // Extract Non-Custom Activity (e.g. VS Code or Game)
  const nonCustomActivities = lanyardData?.activities?.filter((act: any) => act.type !== 4) || []
  const primaryActivity = nonCustomActivities[0]

  const statusColor = status === 'dnd'
    ? 'bg-red-500 border-red-500/35 bg-red-500/15 text-red-400'
    : status === 'idle'
    ? 'bg-amber-400 border-amber-500/35 bg-amber-500/15 text-amber-400'
    : status === 'online'
    ? 'bg-emerald-400 border-emerald-500/35 bg-emerald-500/15 text-emerald-400'
    : 'bg-gray-400 border-gray-500/35 bg-gray-500/15 text-gray-400'

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
      <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-r from-purple-900/70 via-indigo-900/70 to-pink-900/70 border-b border-white/10" />

      <div className="relative z-10 pt-1">
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
                : status === 'online'
                ? 'bg-emerald-400'
                : 'bg-gray-400'
            }`} />
          </div>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${statusColor}`}>
            {status.toUpperCase()}
          </span>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1 line-clamp-1">
          <span>{displayName}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 flex-shrink-0" />
        </h4>
        <p className="text-[10px] text-indigo-300 font-medium font-mono">{username}</p>
      </div>

      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2 rounded-xl border border-white/5">
        {isListeningSpotify ? (
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <Music className="w-3 h-3 text-emerald-400 animate-spin" /> Spotify
              </span>
              <span className="text-[9px] text-emerald-400 font-mono font-semibold">Live</span>
            </div>
            <p className="text-[11px] font-bold text-white line-clamp-1">
              {spotify.song}
            </p>
            <p className="text-[10px] text-emerald-300 line-clamp-1 font-medium">
              by {spotify.artist}
            </p>
          </div>
        ) : primaryActivity ? (
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                <Code className="w-3 h-3 text-indigo-400" /> {primaryActivity.name}
              </span>
              <span className="text-[9px] text-indigo-400 font-mono font-semibold">Active</span>
            </div>
            <p className="text-[11px] font-bold text-white line-clamp-1">
              {primaryActivity.details || primaryActivity.name}
            </p>
            <p className="text-[10px] text-gray-300 line-clamp-1 font-medium">
              {primaryActivity.state || 'Discord Rich Presence'}
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider">Discord Presence</span>
              <span className="text-[9px] text-emerald-400 font-mono font-semibold">Live</span>
            </div>
            <p className="text-[11px] font-bold text-white line-clamp-1">
              Visual Studio Code & Gaming
            </p>
            <p className="text-[10px] text-gray-300 line-clamp-1 font-medium">
              Active in Lanyard Community
            </p>
          </div>
        )}
      </div>
    </motion.a>
  )
}
