'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Code,
  Globe,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Award,
  Zap,
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
  Monitor,
  Smartphone,
  Server,
  Database,
  Layers,
  Star,
  Loader2,
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────────
const personal = {
  name: 'Ade Ramadhani Putra',
  title: 'Full Stack Developer & UI/UX Designer',
  avatar: '/images/portfolio/foto_rama.png',
  location: 'Sukabumi, Jawa Barat',
  email: 'aderamadhaniputra35@gmail.com',
  phone: '+62 857-9518-5561',
  whatsapp: 'https://wa.me/6285795185561',
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
  { name: 'NGINX', icon: 'nginx' },
  { name: 'React', icon: 'react' },
  { name: 'Vue.js', icon: 'vue' },
  { name: 'Svelte', icon: 'svelte' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Express', icon: 'express' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Ubuntu', icon: 'ubuntu' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Arch Linux', icon: 'arch' },
  { name: 'Linux', icon: 'linux' },
  { name: 'Android', icon: 'androidstudio' },
  { name: 'VS Code', icon: 'vscode' },
  { name: 'Postman', icon: 'postman' },
  { name: 'Figma', icon: 'figma' },
]

const experiences = [
  {
    position: 'IT Support & System Developer',
    positionEn: 'IT Support & System Developer',
    period: '2023 – Sekarang',
    periodEn: '2023 – Present',
    descriptions: [
      'Melakukan troubleshooting, maintenance, dan optimasi perangkat komputer serta smartphone.',
      'Menangani instalasi sistem operasi, driver, dan konfigurasi software.',
      'Mengembangkan dan memodifikasi sistem Android seperti custom ROM, tweaking, dan optimasi performa.',
      'Membantu pengguna dalam perbaikan software serta peningkatan stabilitas perangkat.',
    ],
    descriptionsEn: [
      'Troubleshooting, maintaining, and optimizing computer hardware and smartphones.',
      'Managing OS installations, driver setups, and software configurations.',
      'Developing and tweaking Android systems, custom ROMs, and performance tuning.',
      'Assisting users with software repairs and enhancing device stability.',
    ],
    color: '#6366f1',
  },
  {
    position: 'Full Stack Web Developer',
    positionEn: 'Full Stack Web Developer',
    period: '2024 – Sekarang',
    periodEn: '2024 – Present',
    descriptions: [
      'Mengembangkan website dan aplikasi berbasis web modern dengan fokus pada performa dan pengalaman pengguna.',
      'Membuat sistem CRUD, dashboard admin, dan landing page responsif menggunakan PHP, JavaScript, dan MySQL.',
      'Mengelola deployment website dan konfigurasi hosting berbasis Linux serta cloud platform.',
      'Mendesain antarmuka modern yang responsif dan mudah digunakan.',
    ],
    descriptionsEn: [
      'Developing modern web applications and websites focused on speed, security, and user experience.',
      'Building CRUD systems, admin dashboards, and responsive landing pages using PHP, JavaScript, and MySQL.',
      'Managing website deployments and cloud/Linux-based server hosting configurations.',
      'Designing clean, modern, and user-friendly interfaces.',
    ],
    color: '#8b5cf6',
  },
  {
    position: 'Personal Software & Experimental Projects',
    positionEn: 'Personal Software & Experimental Projects',
    period: '2021 – Sekarang',
    periodEn: '2021 – Present',
    descriptions: [
      'Mengembangkan berbagai project software dan eksperimen teknologi secara mandiri.',
      'Melakukan optimasi sistem, debugging, dan tuning performa pada berbagai environment.',
      'Mengeksplorasi pengembangan berbasis Linux, Android, dan web technology.',
      'Mendesain tools dan solusi digital untuk kebutuhan personal maupun pembelajaran.',
    ],
    descriptionsEn: [
      'Independently building software projects and experimenting with cutting-edge tech.',
      'Performing system optimization, debugging, and performance tuning across various environments.',
      'Exploring Linux system administration, Android internals, and modern web frameworks.',
      'Designing custom tools and digital solutions for personal and educational needs.',
    ],
    color: '#06b6d4',
  },
]

const education = [
  {
    institution: 'Universitas Linggabuana PGRI Sukabumi',
    degree: 'S1 Teknik Informatika',
    degreeEn: 'B.S. in Informatics Engineering',
    period: 'Sedang Berjalan (Ongoing)',
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
    image: '/gambar-sertifikat/cisco-introduction-to-cybersecurity.png',
    verifyUrl: 'https://www.credly.com/badges/dc1ad136-5dfd-41ac-a802-ad0f89fcddd8/public_url',
  },
  {
    id: 3,
    title: 'Cisco Networking Academy – Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: '20 Juli 2026',
    dateEn: 'July 20, 2026',
    image: '/gambar-sertifikat/cisco-networking-basics.png',
    verifyUrl: 'https://www.credly.com/badges/a504b2a0-83c5-4901-802c-2b3c2ed5bdb8/public_url',
  },
  {
    id: 4,
    title: 'DevCoach #200: Integrasi IT & AI powered by Asah!',
    issuer: 'DevCoach × Asah!',
    date: '26 Juni 2025',
    dateEn: 'June 26, 2025',
    image: '/gambar-sertifikat/devcoach-200-integrasi-it-ai-powered-by-asah-certificate-1.png',
  },
  {
    id: 5,
    title: 'IDCamp x Dicoding Live #10 – UiPath Agentic Automation: Introduction and Use Case',
    issuer: 'Indosat Ooredoo Hutchison Digital Camp',
    date: '10 Juli 2025',
    dateEn: 'July 10, 2025',
    image: '/gambar-sertifikat/idcamp-x-dicoding-live-10-uipath-agentic-automation-introduction-and-use-case-certificate-1.png',
  },
  {
    id: 6,
    title: 'IDCamp Alumni Dialogue #5 – Debunking the Myth of Intelligent Automation: Prepare for the Future Workforce',
    issuer: 'Indosat Ooredoo Hutchison Digital Camp',
    date: '22 Juli 2025',
    dateEn: 'July 22, 2025',
    image: '/gambar-sertifikat/idcamp-alumni-dialogue-5-debunking-the-myth-of-intelligent-automation-prepare-for-the-future-workfor-1.png',
  },
]

const projects = [
  {
    id: 1,
    title: 'BumiTani – Premium Agricultural E-Commerce',
    description:
      'Website e-commerce pertanian modern premium dengan database 72 produk (bibit, nutrisi, pakan, peralatan, pestisida, dan pupuk) dalam 6 kategori. Dilengkapi filter dan pencarian real-time, detail modal produk, sistem keranjang LocalStorage, serta checkout via WhatsApp.',
    descriptionEn:
      'Premium modern agricultural e-commerce website with a database of 72 products across 6 categories. Features real-time search & filters, product modal details, LocalStorage shopping cart, and direct checkout.',
    image: '/images/portfolio/banner_bumi-tani.png',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'LocalStorage', 'Vercel'],
    liveUrl: 'https://bumi-tani-v2.vercel.app',
    githubUrl: 'https://github.com/Rama-X2/Bumi-Tani-v2',
    category: 'Web Development',
    featured: true,
  },
  {
    id: 2,
    title: 'HomeLab – Premium Powder Drink E-Commerce',
    description:
      'Platform e-commerce dan editorial web premium yang dirancang khusus untuk mempresentasikan lini produk bubuk minuman premium. Fokus pada estetika high-end, performa ringan tanpa overhead framework berat, serta pengalaman belanja (UI/UX) yang sangat halus, lengkap dengan catalog filter, search real-time, shopping cart localStorage, dan fast checkout.',
    descriptionEn:
      'Premium powder drink e-commerce platform & web editorial. Features high-end minimalist aesthetics, real-time search, catalog filter, shopping cart, and fast checkout.',
    image: '/images/portfolio/banner_homelab.webp',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'LocalStorage', 'Vercel'],
    liveUrl: 'https://homelab-sample.vercel.app',
    githubUrl: 'https://github.com/Rama-X2/homelab-sample',
    category: 'Web Development',
    featured: true,
  },
  {
    id: 3,
    title: 'Rama Store – Gaming Topup Platform',
    description:
      'Modern gaming top-up platform dengan real-time transaction processing, multi-game support, dan animasi yang menarik. Dibangun menggunakan Next.js, TypeScript, dan Framer Motion.',
    descriptionEn:
      'Modern gaming top-up platform with real-time transaction processing, multi-game support, and fluid animations. Built with Next.js, TypeScript, and Framer Motion.',
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
    descriptionEn:
      'Lightweight custom ROM based on Android 15 (Vanilla Ice Cream) enhanced with a smart AI assistant using TensorFlow and NLP.',
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
    descriptionEn:
      'Comprehensive server management dashboard integrating analytics, network control, and user insights.',
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
    descriptionEn:
      'Exclusive UI customization module for Evolution X custom ROM on POCO F5 device.',
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
      'Aplikasi web berbasis browser untuk membandingkan kualitas dan karakteristik teknis gambar digital secara side-by-side. Mendukung eksperimen Bit Depth (1-bit hingga 32-bit), kompresi JPEG, format TIFF, serta upscaling resolusi.',
    descriptionEn:
      'Browser-based web app to compare digital image quality and technical characteristics side-by-side. Supports bit depth testing, JPEG compression analysis, and resolution upscaling.',
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
    descriptionEn:
      'Advanced Magisk thermal optimization module designed to reduce aggressive throttling while keeping hardware safe.',
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
    descriptionEn:
      'Background GMS process optimization module to save RAM and improve CPU power efficiency on Android without affecting Google accounts.',
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
    descriptionEn:
      'Low-level system modification to unlock maximum GPU performance on Redmi 10A (Helio G25) without thermal conflicts.',
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
    descriptionEn:
      'System fix module to stabilize or disable WiFi MAC randomization on MTK Helio G25 devices running Android 13.',
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
    descriptionEn:
      'Custom Linux kernel modification focusing on CPU/GPU governor tuning and I/O scheduling optimization.',
    image: '/images/portfolio/kernel-lappland.png',
    technologies: ['Android SDK', 'Shell Script', 'Linux Kernel', 'C', 'C++'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Rama-X2',
    category: 'Kernel Development',
    featured: false,
  },
]

// ─── Translations Dictionary ──────────────────────────────────────────────────
const translations = {
  id: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', achievements: 'Achievements', contact: 'Contact' },
    personal: {
      greeting: 'Halo, saya',
      bio: 'Seorang Full Stack Developer dan UI/UX Designer yang aktif mengembangkan berbagai solusi digital modern, mulai dari website, software, hingga sistem berbasis performa tinggi. Memiliki ketertarikan besar pada web development, server management, dan optimasi sistem, dengan fokus menciptakan aplikasi yang responsif, efisien, dan nyaman digunakan.',
      location: 'Sukabumi, Jawa Barat',
      available: 'Available for new opportunities',
      viewResume: 'View Resume',
      contactMe: 'Hubungi Saya',
    },
    quickCards: {
      about: { label: 'About Me', sub: 'Siapa saya' },
      projects: { label: 'Projects', sub: 'Karya & portfolio' },
      achievements: { label: 'Achievements', sub: 'Sertifikat & penghargaan' },
      contact: { label: 'Contact', sub: 'Hubungi saya' },
    },
    skillsTitle: 'Tech Stack',
    aboutSec: {
      experienceTitle: 'Pengalaman',
      educationTitle: 'Pendidikan',
      ongoing: 'Ongoing',
    },
    achievementsSec: {
      title: 'Achievements',
      subtitle: 'Sertifikat & penghargaan yang telah saya raih',
      clickToView: 'Klik untuk lihat sertifikat',
    },
    projectsSec: {
      title: 'My Projects',
      subtitle: 'Koleksi project yang pernah saya kerjakan',
      featured: 'Featured',
      technologies: 'Teknologi',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
    },
    contactSec: {
      tag: 'Hubungi Saya',
      heading: 'Mari Berdiskusi!',
      description: 'Punya project menarik, ingin berkolaborasi, atau sekadar berdiskusi? Jangan ragu untuk menghubungi saya! Saya akan berusaha membalas secepat mungkin.',
      emailLabel: 'Email',
      emailAction: 'Kirim',
      locationLabel: 'Lokasi & Jangkauan',
      locationDesc: 'Berbasis di Sukabumi, Jawa Barat. Siap bekerja secara remote (jarak jauh) untuk klien dari seluruh dunia maupun on-site untuk project lokal.',
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
      download: 'Download Resume',
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
      technologies: 'Technologies',
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

// ─── Helpers ───────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: 'easeOut' },
})

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState<'id' | 'en'>('id')
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [selectedCert, setSelectedCert] = useState<(typeof achievements)[0] | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showResume, setShowResume] = useState(false)

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang') as 'id' | 'en'
    if (saved && (saved === 'id' || saved === 'en')) {
      setLang(saved)
    }
  }, [])

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
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -85
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const mainRef = useRef<HTMLElement>(null)

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
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
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
                onClick={() => setActiveSection(s.id)}
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
          {/* Contact quick */}
          <div className="mt-4 p-4 rounded-xl glass-card">
            <h3 className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">{t.nav.contact}</h3>
            <div className="space-y-2">
              <button onClick={() => navClick('contact')}
                className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors w-full text-left">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span className="truncate font-medium">{lang === 'en' ? 'Send Instant Message' : 'Kirim Pesan Instan'}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ── Content ─── */}
        <main ref={mainRef} className="flex-1 p-3 md:p-5 lg:p-6 min-w-0 space-y-12 md:space-y-16">

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
                  <motion.h1 {...fadeUp(0.2)} className="text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text leading-tight mb-2">
                    {personal.name}
                  </motion.h1>
                  <motion.p {...fadeUp(0.25)} className="text-base md:text-lg text-gray-300 mb-3 font-medium">
                    {personal.title}
                  </motion.p>
                  <motion.p {...fadeUp(0.3)} className="text-sm text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                    {t.personal.bio}
                  </motion.p>

                  {/* Status badge */}
                  <motion.div {...fadeUp(0.35)} className="flex justify-center md:justify-start mt-3">
                    <span className="available-badge">
                      <span className="dot" /> {t.personal.available}
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
                { id: 'about',        icon: User,    label: t.quickCards.about.label,     sub: t.quickCards.about.sub,          color: '#6366f1' },
                { id: 'projects',     icon: Folder,  label: t.quickCards.projects.label,  sub: t.quickCards.projects.sub,   color: '#10b981' },
                { id: 'achievements', icon: Award,   label: t.quickCards.achievements.label, sub: t.quickCards.achievements.sub, color: '#f59e0b' },
                { id: 'contact',      icon: Mail,    label: t.quickCards.contact.label,   sub: t.quickCards.contact.sub,        color: '#ec4899' },
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
                      ? 'Technologies, programming languages, frameworks & tools I work with'
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
            className="scroll-mt-24 space-y-6 pt-10 md:pt-14 border-t border-white/10"
          >

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
                    <span>{t.personal.location}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{t.personal.bio}</p>
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
                <Briefcase className="w-6 h-6 text-primary" /> {t.aboutSec.experienceTitle}
              </h2>
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <motion.div key={i}
                    {...fadeUp(i * 0.12)}
                    className="glass-card rounded-xl p-5 md:p-6 relative overflow-hidden render-optimized"
                    whileHover={{ y: -2 }}
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
            className="scroll-mt-24 space-y-6 pt-10 md:pt-14 border-t border-white/10"
          >

            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">{t.projectsSec.title}</h2>
              <p className="text-gray-400 text-sm">{t.projectsSec.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {projects.map((project, i) => (
                <motion.div key={project.id}
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
                    <Image src={project.image} alt={project.title} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
          </motion.section>

          {/* ════════════════════════════════ ACHIEVEMENTS ═══ */}
          <motion.section
            id="achievements"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-24 space-y-6 pt-10 md:pt-14 border-t border-white/10"
          >

            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">{t.achievementsSec.title}</h2>
              <p className="text-gray-400 text-sm">{t.achievementsSec.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {achievements.map((item, i) => (
                <motion.div key={item.id}
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
            className="scroll-mt-24 space-y-6 pt-10 md:pt-14 border-t border-white/10 max-w-5xl mx-auto"
          >

                {/* Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  
                  {/* Left Column: Direct Info & Socials (Span 5 on Desktop) */}
                  <div className="lg:col-span-5 space-y-5">
                    
                    {/* Header Card */}
                    <div className="glass-card rounded-2xl p-5 md:p-6 space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-secondary" />
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 inline-block">
                        {t.contactSec.tag}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black gradient-text leading-tight tracking-tight">
                        {t.contactSec.heading}
                      </h2>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {t.contactSec.description}
                      </p>
                    </div>
                    {/* Location Info Card */}
                    <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all relative overflow-hidden group">
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
                          <motion.a
                            href="https://www.google.com/maps/place/Sukabumi,+Sukabumi+Regency,+West+Java/@-6.9897,106.9268"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-500/10 text-pink-400 text-xs font-semibold border border-pink-500/20 hover:bg-pink-500/20 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{t.contactSec.openMaps}</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>

                    {/* Social Media Connections */}
                    <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                      <h4 className="font-bold text-white text-xs tracking-wider uppercase pl-1">{t.contactSec.socialsHeading}</h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { icon: Github,    href: personal.github,    label: 'GitHub',    color: '#ffffff', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)' },
                          { icon: Linkedin,  href: personal.linkedin,  label: 'LinkedIn',  color: '#0A66C2', bg: 'rgba(10,102,194,0.06)', border: 'rgba(10,102,194,0.15)' },
                          { icon: Instagram, href: personal.instagram, label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,0.06)', border: 'rgba(225,48,108,0.15)' },
                          { icon: Globe,     href: personal.website,   label: 'Website',   color: '#6366f1', bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.15)' },
                        ].map((s) => (
                          <motion.a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-4 py-3 glass-card rounded-xl text-xs text-gray-300 hover:text-white transition-all justify-center border border-white/5"
                            whileHover={{ 
                              scale: 1.03, 
                              backgroundColor: s.bg, 
                              borderColor: s.border,
                              boxShadow: `0 0 15px ${s.border}` 
                            }}
                          >
                            <s.icon className="w-4 h-4 flex-shrink-0" style={{ color: s.color }} />
                            <span className="font-semibold">{s.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Contact Form / Success Screen (Span 7 on Desktop) */}
                  <div className="lg:col-span-7">
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
                          <div className="space-y-1.5">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            
                            <div className="space-y-1">
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
                            
                            <div className="space-y-1">
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

                          <div className="mt-4 pt-1">
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={isSubmitting ? {} : { scale: 1.02, y: -2 }}
                              whileTap={isSubmitting ? {} : { scale: 0.98 }}
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

              </motion.section>

          {/* Footer */}
          <footer className="mt-12 pt-6 pb-24 md:pb-8 border-t border-white/10 text-center text-xs text-gray-400">
            <p className="font-medium text-gray-300">
              Copyright © {new Date().getFullYear()} <span className="font-bold text-white">{personal.name} (Rama-X2)</span>. {lang === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi undang-undang.'}
            </p>
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
                  <h2 className="text-base md:text-lg font-bold gradient-text leading-snug">{selectedCert.title}</h2>
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
                    <span>{lang === 'en' ? 'Verify on Credly' : 'Verifikasi di Credly'}</span>
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
                <h2 className="text-lg font-bold gradient-text">{t.resumeModal.title}</h2>
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
                  <FileText className="w-4 h-4" /> {t.resumeModal.download}
                </motion.a>
                <motion.a
                  href="/gambar-resume/cv-resume-ade-rama.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1 flex items-center justify-center gap-2"
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
