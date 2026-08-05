'use client'

import { motion } from 'framer-motion'
import { Briefcase, CheckCircle } from 'lucide-react'
import { ExperienceItem, Language } from '../../../common/types'

interface ExperienceTimelineProps {
  experiences: ExperienceItem[]
  t: any
  lang: Language
  fadeUp: (delay?: number) => any
}

export default function ExperienceTimeline({
  experiences,
  t,
  lang,
  fadeUp,
}: ExperienceTimelineProps) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold gradient-text mb-4 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-primary" /> {t.aboutSec.experienceTitle}
      </h2>
      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.12)}
            className="glass-card rounded-xl p-5 md:p-6 relative overflow-hidden render-optimized"
            whileHover={{ y: -2 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: exp.color }} />
            <div className="pl-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="font-bold text-white text-base md:text-lg">{lang === 'en' ? exp.positionEn : exp.position}</h3>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full w-fit"
                  style={{ backgroundColor: `${exp.color}20`, color: exp.color }}
                >
                  {lang === 'en' ? exp.periodEn : exp.period}
                </span>
              </div>
              <ul className="space-y-1.5">
                {(lang === 'en' ? exp.descriptionsEn : exp.descriptions).map((desc, di) => (
                  <li key={di} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
