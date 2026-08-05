'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  User,
  Folder,
  Award,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Globe,
  FileText,
  MessageCircle,
  MapPin,
  Send,
  X,
  Zap,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Download,
  Star,
  Loader2,
} from 'lucide-react'

// ─── Types & Data ──────────────────────────────────────────────────────────────
type Language = 'id' | 'en'

const personal = {
  name: 'Ade Ramadhani Putra',
  title: 'Full Stack Developer & UI/UX Designer',
  avatar: '/images/portfolio/rama-x2.jpg',
  location: 'Sukabumi, Jawa Barat',
  email: 'aderamadhaniputra35@gmail.com',
  website: 'https://rama-x2.my.id',
  github: 'https://github.com/Rama-X2',
  linkedin: 'https://linkedin.com/in/rama-xd',
  instagram: 'https://instagram.com/rama_ext4',
}

const techStackList = [
  { name: 'HTML5', icon: 'html' },
  { name: 'CSS3', icon: 'css' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'TypeScript', icon: 'ts' },
  { name: 'PHP', icon: 'php' },
  { name: 'C', icon: 'c' },
  { name: 'C++', icon: 'cpp' },
  { name: 'Java', icon: 'java' },
  { name: 'Python', icon: 'py' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'React', icon: 'react' },
  { name: 'Vue.js', icon: 'vue' },
  { name: 'Svelte', icon: 'svelte' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Express', icon: 'express' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Linux Kernel', icon: 'linux' },
  { name: 'Docker', icon: 'docker' },
  { name: 'NestJS', icon: 'nestjs' },
  { name: 'Git', icon: 'git' },
  { name: 'Arch Linux', icon: 'arch' },
  { name: 'Android SDK', icon: 'android' },
  { name: 'VS Code', icon: 'vscode' },
  { name: 'Sublime Text', icon: 'sublime' },
  { name: 'Figma', icon: 'figma' },
]

const experiences = [
  {
    position: 'Full Stack Developer & Systems Designer',
    positionEn: 'Full Stack Developer & Systems Designer',
    period: '2023 – Sekarang',
    periodEn: '2023 – Present',
    color: '#6366f1',
    descriptions: [
      'Merancang dan membangun aplikasi web berkinerja tinggi menggunakan Next.js, React, dan TypeScript.',
      'Mengembangkan RESTful API scalable dan manajemen database terintegrasi.',
      'Mengimplementasikan desain UI/UX responsif, modern, dan bernuansa premium.',
    ],
    descriptionsEn: [
      'Designed and built high-performance web applications using Next.js, React, and TypeScript.',
      'Developed scalable RESTful APIs and integrated database management systems.',
      'Implemented responsive, modern, and premium UI/UX designs.',
    ],
  },
  {
    position: 'Linux Kernel & Android Customization',
    positionEn: 'Linux Kernel & Android Customization Specialist',
    period: '2022 – Sekarang',
    periodEn: '2022 – Present',
    color: '#10b981',
    descriptions: [
      'Kustomisasi kernel Linux, optimasi governor CPU/GPU, dan tuning performa I/O.',
      'Pengembangan custom ROM berbasis AOSP dan integrasi modul Android.',
    ],
    descriptionsEn: [
      'Linux kernel customization, CPU/GPU governor optimization, and I/O performance tuning.',
      'AOSP-based custom ROM development and Android module integration.',
    ],
  },
  {
    position: 'UI/UX Designer',
    positionEn: 'UI/UX Designer',
    period: '2023 – Sekarang',
    periodEn: '2023 – Present',
    color: '#06b6d4',
    descriptions: [
      'Membuat wireframe, kaji antarmuka pengguna, dan prototipe interaktif menggunakan Figma.',
      'Memastikan konsistensi sistem desain, aksesibilitas, dan kenyamanan pengguna.',
    ],
    descriptionsEn: [
      'Created wireframes, user interface studies, and interactive prototypes using Figma.',
      'Ensured design system consistency, accessibility, and user comfort.',
    ],
  },
]

const education = [
  {
    institution: 'Universitas Linggabuana PGRI Sukabumi',
    degree: 'S1 Teknik Informatika',
    degreeEn: 'B.S. in Informatics Engineering',
    period: 'Sedang Berjalan',
    periodEn: 'Ongoing',
    location: 'Sukabumi, Jawa Barat',
    locationEn: 'Sukabumi, West Java',
    logo: '/logo-kampus/logo-kampus.jpeg',
    ongoing: true,
  },
  {
    institution: 'MA Al-Ma\'arij Hegarmanah',
    degree: 'IPS',
    degreeEn: 'Social Sciences (IPS)',
    period: '2021 – 2024',
    periodEn: '2021 – 2024',
    location: 'Sukabumi, Jawa Barat',
    locationEn: 'Sukabumi, West Java',
    logo: null,
    ongoing: false,
  },
]

const achievements = [
  {
    id: 1,
    title: 'Cisco Networking Academy – Ethical Hacker',
    issuer: 'Cisco Networking Academy',
    date: '22 Juli 2026',
    dateEn: 'July 22, 2026',
    image: '/gambar-sertifikat/cisco-ethical-hacker-certificate.png',
    verifyUrl: 'https://www.credly.com/badges/d6d1ef95-849b-4e56-8501-a7b67c7574e9/public_url',
  },
  {
    id: 2,
    title: 'Cisco Networking Academy – Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '20 Juli 2026',
    dateEn: 'July 20, 2026',
    image: '/gambar-sertifikat/cisco-intro-cybersecurity-certificate.png',
    verifyUrl: 'https://www.credly.com/badges/6ee1a4bb-bd90-482a-aef2-2a5433d710db/public_url',
  },
  {
    id: 3,
    title: 'Cisco Networking Academy – Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: '20 Juli 2026',
    dateEn: 'July 20, 2026',
    image: '/gambar-sertifikat/cisco-networking-basics-certificate.png',
    verifyUrl: 'https://www.credly.com/badges/8c8ab9c0-6202-4bb3-a3d8-21d3f9f3ef4d/public_url',
  },
  {
    id: 4,
    title: 'DevCoach #200: Integrasi IT & AI powered by Asah!',
    issuer: 'DevCoach x Asah!',
    date: '26 Juni 2025',
    dateEn: 'June 26, 2025',
    image: '/gambar-sertifikat/devcoach-200.png',
    verifyUrl: 'https://www.dicoding.com/certificates/N9ZO5WO10PG5',
  },
  {
    id: 5,
    title: 'IDCamp x Dicoding Live #10 – UiPath Agentic Automation: Introduction and Use Case',
    issuer: 'Indosat Ooredoo Hutchison Digital Camp',
    date: '10 Juli 2025',
    dateEn: 'July 10, 2025',
    image: '/gambar-sertifikat/idcamp-live-10.png',
    verifyUrl: 'https://www.dicoding.com/certificates/KZX72V6NWX68',
  },
  {
    id: 6,
    title: 'IDCamp Alumni Dialogue #5 – Debunking the Myth of Intelligent Automation: Prepare for the Future Workforce',
    issuer: 'Indosat Ooredoo Hutchison Digital Camp',
    date: '22 Juli 2025',
    dateEn: 'July 22, 2025',
    image: '/gambar-sertifikat/idcamp-dialogue-5.png',
    verifyUrl: 'https://www.dicoding.com/certificates/N9ZO51N20PG5',
  },
]

const projects = [
  {
    id: 1,
    title: 'BumiTani – Premium Agricultural E-Commerce',
    description: 'Website e-commerce pertanian modern premium dengan database 72 produk (bibit, nutrisi, pakan, peralatan, pestisida, dan pupuk) dalam 6 kategori. Dilengkapi filter dan pencarian real-time, detail modal produk, sistem keranjang LocalStorage, serta checkout via WhatsApp.',
    descriptionEn: 'Modern premium agricultural e-commerce website featuring a 72-product database across 6 categories. Equipped with real-time search & filters, product detail modals, LocalStorage cart system, and WhatsApp checkout.',
    category: 'Web Development',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'LocalStorage'],
    image: '/gambar-project/bumitani.png',
    liveDemoUrl: 'https://bumitani.server.my.id/',
    sourceCodeUrl: 'https://github.com/Rama-X2/bumitani-ecommerce',
    featured: true,
  },
  {
    id: 2,
    title: 'HomeLab – Premium Powder Drink E-Commerce',
    description: 'Platform e-commerce dan editorial web premium yang dirancang khusus untuk mempresentasikan lini produk bubuk minuman premium. Fokus pada estetika high-end, performa ringan tanpa overhead framework berat, serta pengalaman belanja (UI/UX) yang seamless.',
    descriptionEn: 'Premium powder drink e-commerce platform featuring high-end aesthetics, lightweight performance, and a seamless shopping experience.',
    category: 'Web Development',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'LocalStorage'],
    image: '/gambar-project/homelab.jpg',
    liveDemoUrl: 'https://homelab.server.my.id/',
    sourceCodeUrl: 'https://github.com/Rama-X2/homelab-ecommerce',
    featured: true,
  },
  {
    id: 3,
    title: 'Rama Store – Gaming Topup Platform',
    description: 'Modern gaming top-up platform dengan real-time transaction processing, multi-game support, dan animasi yang menarik. Dibangun menggunakan Next.js, TypeScript, dan Framer Motion.',
    descriptionEn: 'Modern gaming top-up platform with real-time transaction processing, multi-game support, and engaging animations built using Next.js, TypeScript, and Framer Motion.',
    category: 'Web Development',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    image: '/gambar-project/rama-store.png',
    liveDemoUrl: 'https://store.rama-x2.my.id/',
    sourceCodeUrl: 'https://github.com/Rama-X2/rama-store',
    featured: true,
  },
  {
    id: 4,
    title: 'Custom ROM by Rama – Basic AOSP',
    description: 'ROM custom ringan berbasis Android 15 (Vanilla Ice Cream) yang disempurnakan dengan asisten AI cerdas menggunakan TensorFlow dan NLP. Menawarkan pengalaman Android murni yang responsif, hemat baterai, dan efisien.',
    descriptionEn: 'Lightweight Android 15 (Vanilla Ice Cream) custom ROM enhanced with AI assistant using TensorFlow & NLP for pure performance.',
    category: 'Operating System',
    technologies: ['AOSP', 'Android 15', 'Shell Script', 'Python'],
    image: '/gambar-project/custom-rom-aosp.png',
    sourceCodeUrl: 'https://github.com/Rama-X2',
    featured: true,
  },
  {
    id: 5,
    title: 'Kernel Overclocking by Rama',
    description: 'Project kustomisasi kernel dengan fokus pada overclocking CPU/GPU, governor tuning, serta optimasi I/O scheduler. Menghasilkan peningkatan performa perangkat hingga 25% tanpa mengorbankan stabilitas sistem.',
    descriptionEn: 'Kernel customization focused on CPU/GPU overclocking, governor tuning, and I/O scheduler optimization boosting performance by 25%.',
    category: 'Operating System',
    technologies: ['Android SDK', 'Shell Script', 'Linux Kernel', 'C'],
    image: '/gambar-project/kernel-overclocking.png',
    sourceCodeUrl: 'https://github.com/Rama-X2',
  },
]

const translations = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      achievements: 'Prestasi',
      contact: 'Kontak',
    },
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
      title: 'Tentang Saya',
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
      technologies: 'Tech Stack',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
    },
    contactSec: {
      tag: 'HUBUNGI SAYA',
      heading: 'Mari Berdiskusi!',
      description: 'Punya proyek menarik, ingin berkolaborasi, atau sekadar berdiskusi? Jangan ragu untuk menghubungi saya! Saya akan berusaha membalas secepat mungkin.',
      locationTag: 'LOKASI & JANGKAUAN',
      locationHeading: 'Sukabumi, Jawa Barat',
      locationDesc: 'Berbasis di Sukabumi, Jawa Barat. Siap bekerja secara remote (jarak jauh) untuk klien dari seluruh dunia maupun on-site untuk proyek lokal.',
      openMaps: 'Buka di Google Maps',
      socialsTag: 'MEDIA SOSIAL',
      socialsHeading: 'Temukan Saya Di',
      formTag: 'PESAN INSTAN',
      formHeading: 'Kirim Pesan Instan',
      formDesc: 'Gunakan formulir di bawah ini untuk mengirimkan pesan secara instan. Semua masukan Anda sangat berarti bagi saya.',
      fullName: 'Nama Lengkap',
      fullNamePlaceholder: 'Nama Anda',
      emailAddress: 'Alamat Email',
      emailPlaceholder: 'Email Anda',
      subject: 'Subjek',
      subjectPlaceholder: 'Apa subjek pesan Anda?',
      message: 'Isi Pesan',
      messagePlaceholder: 'Tuliskan pesan Anda di sini...',
      sendMessage: 'Kirim Pesan Instan',
      sending: 'Mengirim...',
      successMsg: 'Pesan Anda berhasil terkirim! Terima kasih telah menghubungi saya.',
    },
    resumeModal: {
      downloadPdf: 'Unduh CV (PDF)',
      close: 'Tutup',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      achievements: 'Achievements',
      contact: 'Contact',
    },
    personal: {
      greeting: "Hello, I'm",
      bio: 'A Full Stack Developer and UI/UX Designer who actively develops modern digital solutions, ranging from websites, software, to high-performance systems. Passionate about web development, server management, and system optimization, focusing on creating responsive, efficient, and user-friendly applications.',
      location: 'Sukabumi, West Java',
      available: 'Available for opportunities',
      viewResume: 'View Resume',
      contactMe: 'Contact Me',
    },
    quickCards: {
      about: { label: 'About Me', sub: 'Who I am' },
      projects: { label: 'My Projects', sub: 'Works & portfolio' },
      achievements: { label: 'Achievements', sub: 'Certificates & awards' },
      contact: { label: 'Contact', sub: 'Get in touch' },
    },
    skillsTitle: 'Tech Stack',
    aboutSec: {
      title: 'About Me',
      experienceTitle: 'Experience',
      educationTitle: 'Education',
      ongoing: 'Ongoing',
    },
    achievementsSec: {
      title: 'Achievements & Certificates',
      subtitle: 'Certificates and awards I have earned',
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
      tag: 'CONTACT ME',
      heading: "Let's Connect!",
      description: 'Have an interesting project, want to collaborate, or just say hi? Feel free to reach out to me! I will do my best to respond as soon as possible.',
      locationTag: 'LOCATION & REACH',
      locationHeading: 'Sukabumi, West Java',
      locationDesc: 'Based in Sukabumi, West Java. Open for remote work worldwide as well as on-site for local projects.',
      openMaps: 'Open in Google Maps',
      socialsTag: 'SOCIAL MEDIA',
      socialsHeading: 'Find Me On',
      formTag: 'INSTANT MESSAGE',
      formHeading: 'Send Instant Message',
      formDesc: 'Use the form below to send me a message directly. All input is greatly appreciated.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Your Name',
      emailAddress: 'Email Address',
      emailPlaceholder: 'Your Email',
      subject: 'Subject',
      subjectPlaceholder: 'What is the subject of your message?',
      message: 'Message',
      messagePlaceholder: 'Write your message here...',
      sendMessage: 'Send Instant Message',
      sending: 'Sending...',
      successMsg: 'Your message has been sent successfully! Thank you for reaching out.',
    },
    resumeModal: {
      downloadPdf: 'Download CV (PDF)',
      close: 'Close',
    },
  },
}

export default function Portfolio() {
  const [lang, setLang] = useState<Language>('id')
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedCert, setSelectedCert] = useState<any>(null)
  const [showResume, setShowResume] = useState(false)

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const t = translations[lang]

  const sections = [
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
      {/* ── Animated BG blobs ─── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

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

        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Language Switcher Pill (Desktop) */}
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
        </div>
      </header>

      {/* Mobile dropdown nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="fixed top-[62px] right-4 w-44 md:hidden z-30 p-1.5 rounded-xl glass-card shadow-glow bg-[#0c0a1e]/95 origin-top-right"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => navClick(s.id)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg mb-0.5 transition-all text-xs ${
                  activeSection === s.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <s.icon className="w-4 h-4" />
                <span className="font-medium">{s.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Layout ─── */}
      <div className="flex flex-1 pt-[60px] md:pt-[72px]">
        {/* Sidebar desktop */}
        <aside className="hidden lg:flex flex-col w-60 p-5 m-4 mr-0 rounded-2xl sidebar-glass flex-shrink-0 sticky top-[88px] h-[calc(100vh-104px)] self-start overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => navClick(s.id)}
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
          {/* Contact quick */}
          <div className="mt-4 p-4 rounded-xl glass-card">
            <h3 className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">{t.nav.contact}</h3>
            <div className="space-y-2">
              <button
                onClick={() => navClick('contact')}
                className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors w-full text-left"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span className="truncate">{t.contactSec.formHeading}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full min-w-0 pb-20 md:pb-8">
          {/* ════════════════════════════════ HOME ═══ */}
          <motion.section
            id="home"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-24 space-y-5 md:space-y-6"
          >
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

            {/* Quick nav cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { id: 'about', icon: User, label: t.quickCards.about.label, sub: t.quickCards.about.sub, color: '#6366f1' },
                { id: 'projects', icon: Folder, label: t.quickCards.projects.label, sub: t.quickCards.projects.sub, color: '#10b981' },
                { id: 'achievements', icon: Award, label: t.quickCards.achievements.label, sub: t.quickCards.achievements.sub, color: '#f59e0b' },
                { id: 'contact', icon: Mail, label: t.quickCards.contact.label, sub: t.quickCards.contact.sub, color: '#ec4899' },
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => navClick(item.id)}
                  className="glass-card rounded-xl p-4 md:p-5 text-left hover:shadow-glow transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
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

            {/* Tech Stack & Tools */}
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
          </motion.section>

          {/* ════════════════════════════════ ABOUT ═══ */}
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            {/* Profile */}
            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/10">
              <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-5 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="avatar-ring w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                  <Image
                    src={personal.avatar}
                    alt={personal.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">{personal.name}</h1>
                  <p className="text-gray-300 font-medium mb-2">{personal.title}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-gray-400 mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{t.personal.location}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{t.personal.bio}</p>
                  {/* Social links */}
                  <div className="flex justify-center sm:justify-start gap-3 mt-4">
                    {[
                      { icon: Github, href: personal.github, label: 'GitHub' },
                      { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
                      { icon: Instagram, href: personal.instagram, label: 'Instagram' },
                      { icon: Globe, href: personal.website, label: 'Website' },
                    ].map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
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

            {/* Education */}
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
          </motion.section>

          {/* ════════════════════════════════ PROJECTS ═══ */}
          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            <div className="glass-card rounded-2xl p-5 md:p-6 border border-white/10">
              <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              <h2 className="text-2xl md:text-3xl font-extrabold gradient-text flex items-center gap-2.5 mb-1">
                <Folder className="w-6 h-6 text-emerald-400" /> {t.projectsSec.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-400">{t.projectsSec.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer group render-optimized"
                  whileHover={{ y: -5, scale: 1.01 }}
                  onClick={() => setSelectedProject(project)}
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
              ))}
            </div>
          </motion.section>

          {/* ════════════════════════════════ ACHIEVEMENTS ═══ */}
          <motion.section
            id="achievements"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10"
          >
            <div className="glass-card rounded-2xl p-5 md:p-6 border border-white/10">
              <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              <h2 className="text-2xl md:text-3xl font-extrabold gradient-text flex items-center gap-2.5 mb-1">
                <Award className="w-6 h-6 text-yellow-400" /> {t.achievementsSec.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-400">{t.achievementsSec.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {achievements.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer group render-optimized"
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
                      <span>{lang === 'en' && item.dateEn ? item.dateEn : item.date}</span>
                    </div>
                    <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.achievementsSec.clickToView}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ════════════════════════════════ CONTACT ═══ */}
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20 space-y-6 pt-6 md:pt-10 max-w-5xl mx-auto"
          >
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Column: Direct Info & Socials (Span 5 on Desktop) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Header Card */}
                <div className="glass-card rounded-2xl p-6 md:p-7 border border-white/10 space-y-3 group text-center flex flex-col items-center justify-center">
                  <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-1 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 inline-block">
                    {t.contactSec.tag}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold gradient-text">
                    {t.contactSec.heading}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
                    {t.contactSec.description}
                  </p>
                </div>

                {/* Location Info Card */}
                <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                        {t.contactSec.locationTag}
                      </span>
                      <h3 className="font-bold text-white text-base md:text-lg">
                        {t.contactSec.locationHeading}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {t.contactSec.locationDesc}
                      </p>
                      <a
                        href="https://maps.google.com/?q=Sukabumi,Jawa+Barat"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors pt-2"
                      >
                        <span>{t.contactSec.openMaps}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {t.contactSec.socialsHeading}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Github, href: personal.github, label: 'GitHub' },
                      { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
                      { icon: Instagram, href: personal.instagram, label: 'Instagram' },
                      { icon: Globe, href: personal.website, label: 'Website' },
                    ].map((s) => (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2.5 p-3 rounded-xl glass-card border border-white/5 text-gray-300 hover:text-white transition-all text-xs font-semibold"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <s.icon className="w-4 h-4 text-primary" />
                        <span>{s.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 text-primary">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base md:text-lg">
                        {t.contactSec.formHeading}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {t.contactSec.formDesc}
                      </p>
                    </div>
                  </div>

                  {submitSuccess ? (
                    <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30 text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
                      <h4 className="font-bold text-white text-base">Terima Kasih!</h4>
                      <p className="text-xs text-green-300 leading-relaxed">
                        {t.contactSec.successMsg}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-300">
                            {t.contactSec.fullName}
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder={t.contactSec.fullNamePlaceholder}
                            className="form-input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-300">
                            {t.contactSec.emailAddress}
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder={t.contactSec.emailPlaceholder}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300">
                          {t.contactSec.subject}
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleFormChange}
                          placeholder={t.contactSec.subjectPlaceholder}
                          className="form-input"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300">
                          {t.contactSec.message}
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleFormChange}
                          placeholder={t.contactSec.messagePlaceholder}
                          className="form-input resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 mt-2 text-sm font-semibold disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{t.contactSec.sending}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{t.contactSec.sendMessage}</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="mt-12 py-6 text-center text-xs text-gray-500 border-t border-white/5">
            <p>
              Copyright © 2025 – {new Date().getFullYear()}{' '}
              <span className="text-gray-300 font-semibold">{personal.name} (Rama-X2)</span>.{' '}
              {lang === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi undang-undang.'}
            </p>
          </footer>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 mobile-bottom-nav md:hidden flex justify-around items-center px-2 py-2">
        {sections.map((s) => {
          const isActive = activeSection === s.id
          return (
            <button
              key={s.id}
              onClick={() => navClick(s.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-200 font-normal'
              }`}
            >
              <s.icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px]">{s.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1.5 h-1.5 rounded-full bg-primary absolute -bottom-0.5"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* ── Modals ─── */}
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
                    {selectedProject.technologies.map((tech: string) => (
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
    </div>
  )
}
