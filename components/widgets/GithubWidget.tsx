'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, GitBranch, Star, ChevronRight, X } from 'lucide-react'

interface GithubWidgetProps {
  username: string
  onOpenModal?: () => void
}

// Official GitHub SVG Logo
const GitHubLogo = () => (
  <svg className="w-4 h-4 fill-emerald-400 flex-shrink-0" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

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
      className="bg-gradient-to-br from-[#1b1e39] via-[#14162d] to-[#0f1124] rounded-2xl p-4 sm:p-4.5 border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.25)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      <div>
        {/* Header Row (Profile + Repos Badge - Zero Black Lines) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={githubData.avatar}
              alt="GitHub Profile Avatar"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-emerald-400/80 shadow-md relative z-10 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-white text-xs sm:text-sm leading-tight truncate">
                @{username}
              </h4>
              <p className="text-[11px] text-emerald-300/80 font-mono truncate mt-0.5">GitHub Developer</p>
            </div>
          </div>

          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 flex-shrink-0">
            {githubData.repos}+ REPOS ✦
          </span>
        </div>

        {/* Activity Info Box */}
        <div className="bg-[#121429]/95 p-3 rounded-xl border border-white/10 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 truncate">
              <GitHubLogo /> LIVE REPOSITORIES
            </span>
            <span className="text-[9px] text-emerald-300 font-mono font-semibold flex items-center gap-0.5 group-hover:text-emerald-200 transition-colors flex-shrink-0 ml-1">
              Detail ✦
            </span>
          </div>
          <p className="text-xs font-bold text-white truncate">
            {githubData.repos} Public Repositories • {githubData.followers} Followers
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* Full GitHub Modal Component (Arknights GFX Vermilion Style - Zero Black Lines) */
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
      className="bg-gradient-to-b from-[#1c1d3b] via-[#14162e] to-[#0f1124] rounded-3xl p-5 sm:p-8 border border-emerald-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative overflow-hidden max-h-[82vh] overflow-y-auto space-y-5"
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
          <img
            src={githubData.avatar}
            alt="GitHub Avatar"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-emerald-400/80 shadow-2xl relative z-10 flex-shrink-0"
          />
          <div>
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">// OPEN SOURCE CODE SUITE</div>
            <h3 className="font-extrabold text-white text-lg sm:text-2xl mt-0.5">
              @{username} • GitHub Developer Profile
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300 font-medium font-mono mt-0.5">Open Source & Active Repositories</p>
          </div>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/30"
        >
          <span>Buka Profil GitHub Asli</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Dynamic Animated Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-gradient-to-br from-emerald-950/60 to-teal-950/60 p-4 rounded-2xl border border-emerald-500/40 relative overflow-hidden group">
          <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center justify-between">
            <span>// PUBLIC REPOSITORIES</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-1">{githubData.repos} Repos</div>
          <div className="text-[10px] text-gray-300 mt-0.5">Open Source Codebases</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-950/60 to-teal-950/60 p-4 rounded-2xl border border-emerald-500/40 relative overflow-hidden group">
          <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center justify-between">
            <span>// GITHUB FOLLOWERS</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-1">{githubData.followers} Followers</div>
          <div className="text-[10px] text-gray-300 mt-0.5">Developer Network</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-950/60 to-teal-950/60 p-4 rounded-2xl border border-emerald-500/40 relative overflow-hidden group">
          <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center justify-between">
            <span>// CONTRIBUTIONS</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-white mt-1">Active Commits</div>
          <div className="text-[10px] text-gray-300 mt-0.5">Consistent GitHub Activity</div>
        </div>
      </div>

      {/* Featured Repositories List */}
      <div className="bg-[#121429]/90 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
        <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
          <GitBranch className="w-4 h-4 text-emerald-400" /> // FEATURED REPOSITORIES
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {featuredRepos.map((repo, idx) => (
            <div key={idx} className="bg-[#0b0d1e] p-3.5 rounded-xl text-left flex flex-col justify-between border border-white/5">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
                  <span className="text-emerald-300 line-clamp-1">{repo.name}</span>
                  <span className="text-[10px] text-amber-300 flex items-center gap-0.5 font-mono">
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
