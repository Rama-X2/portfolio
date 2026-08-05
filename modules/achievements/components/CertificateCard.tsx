'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, Calendar, ExternalLink } from 'lucide-react'
import { AchievementItem, Language } from '../../../common/types'

interface CertificateCardProps {
  item: AchievementItem
  index: number
  t: any
  lang: Language
  onSelect: (item: AchievementItem) => void
}

export default function CertificateCard({
  item,
  index,
  t,
  lang,
  onSelect,
}: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group render-optimized"
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={() => onSelect(item)}
    >
      {/* Certificate image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-yellow-900/20 to-primary/20">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3 p-1.5 bg-yellow-500/90 rounded-lg">
          <Award className="w-4 h-4 text-black" />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-white text-sm leading-snug mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-xs text-primary font-medium mb-1">{item.issuer}</p>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{lang === 'en' && item.dateEn ? item.dateEn : item.date}</span>
        </div>
        <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{t.achievementsSec.clickToView}</span>
        </div>
      </div>
    </motion.div>
  )
}
