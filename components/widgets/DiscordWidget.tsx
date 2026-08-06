'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Music, Code, Gamepad2, Sparkles, CheckCircle2, ChevronDown, X } from 'lucide-react'

interface DiscordWidgetProps {
  discordUserId: string
  avatarFallback: string
  isExpanded?: boolean
  onToggle?: () => void
}

export default function DiscordWidget({
  discordUserId,
  avatarFallback,
  isExpanded = false,
  onToggle,
}: DiscordWidgetProps) {
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

  // Spotify presence
  const spotify = lanyardData?.spotify
  const isListeningSpotify = lanyardData?.listening_to_spotify && spotify

  // Activities (VS Code, Games, etc.)
  const nonCustomActivities = lanyardData?.activities?.filter((act: any) => act.type !== 4) || []
  const vsCodeActivity = nonCustomActivities.find((act: any) => act.name.toLowerCase().includes('visual studio code')) || nonCustomActivities[0]

  // Recent Activity Fallback (Forza, Arknights, Minecraft)
  const recentGames = [
    { name: 'Forza Horizon 4', time: '2d ago', icon: '🏎️' },
    { name: 'Arknights:Endfield', time: '3d ago', icon: '⚔️' },
    { name: 'Minecraft', time: '9d ago • Trending', icon: '🟩' },
  ]

  const statusColor = status === 'dnd'
    ? 'bg-red-500 border-red-500/35 bg-red-500/15 text-red-400'
    : status === 'idle'
    ? 'bg-amber-400 border-amber-500/35 bg-amber-500/15 text-amber-400'
    : status === 'online'
    ? 'bg-emerald-400 border-emerald-500/35 bg-emerald-500/15 text-emerald-400'
    : 'bg-indigo-400 border-indigo-500/35 bg-indigo-500/15 text-indigo-300'

  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
        isExpanded ? 'col-span-2 lg:col-span-4 ring-2 ring-indigo-500/50 bg-indigo-950/40' : ''
      }`}
    >
      {/* Top Banner / Cover */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-pink-900/80 border-b border-white/10" />

      <div className="relative z-10 pt-1">
        <div className="flex items-center justify-between mb-2">
          {/* Avatar with Purple Witch Hat Overlay */}
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Discord Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-indigo-400/80 shadow-lg relative z-10"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
            />
            {/* Purple Witch Hat Skin Overlay */}
            <svg
              className="absolute -top-3 -left-3 w-12 h-12 z-20 pointer-events-none drop-shadow-[0_2px_8px_rgba(168,85,247,0.8)]"
              viewBox="0 0 100 100"
              fill="none"
            >
              {/* Hat Brim & Crown */}
              <path
                d="M10,75 C25,70 75,70 90,75 C80,68 65,65 58,50 C52,35 48,15 45,5 C42,20 38,40 32,55 C25,65 15,70 10,75 Z"
                fill="#7e22ce"
                stroke="#c084fc"
                strokeWidth="3"
              />
              {/* Ribbon */}
              <path d="M30,58 C40,55 60,55 70,58 L68,64 C58,61 40,61 32,64 Z" fill="#ec4899" />
              {/* Star Gem */}
              <circle cx="50" cy="59" r="4" fill="#fde047" />
            </svg>

            {/* Status Dot */}
            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-gray-950 z-30 ${
              status === 'dnd'
                ? 'bg-red-500'
                : status === 'idle'
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`} />
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${statusColor}`}>
              {status.toUpperCase()}
            </span>
            {isExpanded && (
              <span className="p-1 bg-white/10 rounded-full text-gray-300 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>

        {/* User Info & Badges */}
        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug flex items-center gap-1.5 line-clamp-1">
          <span>{displayName}</span>
          <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 font-mono">
            MORA
          </span>
        </h4>
        <p className="text-[10px] text-indigo-300 font-medium font-mono">{username}</p>
      </div>

      {/* COMPACT VIEW SUMMARY */}
      {!isExpanded && (
        <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
              {isListeningSpotify ? <Music className="w-3 h-3 text-emerald-400 animate-spin" /> : <Code className="w-3 h-3 text-indigo-400" />}
              {isListeningSpotify ? 'Spotify' : vsCodeActivity ? vsCodeActivity.name : 'Discord RPC'}
            </span>
            <span className="text-[9px] text-emerald-400 font-mono font-semibold flex items-center gap-0.5">
              Klik Tampilan Penuh <ChevronDown className="w-3 h-3" />
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
            {/* Bio & Discord Status Quote */}
            <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-500/20 text-xs text-purple-200 font-mono space-y-1">
              <p className="text-amber-300 font-bold">" kyaaa.....(≧▽≦) "</p>
              <p className="text-gray-300 text-[11px]">Greetings, I'm from Indonesia...!!! #OC_Expert #Animator_MV</p>
              <div className="text-[10px] text-purple-400 pt-1 flex items-center gap-2">
                <span>Member Since: Oct 10, 2021</span>
                <span>•</span>
                <span>Roles: Admin</span>
              </div>
            </div>

            {/* DUAL ACTIVITIES: VS CODE + SPOTIFY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Activity 1: VS Code / Game */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Code className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-0.5">Current Activity</div>
                  <h5 className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                    {vsCodeActivity?.name || 'Visual Studio Code'}
                  </h5>
                  <p className="text-[11px] text-gray-300 line-clamp-1">
                    {vsCodeActivity?.details || 'Editing users.py'}
                  </p>
                  <p className="text-[10px] text-gray-400 line-clamp-1 font-mono">
                    {vsCodeActivity?.state || 'Workspace: andora-wami-ex-main'}
                  </p>
                </div>
              </div>

              {/* Activity 2: Spotify Live Music */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-emerald-500/30 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Music className="w-5 h-5 animate-spin" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Listening to Spotify</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">LIVE</span>
                  </div>
                  <h5 className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                    {spotify?.song || '昨日繁华 (BLUE MOON)'}
                  </h5>
                  <p className="text-[11px] text-emerald-300 line-clamp-1 font-medium">
                    {spotify?.artist || 'Sān-Z, HOYO-MiX'}
                  </p>
                  {/* Music Progress Bar */}
                  <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full w-2/3 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities Log */}
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" /> Recent Gaming & App History
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {recentGames.map((game, idx) => (
                  <div key={idx} className="bg-black/30 p-2 rounded-lg border border-white/5 text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{game.icon}</span>
                      <span className="line-clamp-1">{game.name}</span>
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">{game.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons inside Expanded View */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`https://discord.com/users/${discordUserId}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
              >
                <span>Buka Profil Discord Asli</span>
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
