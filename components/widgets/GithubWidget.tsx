'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, GitBranch, Star, ChevronRight, X, FolderGit2 } from 'lucide-react'

interface GithubWidgetProps {
  username: string
  onOpenModal?: () => void
}

export default function GithubWidget({
  username,
  onOpenModal,
}: GithubWidgetProps) {
  const [githubData, setGithubData] = useState<{ repos: number; followers: number; avatar: string }>({
    repos: 19,
    followers: 4,
    avatar: `https://github.com/${username}.png`,
  })

  useEffect(() => {
    if (!username) return
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setGithubData({
            repos: data.public_repos,
            followers: data.followers || 4,
            avatar: data.avatar_url || `https://github.com/${username}.png`,
          })
        }
      })
      .catch(() => {})
  }, [username])

  return (
    <motion.div
      onClick={onOpenModal}
      className="glass-card rounded-2xl p-3.5 sm:p-4 text-left border border-white/10 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -4, scale: 1.01 }}
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
          <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/35 bg-emerald-500/15 text-emerald-300">
            {githubData.repos}+ Public Repos
          </span>
        </div>

        <h4 className="font-bold text-white text-xs sm:text-sm md:text-base leading-snug flex items-center gap-1.5 line-clamp-1">
          <span>@{username} • GitHub Developer</span>
        </h4>
        <p className="text-[10px] text-emerald-300 font-medium font-mono">Open Source & Active Repositories</p>
      </div>

      {/* Compact Activity Card */}
      <div className="relative z-10 mt-3 pt-2 border-t border-white/10 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
            <FolderGit2 className="w-3 h-3 text-emerald-400" /> Live Activity
          </span>
          <span className="text-[9px] text-emerald-400 font-mono font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Detail <ChevronRight className="w-3 h-3" />
          </span>
        </div>
        <p className="text-[11px] font-bold text-white line-clamp-1">
          {githubData.repos} Public Repositories • {githubData.followers} Followers
        </p>
      </div>
    </motion.div>
  )
}

/* Full GitHub Modal Component (Clean & Mobile Safe) */
export function GithubModalContent({
  username,
  onClose,
}: {
  username: string
  onClose: () => void
}) {
  const [githubData, setGithubData] = useState<{ repos: number; followers: number; avatar: string }>({
    repos: 19,
    followers: 4,
    avatar: `https://github.com/${username}.png`,
  })

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setGithubData({
            repos: data.public_repos,
            followers: data.followers || 4,
            avatar: data.avatar_url || `https://github.com/${username}.png`,
          })
        }
      })
      .catch(() => {})
  }, [username])

  const featuredRepos = [
    { name: 'portfolio', desc: 'Modern Developer Portfolio Web App (Next.js & Tailwind)', stars: 5, lang: 'TypeScript' },
    { name: 'andora-wami-ex-main', desc: 'Server Management & High Performance Core Suite', stars: 8, lang: 'PHP & C++' },
    { name: 'rama-store-main', desc: 'E-Commerce Platform & Integrated Storefront Backend', stars: 4, lang: 'JavaScript' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[#0f101d] rounded-3xl p-4 sm:p-6 md:p-8 max-w-3xl w-full text-left border border-emerald-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden space-y-4 sm:space-y-5 max-h-[82vh] overflow-y-auto"
    >
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 border-b border-white/10" />

      {/* Sticky Close Button (Safe for Mobile Address Bars) */}
      <button
        onClick={onClose}
        className="sticky top-2 float-right z-50 p-2.5 rounded-full bg-black/80 border border-white/20 text-gray-200 hover:text-white hover:bg-black transition-all shadow-lg"
        title="Tutup"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Section */}
      <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 clear-right">
        <div className="flex items-center gap-4">
          <img
            src={githubData.avatar}
            alt="GitHub Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-gray-950 shadow-2xl relative z-10"
          />
          <div>
            <h3 className="font-extrabold text-white text-base sm:text-xl md:text-2xl">
              @{username} • GitHub Developer Profile
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300 font-medium font-mono">Open Source & Active Repositories</p>
          </div>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/30"
        >
          <span>Buka Profil GitHub Asli</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Stats Header Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase">Public Repositories</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 sm:mt-1">{githubData.repos} Repos</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Open Source Codebases</div>
        </div>
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase">GitHub Followers</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 sm:mt-1">{githubData.followers} Followers</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Developer Network</div>
        </div>
        <div className="bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase">Contributions</div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 sm:mt-1">Active Commits</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Consistent GitHub Activity</div>
        </div>
      </div>

      {/* Featured Repositories List */}
      <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
        <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
          <GitBranch className="w-4 h-4 text-emerald-400" /> Featured Repositories
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {featuredRepos.map((repo, idx) => (
            <div key={idx} className="bg-black/40 p-3.5 sm:p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
                  <span className="text-emerald-300 line-clamp-1">{repo.name}</span>
                  <span className="text-[10px] text-amber-300 flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> {repo.stars}
                  </span>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2">{repo.desc}</p>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-3 pt-2 border-t border-white/5">
                {repo.lang}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
