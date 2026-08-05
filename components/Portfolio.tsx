'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Folder, Award, Mail } from 'lucide-react'

// Common types & constants
import { Language, ProjectItem, AchievementItem, SectionNav } from '../common/types'
import {
  personal,
  techStackList,
  experiences,
  education,
  achievements,
  projects,
  translations,
} from '../common/constants/portfolioData'

// Common UI components
import Header from '../common/components/Header'
import Sidebar from '../common/components/Sidebar'
import MobileBottomNav from '../common/components/MobileBottomNav'
import Footer from '../common/components/Footer'
import Modals from '../common/components/Modals'

// Feature Modules
import HeroCard from '../modules/home/components/HeroCard'
import QuickNavCards from '../modules/home/components/QuickNavCards'
import TechStackGrid from '../modules/home/components/TechStackGrid'

import ProfileCard from '../modules/about/components/ProfileCard'
import ExperienceTimeline from '../modules/about/components/ExperienceTimeline'
import EducationList from '../modules/about/components/EducationList'

import ProjectsHeader from '../modules/projects/components/ProjectsHeader'
import ProjectCard from '../modules/projects/components/ProjectCard'

import AchievementsHeader from '../modules/achievements/components/AchievementsHeader'
import CertificateCard from '../modules/achievements/components/CertificateCard'

import ContactHeader from '../modules/contact/components/ContactHeader'
import LocationCard from '../modules/contact/components/LocationCard'
import SocialLinksCard from '../modules/contact/components/SocialLinksCard'
import ContactForm from '../modules/contact/components/ContactForm'

export default function Portfolio() {
  const [lang, setLang] = useState<Language>('id')
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [selectedCert, setSelectedCert] = useState<AchievementItem | null>(null)
  const [showResume, setShowResume] = useState(false)

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const t = translations[lang]

  const sections: SectionNav[] = [
    { id: 'home', name: t.nav.home, icon: Home },
    { id: 'about', name: t.nav.about, icon: User },
    { id: 'projects', name: t.nav.projects, icon: Folder },
    { id: 'achievements', name: t.nav.achievements, icon: Award },
    { id: 'contact', name: t.nav.contact, icon: Mail },
  ]

  const handleLangChange = (newLang: Language) => {
    setLang(newLang)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        alert(data.error || (lang === 'en' ? 'Failed to send message' : 'Gagal mengirim pesan'))
      }
    } catch (err: any) {
      alert(lang === 'en' ? 'An error occurred while sending message' : 'Terjadi kesalahan saat mengirim pesan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const navClick = (id: string) => {
    setActiveSection(id)
    setMenuOpen(false)
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -72
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'achievements', 'contact']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedProject(null)
      setSelectedCert(null)
      setShowResume(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const isModalOpen = showResume || !!selectedProject || !!selectedCert
    if (isModalOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [showResume, selectedProject, selectedCert])

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay },
  })

  return (
    <div className="min-h-screen portfolio-bg text-white flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Header */}
      <Header
        personal={personal}
        lang={lang}
        handleLangChange={handleLangChange}
        navClick={navClick}
        activeSection={activeSection}
        sections={sections}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Main Layout */}
      <div className="flex flex-1 pt-[60px] md:pt-[72px]">
        {/* Desktop Sidebar */}
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          navClick={navClick}
          contactText={t.nav.contact}
          quickMsgText={t.contactSec.formHeading}
        />

        {/* Content Container */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full min-w-0 pb-20 md:pb-8">
          {/* HOME SECTION */}
          <motion.section
            id="home"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-24 space-y-5 md:space-y-6"
          >
            <HeroCard
              personal={personal}
              t={t}
              fadeUp={fadeUp}
              setShowResume={setShowResume}
              navClick={navClick}
            />
            <QuickNavCards t={t} navClick={navClick} />
            <TechStackGrid
              techStackList={techStackList}
              t={t}
              lang={lang}
              fadeUp={fadeUp}
            />
          </motion.section>

          {/* ABOUT SECTION */}
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            <ProfileCard personal={personal} t={t} />
            <ExperienceTimeline
              experiences={experiences}
              t={t}
              lang={lang}
              fadeUp={fadeUp}
            />
            <EducationList
              education={education}
              t={t}
              lang={lang}
              fadeUp={fadeUp}
            />
          </motion.section>

          {/* PROJECTS SECTION */}
          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            <ProjectsHeader t={t} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  t={t}
                  lang={lang}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          </motion.section>

          {/* ACHIEVEMENTS SECTION */}
          <motion.section
            id="achievements"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            <AchievementsHeader t={t} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {achievements.map((item, i) => (
                <CertificateCard
                  key={item.id}
                  item={item}
                  index={i}
                  t={t}
                  lang={lang}
                  onSelect={setSelectedCert}
                />
              ))}
            </div>
          </motion.section>

          {/* CONTACT SECTION */}
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-5 space-y-5">
                <ContactHeader t={t} />
                <LocationCard t={t} />
                <SocialLinksCard personal={personal} t={t} />
              </div>
              <div className="lg:col-span-7">
                <ContactForm
                  formData={formData}
                  handleFormChange={handleFormChange}
                  handleFormSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                  submitSuccess={submitSuccess}
                  t={t}
                />
              </div>
            </div>
          </motion.section>

          <Footer lang={lang} name={personal.name} />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        sections={sections}
        activeSection={activeSection}
        navClick={navClick}
      />

      {/* Modals Container */}
      <Modals
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedCert={selectedCert}
        setSelectedCert={setSelectedCert}
        showResume={showResume}
        setShowResume={setShowResume}
        lang={lang}
        t={t}
      />
    </div>
  )
}
