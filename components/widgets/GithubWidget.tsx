'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface GithubWidgetProps {
  username: string
}

export default function GithubWidget({ username }: GithubWidgetProps) {
  const [githubData, setGithubData] = useState<{ repos: number; followers: number; avatar: string }>({
    repos: 15,
    followers: 4,
    avatar: `https://github.com/${username}.png`,
  })

  useEffect(() => {
    if (!username) return
    const fetchGithub = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        const data = await res.json()
        if (data && data.public_repos !== undefined) {
          setGithubData({
            repos: data.public_repos,
            followers: data.followers || 0,
            avatar: data.avatar_url || `https://github.com/${username}.png`,
          })
        }
      } catch (err) {
        // Fallback
      }
    }
    fetchGithub()
  }, [username])

  return (
    <motion.a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.36 }}
      whileHover={{ y: -3 }}
    >
      {/* Top Banner / Cover */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-emerald-900/60 via-teal-900/60 to-cyan-900/60 border-b border-white/10" />

      <div className="relative z-10 pt-2">
        <div className="flex items-center justify-between mb-2">
          <img
            src={githubData.avatar}
            alt="GitHub Profile Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400/80 shadow-lg"
          />
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/35 bg-emerald-500/15 text-emerald-300">
            {githubData.repos}+ Repos
          </span>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1 line-clamp-1">
          <span>@{username}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400 flex-shrink-0" />
        </h4>
        <p className="text-[10px] text-emerald-300 font-medium font-mono">GitHub Developer</p>
      </div>

      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2 rounded-xl border border-white/5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Live Activity</span>
          <span className="text-[9px] text-emerald-400 font-mono font-semibold">Active Code</span>
        </div>
        <p className="text-[11px] font-bold text-white line-clamp-1">
          {githubData.repos} Public Repositories
        </p>
        <p className="text-[10px] text-gray-300 line-clamp-1 font-medium">
          {githubData.followers} Followers • Open Source
        </p>
      </div>
    </motion.a>
  )
}
