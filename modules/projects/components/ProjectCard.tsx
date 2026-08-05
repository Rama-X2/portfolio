'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { ProjectItem, Language } from '../../../common/types'

interface ProjectCardProps {
  project: ProjectItem
  index: number
  t: any
  lang: Language
  onSelect: (p: ProjectItem) => void
}

export default function ProjectCard({
  project,
  index,
  t,
  lang,
  onSelect,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group render-optimized"
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={() => onSelect(project)}
    >
      {/* Project image */}
      <div className="relative h-40 sm:h-44 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {project.featured && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-yellow-500/90 text-black rounded-full text-[10px] font-bold flex items-center gap-1">
            <Star className="w-3 h-3" /> {t.projectsSec.featured}
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-primary/80 text-white">
            {project.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-white mb-1 text-sm md:text-base line-clamp-1">{project.title}</h3>
        <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {lang === 'en' ? project.descriptionEn : project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-primary/15 text-primary rounded-full text-[10px] font-medium border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 bg-white/10 text-gray-400 rounded-full text-[10px]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
