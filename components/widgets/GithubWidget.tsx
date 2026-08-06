'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitBranch, Star, Users, ChevronDown, X, FolderGit2 } from 'lucide-react'

interface GithubWidgetProps {
  username: string
  isExpanded?: boolean
  onToggle?: () => void
}

export default function GithubWidget({
  username,
  isExpanded = false,
  onToggle,
}: GithubWidgetProps) {
  const [githubData, setGithubData] = useState<{ repos: number; followers: number; avatar: string }>({
    repos: 19,
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
            followers: data.followers || 4,
            avatar: data.avatar_url || `https://github.com/${username}.png`,
          })
        }
      } catch (err) {
        // Fallback
      }
    }
    fetchGithub()
  }, [username])

  const featuredRepos = [
    { name: 'portfolio', desc: 'Modern Developer Portfolio Web App (Next.js & Tailwind)', stars: 5, lang: 'TypeScript' },
    { name: 'andora-wami-ex-main', desc: 'Server Management & High Performance Core Suite', stars: 8, lang: 'PHP & C++' },
    { name: 'rama-store-main', desc: 'E-Commerce Platform & Integrated Storefront Backend', stars: 4, lang: 'JavaScript' },
  ]

  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
        isExpanded ? 'col-span-2 lg:col-span-4 ring-2 ring-emerald-500/50 bg-emerald-950/40' : ''
      }`}
    >
      {/* Top Banner / Cover */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-emerald-900/80 via-teal-900/80 to-cyan-900/80 border-b border-white/10" />

      <div className="relative z-10 pt-1">
        <div className="flex items-center justify-between mb-2">
          <img
            src={githubData.avatar}
            alt="GitHub Profile Avatar"
            className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400/80 shadow-lg"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/35 bg-emerald-500/15 text-emerald-300">
              {githubData.repos}+ Public Repos
            </span>
            {isExpanded && (
              <span className="p-1 bg-white/10 rounded-full text-gray-300 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug flex items-center gap-1.5 line-clamp-1">
          <span>@{username} • GitHub Developer</span>
        </h4>
        <p className="text-[10px] text-emerald-300 font-medium font-mono">Open Source & Active Repositories</p>
      </div>

      {/* COMPACT VIEW SUMMARY */}
      {!isExpanded && (
        <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
              <FolderGit2 className="w-3 h-3 text-emerald-400" /> Live Activity
            </span>
            <span className="text-[9px] text-emerald-400 font-mono font-semibold flex items-center gap-0.5">
              Klik Tampilan Penuh <ChevronDown className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] font-bold text-white line-clamp-1">
            {githubData.repos} Public Repositories • {githubData.followers} Followers
          </p>
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
            {/* Header Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-[10px] font-bold text-emerald-300 uppercase">Public Repositories</div>
                <div className="text-lg font-extrabold text-white mt-0.5">{githubData.repos} Repos</div>
                <div className="text-[9px] text-gray-400">Open Source Codebases</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-[10px] font-bold text-emerald-300 uppercase">GitHub Followers</div>
                <div className="text-lg font-extrabold text-white mt-0.5">{githubData.followers} Followers</div>
                <div className="text-[9px] text-gray-400">Developer Network</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-[10px] font-bold text-emerald-300 uppercase">Contributions</div>
                <div className="text-lg font-extrabold text-white mt-0.5">Active Commits</div>
                <div className="text-[9px] text-gray-400">Consistent GitHub Activity</div>
              </div>
            </div>

            {/* Featured Repositories List */}
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-2.5">
              <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400" /> Featured Repositories
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {featuredRepos.map((repo, idx) => (
                  <div key={idx} className="bg-black/30 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span className="text-emerald-300 line-clamp-1">{repo.name}</span>
                        <span className="text-[10px] text-amber-300 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" /> {repo.stars}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-300 line-clamp-2">{repo.desc}</p>
                    </div>
                    <div className="text-[9px] text-emerald-400 font-mono mt-2 pt-1 border-t border-white/5">
                      {repo.lang}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons inside Expanded View */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/30"
              >
                <span>Buka Profil GitHub Asli</span>
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
