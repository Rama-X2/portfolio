'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Globe } from 'lucide-react'
import { PersonalInfo } from '../../../common/types'

interface SocialLinksCardProps {
  personal: PersonalInfo
  t: any
}

export default function SocialLinksCard({ personal, t }: SocialLinksCardProps) {
  const socials = [
    { icon: Github, href: personal.github, label: 'GitHub' },
    { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: personal.instagram, label: 'Instagram' },
    { icon: Globe, href: personal.website, label: 'Website' },
  ]

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {t.contactSec.socialsHeading}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {socials.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 p-3 rounded-xl glass-card border border-white/5 text-gray-300 hover:text-white transition-all text-xs font-semibold"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <s.icon className="w-4 h-4 text-primary" />
            <span>{s.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
