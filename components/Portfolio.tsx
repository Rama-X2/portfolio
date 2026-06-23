'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Code,
  Globe,
  ExternalLink,
  Github,
  Mail,
  Phone,
  MapPin,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  Linkedin,
  Instagram,
  Send,
  Home,
  Briefcase,
  FileText,
  MessageCircle,
  Trophy,
  GraduationCap,
  Calendar,
  CheckCircle,
  Monitor,
  Smartphone,
  Server,
  Database,
  Layers,
  Star,
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────────
const personal = {
  name: 'Ade Ramadhani Putra',
  title: 'Full Stack Developer & UI/UX Designer',
  bio: 'Seorang Full Stack Developer dan UI/UX Designer yang aktif mengembangkan berbagai solusi digital modern, mulai dari website, software, hingga sistem berbasis performa tinggi. Memiliki ketertarikan besar pada web development, server management, dan optimasi sistem, dengan fokus menciptakan aplikasi yang responsif, efisien, dan nyaman digunakan.',
  avatar: '/images/portfolio/foto_rama.png',
  location: 'Sukabumi, Jawa Barat',
  email: 'aderamadhaniputra35@gmail.com',
  phone: '+62 857-9518-5561',
  whatsapp: 'https://wa.me/6285795185561',
  website: 'https://rama-x2.my.id',
  github: 'https://github.com/Rama-X2',
  linkedin: 'https://linkedin.com/in/rama-xd',
  instagram: 'https://instagram.com/rama_tcp',
}

const skills = [
  { name: 'HTML / CSS', icon: Monitor, color: '#e34c26', level: 92 },
  { name: 'JavaScript', icon: Code, color: '#f0db4f', level: 88 },
  { name: 'PHP & MySQL', icon: Database, color: '#777bb4', level: 85 },
  { name: 'Next.js / React', icon: Layers, color: '#61DAFB', level: 82 },
  { name: 'Linux & Server', icon: Server, color: '#4CAF50', level: 85 },
  { name: 'Android Dev', icon: Smartphone, color: '#3DDC84', level: 87 },
  { name: 'UI/UX Design', icon: Star, color: '#FF6B6B', level: 80 },
  { name: 'Git & GitHub', icon: Github, color: '#f5f5f5', level: 88 },
]

const experiences = [
  {
    position: 'IT Support & System Developer',
    period: '2023 – Sekarang',
    descriptions: [
      'Melakukan troubleshooting, maintenance, dan optimasi perangkat komputer serta smartphone.',
      'Menangani instalasi sistem operasi, driver, dan konfigurasi software.',
      'Mengembangkan dan memodifikasi sistem Android seperti custom ROM, tweaking, dan optimasi performa.',
      'Membantu pengguna dalam perbaikan software serta peningkatan stabilitas perangkat.',
    ],
    color: '#6366f1',
  },
  {
    position: 'Full Stack Web Developer',
    period: '2024 – Sekarang',
    descriptions: [
      'Mengembangkan website dan aplikasi berbasis web modern dengan fokus pada performa dan pengalaman pengguna.',
      'Membuat sistem CRUD, dashboard admin, dan landing page responsif menggunakan PHP, JavaScript, dan MySQL.',
      'Mengelola deployment website dan konfigurasi hosting berbasis Linux serta cloud platform.',
      'Mendesain antarmuka modern yang responsif dan mudah digunakan.',
    ],
    color: '#8b5cf6',
  },
  {
    position: 'Personal Software & Experimental Projects',
    period: '2021 – Sekarang',
    descriptions: [
      'Mengembangkan berbagai project software dan eksperimen teknologi secara mandiri.',
      'Melakukan optimasi sistem, debugging, dan tuning performa pada berbagai environment.',
      'Mengeksplorasi pengembangan berbasis Linux, Android, dan web technology.',
      'Mendesain tools dan solusi digital untuk kebutuhan personal maupun pembelajaran.',
    ],
    color: '#06b6d4',
  },
]

const education = [
  {
    institution: 'Universitas Linggabuana PGRI Sukabumi',
    degree: 'S1 Teknik Informatika',
    period: 'Sedang Berjalan (Ongoing)',
    location: 'Sukabumi, Jawa Barat',
    logo: '/logo-kampus/logo-kampus.jpeg',
    ongoing: true,
  },
  {
    institution: 'MA Al-Ma\'arij Hegarmanah',
    degree: 'IPS',
    period: '2021 – 2024',
    location: 'Sukabumi, Jawa Barat',
    logo: null,
    ongoing: false,
  },
]

const achievements = [
  {
    id: 1,
    title: 'DevCoach #200: Integrasi IT & AI powered by Asah!',
    issuer: 'DevCoach × Asah!',
    date: '2025',
    image: '/gambar-sertifikat/devcoach-200-integrasi-it-ai-powered-by-asah-certificate-1.png',
  },
  {
    id: 2,
    title: 'IDCamp x Dicoding Live #10 – UiPath Agentic Automation: Introduction and Use Case',
    issuer: 'Indosat Ooredoo Hutchison Digital Camp',
    date: 'Kamis, 10 Juli 2025',
    image: '/gambar-sertifikat/idcamp-x-dicoding-live-10-uipath-agentic-automation-introduction-and-use-case-certificate-1.png',
  },
  {
    id: 3,
    title: 'IDCamp Alumni Dialogue #5 – Debunking the Myth of Intelligent Automation: Prepare for the Future Workforce',
    issuer: 'Indosat Ooredoo Hutchison Digital Camp',
    date: 'Selasa, 22 Juli 2025',
    image: '/gambar-sertifikat/idcamp-alumni-dialogue-5-debunking-the-myth-of-intelligent-automation-prepare-for-the-future-workfor-1.png',
  },
]

const projects = [
  {
    id: 1,
    title: 'BumiTani – Premium Agricultural E-Commerce',
    description:
      'Website e-commerce pertanian modern premium dengan database 72 produk (bibit, nutrisi, pakan, peralatan, pestisida, dan pupuk) dalam 6 kategori. Dilengkapi filter dan pencarian real-time, detail modal produk, sistem keranjang LocalStorage, serta checkout via WhatsApp.',
    image: '/images/portfolio/banner_bumi-tani.png',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'LocalStorage', 'Vercel'],
    liveUrl: 'https://bumi-tani-v2.vercel.app',
    githubUrl: 'https://github.com/Rama-X2/Bumi-Tani-v2',
    category: 'Web Development',
    featured: true,
  },
  {
    id: 2,
    title: 'PojokCoffee – Toko Kopi Online',
    description:
      'Platform e-commerce premium didedikasikan untuk para pecinta kopi dengan berbagai biji kopi pilihan seluruh Indonesia. Dilengkapi fitur pencarian & filter produk, detail tasting notes asal kopi, keranjang belanja dinamis, blog informatif, dan desain responsif.',
    image: '/images/portfolio/banner_pojok-coffee.png',
    technologies: ['HTML', 'Tailwind CSS', 'Preline UI', 'JavaScript', 'LocalStorage'],
    liveUrl: 'https://pojok-coffee-ex.vercel.app',
    githubUrl: 'https://github.com/Rama-X2/exchange',
    category: 'Web Development',
    featured: true,
  },
  {
    id: 3,
    title: 'Rama Store – Gaming Topup Platform',
    description:
      'Modern gaming top-up platform dengan real-time transaction processing, multi-game support, dan animasi yang menarik. Dibangun menggunakan Next.js, TypeScript, dan Framer Motion.',
    image: '/images/portfolio/banner_rama-store.png',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://rama-store.vercel.app',
    githubUrl: 'https://github.com/Rama-X2/rama-store',
    category: 'Web Development',
    featured: true,
  },
  {
    id: 4,
    title: 'Custom ROM by Rama – Basic AOSP',
    description:
      'ROM custom ringan berbasis Android 15 (Vanilla Ice Cream) yang disempurnakan dengan asisten AI cerdas menggunakan TensorFlow dan NLP.',
    image: '/images/portfolio/banner_rom-pixel.png',
    technologies: ['AOSP', 'Android 15', 'Shell Script', 'Python', 'TensorFlow'],
    liveUrl: 'https://rama.server.my.id/custom-rom-by_rama',
    githubUrl: 'https://github.com/Rama-X2/Rom-Pixel',
    category: 'Operating System',
    featured: true,
  },
  {
    id: 5,
    title: 'Rama Server Dashboard',
    description:
      'Dashboard manajemen server lengkap untuk operasi bisnis, menggabungkan analitik, kontrol jaringan, dan wawasan pengguna.',
    image: '/images/portfolio/banner_rama_server.png',
    technologies: ['React', 'Chart.js', 'Material-UI', 'Express.js', 'MongoDB'],
    liveUrl: 'https://rama.server.my.id/dashboard/rama-server',
    githubUrl: 'https://github.com/Rama-X2/andora-ex-wami-ram',
    category: 'Dashboard',
    featured: true,
  },
  {
    id: 6,
    title: 'RISING UI 2.5 – Evolution X for POCO F5',
    description:
      'Modul kustomisasi UI eksklusif untuk ROM Evolution X pada POCO F5. Peningkatan visual dari lockscreen, status bar, hingga animasi sistem.',
    image: '/images/portfolio/kernel_poco-f5.png',
    technologies: ['Android AOSP', 'Evolution X', 'Magisk Module', 'OMS'],
    liveUrl: 'https://rama.server.my.id/rising-ui-2.5',
    githubUrl: 'https://github.com/Rama-X2/RISING-UI-2.5',
    category: 'UI/UX Enhancement',
    featured: false,
  },
  {
    id: 7,
    title: 'Digital Image Compare Tools',
    description:
      'Aplikasi web berbasis browser untuk membandingkan kualitas dan karakteristik teknis gambar digital secara side-by-side. Mendukung eksperimen Bit Depth (1-bit hingga 32-bit), kompresi JPEG, format TIFF, serta upscaling resolusi. Setiap gambar yang diunggah dianalisis dan ditampilkan dengan metadata lengkap: ukuran file, resolusi, color mode, dan estimasi bit depth. Cocok untuk belajar pengolahan citra digital dan membandingkan trade-off kualitas vs ukuran file.',
    image: '/images/portfolio/banner_digital-image-compare.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Canvas API', 'Vercel'],
    liveUrl: 'https://digital-image-compare-rama-x2.vercel.app',
    githubUrl: 'https://github.com/Rama-X2/Digital-Image-Compare-Tools',
    category: 'Web Tool – Image Processing',
    featured: false,
  },
  {
    id: 8,
    title: 'Thermal Breaker Miyabi Core',
    description:
      'Modul optimasi thermal Magisk tingkat lanjut yang dirancang khusus untuk mengurangi throttling agresif pada sistem Android dengan tetap menjaga perlindungan keamanan hardware.',
    image: '/images/portfolio/thermal-breaker.png',
    technologies: ['Magisk', 'Shell Script', 'Android', 'Thermal Tuning'],
    liveUrl: 'https://github.com/Rama-X2/thermal-breaker-miyabi-core',
    githubUrl: 'https://github.com/Rama-X2/thermal-breaker-miyabi-core',
    category: 'System Tuning',
    featured: false,
  },
  {
    id: 9,
    title: 'GMS Breaker Miyabi Core',
    description:
      'Modul optimasi proses latar belakang GMS (Google Play Services) secara agresif untuk meningkatkan stabilitas CPU, mengurangi penggunaan RAM, dan meningkatkan efisiensi baterai tanpa mengganggu akun Google.',
    image: '/images/portfolio/gms-breaker.png',
    technologies: ['Magisk', 'Shell Script', 'Android', 'Process Management'],
    liveUrl: 'https://github.com/Rama-X2/gms-breaker-miyabi-core',
    githubUrl: 'https://github.com/Rama-X2/gms-breaker-miyabi-core',
    category: 'System Tuning',
    featured: false,
  },
  {
    id: 10,
    title: 'Redmi 10A GPU Performance Unlock',
    description:
      'Modifikasi sistem untuk membuka performa GPU maksimal (Extreme GPU Max OPP Lock) dan Engine Anti-Override pada perangkat Redmi 10A (Helio G25) tanpa menimbulkan konflik thermal.',
    image: '/images/portfolio/gpu-unlock.png',
    technologies: ['Magisk', 'Shell Script', 'Android', 'Overclocking'],
    liveUrl: 'https://github.com/Rama-X2/Redmi-10A_GPU_Performance_Unlock',
    githubUrl: 'https://github.com/Rama-X2/Redmi-10A_GPU_Performance_Unlock',
    category: 'Kernel & GPU Tuning',
    featured: false,
  },
  {
    id: 11,
    title: 'MTK WiFi MAC Randomization Fix',
    description:
      'Modul Magisk untuk mengatasi masalah atau menonaktifkan randomisasi MAC WiFi pada perangkat berprosesor MTK Helio G25 (seperti Redmi 9A/10A) yang menjalankan Android 13 SuperiorOS.',
    image: '/images/portfolio/wifi-mac-fix.png',
    technologies: ['Magisk', 'Shell Script', 'Android', 'Networking'],
    liveUrl: 'https://github.com/Rama-X2/MTK-WiFi-MAC-Randomization-Fix',
    githubUrl: 'https://github.com/Rama-X2/MTK-WiFi-MAC-Randomization-Fix',
    category: 'System Fix',
    featured: false,
  },
  {
    id: 12,
    title: 'Kernel Overclocking by Rama',
    description:
      'Project kustomisasi kernel dengan fokus pada overclocking CPU/GPU, governor tuning, serta optimasi I/O scheduler dan thermal control.',
    image: '/images/portfolio/kernel-lappland.png',
    technologies: ['Android SDK', 'Shell Script', 'Linux Kernel', 'C', 'C++'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Rama-X2',
    category: 'Kernel Development',
    featured: false,
  },
]

// ─── Navigation Sections ───────────────────────────────────────────────────────
const sections = [
  { id: 'home',         name: 'Home',         icon: Home      },
  { id: 'about',        name: 'About',        icon: User      },
  { id: 'projects',     name: 'Projects',     icon: Globe     },
  { id: 'achievements', name: 'Achievements', icon: Trophy    },
  { id: 'contact',      name: 'Contact',      icon: Mail      },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: 'easeOut' },
})

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [selectedCert, setSelectedCert] = useState<(typeof achievements)[0] | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showResume, setShowResume] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
        setSelectedCert(null)
        setShowResume(false)
      }
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const isModalOpen = showResume || !!selectedProject || !!selectedCert
    if (isModalOpen) {
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const isScrollable = target.closest('.resume-img-scroll') || target.closest('.portfolio-modal-content')
      if (!isScrollable && e.cancelable) {
        e.preventDefault()
      }
    }

    if (isModalOpen) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    return () => {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [showResume, selectedProject, selectedCert])

  const navClick = (id: string) => {
    setActiveSection(id)
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen portfolio-bg text-white flex flex-col">
      {/* ── Animated BG blobs ─── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ── WhatsApp Floating Button ─── */}
      <motion.a
        href={personal.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        title="Chat via WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
          <path d="M16 2C8.27 2 2 8.27 2 16c0 2.44.64 4.73 1.77 6.72L2 30l7.45-1.76A13.92 13.92 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm0 25.5a11.44 11.44 0 01-5.84-1.6l-.42-.25-4.42 1.04 1.06-4.3-.27-.44A11.47 11.47 0 014.5 16C4.5 9.6 9.6 4.5 16 4.5S27.5 9.6 27.5 16 22.4 27.5 16 27.5zm6.3-8.55c-.34-.17-2.02-1-2.34-1.11-.32-.11-.55-.17-.78.17-.23.34-.89 1.11-1.09 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.02-1.89-2.36-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.57-.28-.68-.57-.59-.78-.6h-.66c-.23 0-.6.09-.91.43-.32.34-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.02-.82 2.31-1.62.28-.8.28-1.48.2-1.62-.09-.14-.32-.23-.66-.4z"/>
        </svg>
        <span className="whatsapp-label">WhatsApp</span>
      </motion.a>

      {/* ── Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-40 header-glass px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
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
            <p className="text-sm font-bold leading-tight gradient-text">{personal.name}</p>
            <p className="text-[10px] text-gray-400 leading-tight">{personal.title}</p>
          </div>
        </motion.button>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`nav-btn ${activeSection === s.id ? 'nav-btn-active' : ''}`}
            >
              <s.icon className="w-4 h-4" />
              <span>{s.name}</span>
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-current" />
              <div className="w-6 h-0.5 bg-current" />
              <div className="w-6 h-0.5 bg-current" />
            </div>
          )}
        </button>
      </header>

      {/* Mobile dropdown nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 md:hidden z-30 px-4 pb-4 mobile-menu"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => navClick(s.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                  activeSection === s.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <s.icon className="w-5 h-5" />
                <span className="font-medium">{s.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Layout ─── */}
      <div className="flex flex-1 pt-[60px] md:pt-[72px]">
        {/* Sidebar desktop */}
        <aside className="hidden lg:flex flex-col w-60 p-5 m-4 mr-0 rounded-2xl sidebar-glass flex-shrink-0">
          <div className="space-y-1">
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === s.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ x: 4 }}
              >
                <s.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{s.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Mini skills */}
          <div className="mt-6 p-4 rounded-xl glass-card">
            <h3 className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Skills</h3>
            <div className="space-y-2">
              {skills.slice(0, 5).map((sk) => (
                <div key={sk.name}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-300">{sk.name}</span>
                    <span style={{ color: sk.color }}>{sk.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sk.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                      className="h-1 rounded-full"
                      style={{ backgroundColor: sk.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact quick */}
          <div className="mt-4 p-4 rounded-xl glass-card">
            <h3 className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Kontak</h3>
            <div className="space-y-2">
              <a href={personal.whatsapp} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-[11px] text-green-400 hover:text-green-300 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{personal.email}</span>
              </a>
            </div>
          </div>
        </aside>

        {/* ── Content ─── */}
        <main className="flex-1 p-3 md:p-5 lg:p-6 overflow-y-auto custom-scrollbar min-w-0">
          <AnimatePresence mode="wait">

            {/* ════════════════════════════════ HOME ═══ */}
            {activeSection === 'home' && (
              <motion.div key="home"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-5 md:space-y-6">

                {/* Hero card */}
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
                        👋 Halo, saya
                      </motion.p>
                      <motion.h1 {...fadeUp(0.2)} className="text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text leading-tight mb-2">
                        {personal.name}
                      </motion.h1>
                      <motion.p {...fadeUp(0.25)} className="text-base md:text-lg text-gray-300 mb-3 font-medium">
                        {personal.title}
                      </motion.p>
                      <motion.p {...fadeUp(0.3)} className="text-sm text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                        {personal.bio}
                      </motion.p>

                      {/* Status badge */}
                      <motion.div {...fadeUp(0.35)} className="flex justify-center md:justify-start mt-3">
                        <span className="available-badge">
                          <span className="dot" /> Available for new opportunities
                        </span>
                      </motion.div>

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
                          View Resume
                        </motion.button>
                        <motion.button
                          onClick={() => navClick('contact')}
                          className="btn-outline flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          id="contact-btn"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Hubungi Saya
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Quick nav cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { id: 'about',        icon: User,    label: 'About Me',     sub: 'Siapa saya',          color: '#6366f1' },
                    { id: 'projects',     icon: Globe,   label: 'Projects',     sub: 'Karya & portfolio',   color: '#10b981' },
                    { id: 'achievements', icon: Trophy,  label: 'Achievements', sub: 'Sertifikat & penghargaan', color: '#f59e0b' },
                    { id: 'contact',      icon: Mail,    label: 'Contact',      sub: 'Hubungi saya',        color: '#ec4899' },
                  ].map((item, i) => (
                    <motion.button
                      key={item.id}
                      onClick={() => navClick(item.id)}
                      className="glass-card rounded-xl p-4 md:p-5 text-left hover:shadow-glow transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className="p-2 rounded-lg w-fit mb-3" style={{ backgroundColor: `${item.color}25` }}>
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <p className="font-semibold text-white text-sm md:text-base">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Mini Skills */}
                <motion.div {...fadeUp(0.6)} className="glass-card rounded-2xl p-5 md:p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" /> Skills & Teknologi
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {skills.map((sk, i) => (
                      <motion.div
                        key={sk.name}
                        className="flex items-center gap-2 p-2.5 rounded-xl"
                        style={{ backgroundColor: `${sk.color}12`, border: `1px solid ${sk.color}30` }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.06 }}
                        whileHover={{ scale: 1.04 }}
                      >
                        <sk.icon className="w-4 h-4 flex-shrink-0" style={{ color: sk.color }} />
                        <span className="text-xs font-medium text-gray-200">{sk.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ════════════════════════════════ ABOUT ═══ */}
            {activeSection === 'about' && (
              <motion.div key="about"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6">

                {/* Profile */}
                <div className="glass-card rounded-2xl p-5 md:p-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="avatar-ring w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                      <Image src={personal.avatar} alt={personal.name} width={112} height={112}
                        className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h1 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">{personal.name}</h1>
                      <p className="text-gray-300 font-medium mb-2">{personal.title}</p>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-gray-400 mb-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{personal.location}</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{personal.bio}</p>
                      {/* Social links */}
                      <div className="flex justify-center sm:justify-start gap-3 mt-4">
                        {[
                          { icon: Github,    href: personal.github,    label: 'GitHub'    },
                          { icon: Linkedin,  href: personal.linkedin,  label: 'LinkedIn'  },
                          { icon: Instagram, href: personal.instagram, label: 'Instagram' },
                          { icon: Globe,     href: personal.website,   label: 'Website'   },
                        ].map((link) => (
                          <motion.a key={link.label} href={link.href} target="_blank" rel="noreferrer"
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

                {/* Experience Timeline */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold gradient-text mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-primary" /> Pengalaman
                  </h2>
                  <div className="space-y-4">
                    {experiences.map((exp, i) => (
                      <motion.div key={i}
                        {...fadeUp(i * 0.12)}
                        className="glass-card rounded-xl p-5 md:p-6 relative overflow-hidden"
                        whileHover={{ y: -2 }}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: exp.color }} />
                        <div className="pl-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                            <h3 className="font-bold text-white text-base md:text-lg">{exp.position}</h3>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full w-fit"
                              style={{ backgroundColor: `${exp.color}20`, color: exp.color }}>
                              {exp.period}
                            </span>
                          </div>
                          <ul className="space-y-1.5">
                            {exp.descriptions.map((desc, di) => (
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

                {/* Education */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold gradient-text mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-primary" /> Pendidikan
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu, i) => (
                      <motion.div key={i}
                        {...fadeUp(i * 0.1)}
                        className="glass-card rounded-xl p-5 flex items-start gap-4"
                        whileHover={{ y: -2 }}
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
                                Ongoing
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-primary font-medium mt-0.5">{edu.degree}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{edu.period}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════ ACHIEVEMENTS ═══ */}
            {activeSection === 'achievements' && (
              <motion.div key="achievements"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6">

                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">Achievements</h2>
                  <p className="text-gray-400 text-sm">Sertifikat & penghargaan yang telah saya raih</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {achievements.map((item, i) => (
                    <motion.div key={item.id}
                      {...fadeUp(i * 0.1)}
                      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                      whileHover={{ y: -5, scale: 1.01 }}
                      onClick={() => setSelectedCert(item)}
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
                          <span>{item.date}</span>
                        </div>
                        <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Klik untuk lihat sertifikat</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════ PROJECTS ═══ */}
            {activeSection === 'projects' && (
              <motion.div key="projects"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6">

                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">My Projects</h2>
                  <p className="text-gray-400 text-sm">Koleksi project yang pernah saya kerjakan</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {projects.map((project, i) => (
                    <motion.div key={project.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                      whileHover={{ y: -5, scale: 1.01 }}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Project image */}
                      <div className="relative h-40 sm:h-44 overflow-hidden">
                        <Image src={project.image} alt={project.title} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        {project.featured && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 bg-yellow-500/90 text-black rounded-full text-[10px] font-bold flex items-center gap-1">
                            <Star className="w-3 h-3" /> Featured
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
                        <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-primary/15 text-primary rounded-full text-[10px] font-medium border border-primary/20">
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
                  ))}
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════ CONTACT ═══ */}
            {activeSection === 'contact' && (
              <motion.div key="contact"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6 max-w-3xl mx-auto">

                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold gradient-text mb-2">Get In Touch</h2>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Punya project atau ingin berdiskusi? Jangan ragu untuk menghubungi saya!
                  </p>
                </div>

                {/* Contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: MessageCircle, label: 'WhatsApp', value: personal.phone, href: personal.whatsapp, color: '#25D366', bg: '#25D36618' },
                    { icon: Mail,         label: 'Email',    value: personal.email,    href: `mailto:${personal.email}`, color: '#6366f1', bg: '#6366f118' },
                    { icon: MapPin,       label: 'Lokasi',   value: personal.location, href: '#', color: '#ec4899', bg: '#ec489918' },
                  ].map((c) => (
                    <motion.a key={c.label}
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      {...fadeUp(0.1)}
                      className="glass-card rounded-xl p-5 flex flex-col items-center text-center gap-2 hover:shadow-glow transition-all"
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className="p-3 rounded-xl" style={{ backgroundColor: c.bg }}>
                        <c.icon className="w-5 h-5" style={{ color: c.color }} />
                      </div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{c.label}</p>
                      <p className="text-sm text-white font-semibold">{c.value}</p>
                    </motion.a>
                  ))}
                </div>

                {/* Social links */}
                <div className="glass-card rounded-xl p-5">
                  <h3 className="text-base font-bold text-white mb-4 text-center">Temukan Saya Di</h3>
                  <div className="flex justify-center gap-3 flex-wrap">
                    {[
                      { icon: Github,    href: personal.github,    label: 'GitHub',    color: '#f5f5f5' },
                      { icon: Linkedin,  href: personal.linkedin,  label: 'LinkedIn',  color: '#0A66C2' },
                      { icon: Instagram, href: personal.instagram, label: 'Instagram', color: '#E1306C' },
                      { icon: Globe,     href: personal.website,   label: 'Website',   color: '#6366f1' },
                    ].map((s) => (
                      <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                        title={s.label}
                        className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl text-sm text-gray-300 hover:text-white transition-all"
                        whileHover={{ scale: 1.07, y: -2 }}
                      >
                        <s.icon className="w-4 h-4" style={{ color: s.color }} />
                        <span>{s.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Contact form */}
                <motion.div {...fadeUp(0.3)} className="glass-card rounded-xl p-5 md:p-6">
                  <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" /> Kirim Pesan
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Nama Anda"
                        className="form-input" />
                      <input type="email" placeholder="Email Anda"
                        className="form-input" />
                    </div>
                    <input type="text" placeholder="Subjek"
                      className="form-input w-full" />
                    <textarea rows={4} placeholder="Pesan Anda..."
                      className="form-input w-full resize-none" />
                    <motion.button
                      className="btn-primary w-full flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Footer */}
          <footer className="mt-10 pb-24 md:pb-6 text-center text-xs text-gray-500">
            <p>© 2025 {personal.name} · All rights reserved</p>
          </footer>
        </main>
      </div>

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
                  <h2 className="text-xl md:text-2xl font-bold gradient-text mb-0.5">{selectedProject.title}</h2>
                  <p className="text-xs text-primary">{selectedProject.category}</p>
                </div>
                <motion.button onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}>
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="relative h-44 md:h-56 rounded-xl mb-5 overflow-hidden">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                {selectedProject.featured && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/90 text-black rounded-full text-xs font-bold">
                    Featured
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">{selectedProject.description}</p>

              <div className="mb-4">
                <h3 className="font-bold text-white mb-2 text-sm">Teknologi</h3>
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
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </motion.a>
                <motion.a href={selectedProject.githubUrl} target="_blank" rel="noreferrer"
                  className="flex-1 btn-outline flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Github className="w-4 h-4" /> Source Code
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
                  <h2 className="text-base md:text-lg font-bold gradient-text leading-snug">{selectedCert.title}</h2>
                  <p className="text-xs text-primary mt-0.5">{selectedCert.issuer}</p>
                </div>
                <motion.button onClick={() => setSelectedCert(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}>
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="relative rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '1.414/1' }}>
                <Image src={selectedCert.image} alt={selectedCert.title} fill className="object-contain bg-white/5" />
              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{selectedCert.date}</span>
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
                <h2 className="text-lg font-bold gradient-text">Resume / CV</h2>
                <motion.button onClick={() => setShowResume(false)}
                  className="p-2 text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1, rotate: 90 }}>
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Scrollable image area */}
              <div className="resume-img-scroll">
                <img
                  src="/gambar-resume/cv-resume-ade-rama.png"
                  alt="Resume Ade Ramadhani Putra"
                  className="resume-img"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 flex-shrink-0">
                <motion.a
                  href="/gambar-resume/cv-resume-ade-rama.png"
                  download="CV-Resume-Ade-Ramadhani-Putra.png"
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-4 h-4" /> Download Resume
                </motion.a>
                <motion.a
                  href="/gambar-resume/cv-resume-ade-rama.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4" /> Buka di Tab Baru
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
