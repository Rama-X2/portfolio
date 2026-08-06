'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Music, Code, Gamepad2, ChevronRight, X, Disc } from 'lucide-react'

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

  // Extract Discord Details
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
          {/* Avatar Container with Purple Rose Bonnet Hat Decoration */}
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Discord Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-indigo-400/80 shadow-lg relative z-10"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
            />

            {/* Purple Rose Bonnet Hat Decoration Overlay (Matching Screenshot 3) */}
            <div className="absolute -top-3.5 -left-3.5 w-14 h-14 z-30 pointer-events-none drop-shadow-[0_4px_10px_rgba(147,51,234,0.6)]">
              <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
                {/* Bonnet Hat Base Ring */}
                <ellipse cx="60" cy="45" rx="36" ry="24" fill="#4c1d95" stroke="#a855f7" strokeWidth="2.5" transform="rotate(-20 60 45)" />
                <path d="M35 45 C35 25 55 18 72 22 C85 25 90 40 85 52 Z" fill="#6b21a8" stroke="#c084fc" strokeWidth="2.5" />
                
                {/* Rose Flower */}
                <circle cx="36" cy="40" r="10" fill="#7e22ce" stroke="#e879f9" strokeWidth="2" />
                <path d="M32 38 C34 34 40 34 40 38 C40 42 34 44 32 40 Z" fill="#c084fc" />
                
                {/* Ribbon Bow */}
                <path d="M30 45 C20 48 16 58 24 64 C32 60 34 50 30 45 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                <path d="M38 48 C44 56 42 66 32 66 C28 60 34 52 38 48 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                <circle cx="33" cy="48" r="3.5" fill="#f43f5e" />

                {/* Hanging Purple Ribbon Trails (Left Side of Avatar) */}
                <path d="M26 52 C20 65 14 82 12 102 C16 100 22 84 28 66 Z" fill="#7e22ce" stroke="#c084fc" strokeWidth="1" />
                <path d="M32 54 C28 70 24 90 22 110 C26 108 32 88 35 68 Z" fill="#581c87" stroke="#a855f7" strokeWidth="1" />
              </svg>
            </div>

            {/* Status Dot */}
            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-gray-950 z-40 ${
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

/* Full Discord Rich Profile Modal Component */
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

  const recentGames = [
    { name: 'Forza Horizon 4', time: '2d ago', icon: '🏎️' },
    { name: 'Arknights:Endfield', time: '3d ago', icon: '⚔️' },
    { name: 'Minecraft', time: '9d ago • Trending', icon: '🟩' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="glass-card rounded-3xl p-5 sm:p-6 md:p-8 max-w-3xl w-full text-left border border-purple-500/40 bg-gray-950/90 shadow-2xl relative overflow-hidden space-y-5"
    >
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 border-b border-white/10" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/40 text-gray-300 hover:text-white hover:bg-black/60 transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Profile Section */}
      <div className="relative z-10 pt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
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

            {/* Purple Rose Bonnet Hat Decoration Overlay */}
            <div className="absolute -top-6 -left-6 w-24 h-24 z-30 pointer-events-none drop-shadow-[0_6px_14px_rgba(147,51,234,0.8)]">
              <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
                <ellipse cx="60" cy="45" rx="36" ry="24" fill="#4c1d95" stroke="#a855f7" strokeWidth="2.5" transform="rotate(-20 60 45)" />
                <path d="M35 45 C35 25 55 18 72 22 C85 25 90 40 85 52 Z" fill="#6b21a8" stroke="#c084fc" strokeWidth="2.5" />
                <circle cx="36" cy="40" r="10" fill="#7e22ce" stroke="#e879f9" strokeWidth="2" />
                <path d="M32 38 C34 34 40 34 40 38 C40 42 34 44 32 40 Z" fill="#c084fc" />
                <path d="M30 45 C20 48 16 58 24 64 C32 60 34 50 30 45 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                <path d="M38 48 C44 56 42 66 32 66 C28 60 34 52 38 48 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                <circle cx="33" cy="48" r="3.5" fill="#f43f5e" />
                <path d="M26 52 C20 65 14 82 12 102 C16 100 22 84 28 66 Z" fill="#7e22ce" stroke="#c084fc" strokeWidth="1" />
                <path d="M32 54 C28 70 24 90 22 110 C26 108 32 88 35 68 Z" fill="#581c87" stroke="#a855f7" strokeWidth="1" />
              </svg>
            </div>

            <span className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-gray-950 z-40 ${
              status === 'dnd' ? 'bg-red-500' : status === 'idle' ? 'bg-amber-400' : 'bg-emerald-400'
            }`} />
          </div>

          <div>
            <h3 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl flex items-center gap-2">
              <span>{displayName}</span>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30 font-mono">
                MORA
              </span>
            </h3>
            <p className="text-sm text-indigo-300 font-medium font-mono">{username}</p>
          </div>
        </div>

        <a
          href={`https://discord.com/users/${discordUserId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
        >
          <span>Buka Profil Discord Asli</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Bio & Details Quote */}
      <div className="bg-purple-950/40 p-4 rounded-2xl border border-purple-500/20 text-sm text-purple-200 font-mono space-y-1.5">
        <p className="text-amber-300 font-bold text-base">" kyaaa.....(≧▽≦) "</p>
        <p className="text-gray-300 text-xs sm:text-sm">Greetings, I'm from Indonesia...!!! #OC_Expert #Animator_MV</p>
        <div className="text-xs text-purple-400 pt-1 flex flex-wrap items-center gap-3">
          <span>Member Since: Oct 10, 2021</span>
          <span>•</span>
          <span>Roles: Admin</span>
        </div>
      </div>

      {/* DUAL ACTIVITIES: VS CODE + SPOTIFY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* VS Code Activity */}
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
            <Code className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-0.5">Current Activity</div>
            <h5 className="font-bold text-white text-sm sm:text-base line-clamp-1">
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
        <div className="bg-white/5 p-4 rounded-2xl border border-emerald-500/30 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Music className="w-6 h-6 animate-spin" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Listening to Spotify</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">LIVE</span>
            </div>
            <h5 className="font-bold text-white text-sm sm:text-base line-clamp-1">
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

      {/* Recent Activity Log */}
      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Gamepad2 className="w-4 h-4 text-indigo-400" /> Recent Gaming & App History
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recentGames.map((game, idx) => (
            <div key={idx} className="bg-black/40 p-3 rounded-xl border border-white/5 text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{game.icon}</span>
                <span className="line-clamp-1">{game.name}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1">{game.time}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
