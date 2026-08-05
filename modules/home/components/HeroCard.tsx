'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FileText, MessageCircle } from 'lucide-react'
import { PersonalInfo } from '../../../common/types'

interface HeroCardProps {
  personal: PersonalInfo
  t: any
  fadeUp: (delay?: number) => any
  setShowResume: (show: boolean) => void
  navClick: (id: string) => void
}

export default function HeroCard({
  personal,
  t,
  fadeUp,
  setShowResume,
  navClick,
}: HeroCardProps) {
  return (
    <div className="glass-card rounded-2xl p-5 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        {/* Avatar */}
        <motion.div
          className="avatar-ring w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mx-auto md:mx-0"
          {...fadeUp(0.1)}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={personal.avatar}
            alt={personal.name}
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full"
            priority
          />
        </motion.div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.p {...fadeUp(0.15)} className="text-sm text-primary font-semibold mb-1">
            {t.personal.greeting}
          </motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text leading-tight mb-2"
          >
            {personal.name}
          </motion.h1>
          <motion.p {...fadeUp(0.25)} className="text-base md:text-lg text-gray-300 mb-3 font-medium">
            {personal.title}
          </motion.p>
          <motion.p {...fadeUp(0.3)} className="text-sm text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
            {t.personal.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-3 mt-5 justify-center md:justify-start">
            <motion.button
              onClick={() => setShowResume(true)}
              className="btn-primary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              id="view-resume-btn"
            >
              <FileText className="w-4 h-4" />
              {t.personal.viewResume}
            </motion.button>
            <motion.button
              onClick={() => navClick('contact')}
              className="btn-outline flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              id="contact-btn"
            >
              <MessageCircle className="w-4 h-4" />
              {t.personal.contactMe}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
