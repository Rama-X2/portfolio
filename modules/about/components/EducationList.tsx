'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'
import { EducationItem, Language } from '../../../common/types'

interface EducationListProps {
  education: EducationItem[]
  t: any
  lang: Language
  fadeUp: (delay?: number) => any
}

export default function EducationList({
  education,
  t,
  lang,
  fadeUp,
}: EducationListProps) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold gradient-text mb-4 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-primary" /> {t.aboutSec.educationTitle}
      </h2>
      <div className="space-y-4">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.1)}
            className="glass-card rounded-xl p-5 flex items-start gap-4"
            whileHover={{ y: -2 }}
          >
            {/* Logo / placeholder */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
              {edu.logo ? (
                <Image
                  src={edu.logo}
                  alt={edu.institution}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              ) : (
                <GraduationCap className="w-7 h-7 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="font-bold text-white text-sm md:text-base leading-tight">{edu.institution}</h3>
                {edu.ongoing && (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 w-fit">
                    {t.aboutSec.ongoing}
                  </span>
                )}
              </div>
              <p className="text-sm text-primary font-medium mt-0.5">{lang === 'en' ? edu.degreeEn : edu.degree}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? edu.periodEn : edu.period}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? edu.locationEn : edu.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
