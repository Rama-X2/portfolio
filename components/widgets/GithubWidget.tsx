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
      className="bg-gradient-to-br from-[#1b1e38] via-[#15172d] to-[#111324] rounded-2xl text-left border border-emerald-500/30 hover:border-emerald-500/70 hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      whileHover={{ y: -3 }}
    >
      {/* Vermilion GFX Wavy Emerald Header Cover */}
      <div className="relative h-16 w-full bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-950 overflow-hidden border-b border-emerald-500/30">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-8 text-[#15172d] fill-current" viewBox="0 0 1440 320">
          <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="absolute top-2 right-3">
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border border-emerald-500/50 bg-emerald-950/80 text-emerald-300 backdrop-blur-md">
            {githubData.repos}+ REPOS ✦
          </span>
        </div>
      </div>

      <div className="relative z-10 px-4 pb-4 -mt-7">
        <div className="flex items-end justify-between mb-3">
          <div className="flex items-end gap-3">
            <img
              src={githubData.avatar}
              alt="GitHub Profile Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/80 shadow-lg relative z-10"
            />
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm leading-snug flex items-center gap-1.5 line-clamp-1">
                <span>@{username}</span>
              </h4>
              <p className="text-[10px] text-emerald-300 font-mono">GitHub Developer</p>
            </div>
          </div>
        </div>

        {/* Activity Info Box */}
        <div className="bg-[#121427]/95 p-3 rounded-xl border border-emerald-500/25 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <GitHubLogo /> LIVE REPOSITORIES
            </span>
            <span className="text-[9px] text-emerald-300 font-mono font-semibold flex items-center gap-0.5 group-hover:text-emerald-200 transition-colors">
              Detail ✦
            </span>
          </div>
          <p className="text-[11px] font-bold text-white line-clamp-1">
            {githubData.repos} Public Repositories • {githubData.followers} Followers
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* Full GitHub Modal Component (Arknights GFX Vermilion Style) */
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
      className="bg-gradient-to-b from-[#1c1d3b] via-[#14162e] to-[#0f1124] rounded-3xl text-left border border-emerald-500/50 shadow-[0_25px_70px_rgba(16,185,129,0.3)] relative overflow-hidden max-h-[82vh] overflow-y-auto"
    >
      {/* Top Vermilion GFX Header Cover */}
      <div className="relative h-28 w-full bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-950 overflow-hidden border-b border-emerald-500/40">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-12 text-[#1c1d3b] fill-current" viewBox="0 0 1440 320">
          <path d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,165.3C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-2.5 rounded-full bg-black/80 border border-white/20 text-gray-200 hover:text-white hover:bg-black transition-all shadow-lg"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 pb-6 sm:px-8 sm:pb-8 -mt-14 space-y-5 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <img
              src={githubData.avatar}
              alt="GitHub Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#1c1d3b] shadow-2xl relative z-10"
            />
            <div>
              <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">// OPEN SOURCE CODE SUITE</div>
              <h3 className="font-extrabold text-white text-lg sm:text-2xl">
                @{username} • GitHub Developer Profile
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300 font-medium font-mono">Open Source & Active Repositories</p>
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

        {/* Stats Header Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121429]/90 p-4 rounded-2xl border border-emerald-500/30">
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">// PUBLIC REPOSITORIES</div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-1">{githubData.repos} Repos</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Open Source Codebases</div>
          </div>
          <div className="bg-[#121429]/90 p-4 rounded-2xl border border-emerald-500/30">
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">// GITHUB FOLLOWERS</div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-1">{githubData.followers} Followers</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Developer Network</div>
          </div>
          <div className="bg-[#121429]/90 p-4 rounded-2xl border border-emerald-500/30">
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">// CONTRIBUTIONS</div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-1">Active Commits</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Consistent GitHub Activity</div>
          </div>
        </div>

        {/* Featured Repositories List */}
        <div className="bg-[#121429]/90 p-4 sm:p-5 rounded-2xl border border-emerald-500/30 space-y-3">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-emerald-400" /> // FEATURED REPOSITORIES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredRepos.map((repo, idx) => (
              <div key={idx} className="bg-[#0b0d1e] p-3.5 rounded-xl border border-white/10 flex flex-col justify-between">
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
      </div>
    </motion.div>
  )
}
