'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Github, Linkedin, Instagram, Globe } from 'lucide-react'
import { PersonalInfo } from '../../../common/types'

interface ProfileCardProps {
  personal: PersonalInfo
  t: any
}

export default function ProfileCard({ personal, t }: ProfileCardProps) {
  const socialLinks = [
    { icon: Github, href: personal.github, label: 'GitHub' },
    { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: personal.instagram, label: 'Instagram' },
    { icon: Globe, href: personal.website, label: 'Website' },
  ]

  return (
    <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/10">
      <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-5 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="avatar-ring w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
          <Image
            src={personal.avatar}
            alt={personal.name}
            width={112}
            height={112}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">{personal.name}</h1>
          <p className="text-gray-300 font-medium mb-2">{personal.title}</p>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-gray-400 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{t.personal.location}</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{t.personal.bio}</p>
          
          {/* Social links */}
          <div className="flex justify-center sm:justify-start gap-3 mt-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                title={link.label}
                className="p-2.5 glass-card rounded-xl text-gray-400 hover:text-white transition-all"
                whileHover={{ scale: 1.12, y: -2 }}
              >
                <link.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
