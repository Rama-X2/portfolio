'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { TechStackItem, Language } from '../../../common/types'

interface TechStackGridProps {
  techStackList: TechStackItem[]
  t: any
  lang: Language
  fadeUp: (delay?: number) => any
}

export default function TechStackGrid({
  techStackList,
  t,
  lang,
  fadeUp,
}: TechStackGridProps) {
  return (
    <motion.div {...fadeUp(0.5)} className="glass-card rounded-2xl p-5 md:p-6 border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" /> {t.skillsTitle}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {lang === 'en'
              ? 'Programming languages, frameworks, tools & platforms I use'
              : 'Bahasa pemrograman, framework, tools & platform yang saya gunakan'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-start items-center">
        {techStackList.map((item, i) => (
          <motion.div
            key={item.name}
            className="group relative flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.01 * i }}
            whileHover={{ scale: 1.15, y: -3 }}
          >
            <img
              src={`https://skillicons.dev/icons?i=${item.icon}`}
              alt={item.name}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow"
              loading="lazy"
            />
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-gray-900/95 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 shadow-lg z-20">
              {item.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
