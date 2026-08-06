'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Music, Code, Gamepad2, ChevronRight, X, Car, Box, Layers, Monitor } from 'lucide-react'

interface DiscordWidgetProps {
  discordUserId: string
  avatarFallback: string
  onOpenModal?: () => void
}

export default function DiscordWidget({
  discordUserId,
  avatarFallback,
  onOpenModal,
}: DiscordWidgetProps) {
  const [lanyardData, setLanyardData] = useState<any>(null)

  useEffect(() => {
    if (!discordUserId) return

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

    let ws: WebSocket | null = null
    let heartbeatInterval: NodeJS.Timeout | null = null

    try {
      const socket = new WebSocket('wss://api.lanyard.rest/socket')
      ws = socket

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          const { op, d, t } = message

          if (op === 1) {
            const interval = d.heartbeat_interval
            heartbeatInterval = setInterval(() => {
              if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ op: 3 }))
              }
            }, interval)

            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(
                JSON.stringify({
                  op: 2,
                  d: {
                    subscribe_to_id: discordUserId,
                  },
                })
              )
            }
          }

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

  const status = lanyardData?.discord_status || 'online'
  const discordUser = lanyardData?.discord_user
  const username = discordUser?.username ? `@${discordUser.username}` : '@rama_ext'
  const displayName = discordUser?.global_name || 'Rama-X2 『 Sukabumi 』'

  const avatarUrl = discordUser?.id && discordUser?.avatar
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`
    : 'https://github.com/Rama-X2.png'

  const spotify = lanyardData?.spotify
  const isListeningSpotify = lanyardData?.listening_to_spotify && spotify

  const nonCustomActivities = lanyardData?.activities?.filter((act: any) => act.type !== 4) || []
  const vsCodeActivity = nonCustomActivities.find((act: any) => act.name.toLowerCase().includes('visual studio code')) || nonCustomActivities[0]

  const statusColor = status === 'dnd'
    ? 'bg-red-500 border-red-500/35 bg-red-500/15 text-red-400'
    : status === 'idle'
    ? 'bg-amber-400 border-amber-500/35 bg-amber-500/15 text-amber-400'
    : status === 'online'
    ? 'bg-emerald-400 border-emerald-500/35 bg-emerald-500/15 text-emerald-400'
    : 'bg-indigo-400 border-indigo-500/35 bg-indigo-500/15 text-indigo-300'

  return (
    <motion.div
      onClick={onOpenModal}
      className="glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Top Banner / Cover */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-pink-900/80 border-b border-white/10" />

      <div className="relative z-10 pt-1">
        <div className="flex items-center justify-between mb-2">
          {/* Clean Avatar without Hat */}
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Discord Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-indigo-400/80 shadow-lg relative z-10"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
            />
            {/* Status Dot */}
            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-gray-950 z-20 ${
              status === 'dnd'
                ? 'bg-red-500'
                : status === 'idle'
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`} />
          </div>

          <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${statusColor}`}>
            {status.toUpperCase()}
          </span>
        </div>

        {/* User Info & Badges */}
        <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1.5 line-clamp-1">
          <span>{displayName}</span>
          <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 font-mono">
            MORA
          </span>
        </h4>
        <p className="text-[10px] text-indigo-300 font-medium font-mono">{username}</p>
      </div>

      {/* Compact Activity Card */}
      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
            {isListeningSpotify ? <Music className="w-3 h-3 text-emerald-400 animate-spin" /> : <Code className="w-3 h-3 text-indigo-400" />}
            {isListeningSpotify ? 'Spotify' : vsCodeActivity ? vsCodeActivity.name : 'Discord RPC'}
          </span>
          <span className="text-[9px] text-indigo-400 font-mono font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Detail <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {isListeningSpotify ? (
          <p className="text-[11px] font-bold text-white line-clamp-1">
            {spotify.song} • <span className="text-emerald-300 font-normal">{spotify.artist}</span>
          </p>
        ) : vsCodeActivity ? (
          <p className="text-[11px] font-bold text-white line-clamp-1">
            {vsCodeActivity.details || vsCodeActivity.name}
          </p>
        ) : (
          <p className="text-[11px] font-bold text-white line-clamp-1">
            Visual Studio Code & Gaming
          </p>
        )}
      </div>
    </motion.div>
  )
}

/* Full Discord Rich Profile Modal Component (Clean & Mobile Safe) */
export function DiscordModalContent({
  discordUserId,
  avatarFallback,
  onClose,
}: {
  discordUserId: string
  avatarFallback: string
  onClose: () => void
}) {
  const [lanyardData, setLanyardData] = useState<any>(null)

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.success) setLanyardData(json.data)
      })
      .catch(() => {})
  }, [discordUserId])

  const status = lanyardData?.discord_status || 'online'
  const discordUser = lanyardData?.discord_user
  const username = discordUser?.username ? `@${discordUser.username}` : '@rama_ext'
  const displayName = discordUser?.global_name || 'Rama-X2 『 Sukabumi 』'

  const avatarUrl = discordUser?.id && discordUser?.avatar
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`
    : 'https://github.com/Rama-X2.png'

  const spotify = lanyardData?.spotify
  const isListeningSpotify = lanyardData?.listening_to_spotify && spotify

  const nonCustomActivities = lanyardData?.activities?.filter((act: any) => act.type !== 4) || []
  const vsCodeActivity = nonCustomActivities.find((act: any) => act.name.toLowerCase().includes('visual studio code')) || nonCustomActivities[0]

  // Recent Games using clean Lucide icons instead of raw emojis
  const recentGames = [
    { name: 'Forza Horizon 4', time: '2d ago', icon: Car, color: 'text-red-400' },
    { name: 'Arknights:Endfield', time: '3d ago', icon: Gamepad2, color: 'text-indigo-400' },
    { name: 'Minecraft', time: '9d ago • Trending', icon: Box, color: 'text-emerald-400' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="glass-card rounded-3xl p-4 sm:p-6 md:p-8 max-w-3xl w-full text-left border border-purple-500/40 bg-gray-950/95 shadow-2xl relative overflow-hidden space-y-4 sm:space-y-5 max-h-[82vh] overflow-y-auto"
    >
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 border-b border-white/10" />

      {/* Sticky Close Button (Safe for Mobile Address Bars) */}
      <button
        onClick={onClose}
        className="sticky top-2 float-right z-50 p-2.5 rounded-full bg-black/80 border border-white/20 text-gray-200 hover:text-white hover:bg-black transition-all shadow-lg"
        title="Tutup"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Profile Section */}
      <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 clear-right">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Discord Avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-gray-950 shadow-2xl relative z-10"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
            />

            <span className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-gray-950 z-30 ${
              status === 'dnd' ? 'bg-red-500' : status === 'idle' ? 'bg-amber-400' : 'bg-emerald-400'
            }`} />
          </div>

          <div>
            <h3 className="font-extrabold text-white text-base sm:text-xl md:text-2xl flex items-center gap-2">
              <span>{displayName}</span>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30 font-mono">
                MORA
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-indigo-300 font-medium font-mono">{username}</p>
          </div>
        </div>

        <a
          href={`https://discord.com/users/${discordUserId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
        >
          <span>Buka Profil Discord Asli</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Bio & Details Quote */}
      <div className="bg-purple-950/40 p-3.5 sm:p-4 rounded-2xl border border-purple-500/20 text-xs sm:text-sm text-purple-200 font-mono space-y-1.5">
        <p className="text-amber-300 font-bold text-sm sm:text-base">" kyaaa.....(≧▽≦) "</p>
        <p className="text-gray-300 text-xs sm:text-sm">Greetings, I'm from Indonesia...!!! #OC_Expert #Animator_MV</p>
        <div className="text-[11px] sm:text-xs text-purple-400 pt-1 flex flex-wrap items-center gap-3">
          <span>Member Since: Oct 10, 2021</span>
          <span>•</span>
          <span>Roles: Admin</span>
        </div>
      </div>

      {/* DUAL ACTIVITIES: VS CODE + SPOTIFY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* VS Code Activity */}
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10 flex items-start gap-3.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
            <Code className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-0.5">Current Activity</div>
            <h5 className="font-bold text-white text-xs sm:text-base line-clamp-1">
              {vsCodeActivity?.name || 'Visual Studio Code'}
            </h5>
            <p className="text-xs text-gray-300 line-clamp-1">
              {vsCodeActivity?.details || 'Editing users.py'}
            </p>
            <p className="text-[11px] text-gray-400 line-clamp-1 font-mono mt-0.5">
              {vsCodeActivity?.state || 'Workspace: andora-wami-ex-main'}
            </p>
          </div>
        </div>

        {/* Spotify Live Music */}
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 flex items-start gap-3.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Music className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Listening to Spotify</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">LIVE</span>
            </div>
            <h5 className="font-bold text-white text-xs sm:text-base line-clamp-1">
              {spotify?.song || '昨日繁华 (BLUE MOON)'}
            </h5>
            <p className="text-xs text-emerald-300 line-clamp-1 font-medium">
              by {spotify?.artist || 'Sān-Z, HOYO-MiX'}
            </p>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full w-2/3 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log (Vector Lucide Icons) */}
      <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10 space-y-2">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Gamepad2 className="w-4 h-4 text-indigo-400" /> Recent Gaming & App History
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {recentGames.map((game, idx) => {
            const IconComponent = game.icon
            return (
              <div key={idx} className="bg-black/40 p-3 rounded-xl border border-white/5 text-left flex items-start gap-2.5">
                <div className={`p-2 bg-white/5 rounded-lg ${game.color}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white line-clamp-1">{game.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{game.time}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
