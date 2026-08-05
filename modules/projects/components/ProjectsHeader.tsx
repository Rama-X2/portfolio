'use client'

import { Folder } from 'lucide-react'

interface ProjectsHeaderProps {
  t: any
}

export default function ProjectsHeader({ t }: ProjectsHeaderProps) {
  return (
    <div className="glass-card rounded-2xl p-5 md:p-6 border border-white/10">
      <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
      <h2 className="text-2xl md:text-3xl font-extrabold gradient-text flex items-center gap-2.5 mb-1">
        <Folder className="w-6 h-6 text-emerald-400" /> {t.projectsSec.title}
      </h2>
      <p className="text-xs md:text-sm text-gray-400">{t.projectsSec.subtitle}</p>
    </div>
  )
}
