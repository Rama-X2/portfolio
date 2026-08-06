'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ChevronRight, X, Car, Box, Gamepad2 } from 'lucide-react'

interface DiscordWidgetProps {
  discordUserId: string
  avatarFallback: string
  onOpenModal?: () => void
}

// Official SVG Logos
const SpotifyLogo = () => (
  <svg className="w-4 h-4 fill-emerald-400 flex-shrink-0" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.302c-.218.358-.683.472-1.04.254-2.857-1.746-6.455-2.14-10.692-1.171-.405.093-.812-.162-.905-.567-.093-.406.162-.812.567-.905 4.636-1.06 8.608-.611 11.815 1.349.358.218.472.683.255 1.04zm1.467-3.262c-.274.446-.857.588-1.303.313-3.268-2.008-8.25-2.592-12.115-1.419-.5.152-1.033-.131-1.185-.632-.152-.5.131-1.032.632-1.184 4.414-1.34 9.907-.687 13.658 1.619.446.275.588.857.313 1.303zm.126-3.41c-3.918-2.327-10.375-2.541-14.129-1.401-.613.186-1.264-.165-1.45-.778-.186-.613.165-1.264.778-1.45 4.31-1.308 11.436-1.05 15.938 1.621.552.327.734 1.045.407 1.597-.327.551-1.045.733-1.544.411z"/>
  </svg>
)

const VSCodeLogo = () => (
  <svg className="w-5 h-5 fill-blue-400 flex-shrink-0" viewBox="0 0 24 24">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.12a.999.999 0 0 0-1.276.064L.327 7.297a.998.998 0 0 0 .043 1.456l3.87 3.247-3.87 3.247a.998.998 0 0 0-.043 1.456l1.322 1.223c.365.338.932.364 1.276.064l4.12-3.12 9.46 8.63c.47.43 1.156.54 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.146V3.854a1.5 1.5 0 0 0-.85-1.267zM18 16.5L11.5 12 18 7.5v9z"/>
  </svg>
)

const YouTubeLogo = () => (
  <svg className="w-5 h-5 fill-red-500 flex-shrink-0" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

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
        if (json?.success && json.data) {
          setLanyardData(json.data)
        }
      } catch (err) {}
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
                  d: { subscribe_to_id: discordUserId },
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
        } catch (err) {}
      }
    } catch (err) {}

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

  const isListeningSpotify = Boolean(lanyardData?.listening_to_spotify && lanyardData?.spotify)
  const spotify = isListeningSpotify ? lanyardData?.spotify : null

  const nonCustomActivities = lanyardData?.activities?.filter((act: any) => act.type !== 4) || []
  const vsCodeActivity = nonCustomActivities.find((act: any) => act.name.toLowerCase().includes('visual studio code')) || nonCustomActivities[0]
  const youtubeActivity = nonCustomActivities.find((act: any) => act.name.toLowerCase().includes('youtube'))

  const statusColor = status === 'dnd'
    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
    : status === 'idle'
    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
    : status === 'online'
    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
    : 'bg-purple-500/20 border-purple-500/40 text-purple-300'

  return (
    <motion.div
      onClick={onOpenModal}
      className="bg-gradient-to-br from-[#1b1e39] via-[#14162d] to-[#0f1124] rounded-2xl p-4 sm:p-4.5 border border-white/10 hover:border-rose-500/50 hover:shadow-[0_8px_30px_rgba(244,63,94,0.25)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      <div>
        {/* Header Row (Profile + Status Badge - Zero Black Lines) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={avatarUrl}
                alt="Discord Avatar"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-rose-500/80 shadow-md relative z-10"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', avatarFallback)
                }}
              />
              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#14162d] z-20 ${
                status === 'dnd' ? 'bg-rose-500' : status === 'idle' ? 'bg-amber-400' : 'bg-emerald-400'
              }`} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-white text-xs sm:text-sm leading-tight truncate">
                {displayName}
              </h4>
              <p className="text-[11px] text-rose-300/80 font-mono truncate mt-0.5">{username}</p>
            </div>
          </div>

          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider flex-shrink-0 ${statusColor}`}>
            {status.toUpperCase()} ✦
          </span>
        </div>

        {/* Realtime Activity Card Box */}
        <div className="bg-[#121429]/95 p-3 rounded-xl border border-white/10 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 truncate">
              {isListeningSpotify ? (
                <>
                  <SpotifyLogo /> SPOTIFY LIVE
                </>
              ) : youtubeActivity ? (
                <>
                  <YouTubeLogo /> YOUTUBE
                </>
              ) : (
                <>
                  <VSCodeLogo /> {vsCodeActivity ? vsCodeActivity.name.toUpperCase() : 'VS CODE ACTIVITY'}
                </>
              )}
            </span>
            <span className="text-[9px] text-rose-300 font-mono font-semibold flex items-center gap-0.5 group-hover:text-rose-200 transition-colors flex-shrink-0 ml-1">
              Detail ✦
            </span>
          </div>

          {isListeningSpotify ? (
            <p className="text-xs font-bold text-white truncate">
              {spotify.song} • <span className="text-emerald-300 font-normal">{spotify.artist}</span>
            </p>
          ) : vsCodeActivity ? (
            <div className="flex items-center justify-between text-xs">
              <p className="font-bold text-white truncate">
                {vsCodeActivity.details || vsCodeActivity.name}
              </p>
              <span className="text-[10px] text-rose-300 font-mono ml-1.5 flex-shrink-0">
                Editing team.md
              </span>
            </div>
          ) : (
            <p className="text-xs font-bold text-white truncate">
              Visual Studio Code Active Work
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* Full Discord Rich Profile Modal Component (Arknights GFX Vermilion Style - Seamless Zero Black Lines) */
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
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(474)

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.success) setLanyardData(json.data)
      })
      .catch(() => {})

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [discordUserId])

  const formatElapsed = (sec: number) => {
    const hrs = Math.floor(sec / 3600)
    const mins = Math.floor((sec % 3600) / 60)
    const secs = sec % 60
    return `${hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const status = lanyardData?.discord_status || 'online'
  const discordUser = lanyardData?.discord_user
  const username = discordUser?.username ? `@${discordUser.username}` : '@rama_ext'
  const displayName = discordUser?.global_name || 'Rama-X2 『 Sukabumi 』'

  const avatarUrl = discordUser?.id && discordUser?.avatar
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`
    : 'https://github.com/Rama-X2.png'

  const isListeningSpotify = Boolean(lanyardData?.listening_to_spotify && lanyardData?.spotify)
  const spotify = isListeningSpotify ? lanyardData?.spotify : null

  const nonCustomActivities = lanyardData?.activities?.filter((act: any) => act.type !== 4) || []
  const vsCodeActivity = nonCustomActivities.find((act: any) => act.name.toLowerCase().includes('visual studio code')) || nonCustomActivities[0]

  const recentGames = [
    { name: 'Forza Horizon 4', time: '2d ago', icon: Car, color: 'text-rose-400' },
    { name: 'Arknights:Endfield', time: '3d ago', icon: Gamepad2, color: 'text-purple-400' },
    { name: 'Minecraft', time: '9d ago • Trending', icon: Box, color: 'text-emerald-400' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-gradient-to-b from-[#1c1d3b] via-[#14162e] to-[#0f1124] rounded-3xl p-5 sm:p-8 border border-rose-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative overflow-hidden max-h-[82vh] overflow-y-auto space-y-5"
    >
      {/* Kotak Edge Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl transition-all shadow-md"
        title="Tutup"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Profile Section (Zero Black Banner Strips) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt="Discord Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-rose-500/80 shadow-2xl relative z-10"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', avatarFallback)
              }}
            />
            <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-[#14162e] z-30 ${
              status === 'dnd' ? 'bg-rose-500' : status === 'idle' ? 'bg-amber-400' : 'bg-emerald-400'
            }`} />
          </div>

          <div>
            <div className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest">// ARKNIGHTS OPERATOR PRESENCE</div>
            <h3 className="font-extrabold text-white text-lg sm:text-2xl flex items-center gap-2 mt-0.5">
              <span>{displayName}</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30 font-mono">
                MORA
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-indigo-300 font-medium font-mono mt-0.5">{username}</p>
          </div>
        </div>

        <a
          href={`https://discord.com/users/${discordUserId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-rose-600/30"
        >
          <span>Buka Profil Discord Asli</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Bio & Details Quote */}
      <div className="bg-[#121429]/90 p-4 rounded-2xl text-xs sm:text-sm text-purple-200 font-mono space-y-1.5 border border-white/10">
        <p className="text-amber-300 font-bold text-sm sm:text-base">" kyaaa.....(≧▽≦) "</p>
        <p className="text-gray-300 text-xs sm:text-sm">Greetings, I'm from Indonesia...!!! #OC_Expert #Animator_MV</p>
        <div className="text-[11px] sm:text-xs text-rose-300 pt-1 flex flex-wrap items-center gap-3">
          <span>Member Since: Oct 10, 2021</span>
          <span>•</span>
          <span>Roles: Admin</span>
        </div>
      </div>

      {/* DYNAMIC REALTIME ANIMATED CURRENT ACTIVITY CARD */}
      <div className={`grid grid-cols-1 ${isListeningSpotify ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {/* VS Code Realtime Animated Activity Card */}
        <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-purple-950/80 p-4 rounded-2xl border border-blue-500/40 flex items-start gap-3.5 shadow-lg relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0 relative">
            <VSCodeLogo />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> // CURRENT ACTIVITY
              </span>
              <span className="text-[10px] font-mono font-extrabold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
                {formatElapsed(elapsedSeconds)}
              </span>
            </div>

            <h5 className="font-bold text-white text-sm sm:text-base line-clamp-1 mt-0.5">
              {vsCodeActivity?.name || 'Visual Studio Code'}
            </h5>
            <p className="text-xs text-blue-200 line-clamp-1 font-medium">
              {vsCodeActivity?.details || 'Editing env.py'}
            </p>
            <p className="text-[11px] text-gray-400 line-clamp-1 font-mono mt-0.5">
              {vsCodeActivity?.state || 'Workspace: andora-wami-ex-main'}
            </p>
          </div>
        </div>

        {/* Spotify Live Music ONLY IF LISTENING */}
        {isListeningSpotify && (
          <div className="bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-cyan-950/80 p-4 rounded-2xl border border-emerald-500/40 flex items-start gap-3.5 shadow-lg relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 relative">
              <SpotifyLogo />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">// SPOTIFY MUSIC</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">LIVE</span>
              </div>
              <h5 className="font-bold text-white text-sm sm:text-base line-clamp-1">
                {spotify?.song || 'BLUE MOON'}
              </h5>
              <p className="text-xs text-emerald-300 line-clamp-1 font-medium">
                by {spotify?.artist || 'Slana'}
              </p>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full w-2/3 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity Log */}
      <div className="bg-[#121429]/90 p-4 rounded-2xl border border-white/10 space-y-2">
        <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
          // RECENT GAMING & APPLICATION LOGS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recentGames.map((game, idx) => {
            const IconComponent = game.icon
            return (
              <div key={idx} className="bg-[#0b0d1e] p-3.5 rounded-xl text-left flex items-start gap-3 border border-white/5">
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
