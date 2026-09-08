import { Folder, Award, Clock, Cpu } from 'lucide-react'
import {
  PersonalInfo,
  TechStackItem,
  ExperienceItem,
  EducationItem,
  StatItem,
  ProjectItem,
  AchievementItem,
} from '../types'

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                     PORTFOLIO DATA SOURCE (PUSAT DATA WEB)                  ║
 * ║                                                                              ║
 * ║  Seluruh data portofolio (biodata, tech stack, pengalaman, pendidikan,       ║
 * ║  proyek, dan sertifikat) disimpan di file ini.                              ║
 * ║                                                                              ║
 * ║  Anda BISA menambah, mengedit, atau menghapus data proyek dan sertifikat    ║
 * ║  di file ini DENGAN SANGAT MUDAH tanpa perlu menyentuh kode tampilan web.    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

export const personal: PersonalInfo = {
  name: 'Ade Ramadhani Putra',
  title: 'Full Stack Developer & UI/UX Designer',
  avatar: '/images/portfolio/rama-x2.jpg',
  location: 'Sukabumi, Jawa Barat',
  github: 'https://github.com/Rama-X2',
  linkedin: 'https://linkedin.com/in/rama-xd',
  instagram: 'https://instagram.com/rama_ext4',
  discord: 'https://discord.com/users/rama_ext',
  website: 'https://rama-x2.my.id',
}

export const techStackList: TechStackItem[] = [
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

export const experiences: ExperienceItem[] = [
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

export const education: EducationItem[] = [
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

export const statsData: StatItem[] = [
  {
    icon: Folder,
    value: '10+',
    labelId: 'Proyek Selesai',
    labelEn: 'Projects Built',
    descId: 'Web App & Low-level System',
    descEn: 'Web Apps & System Tools',
    gradient: 'from-primary to-indigo-500',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Award,
    value: '12+',
    labelId: 'Sertifikasi Resmi',
    labelEn: 'Official Certs',
    descId: 'Microsoft Learn & Dicoding',
    descEn: 'Microsoft & Dicoding Verified',
    gradient: 'from-amber-400 to-yellow-500',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: Clock,
    value: '3+ Thn',
    labelId: 'Jam Terbang Teknis',
    labelEn: 'Technical Journey',
    descId: 'Eksplorasi & IT Support',
    descEn: 'System Tuning & Support',
    gradient: 'from-emerald-400 to-teal-500',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Cpu,
    value: '25+',
    labelId: 'Tech Stack & Tools',
    labelEn: 'Tools & Platforms',
    descId: 'Frontend, Backend, Linux & OS',
    descEn: 'Full Stack & DevOps Tools',
    gradient: 'from-purple-500 to-pink-500',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
]


/**
 * ══════════════════════════════════════════════════════════════════════════════
 * DAFTAR PRESTASI & SERTIFIKAT (ACHIEVEMENTS & CERTIFICATES)
 * ══════════════════════════════════════════════════════════════════════════════
 * 
 * 💡 CARA MENAMBAH SERTIFIKAT BARU:
 * 1. Simpan gambar/foto sertifikat Anda di folder: public/gambar-sertifikat/nama-file.webp
 * 2. Salin (copy) contoh template di bawah ini, lalu tempel (paste) di dalam daftar achievements:
 * 
 *    {
 *      id: 13, // Nomor urut ID berikutnya
 *      title: 'Judul Sertifikat atau Nama Pelatihan',
 *      issuer: 'Penerbit (contoh: Cisco, Microsoft, Dicoding, Google)',
 *      date: '10 September 2026',
 *      dateEn: 'September 10, 2026',
 *      image: '/gambar-sertifikat/nama-file.webp',
 *      verifyUrl: 'https://link-verifikasi-kredensial-anda.com', // (Opsional, hapus jika tidak ada)
 *    },
 * 
 * ══════════════════════════════════════════════════════════════════════════════
 */
export const achievements: AchievementItem[] = [
  {
    id: 1,
    title: 'Cisco Networking Academy – Ethical Hacker',
    issuer: 'Cisco Networking Academy',
    date: '22 Juli 2026',
    dateEn: 'July 22, 2026',
    image: '/gambar-sertifikat/cisco-ethical-hacker-certificate.webp',
    verifyUrl: 'https://www.credly.com/badges/d6d1ef95-849b-4e56-8501-a7b67c7574e9/public_url',
  },
  {
    id: 2,
    title: 'Cisco Networking Academy – Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '20 Juli 2026',
    dateEn: 'July 20, 2026',
    image: '/gambar-sertifikat/cisco-introduction-to-cybersecurity.webp',
    verifyUrl: 'https://www.credly.com/badges/dc1ad136-5dfd-41ac-a802-ad0f89fcddd8/public_url',
  },
  {
    id: 3,
    title: 'Cisco Networking Academy – Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: '20 Juli 2026',
    dateEn: 'July 20, 2026',
    image: '/gambar-sertifikat/cisco-networking-basics.webp',
    verifyUrl: 'https://www.credly.com/badges/a504b2a0-83c5-4901-802c-2b3c2ed5bdb8/public_url',
  },
  {
    id: 4,
    title: 'Deploying and Configuring Microsoft Entra Global Secure Access',
    issuer: 'Microsoft',
    date: '7 Agustus 2026',
    dateEn: 'August 7, 2026',
    image: '/gambar-sertifikat/Deploying and Configuring Microsoft Entra Global Secure Access.webp',
    verifyUrl: 'https://learn.microsoft.com/api/achievements/share/id-id/Rama-X2/H2K7LAM8?sharingId=2AC6E178E4535795',
  },
  {
    id: 5,
    title: 'Managing Microsoft Entra Identity Protection',
    issuer: 'Microsoft',
    date: '7 Agustus 2026',
    dateEn: 'August 7, 2026',
    image: '/gambar-sertifikat/Managing Microsoft Entra Identity Protection.webp',
    verifyUrl: 'https://learn.microsoft.com/api/achievements/share/id-id/Rama-X2/7D6K6GDZ?sharingId=2AC6E178E4535795',
  },
  {
    id: 6,
    title: 'Implementing Access Management for Azure Resources',
    issuer: 'Microsoft',
    date: '7 Agustus 2026',
    dateEn: 'August 7, 2026',
    image: '/gambar-sertifikat/Implementing Access Management for Azure Resources.webp',
    verifyUrl: 'https://learn.microsoft.com/api/achievements/share/id-id/Rama-X2/NQJVS8RF?sharingId=2AC6E178E4535795',
  },
  {
    id: 7,
    title: 'Designing Semantic Models in Power BI',
    issuer: 'Microsoft',
    date: '7 Agustus 2026',
    dateEn: 'August 7, 2026',
    image: '/gambar-sertifikat/Designing Semantic Models in Power BI.webp',
    verifyUrl: 'https://learn.microsoft.com/api/achievements/share/id-id/Rama-X2/VSUJ2G3M?sharingId=2AC6E178E4535795',
  },
  {
    id: 8,
    title: 'Optimizing Models for Performance in Power BI',
    issuer: 'Microsoft',
    date: '7 Agustus 2026',
    dateEn: 'August 7, 2026',
    image: '/gambar-sertifikat/Optimizing Models for Performance in Power BI.webp',
    verifyUrl: 'https://learn.microsoft.com/api/achievements/share/id-id/Rama-X2/WMDVXMBN?sharingId=2AC6E178E4535795',
  },
  {
    id: 9,
    title: 'Build Programs Using Python Coding in Minecraft',
    issuer: 'Microsoft',
    date: '7 Agustus 2026',
    dateEn: 'August 7, 2026',
    image: '/gambar-sertifikat/Build Programs Using Python Coding in minecraft.webp',
    verifyUrl: 'https://learn.microsoft.com/api/achievements/share/id-id/Rama-X2/D3Y94CXJ?sharingId=2AC6E178E4535795',
  },
  {
    id: 10,
    title: 'DevCoach #200: Integrasi IT & AI powered by Asah!',
    issuer: 'DevCoach × Asah!',
    date: '26 Juni 2025',
    dateEn: 'June 26, 2025',
    image: '/gambar-sertifikat/devcoach-200-integrasi-it-ai-powered-by-asah-certificate.webp',
  },
  {
    id: 11,
    title: 'IDCamp x Dicoding Live #10 – UiPath Agentic Automation: Introduction and Use Case',
    issuer: 'Indosat Ooredoo Hutchison Digital Camp',
    date: '10 Juli 2025',
    dateEn: 'July 10, 2025',
    image: '/gambar-sertifikat/idcamp-x-dicoding-live-10-uipath-agentic-automation-introduction-and-use-case-certificate.webp',
  },
  {
    id: 12,
    title: 'IDCamp Alumni Dialogue #5 – Debunking the Myth of Intelligent Automation: Prepare for the Future Workforce',
    issuer: 'Indosat Ooredoo Hutchison Digital Camp',
    date: '22 Juli 2025',
    dateEn: 'July 22, 2025',
    image: '/gambar-sertifikat/idcamp-alumni-dialogue-5-debunking-the-myth-of-intelligent-automation-prepare-for-the-future-workfor.webp',
  },
]


/**
 * ══════════════════════════════════════════════════════════════════════════════
 * DAFTAR PROYEK SAYA (MY PROJECTS)
 * ══════════════════════════════════════════════════════════════════════════════
 * 
 * 💡 CARA MENAMBAH PROYEK BARU:
 * 1. Simpan gambar banner/screenshot proyek Anda di folder: public/images/portfolio/nama-banner.webp
 * 2. Salin (copy) contoh template di bawah ini, lalu tempel (paste) di dalam daftar projects:
 * 
 *    {
 *      id: 13, // Nomor urut ID berikutnya
 *      title: 'Nama Proyek Anda',
 *      description: 'Penjelasan singkat tentang proyek ini dalam Bahasa Indonesia.',
 *      descriptionEn: 'Short description of your project in English.',
 *      image: '/images/portfolio/nama-banner.webp',
 *      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
 *      liveUrl: 'https://demo-proyek-anda.vercel.app', // (Opsional)
 *      githubUrl: 'https://github.com/Rama-X2/nama-repo-anda', // (Opsional)
 *      category: 'Web Development', // Kategori (contoh: Web Development, Operating System, Dashboard, System Tuning)
 *      featured: true, // Isi true jika ingin ada badge bintang 'Unggulan', atau false
 *    },
 * 
 * ══════════════════════════════════════════════════════════════════════════════
 */
export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'BumiTani – Premium Agricultural E-Commerce',
    description:
      'Website e-commerce pertanian modern premium dengan database 72 produk (bibit, nutrisi, pakan, peralatan, pestisida, dan pupuk) dalam 6 kategori. Dilengkapi filter dan pencarian real-time, detail modal produk, sistem keranjang LocalStorage, serta checkout via WhatsApp.',
    descriptionEn:
      'Premium modern agricultural e-commerce website with a database of 72 products across 6 categories. Features real-time search & filters, product modal details, LocalStorage shopping cart, and direct checkout.',
    image: '/images/portfolio/banner_bumi-tani.webp',
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
    image: '/images/portfolio/banner_rama-store.webp',
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
    image: '/images/portfolio/banner_rom-pixel.webp',
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
    image: '/images/portfolio/banner_rama_server.webp',
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
    image: '/images/portfolio/kernel_poco-f5.webp',
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
    image: '/images/portfolio/banner_digital-image-compare.webp',
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
    image: '/images/portfolio/thermal-breaker.webp',
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
    image: '/images/portfolio/gms-breaker.webp',
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
    image: '/images/portfolio/gpu-unlock.webp',
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
    image: '/images/portfolio/wifi-mac-fix.webp',
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
    image: '/images/portfolio/kernel-lappland.webp',
    technologies: ['Android SDK', 'Shell Script', 'Linux Kernel', 'C', 'C++'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Rama-X2',
    category: 'Kernel Development',
    featured: false,
  },
]
