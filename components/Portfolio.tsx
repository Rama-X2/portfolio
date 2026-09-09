'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import AOS from 'aos'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  User,
  Globe,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Award,
  Code2,
  Cpu,
  Clock,
  X,
  Linkedin,
  Instagram,
  Send,
  Home,
  Briefcase,
  Folder,
  FileText,
  MessageCircle,
  GraduationCap,
  Calendar,
  CheckCircle,
  Star,
  Loader2,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowUpRight,
} from 'lucide-react'


// ─── Data Source (Pusat Data Portfolio) ─────────────────────────────────────────
import {
  personal,
  techStackList,
  experiences,
  education,
  statsData,
  achievements,
  projects,
} from '@/common/constants/portfolioData'

// ─── Translations Dictionary ──────────────────────────────────────────────────
const translations = {
  id: {
    nav: { home: 'Beranda', about: 'Tentang', projects: 'Proyek', achievements: 'Prestasi', contact: 'Kontak' },
    personal: {
      greeting: 'Halo, saya',
      bio: 'Seorang Full Stack Developer dan UI/UX Designer yang aktif mengembangkan berbagai solusi digital modern, mulai dari website, software, hingga sistem berbasis performa tinggi. Memiliki ketertarikan besar pada web development, server management, dan optimasi sistem, dengan fokus menciptakan aplikasi yang responsif, efisien, dan nyaman digunakan.',
      location: 'Sukabumi, Jawa Barat',
      available: 'Tersedia untuk peluang baru',
      viewResume: 'Lihat Resume',
      contactMe: 'Hubungi Saya',
    },
    quickCards: {
      about: { label: 'Tentang Saya', sub: 'Siapa saya' },
      projects: { label: 'Proyek Saya', sub: 'Karya & portofolio' },
      achievements: { label: 'Prestasi & Sertifikat', sub: 'Sertifikat & penghargaan' },
      contact: { label: 'Kontak', sub: 'Hubungi saya' },
    },
    skillsTitle: 'Tech Stack',
    aboutSec: {
      experienceTitle: 'Pengalaman',
      educationTitle: 'Pendidikan',
      ongoing: 'Sedang Berjalan',
    },
    achievementsSec: {
      title: 'Prestasi & Sertifikat',
      subtitle: 'Sertifikat & penghargaan yang telah saya raih',
      clickToView: 'Klik untuk lihat sertifikat',
    },
    projectsSec: {
      title: 'Proyek Saya',
      subtitle: 'Koleksi proyek yang pernah saya kerjakan',
      featured: 'Unggulan',
      technologies: 'Teknologi',
      liveDemo: 'Demo Langsung',
      sourceCode: 'Kode Sumber',
    },
    contactSec: {
      tag: 'Hubungi Saya',
      heading: 'Mari Berdiskusi!',
      description: 'Punya proyek menarik, ingin berkolaborasi, atau sekadar berdiskusi? Jangan ragu untuk menghubungi saya! Saya akan berusaha membalas secepat mungkin.',
      emailLabel: 'Email',
      emailAction: 'Kirim',
      locationLabel: 'Lokasi & Jangkauan',
      locationDesc: 'Berbasis di Sukabumi, Jawa Barat. Siap bekerja secara remote (jarak jauh) untuk klien dari seluruh dunia maupun on-site untuk proyek lokal.',
      openMaps: 'Buka di Google Maps',
      socialsHeading: 'Temukan Saya Di',
      formHeading: 'Kirim Pesan Instan',
      formDesc: 'Gunakan formulir di bawah ini untuk mengirimkan pesan secara instan. Semua masukan Anda sangat berarti bagi saya.',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'Nama Anda',
      emailInputLabel: 'Alamat Email',
      emailPlaceholder: 'Email Anda',
      subjectLabel: 'Subjek',
      subjectPlaceholder: 'Apa subjek pesan Anda?',
      messageLabel: 'Isi Pesan',
      messagePlaceholder: 'Tuliskan pesan Anda di sini...',
      submitBtn: 'Kirim Pesan Instan',
      submitting: 'Mengirim Pesan...',
      successTitle: 'Pesan Berhasil Dikirim!',
      successDesc: 'Terima kasih telah menghubungi saya. Pesan Anda telah tersimpan dengan aman di antrean dan saya akan meresponsnya secepat mungkin.',
      sendAnother: 'Kirim Pesan Lain',
    },
    resumeModal: {
      title: 'Resume / CV',
      download: 'Unduh Resume',
      openNewTab: 'Buka di Tab Baru',
    },
  },
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', achievements: 'Achievements', contact: 'Contact' },
    personal: {
      greeting: "Hi, I'm",
      bio: 'A Full Stack Developer and UI/UX Designer actively creating modern digital solutions, from websites and software to high-performance systems. Passionate about web development, server management, and system optimization, focusing on building responsive, efficient, and user-friendly applications.',
      location: 'Sukabumi, West Java, Indonesia',
      available: 'Available for new opportunities',
      viewResume: 'View Resume',
      contactMe: 'Contact Me',
    },
    quickCards: {
      about: { label: 'About Me', sub: 'Who I am' },
      projects: { label: 'Projects', sub: 'My work & portfolio' },
      achievements: { label: 'Achievements', sub: 'Certificates & awards' },
      contact: { label: 'Contact', sub: 'Get in touch' },
    },
    skillsTitle: 'Tech Stack',
    aboutSec: {
      experienceTitle: 'Experience',
      educationTitle: 'Education',
      ongoing: 'Ongoing',
    },
    achievementsSec: {
      title: 'Achievements',
      subtitle: 'Certificates and honors I have earned',
      clickToView: 'Click to view certificate',
    },
    projectsSec: {
      title: 'My Projects',
      subtitle: 'A showcase of projects I have built',
      featured: 'Featured',
      technologies: 'Tech Stack',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
    },
    contactSec: {
      tag: 'Contact Me',
      heading: "Let's Connect!",
      description: 'Have an interesting project, want to collaborate, or just want to discuss ideas? Feel free to reach out! I will get back to you as soon as possible.',
      emailLabel: 'Email',
      emailAction: 'Send Email',
      locationLabel: 'Location & Reach',
      locationDesc: 'Based in Sukabumi, West Java. Open for worldwide remote work as well as local on-site projects.',
      openMaps: 'Open in Google Maps',
      socialsHeading: 'Find Me On',
      formHeading: 'Send Instant Message',
      formDesc: 'Use the form below to send an instant message directly. All feedback is greatly appreciated.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your Name',
      emailInputLabel: 'Email Address',
      emailPlaceholder: 'Your Email',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'What is the subject of your message?',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message here...',
      submitBtn: 'Send Instant Message',
      submitting: 'Sending Message...',
      successTitle: 'Message Sent Successfully!',
      successDesc: 'Thank you for reaching out. Your message has been saved safely and I will respond as soon as possible.',
      sendAnother: 'Send Another Message',
    },
    resumeModal: {
      title: 'Resume / CV',
      download: 'Download Resume',
      openNewTab: 'Open in New Tab',
    },
  },
}

interface ToggleButtonProps {
  onClick: () => void
  isShowingMore: boolean
  totalCount: number
  currentCount: number
  lang: 'id' | 'en'
}

const ToggleButton = ({
  onClick,
  isShowingMore,
  totalCount,
  currentCount,
  lang,
}: ToggleButtonProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="
      px-5 py-2.5
      text-gray-300 hover:text-white
      text-xs md:text-sm font-semibold
      transition-all duration-300
      inline-flex items-center gap-2.5
      bg-white/5 hover:bg-white/10
      rounded-xl border border-white/10 hover:border-primary/40
      backdrop-blur-sm
      group relative overflow-hidden shadow-lg hover:shadow-primary/20
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      <span>
        {isShowingMore
          ? (lang === 'en' ? 'Show Less' : 'Tampilkan Lebih Sedikit')
          : (lang === 'en'
              ? `See More (${totalCount - currentCount} more)`
              : `Lihat Lebih Banyak (${totalCount - currentCount} lainnya)`)}
      </span>
      <ChevronDown
        className={`w-4 h-4 text-primary transition-transform duration-300 ${
          isShowingMore ? 'rotate-180' : 'group-hover:translate-y-0.5'
        }`}
      />
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
  </motion.button>
)

const DiscordIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState<'id' | 'en'>('id')
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [selectedCert, setSelectedCert] = useState<(typeof achievements)[0] | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllCertificates, setShowAllCertificates] = useState(false)
  const initialItems = 6

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems)
  const displayedAchievements = showAllCertificates ? achievements : achievements.slice(0, initialItems)

  const handleToggleProjects = () => {
    if (showAllProjects) {
      setShowAllProjects(false)
      const el = document.getElementById('projects')
      if (el) {
        const yOffset = -90
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      }
    } else {
      setShowAllProjects(true)
    }
  }

  const handleToggleCertificates = () => {
    if (showAllCertificates) {
      setShowAllCertificates(false)
      const el = document.getElementById('achievements')
      if (el) {
        const yOffset = -90
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      }
    } else {
      setShowAllCertificates(true)
    }
  }

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Scroll Progress & Floating Back to Top (Hardware-accelerated MotionValues - 0 React re-renders while scrolling!)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const circleOffset = useTransform(scrollYProgress, [0, 1], [113.1, 0])

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 350
          setShowBackToTop((prev) => (prev !== shouldShow ? shouldShow : prev))
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollProgress)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang') as 'id' | 'en'
    if (saved && (saved === 'id' || saved === 'en')) {
      setLang(saved)
    }
  }, [])

  // Official AOS Animation Engine (Exact same architecture as Ekizr Portfolio)
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      offset: 30,
      duration: 800,
      easing: 'ease-out-cubic',
    })

    const handleResize = () => {
      AOS.refresh()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Refresh AOS positions when cards expand or language toggles
    const timer = setTimeout(() => {
      AOS.refreshHard()
    }, 120)
    return () => clearTimeout(timer)
  }, [showAllProjects, showAllCertificates, lang])

  const handleLangChange = (newLang: 'id' | 'en') => {
    setLang(newLang)
    localStorage.setItem('portfolio_lang', newLang)
  }

  const t = translations[lang]

  const sections = [
    { id: 'home',         name: t.nav.home,         icon: Home      },
    { id: 'about',        name: t.nav.about,        icon: User      },
    { id: 'projects',     name: t.nav.projects,     icon: Folder    },
    { id: 'achievements', name: t.nav.achievements, icon: Award     },
    { id: 'contact',      name: t.nav.contact,      icon: Mail      },
  ]

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const tempErrors: typeof errors = {}
    if (!formData.name.trim()) tempErrors.name = lang === 'en' ? 'Name is required' : 'Nama wajib diisi'
    if (!formData.email.trim()) {
      tempErrors.email = lang === 'en' ? 'Email is required' : 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = lang === 'en' ? 'Invalid email format' : 'Format email tidak valid'
    }
    if (!formData.subject.trim()) tempErrors.subject = lang === 'en' ? 'Subject is required' : 'Subjek wajib diisi'
    if (!formData.message.trim()) tempErrors.message = lang === 'en' ? 'Message is required' : 'Pesan wajib diisi'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
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

  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'achievements', 'contact']
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 160
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const id = sectionIds[i]
            const el = document.getElementById(id)
            if (el && scrollPosition >= el.offsetTop) {
              setActiveSection((prev) => (prev !== id ? id : prev))
              break
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
        setSelectedCert(null)
        setShowResume(false)
        setMenuOpen(false)
      }
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (!menuOpen) return
    const handleScrollOrTouch = () => setMenuOpen(false)
    window.addEventListener('scroll', handleScrollOrTouch, { passive: true })
    window.addEventListener('touchmove', handleScrollOrTouch, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScrollOrTouch)
      window.removeEventListener('touchmove', handleScrollOrTouch)
    }
  }, [menuOpen])

  useEffect(() => {
    const isModalOpen = showResume || !!selectedProject || !!selectedCert
    if (isModalOpen) {
      document.documentElement.classList.add('modal-open')
      document.body.classList.add('modal-open')
    } else {
      document.documentElement.classList.remove('modal-open')
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.documentElement.classList.remove('modal-open')
      document.body.classList.remove('modal-open')
    }
  }, [showResume, selectedProject, selectedCert])

  return (
    <div className="min-h-screen portfolio-bg text-white flex flex-col">
      {/* ── Animated BG blobs ─── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ── Top Neon Scroll Progress Bar ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-pink-500 origin-left z-50 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
        style={{ scaleX }}
      />

      {/* ── Header Navigasi Atas (Navbar Header - Animasi Masuk 1x saat Web Dibuka) ─── */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 header-glass px-4 md:px-6 py-3 md:py-4 flex justify-between items-center"
      >
        <motion.button
          className="flex items-center gap-2 md:gap-3"
          onClick={() => navClick('home')}
          whileHover={{ scale: 1.04 }}
        >
          <div className="avatar-ring w-9 h-9 md:w-10 md:h-10 flex-shrink-0">
            <Image
              src={personal.avatar}
              alt={personal.name}
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-left hidden xs:block">
            <p className="text-sm font-bold leading-tight"><span className="gradient-text">{personal.name}</span></p>
            <p className="text-[10px] text-gray-400 leading-tight">{personal.title}</p>
          </div>
        </motion.button>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Language Switcher Pill (Desktop - Left of Home) */}
            <div className="flex items-center p-0.5 bg-white/5 border border-white/10 rounded-xl mr-2">
              <button
                onClick={() => handleLangChange('id')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'id'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                onClick={() => handleLangChange('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => navClick(s.id)}
                className={`nav-btn ${activeSection === s.id ? 'nav-btn-active' : ''}`}
              >
                <s.icon className="w-4 h-4" />
                <span>{s.name}</span>
              </button>
            ))}
          </nav>

          {/* Language Switcher Pill (Mobile) */}
          <div className="flex md:hidden items-center p-0.5 bg-white/5 border border-white/10 rounded-xl">
            <button
              onClick={() => handleLangChange('id')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                lang === 'id'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => handleLangChange('en')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                lang === 'en'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-current rounded-full" />
                <div className="w-6 h-0.5 bg-current rounded-full" />
                <div className="w-6 h-0.5 bg-current rounded-full" />
              </div>
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile dropdown nav (Animasi 100% Konsisten Slide-Fade Tanpa Scaling Morphing) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Click-outside backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-30 md:hidden bg-black/30 pointer-events-auto"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="fixed top-[62px] right-4 w-44 md:hidden z-40 p-1.5 rounded-xl glass-card shadow-glow bg-[#0c0a1e]/95 border border-white/10 overflow-hidden"
            >
              <div className="space-y-0.5">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => navClick(s.id)}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all text-xs font-semibold ${
                      activeSection === s.id
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <s.icon className={`w-4 h-4 ${activeSection === s.id ? 'text-white' : 'text-gray-400'}`} />
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Layout (Full-Width Clean Desktop View, Mobile 100% Preserved) ─── */}
      <div className="flex flex-1 pt-[60px] md:pt-[72px] justify-center">
        {/* ── Content ─── */}
        <main ref={mainRef} className="flex-1 w-full max-w-[1720px] mx-auto p-3 sm:p-5 md:p-8 lg:p-10 min-w-0 space-y-12 md:space-y-16">

          {/* ════════════════════════════════ HOME ═══ */}
          <section
            id="home"
            className="scroll-mt-24 space-y-5 md:space-y-6"
          >

            {/* Hero card */}
            <div data-aos="fade-up" data-aos-duration="1000" className="glass-card rounded-2xl p-5 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                {/* Avatar */}
                <div
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="200"
                  className="avatar-ring w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mx-auto md:mx-0 hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={personal.avatar}
                    alt={personal.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>

                {/* Text */}
                <div className="flex-1 text-center md:text-left">
                  <p data-aos="fade-up" data-aos-delay="250" className="text-sm text-primary font-semibold mb-1">
                    {t.personal.greeting}
                  </p>
                  <h1 data-aos="fade-up" data-aos-delay="300" className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">
                    <span className="gradient-text">{personal.name}</span>
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="350" className="text-base md:text-lg text-gray-300 mb-3 font-medium">
                    {personal.title}
                  </p>
                  <p data-aos="fade-up" data-aos-delay="400" className="text-sm text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                    {t.personal.bio}
                  </p>

                  {/* CTA buttons */}
                  <div data-aos="fade-up" data-aos-delay="450" className="flex flex-col sm:flex-row gap-3 mt-5 justify-center md:justify-start">
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
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack & Tools */}
            <div id="tech-stack" data-aos="fade-up" data-aos-duration="1000" className="scroll-mt-24 glass-card rounded-2xl p-5 md:p-6 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-indigo-400" /> {t.skillsTitle}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {lang === 'en'
                      ? 'Programming languages, frameworks, tools & platforms I use'
                      : 'Bahasa pemrograman, framework, tools & platform yang saya gunakan'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center items-center">
                {techStackList.map((item, i) => (
                  <div
                    key={item.name}
                    data-aos="zoom-in"
                    data-aos-delay={Math.min(i * 20, 300)}
                    data-aos-duration="600"
                    className="group relative flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 cursor-pointer hover:scale-115 hover:-translate-y-1"
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
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════ ABOUT ═══ */}
          <section
            id="about"
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            {/* About Me Details (Balanced Professional Practitioner Text) */}
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="glass-card rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-5 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              <h2
                data-aos="fade-right"
                data-aos-duration="800"
                className="text-2xl md:text-3xl font-extrabold mb-4 flex items-center gap-2.5 w-fit"
              >
                <User className="w-6 h-6 text-indigo-400 flex-shrink-0" />
                <span className="gradient-text">{lang === 'en' ? 'About Me' : 'Tentang Saya'}</span>
              </h2>
              <div className="space-y-4 text-sm md:text-base text-gray-300 leading-relaxed font-normal">
                <p data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
                  {lang === 'en'
                    ? 'I am a Full Stack Web Developer, UI/UX Designer, and System Specialist based in Sukabumi, West Java. My core focus centers on designing modern web applications, managing Linux server infrastructures, and exploring low-level systems including AOSP Android customization and Linux Kernel tuning.'
                    : 'Saya adalah seorang Full Stack Web Developer, UI/UX Designer, dan System Specialist asal Sukabumi, Jawa Barat. Fokus utama saya berpusat pada perancangan aplikasi web modern, pengelolaan infrastruktur server berbasis Linux, serta eksplorasi sistem tingkat rendah (low-level) seperti kustomisasi Android AOSP dan optimasi Linux Kernel.'}
                </p>
                <p data-aos="fade-right" data-aos-duration="800" data-aos-delay="200">
                  {lang === 'en'
                    ? 'My technical journey stems from a deep passion for computing performance, hardware/electronics modification, and interface design. I bring this expertise to life through building modern e-commerce applications, interactive web platforms, server & network management, as well as designing optimization modules like Miyabi Core, CPU/GPU overclocking experiments, and custom ROMs focused on performance improvement and device efficiency.'
                    : 'Eksplorasi teknis saya berawal dari ketertarikan mendalam terhadap performa komputasi, modifikasi hardware/elektronika, dan desain antarmuka. Pengalaman ini saya wujudkan secara langsung melalui pembuatan aplikasi e-commerce modern, platform web interaktif, pengelolaan server & jaringan, hingga perancangan modul optimasi seperti Miyabi Core, eksperimen overclocking CPU/GPU, dan custom ROM yang difokuskan untuk peningkatan performa serta efisiensi perangkat.'}
                </p>
                <p data-aos="fade-right" data-aos-duration="800" data-aos-delay="300">
                  {lang === 'en'
                    ? 'In every project I develop, I prioritize clean code architecture, responsive system performance, and intuitive user interfaces. Whether building web applications, managing cloud servers, or sharing open-source projects on GitHub, my goal is to deliver stable, secure, and helpful digital solutions.'
                    : 'Dalam setiap proyek yang saya kembangkan, saya mengutamakan penerapan struktur kode yang rapi, performa yang responsif, serta antarmuka yang mudah digunakan. Baik saat membangun aplikasi web, mengelola server cloud, maupun membagikan proyek open-source di GitHub, dedikasi saya adalah menghadirkan solusi teknologi yang stabil, aman, dan bermanfaat.'}
                </p>
              </div>

              {/* Quick Stat Counters (Modern Tech Portfolio Stats - Ekizr Style) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 pt-6 border-t border-white/10">
                {statsData.map((stat, i) => {
                  const Icon = stat.icon
                  const animation = i === 0 ? 'fade-right' : i === 1 ? 'fade-up' : 'fade-left'
                  return (
                    <div
                      key={stat.labelEn}
                      data-aos={animation}
                      data-aos-duration="1000"
                      data-aos-delay={i * 100}
                      className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-primary/40 relative overflow-hidden group transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-2xl"
                      onClick={() => {
                        if (stat.targetId) {
                          navClick(stat.targetId)
                        }
                      }}
                    >
                      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-300`} />
                      
                      {/* Top row: Circular icon with glow on left, Big Number on right */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white/10 border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                          <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${stat.color}`} />
                        </div>
                        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                          {stat.value}
                        </span>
                      </div>

                      {/* Bottom area: Title, Subtitle, and Arrow */}
                      <div>
                        <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-gray-200 mb-1">
                          {lang === 'en' ? stat.labelEn : stat.labelId}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[11px] sm:text-xs text-gray-400 leading-snug">
                            {lang === 'en' ? stat.descEn : stat.descId}
                          </p>
                          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform duration-200" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Experience Timeline */}
            <div>
              <h2
                data-aos="fade-right"
                data-aos-duration="800"
                className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 w-fit"
              >
                <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="gradient-text">{t.aboutSec.experienceTitle}</span>
              </h2>
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <div key={i}
                    data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                    data-aos-duration="900"
                    className="glass-card rounded-xl p-5 md:p-6 relative overflow-hidden render-optimized hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: exp.color }} />
                    <div className="pl-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                        <h3 className="font-bold text-white text-base md:text-lg">{lang === 'en' ? exp.positionEn : exp.position}</h3>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full w-fit"
                          style={{ backgroundColor: `${exp.color}20`, color: exp.color }}>
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
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2
                data-aos="fade-left"
                data-aos-duration="800"
                className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 w-fit"
              >
                <GraduationCap className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="gradient-text">{t.aboutSec.educationTitle}</span>
              </h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i}
                    data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                    data-aos-duration="900"
                    className="glass-card rounded-xl p-5 flex items-start gap-4 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300"
                  >
                    {/* Logo / placeholder */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                      {edu.logo ? (
                        <Image src={edu.logo} alt={edu.institution} width={56} height={56}
                          className="w-full h-full object-contain" />
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
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════ PROJECTS ═══ */}
          <section
            id="projects"
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="glass-card rounded-2xl p-5 md:p-6 border border-white/10"
            >
              <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2.5 mb-1 w-fit">
                <Folder className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <span className="gradient-text">{t.projectsSec.title}</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-400">{t.projectsSec.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "800" : index % 3 === 1 ? "1000" : "800"}
                  data-aos-delay={Math.min((index % 3) * 100, 200)}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <div>
                    {/* Project image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#160d35]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#160d35] via-[#160d35]/30 to-transparent pointer-events-none z-10" />
                      <div className="absolute -bottom-1 left-0 right-0 h-3 bg-[#160d35] pointer-events-none z-20" />
                      {project.featured && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-yellow-500/90 text-black rounded-full text-[10px] font-bold flex items-center gap-1 z-30 shadow-md">
                          <Star className="w-3 h-3" /> {t.projectsSec.featured}
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 z-30">
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/90 text-white shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 md:p-5">
                      <h3 className="font-bold text-white mb-1.5 text-base md:text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
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
                  </div>

                  {/* Action link & direct shortcuts */}
                  <div className="px-4 pb-4 md:px-5 md:pb-5 pt-3 flex items-center justify-between border-t border-white/5 mt-auto text-xs text-gray-400">
                    <span className="text-primary font-medium group-hover:underline flex items-center gap-1">
                      {lang === 'en' ? 'View Details' : 'Lihat Detail'}
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          title={lang === 'en' ? 'Live Demo' : 'Lihat Demo'}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-white transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub Repository"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {projects.length > initialItems && (
              <div className="mt-8 flex justify-center">
                <ToggleButton
                  onClick={handleToggleProjects}
                  isShowingMore={showAllProjects}
                  totalCount={projects.length}
                  currentCount={displayedProjects.length}
                  lang={lang}
                />
              </div>
            )}
          </section>

          {/* ════════════════════════════════ ACHIEVEMENTS ═══ */}
          <section
            id="achievements"
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="glass-card rounded-2xl p-5 md:p-6 border border-white/10"
            >
              <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2.5 mb-1 w-fit">
                <Award className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <span className="gradient-text">{t.achievementsSec.title}</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-400">{t.achievementsSec.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {displayedAchievements.map((item, index) => (
                <div
                  key={item.id}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "800" : index % 3 === 1 ? "1000" : "800"}
                  data-aos-delay={Math.min((index % 3) * 100, 200)}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
                  onClick={() => setSelectedCert(item)}
                >
                  <div>
                    {/* Certificate image with natural A4 ratio (16/11.5) */}
                    <div className="relative w-full aspect-[16/11.5] overflow-hidden bg-[#160d35]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#160d35] via-[#160d35]/20 to-transparent pointer-events-none z-10" />
                      <div className="absolute -bottom-1 left-0 right-0 h-3 bg-[#160d35] pointer-events-none z-20" />
                      <div className="absolute top-3 right-3 p-1.5 bg-yellow-500/90 rounded-lg z-30 shadow-md">
                        <Award className="w-4 h-4 text-black" />
                      </div>

                      {/* Hover Overlay like Ekizr */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-25 pointer-events-none">
                        <div className="px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ExternalLink className="w-4 h-4 text-primary" />
                          <span>{lang === 'en' ? 'View Certificate' : 'Lihat Sertifikat'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Streamlined Info Footer */}
                    <div className="p-3.5 sm:p-4 bg-[#120a2e]/90 border-t border-white/5">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-1 group-hover:text-primary transition-colors flex-1">
                          {item.title}
                        </h3>
                        {(item as any).verifyUrl && (
                          <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                            {item.issuer.includes('Microsoft') ? 'MS Learn' : 'Credly'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-400">
                        <span className="text-primary font-medium truncate max-w-[60%]">{item.issuer}</span>
                        <div className="flex items-center gap-1 text-gray-400 flex-shrink-0">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span>{lang === 'en' && item.dateEn ? item.dateEn : item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {achievements.length > initialItems && (
              <div className="mt-8 flex justify-center">
                <ToggleButton
                  onClick={handleToggleCertificates}
                  isShowingMore={showAllCertificates}
                  totalCount={achievements.length}
                  currentCount={displayedAchievements.length}
                  lang={lang}
                />
              </div>
            )}
          </section>

          {/* ════════════════════════════════ CONTACT ═══ */}
          <section
            id="contact"
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10 max-w-5xl mx-auto"
          >

                {/* Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  
                  {/* Left Column: Direct Info & Socials (Span 5 on Desktop) */}
                  <div className="lg:col-span-5 space-y-5">
                    
                    {/* Header Card */}
                    <div
                      data-aos="fade-down"
                      data-aos-duration="800"
                      className="glass-card rounded-2xl p-6 md:p-7 border border-white/10 space-y-3 group text-center flex flex-col items-center justify-center"
                    >
                      <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-1 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 inline-block">
                        {t.contactSec.tag}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold w-fit mx-auto">
                        <span className="gradient-text">{t.contactSec.heading}</span>
                      </h2>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
                        {t.contactSec.description}
                      </p>
                    </div>

                    {/* Location Info Card */}
                    <div
                      data-aos="fade-right"
                      data-aos-duration="900"
                      className="glass-card rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl pointer-events-none" />
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.contactSec.locationLabel}</p>
                            <h4 className="font-extrabold text-white text-base mt-0.5">{t.personal.location}</h4>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {t.contactSec.locationDesc}
                          </p>
                          <a
                            href="https://www.google.com/maps/place/Sukabumi,+Sukabumi+Regency,+West+Java/@-6.9897,106.9268"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-500/10 text-pink-400 text-xs font-semibold border border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.25)] transition-all duration-200 cursor-pointer"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{t.contactSec.openMaps}</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Social Media Connections (Ekizr Style: Fast, Responsive & Sleek) */}
                    <div
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      className="glass-card rounded-2xl p-6 border border-white/10 space-y-4"
                    >
                      <h4 className="font-bold text-white text-xs tracking-wider uppercase pl-1">{t.contactSec.socialsHeading}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { 
                            icon: Github,      
                            href: personal.github,    
                            label: 'GitHub',    
                            subText: '@Rama-X2',
                            color: '#ffffff', 
                            gradient: 'from-gray-600 via-gray-700 to-gray-800', 
                            title: 'GitHub: @Rama-X2' 
                          },
                          { 
                            icon: Linkedin,    
                            href: personal.linkedin,  
                            label: 'LinkedIn',  
                            subText: 'Ade Ramadhani Putra',
                            color: '#38bdf8', 
                            gradient: 'from-blue-600 to-cyan-600', 
                            title: 'LinkedIn: Ade Ramadhani Putra' 
                          },
                          { 
                            icon: Instagram,   
                            href: personal.instagram, 
                            label: 'Instagram', 
                            subText: '@rama_ext4',
                            color: '#fb7185', 
                            gradient: 'from-pink-500 via-purple-500 to-orange-400', 
                            title: 'Instagram: @rama_ext4' 
                          },
                          { 
                            icon: DiscordIcon, 
                            href: personal.discord,   
                            label: 'Discord',   
                            subText: '@rama_ext',
                            color: '#a5b4fc', 
                            gradient: 'from-indigo-500 to-purple-600', 
                            title: 'Discord: @rama_ext' 
                          },
                        ].map((s, i) => (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={s.title}
                            data-aos="fade-up"
                            data-aos-delay={100 + i * 80}
                            data-aos-duration="800"
                            className="group relative flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer select-none"
                          >
                            {/* Hover Gradient Background */}
                            <div
                              className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${s.gradient}`}
                            />

                            {/* Content Container */}
                            <div className="relative flex items-center gap-3 min-w-0">
                              {/* Icon Container with Glow */}
                              <div className="relative flex items-center justify-center flex-shrink-0">
                                <div
                                  className="absolute inset-0 opacity-20 rounded-lg transition-all duration-300 group-hover:scale-125 group-hover:opacity-30"
                                  style={{ backgroundColor: s.color }}
                                />
                                <div className="relative p-2 rounded-lg">
                                  <s.icon
                                    className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover:scale-110"
                                    style={{ color: s.color }}
                                  />
                                </div>
                              </div>

                              {/* Text Container */}
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300 truncate">
                                  {s.label}
                                </span>
                                <span className="text-[10px] sm:text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                                  {s.subText}
                                </span>
                              </div>
                            </div>

                            {/* External Link Icon */}
                            <ExternalLink
                              className="relative w-4 h-4 text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1 flex-shrink-0"
                            />

                            {/* Traveling Shine Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Contact Form / Success Screen (Span 7 on Desktop) */}
                  <div
                    className="lg:col-span-7"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                  >
                    <AnimatePresence mode="wait">
                      {submitSuccess ? (
                        <motion.div
                          key="success-card"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="glass-card rounded-2xl p-6 md:p-8 space-y-6 h-full flex flex-col justify-center items-center text-center border border-green-500/20 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
                          
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                          >
                            <CheckCircle className="w-10 h-10" />
                          </motion.div>
                          
                          <div className="space-y-2.5 max-w-md">
                            <h3 className="text-2xl font-extrabold text-white">{t.contactSec.successTitle}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {t.contactSec.successDesc}
                            </p>
                          </div>

                          <motion.button
                            onClick={() => setSubmitSuccess(false)}
                            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-2 mt-4"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Send className="w-3.5 h-3.5" />
                            {t.contactSec.sendAnother}
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="contact-form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleFormSubmit}
                          className="glass-card rounded-2xl p-5 md:p-6 space-y-4 border border-white/10 relative"
                        >
                          <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" className="space-y-1.5">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Send className="w-4 h-4" />
                              </div>
                              <h3 className="text-base font-bold text-white">{t.contactSec.formHeading}</h3>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              {t.contactSec.formDesc}
                            </p>
                          </div>

                          <div className="space-y-3 mt-3">
                            <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="800" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 pl-1">{t.contactSec.nameLabel}</label>
                                <input
                                  type="text"
                                  placeholder={t.contactSec.namePlaceholder}
                                  value={formData.name}
                                  onChange={(e) => handleInputChange('name', e.target.value)}
                                  disabled={isSubmitting}
                                  className={`form-input py-2.5 ${errors.name ? 'border-red-500/40 bg-red-500/5 focus:border-red-500' : ''}`}
                                />
                                {errors.name && (
                                  <p className="text-[10px] text-red-400 pl-1 font-semibold">{errors.name}</p>
                                )}
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 pl-1">{t.contactSec.emailInputLabel}</label>
                                <input
                                  type="email"
                                  placeholder={t.contactSec.emailPlaceholder}
                                  value={formData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  disabled={isSubmitting}
                                  className={`form-input py-2.5 ${errors.email ? 'border-red-500/40 bg-red-500/5 focus:border-red-500' : ''}`}
                                />
                                {errors.email && (
                                  <p className="text-[10px] text-red-400 pl-1 font-semibold">{errors.email}</p>
                                )}
                              </div>
                            </div>
                            
                            <div data-aos="fade-up" data-aos-delay="280" data-aos-duration="800" className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 pl-1">{t.contactSec.subjectLabel}</label>
                              <input
                                type="text"
                                placeholder={t.contactSec.subjectPlaceholder}
                                value={formData.subject}
                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                disabled={isSubmitting}
                                className={`form-input py-2.5 w-full ${errors.subject ? 'border-red-500/40 bg-red-500/5 focus:border-red-500' : ''}`}
                              />
                              {errors.subject && (
                                <p className="text-[10px] text-red-400 pl-1 font-semibold">{errors.subject}</p>
                              )}
                            </div>
                            
                            <div data-aos="fade-up" data-aos-delay="360" data-aos-duration="800" className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 pl-1">{t.contactSec.messageLabel}</label>
                              <textarea
                                rows={3}
                                placeholder={t.contactSec.messagePlaceholder}
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                disabled={isSubmitting}
                                className={`form-input py-2.5 w-full resize-none ${errors.message ? 'border-red-500/40 bg-red-500/5 focus:border-red-500' : ''}`}
                              />
                              {errors.message && (
                                <p className="text-[10px] text-red-400 pl-1 font-semibold">{errors.message}</p>
                              )}
                            </div>
                          </div>

                          <div data-aos="fade-up" data-aos-delay="440" data-aos-duration="800" className="mt-4 pt-1">
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={isSubmitting ? {} : { scale: 1.02, y: -2, transition: { duration: 0.15, ease: 'easeOut' } }}
                              whileTap={isSubmitting ? {} : { scale: 0.98 }}
                              transition={{ duration: 0.15, ease: 'easeOut' }}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>{t.contactSec.submitting}</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  <span>{t.contactSec.submitBtn}</span>
                                </>
                              )}
                            </motion.button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </section>

          {/* Footer */}
          <footer
            data-aos="fade-up"
            data-aos-duration="800"
            className="mt-12 pt-6 pb-24 md:pb-8 border-t border-white/10 text-center text-xs text-gray-400"
          >
            <p className="font-medium text-gray-300">
              Copyright © 2025 – {new Date().getFullYear()} <span className="font-bold text-white">{personal.name} (Rama-X2)</span>. {lang === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi undang-undang.'}
            </p>
          </footer>
        </main>
      </div>

      {/* ── Floating Back to Top Button with Circular Progress ─── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-20 md:bottom-8 right-5 md:right-8 z-40 w-12 h-12 rounded-full glass-card border border-white/20 bg-[#0c0a1e]/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:border-primary/60 hover:shadow-[0_0_25px_rgba(99,102,241,0.65)] transition-all group cursor-pointer"
            title={lang === 'en' ? 'Back to top' : 'Kembali ke atas'}
            aria-label="Back to top"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90 p-0.5" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                className="text-white/10"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="transparent"
              />
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                className="text-primary"
                strokeWidth="2.5"
                strokeDasharray={113.1}
                style={{ strokeDashoffset: circleOffset }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <ArrowUp className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Bottom nav (mobile) ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 mobile-bottom-nav">
        <div className="flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => navClick(s.id)}
              className={`flex-1 flex flex-col items-center py-2.5 gap-1 transition-all ${
                activeSection === s.id ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <s.icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{s.name}</span>
              {activeSection === s.id && (
                <motion.div
                  layoutId="active-dot"
                  className="w-1 h-1 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Project Detail Modal ─── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="portfolio-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}>
            <motion.div className="portfolio-modal-content" onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.88, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 40 }}>

              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl md:text-2xl font-bold mb-0.5 w-fit">
                    <span className="gradient-text">{selectedProject.title}</span>
                  </h2>
                  <p className="text-xs text-primary">{selectedProject.category}</p>
                </div>
                <motion.button onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="relative h-44 md:h-56 rounded-xl mb-5 overflow-hidden">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                {selectedProject.featured && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/90 text-black rounded-full text-xs font-bold">
                    {t.projectsSec.featured}
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {lang === 'en' ? selectedProject.descriptionEn : selectedProject.description}
              </p>

              <div className="mb-4">
                <h3 className="font-bold text-white mb-2 text-sm">{t.projectsSec.technologies}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium border border-primary/30">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a href={selectedProject.liveUrl} target="_blank" rel="noreferrer"
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <ExternalLink className="w-4 h-4" /> {t.projectsSec.liveDemo}
                </motion.a>
                <motion.a href={selectedProject.githubUrl} target="_blank" rel="noreferrer"
                  className="flex-1 btn-outline flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Github className="w-4 h-4" /> {t.projectsSec.sourceCode}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Certificate Modal ─── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div className="portfolio-modal cert-modal-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}>
            <motion.div className="portfolio-modal-content" onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.88, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 40 }}>

              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-4">
                  <h2 className="text-base md:text-lg font-bold leading-snug w-fit">
                    <span className="gradient-text">{selectedCert.title}</span>
                  </h2>
                  <p className="text-xs text-primary mt-0.5">{selectedCert.issuer}</p>
                </div>
                <motion.button onClick={() => setSelectedCert(null)}
                  className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="relative rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '1.414/1' }}>
                <Image src={selectedCert.image} alt={selectedCert.title} fill className="object-contain bg-white/5" />
              </div>

              <div className="flex items-center justify-between gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{lang === 'en' && selectedCert.dateEn ? selectedCert.dateEn : selectedCert.date}</span>
                </div>
                {(selectedCert as any).verifyUrl && (
                  <motion.a
                    href={(selectedCert as any).verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-xs font-semibold transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>
                      {(selectedCert as any).verifyUrl.includes('learn.microsoft.com') || selectedCert.issuer.includes('Microsoft')
                        ? (lang === 'en' ? 'Verify on Microsoft Learn' : 'Verifikasi di Microsoft Learn')
                        : (lang === 'en' ? 'Verify on Credly' : 'Verifikasi di Credly')}
                    </span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Resume Modal ─── */}
      <AnimatePresence>
        {showResume && (
          <motion.div className="portfolio-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}>
            <motion.div className="resume-modal-content" onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.88, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 40 }}>

              {/* Header */}
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h2 className="text-lg font-bold w-fit">
                  <span className="gradient-text">{t.resumeModal.title}</span>
                </h2>
                <motion.button onClick={() => setShowResume(false)}
                  className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Scrollable image area */}
              <div className="resume-img-scroll">
                <img
                  src="/gambar-resume/cv-resume-ade-rama.webp"
                  alt="Resume Ade Ramadhani Putra"
                  className="resume-img allow-download"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 flex-shrink-0">
                <motion.a
                  href="/gambar-resume/cv-resume-ade-rama.webp"
                  download="CV-Resume-Ade-Ramadhani-Putra.webp"
                  className="btn-primary flex-1 flex items-center justify-center gap-2 allow-download"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-4 h-4" /> {t.resumeModal.download}
                </motion.a>
                <motion.a
                  href="/gambar-resume/cv-resume-ade-rama.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1 flex items-center justify-center gap-2 allow-download"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4" /> {t.resumeModal.openNewTab}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
