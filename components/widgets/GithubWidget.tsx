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
      className="glass-card rounded-2xl p-3.5 sm:p-4 md:p-4.5 text-left border border-white/10 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.36 }}
      whileHover={{ y: -3 }}
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <img
            src={githubData.avatar}
            alt="GitHub Profile Avatar"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-emerald-500/40 shadow-md"
          />
          <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/35 bg-emerald-500/15 text-emerald-300">
            {githubData.repos}+ Repos
          </span>
        </div>
        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug flex items-center gap-1 line-clamp-1">
          <span>@{username}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400 flex-shrink-0" />
        </h4>
      </div>
      <div className="mt-2.5 pt-2 border-t border-white/10">
        <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-0.5">GitHub Developer</div>
        <p className="text-[11px] sm:text-xs text-gray-200 font-medium line-clamp-1">
          {githubData.repos} Public Repositories
        </p>
        <p className="text-[10px] text-gray-400 line-clamp-1">
          {githubData.followers} Followers • Active Code
        </p>
      </div>
    </motion.a>
  )
}
