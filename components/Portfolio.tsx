'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Code,
  Palette,
  Smartphone,
  Globe,
  Database,
  ExternalLink,
  Github,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Zap,
  Heart,
  Coffee,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  Linkedin,
  Twitter,
  Instagram,
  Send
} from 'lucide-react'

// ─── Portfolio Data ────────────────────────────────────────────────────────────
const portfolioData = {
  personal: {
    name: 'Ade Ramadhani Putra',
    title: 'Full Stack Developer & UI/UX Designer',
    bio: 'Developer dengan 5 tahun pengalaman dalam membangun solusi digital yang fungsional dan intuitif. Fokus pada pengembangan full stack, serta aktif di bidang modding seperti pembuatan modul Magisk, custom kernel & OS, dan overclocking untuk performa maksimal.',
    avatar: '/images/portfolio/foto_rama.png',
    location: 'Kec. Cicantayan, Kab. Sukabumi, Prov. Jawa Barat, Indonesia',
    email: 'rama.server.my.id (CDN CLOUDFLARE)',
    phone: '+62 857-9518-5561',
    website: 'https://rama.server.my.id',
    github: 'https://github.com/Rama-X2',
    linkedin: 'https://linkedin.com/in/rama-xd',
  },

  skills: [
    { name: 'React/Next.js',       level: 95, icon: Code,       color: '#61DAFB' },
    { name: 'TypeScript',          level: 90, icon: Code,       color: '#3178C6' },
    { name: 'Node.js',             level: 88, icon: Database,   color: '#339933' },
    { name: 'UI/UX Design',        level: 92, icon: Palette,    color: '#FF6B6B' },
    { name: 'Mobile Development',  level: 85, icon: Smartphone, color: '#A855F7' },
    { name: 'Database Design',     level: 87, icon: Database,   color: '#336791' },
    { name: 'Web APIs',            level: 89, icon: Globe,      color: '#FF9500' },
    { name: 'DevOps',              level: 82, icon: Zap,        color: '#F59E0B' },
  ],

  projects: [
    {
      id: 1,
      title: 'Rama Store - Gaming Topup Platform',
      description:
        'Modern gaming top-up platform with real-time transaction processing, multi-game support, and beautiful animations. Built with Next.js, TypeScript, and Framer Motion.',
      image: '/images/portfolio/banner_rama-store.png',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Node.js'],
      liveUrl: 'https://rama-store.vercel.app',
      githubUrl: 'https://github.com/Rama-X2/rama-store',
      category: 'Web Development',
      featured: true,
      stats: { users: '10K+', transactions: '50K+', uptime: '99.9%' },
    },
    {
      id: 2,
      title: 'Rama Server Dashboard',
      description:
        'A full-featured server management dashboard for business operations, combining analytics, network control, and user insights.',
      image: '/images/portfolio/banner_rama_server.png',
      technologies: ['React', 'Chart.js', 'Material-UI', 'Express.js', 'MongoDB'],
      liveUrl: 'https://rama.server.my.id/dashboard/rama-server',
      githubUrl: 'https://github.com/Rama-X2/rama-server-dashboard',
      category: 'Dashboard',
      featured: true,
      stats: { performance: '98%', loadTime: '1.2s', satisfaction: '4.8/5' },
    },
    {
      id: 3,
      title: 'Biodata - Tugas Kuliah Pertemuan 11',
      description:
        'Website biodata digital sederhana menggunakan HTML dengan CSS inline. Dibuat ringan, cepat, dan mudah diakses di semua perangkat.',
      image: '/images/portfolio/biodata-aderama.png',
      technologies: ['HTML'],
      liveUrl: 'https://biodata-aderama.vercel.app',
      githubUrl: 'https://github.com/Rama-X2/biodata_tugas_kuliah_pertemuan_11',
      category: 'Static Website',
      featured: false,
      stats: { downloads: '25K+', rating: '4.9/5', retention: '85%' },
    },
    {
      id: 4,
      title: 'Custom ROM by Rama with Basic AOSP',
      description:
        'ROM custom ringan berbasis Android 15 (Vanilla Ice Cream) yang disempurnakan dengan asisten AI cerdas menggunakan TensorFlow dan NLP. 『 Builder: Rama-X2 』',
      image: '/images/portfolio/banner_rom-pixel.png',
      technologies: ['AOSP', 'Android 15', 'Shell Script', 'Python', 'TensorFlow', 'Flask', 'Kotlin'],
      liveUrl: 'https://rama.server.my.id/custom-rom-by_rama',
      githubUrl: 'https://github.com/Rama-X2/Rom-Pixel',
      category: 'Operating System',
      featured: true,
      stats: { accuracy: '94%', responses: '100K+', satisfaction: '4.7/5' },
    },
    {
      id: 5,
      title: 'RISING UI 2.5 – Evolution X for POCO F5',
      description:
        'Modul kustomisasi UI eksklusif untuk ROM Evolution X pada POCO F5. Menawarkan peningkatan visual dari lockscreen, status bar, hingga animasi sistem.',
      image: '/images/portfolio/kernel_poco-f5.png',
      technologies: ['Android AOSP', 'Evolution X', 'Magisk Module', 'Kotlin / Java', 'OMS'],
      liveUrl: 'https://rama.server.my.id/rising-ui-2.5',
      githubUrl: 'https://github.com/Rama-X2/RISING-UI-2.5',
      category: 'UI/UX Enhancement',
      featured: false,
      stats: { visitors: '5K+', bounceRate: '25%', engagement: '3.5min' },
    },
    {
      id: 6,
      title: 'Kernel Overclocking by Rama',
      description:
        'Project kustomisasi kernel dengan fokus pada overclocking CPU/GPU, peningkatan governor tuning, serta optimasi I/O scheduler dan thermal control.',
      image: '/images/portfolio/kernel.jpg',
      technologies: ['Android SDK', 'Shell Script', 'Linux Kernel', 'C', 'C++'],
      liveUrl: '#',
      githubUrl: 'https://github.com/Rama-X2',
      category: 'Kernel Development',
      featured: false,
      stats: { dataPoints: '1M+', clients: '500+', accuracy: '96%' },
    },
  ],

  experience: [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      description: 'Lead developer untuk multiple high-traffic web applications, mengelola tim 5 developer dan mengimplementasikan modern development practices.',
      achievements: [
        'Meningkatkan performa aplikasi sebesar 40%',
        'Memimpin migrasi ke arsitektur microservices',
        'Mentoring 3 junior developers',
      ],
    },
    {
      company: 'Digital Agency Co.',
      position: 'Frontend Developer',
      period: '2020 - 2022',
      description: 'Mengembangkan responsive web applications dan mobile-first designs untuk berbagai klien dari berbagai industri.',
      achievements: [
        'Menyelesaikan 20+ project klien tepat waktu',
        'Meningkatkan user engagement sebesar 60%',
        'Mengimplementasikan standar accessibility',
      ],
    },
    {
      company: 'Startup Ventures',
      position: 'Junior Developer',
      period: '2019 - 2020',
      description: 'Membangun MVP dan prototype untuk early-stage startups, mendapatkan pengalaman dalam rapid development cycles.',
      achievements: [
        'Membangun 5 aplikasi MVP',
        'Mempelajari 8 teknologi baru',
        'Berkontribusi pada 3 peluncuran sukses',
      ],
    },
  ],

  testimonials: [
    {
      name: 'Asep Bensin',
      position: 'CEO, Tech Bensin Inc.',
      content: 'Coca-Cola Estumaa ~',
      avatar: '/images/portfolio/patrick.jpg',
      rating: 5,
    },
    {
      name: 'Dadeng Konter',
      position: 'Product Manager, Digital Agency Co.',
      content: 'DU YUU REDII TULUSS...!!!',
      avatar: '/images/portfolio/anya.jpg',
      rating: 5,
    },
    {
      name: 'Iwan Galon',
      position: 'UX Designer, Startup Ventures',
      content: 'Kalo bikin UI/UX yg bener lah mas, masa di tibanin pake framer motion semua.',
      avatar: '/images/portfolio/patrick_galon.jpg',
      rating: 5,
    },
  ],

  stats: {
    projectsCompleted: 50,
    happyClients: 35,
    yearsExperience: 5,
    linesOfCode: 100000,
    coffeeConsumed: 2500,
    githubCommits: 3000,
  },
}

// ─── Sections config ───────────────────────────────────────────────────────────
const sections = [
  { id: 'about',        name: 'About',        icon: User     },
  { id: 'skills',       name: 'Skills',       icon: Code     },
  { id: 'projects',     name: 'Projects',     icon: Globe    },
  { id: 'experience',   name: 'Experience',   icon: Award    },
  { id: 'testimonials', name: 'Testimonials', icon: Star     },
  { id: 'contact',      name: 'Contact',      icon: Mail     },
]

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about')
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioData.projects)[0] | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) setSelectedProject(null)
    },
    [selectedProject],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const navClick = (id: string) => {
    setActiveSection(id)
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#22144b] to-[#2d1a5a] text-white flex flex-col">
      {/* ── Animated background blobs ─────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* ── Header / Topbar ────────────────────────────────────── */}
      <header className="sticky top-0 z-40 px-6 py-4 flex justify-between items-center"
        style={{ background: 'rgba(34, 20, 75, 0.9)', backdropFilter: 'blur(16px)' }}>
        <motion.h1 className="text-xl font-bold glow-text" whileHover={{ scale: 1.05 }}>
          {portfolioData.personal.name}
        </motion.h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeSection === s.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
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
        >
          {menuOpen ? <X className="w-6 h-6" /> : (
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
            className="md:hidden z-30 px-4 pb-4"
            style={{ background: 'rgba(34, 20, 75, 0.97)' }}
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => navClick(s.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  activeSection === s.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <s.icon className="w-5 h-5" />
                <span>{s.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main layout ───────────────────────────────────────── */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:flex flex-col w-64 p-6 m-4 rounded-2xl"
          style={{ background: 'rgba(34, 20, 75, 0.80)' }}>
          <div className="space-y-1">
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === s.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ x: 6 }}
              >
                <s.icon className="w-5 h-5" />
                <span className="font-medium">{s.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Projects</span>
                <span className="text-primary font-semibold">{portfolioData.stats.projectsCompleted}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Clients</span>
                <span className="text-green-400 font-semibold">{portfolioData.stats.happyClients}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Experience</span>
                <span className="text-yellow-400 font-semibold">{portfolioData.stats.yearsExperience} years</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Content area ───────────────────────────────────── */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar"
          style={{ background: 'rgba(34, 20, 75, 0.60)' }}>
          <AnimatePresence mode="wait">

            {/* ── ABOUT ─────────────────────────────────────── */}
            {activeSection === 'about' && (
              <motion.div key="about"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-8">
                <div className="text-center space-y-6">
                  <motion.div className="relative mx-auto w-32 h-32"
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary p-1">
                      <div className="w-full h-full rounded-full bg-dark-light flex items-center justify-center overflow-hidden">
                        <Image src={portfolioData.personal.avatar} alt={portfolioData.personal.name}
                          width={128} height={128} className="w-full h-full object-cover rounded-full" />
                      </div>
                    </div>
                  </motion.div>

                  <div>
                    <motion.h1 className="text-4xl font-bold glow-text mb-2"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      {portfolioData.personal.name}
                    </motion.h1>
                    <motion.p className="text-xl text-gray-400 mb-4"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      {portfolioData.personal.title}
                    </motion.p>
                    <motion.p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-justify"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      {portfolioData.personal.bio}
                    </motion.p>
                  </div>

                  {/* Social icons */}
                  <motion.div className="flex justify-center space-x-4"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    {[
                      { icon: Mail,   href: `mailto:${portfolioData.personal.email}`, label: 'Email'   },
                      { icon: Github, href: portfolioData.personal.github,            label: 'GitHub'  },
                      { icon: Globe,  href: portfolioData.personal.website,           label: 'Website' },
                    ].map((link) => (
                      <motion.div key={link.label} title={link.label}
                        className="p-3 glass-effect rounded-full text-gray-400 hover:text-white hover:bg-primary/20 transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(link.href, '_blank')}>
                        <link.icon className="w-5 h-5" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Stats grid */}
                <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  {[
                    { label: 'Projects Completed', value: portfolioData.stats.projectsCompleted, icon: Globe,  color: 'text-primary'    },
                    { label: 'Happy Clients',       value: portfolioData.stats.happyClients,      icon: Heart,  color: 'text-red-400'    },
                    { label: 'Years Experience',    value: portfolioData.stats.yearsExperience,   icon: Award,  color: 'text-yellow-400' },
                    { label: 'Lines of Code',       value: '100K+',                               icon: Code,   color: 'text-green-400'  },
                    { label: 'Cups of Coffee',      value: '2.5K+',                               icon: Coffee, color: 'text-orange-400' },
                    { label: 'GitHub Commits',      value: '3K+',                                 icon: Github, color: 'text-purple-400' },
                  ].map((stat, i) => (
                    <motion.div key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.1 }}
                      className="glass-effect p-6 rounded-xl text-center hover:shadow-glow transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}>
                      <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* ── SKILLS ────────────────────────────────────── */}
            {activeSection === 'skills' && (
              <motion.div key="skills"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6">
                <h2 className="text-3xl font-bold glow-text mb-2">Skills & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolioData.skills.map((skill, i) => (
                    <motion.div key={skill.name}
                      initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.01, y: -2 }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `${skill.color}20` }}>
                            <skill.icon className="w-6 h-6" style={{ color: skill.color }} />
                          </div>
                          <span className="font-semibold text-white">{skill.name}</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: skill.color }}>{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: `${skill.level}%` }}
                          transition={{ delay: i * 0.1 + 0.5, duration: 1, ease: 'easeOut' }}
                          className="h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── PROJECTS ──────────────────────────────────── */}
            {activeSection === 'projects' && (
              <motion.div key="projects"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6">
                <h2 className="text-3xl font-bold glow-text mb-2">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolioData.projects.map((project, i) => (
                    <motion.div key={project.id}
                      initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.01, y: -2 }}
                      onClick={() => setSelectedProject(project)}>
                      <div className="relative h-40 rounded-lg mb-4 overflow-hidden">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                        {project.featured && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500/90 text-black rounded-full text-xs font-bold">
                            Featured
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-xs text-primary mb-2 font-medium">{project.category}</p>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-white/10 text-gray-400 rounded-full text-xs">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── EXPERIENCE ────────────────────────────────── */}
            {activeSection === 'experience' && (
              <motion.div key="experience"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6">
                <h2 className="text-3xl font-bold glow-text mb-2">Work Experience</h2>
                <div className="space-y-6">
                  {portfolioData.experience.map((exp, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                      className="glass-effect p-6 rounded-xl hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.01, y: -2 }}>
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg flex-shrink-0">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                            <span className="text-sm text-primary font-medium">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 font-medium mb-3">{exp.company}</p>
                          <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                          <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((a, ai) => (
                              <li key={ai} className="text-sm text-gray-300 flex items-start space-x-2">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── TESTIMONIALS ──────────────────────────────── */}
            {activeSection === 'testimonials' && (
              <motion.div key="testimonials"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Client Testimonials</h2>
                  <p className="text-gray-400">What clients and colleagues say about working with me</p>
                </div>
                <div className="relative max-w-3xl mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentTestimonial}
                      initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
                      className="glass-effect p-8 rounded-2xl text-center">
                      <div className="flex justify-center space-x-1 mb-4">
                        {[...Array(portfolioData.testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                        &ldquo;{portfolioData.testimonials[currentTestimonial].content}&rdquo;
                      </blockquote>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-primary to-secondary p-0.5">
                          <Image src={portfolioData.testimonials[currentTestimonial].avatar}
                            alt={portfolioData.testimonials[currentTestimonial].name}
                            width={48} height={48} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-white">{portfolioData.testimonials[currentTestimonial].name}</p>
                          <p className="text-sm text-gray-400">{portfolioData.testimonials[currentTestimonial].position}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex justify-center items-center space-x-4 mt-6">
                    <motion.button
                      onClick={() => setCurrentTestimonial(p => p === 0 ? portfolioData.testimonials.length - 1 : p - 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    {portfolioData.testimonials.map((_, i) => (
                      <button key={i} onClick={() => setCurrentTestimonial(i)}
                        className={`w-3 h-3 rounded-full transition-colors ${i === currentTestimonial ? 'bg-primary' : 'bg-gray-600'}`} />
                    ))}
                    <motion.button
                      onClick={() => setCurrentTestimonial(p => p === portfolioData.testimonials.length - 1 ? 0 : p + 1)}
                      className="p-2 glass-effect rounded-full text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── CONTACT ───────────────────────────────────── */}
            {activeSection === 'contact' && (
              <motion.div key="contact"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold glow-text mb-4">Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to work together? Let&apos;s discuss your project and bring your ideas to life
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact info */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">Contact Information</h3>
                    <div className="space-y-4">
                      {[
                        { icon: Mail,  label: 'Email',    value: portfolioData.personal.email,    href: `mailto:${portfolioData.personal.email}` },
                        { icon: Phone, label: 'Phone',    value: portfolioData.personal.phone,    href: `tel:${portfolioData.personal.phone}` },
                        { icon: MapPin,label: 'Location', value: portfolioData.personal.location, href: '#' },
                      ].map((c, i) => (
                        <motion.div key={c.label}
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:shadow-glow transition-all duration-300">
                          <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                            <c.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-400">{c.label}</p>
                            <p className="text-sm text-white font-medium truncate">{c.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Social */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                      <div className="flex space-x-4">
                        {[
                          { icon: Github,    href: portfolioData.personal.github,   label: 'GitHub'    },
                          { icon: Linkedin,  href: portfolioData.personal.linkedin, label: 'LinkedIn'  },
                          { icon: Twitter,   href: '#',                             label: 'Twitter'   },
                          { icon: Instagram, href: '#',                             label: 'Instagram' },
                        ].map((s) => (
                          <motion.div key={s.label} title={s.label}
                            className="p-3 glass-effect rounded-full text-gray-400 hover:text-white cursor-pointer transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
                            onClick={() => window.open(s.href, '_blank')}>
                            <s.icon className="w-5 h-5" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact form */}
                  <motion.div className="glass-effect p-6 rounded-xl"
                    initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Your Name"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary transition-all" />
                        <input type="email" placeholder="Your Email"
                          className="px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary transition-all" />
                      </div>
                      <input type="text" placeholder="Subject"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary transition-all" />
                      <textarea rows={4} placeholder="Your Message"
                        className="w-full px-4 py-3 bg-dark-light/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary transition-all resize-none" />
                      <motion.button
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* ── Project Detail Modal ───────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="portfolio-modal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="portfolio-modal-content"
              initial={{ scale: 0.85, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 50 }}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl md:text-3xl font-bold glow-text mb-1">{selectedProject.title}</h2>
                  <p className="text-gray-400 text-sm">{selectedProject.category}</p>
                </div>
                <motion.button onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="relative h-48 md:h-64 rounded-xl mb-6 overflow-hidden">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                {selectedProject.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/90 text-black rounded-full text-sm font-bold">
                    Featured Project
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium">{tech}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="glass-effect p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{String(value)}</div>
                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-2">
                  <motion.div
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white shadow-glow cursor-pointer"
                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(selectedProject.liveUrl, '_blank')}>
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </motion.div>
                  <motion.div
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 glass-effect rounded-lg font-medium text-white hover:bg-white/10 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(selectedProject.githubUrl, '_blank')}>
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
