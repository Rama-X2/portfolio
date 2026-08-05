'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Download } from 'lucide-react'
import { ProjectItem, AchievementItem, Language } from '../types'

interface ModalsProps {
  selectedProject: ProjectItem | null
  setSelectedProject: (p: ProjectItem | null) => void
  selectedCert: AchievementItem | null
  setSelectedCert: (c: AchievementItem | null) => void
  showResume: boolean
  setShowResume: (show: boolean) => void
  lang: Language
  t: any
}

export default function Modals({
  selectedProject,
  setSelectedProject,
  selectedCert,
  setSelectedCert,
  showResume,
  setShowResume,
  lang,
  t,
}: ModalsProps) {
  return (
    <>
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="portfolio-modal" onClick={() => setSelectedProject(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="portfolio-modal-content custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-2">{selectedProject.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-5 border border-white/10">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <p className="leading-relaxed">
                  {lang === 'en'
                    ? selectedProject.longDescriptionEn || selectedProject.descriptionEn
                    : selectedProject.longDescription || selectedProject.description}
                </p>

                <div>
                  <h4 className="font-semibold text-white mb-2">{t.projectsSec.technologies}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 border border-white/10 text-primary rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary inline-flex items-center gap-2 text-xs"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.projectsSec.liveDemo}
                    </a>
                  )}
                  {selectedProject.sourceCodeUrl && (
                    <a
                      href={selectedProject.sourceCodeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline inline-flex items-center gap-2 text-xs"
                    >
                      <Github className="w-4 h-4" />
                      {t.projectsSec.sourceCode}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="portfolio-modal cert-modal-wrap" onClick={() => setSelectedCert(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="portfolio-modal-content max-w-3xl custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedCert.title}</h2>
                  <p className="text-xs text-primary font-medium mt-0.5">{selectedCert.issuer}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full h-[50vh] sm:h-[65vh] rounded-xl overflow-hidden mb-4 border border-white/10 bg-black/40">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                />
              </div>

              {selectedCert.verifyUrl && (
                <div className="flex justify-end pt-2">
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex items-center gap-2 text-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verifikasi Kredensial
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Resume CV Preview Modal */}
      <AnimatePresence>
        {showResume && (
          <div className="portfolio-modal" onClick={() => setShowResume(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="resume-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10 flex-shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    CV / Curriculum Vitae
                  </h2>
                  <p className="text-xs text-gray-400">Ade Ramadhani Putra</p>
                </div>
                <button
                  onClick={() => setShowResume(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable image */}
              <div className="resume-img-scroll border border-white/10 my-2">
                <img
                  src="/gambar-cv/cv_rama.png"
                  alt="CV Ade Ramadhani Putra"
                  className="resume-img"
                />
              </div>

              {/* Fixed Bottom Action Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 flex-shrink-0">
                <button
                  onClick={() => setShowResume(false)}
                  className="btn-outline text-xs px-4 py-2.5"
                >
                  {t.resumeModal.close}
                </button>
                <a
                  href="/gambar-cv/cv_rama.png"
                  download="CV_Ade_Ramadhani_Putra.png"
                  className="btn-primary text-xs px-4 py-2.5 inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t.resumeModal.downloadPdf}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
