# 🌟 Rama Portfolio Web

Website portfolio standalone milik **Ade Ramadhani Putra**, dipisahkan dari proyek `rama-store-main`.

---

## 📁 Struktur Folder

```
portfolio-web/
├── app/
│   ├── globals.css       # Global styles + Tailwind
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Halaman utama (render Portfolio)
├── components/
│   └── Portfolio.tsx     # Komponen utama portfolio (semua section)
├── public/
│   └── images/
│       └── portfolio/    # ← Salin gambar portfolio ke sini!
│           ├── foto_rama.png
│           ├── banner_rama-store.png
│           ├── banner_rama_server.png
│           ├── banner_rom-pixel.png
│           ├── biodata-aderama.png
│           ├── kernel_poco-f5.png
│           ├── kernel.jpg
│           ├── anya.jpg
│           ├── patrick.jpg
│           └── patrick_galon.jpg
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── next.config.js
```

---

## 🚀 Cara Menjalankan

### 1. Masuk ke folder portfolio-web
```bash
cd portfolio-web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Salin gambar portfolio
Salin semua file dari:
```
..\public\images\portfolio\
```
Ke dalam:
```
public\images\portfolio\
```

### 4. Jalankan development server
```bash
npm run dev
```

Buka **http://localhost:3000** di browser.

---

## 🏗️ Build & Deploy

```bash
# Build production
npm run build

# Jalankan production
npm start

# Deploy ke Vercel (pastikan sudah install vercel CLI)
vercel --prod
```

---

## ✨ Fitur

- ✅ **About** - Profil lengkap dengan foto, bio, dan stats
- ✅ **Skills** - Progress bar animasi untuk setiap skill
- ✅ **Projects** - Grid project dengan modal detail
- ✅ **Experience** - Timeline pengalaman kerja
- ✅ **Testimonials** - Slider testimonial klien
- ✅ **Contact** - Info kontak + form kirim pesan
- ✅ Sidebar navigasi (desktop) + hamburger menu (mobile)
- ✅ Framer Motion animations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme dengan glassmorphism effect

---

## 🔧 Teknologi

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React Icons**

---

> Dibuat oleh **Ade Ramadhani Putra** | [rama.server.my.id](https://rama.server.my.id)
