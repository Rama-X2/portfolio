# 🌟 Rama Portfolio Web

Website portfolio standalone milik **Ade Ramadhani Putra**, dipisahkan dari proyek `rama-store-main`.

---

## 📁 Struktur Folder

```text
portfolio-web/
├── app/
│   ├── globals.css       # Global styles + Tailwind (termasuk lock-scroll modal)
│   ├── layout.tsx        # Root layout + metadata (termasuk konfigurasi favicon)
│   └── page.tsx          # Halaman utama (render Portfolio)
├── components/
│   └── Portfolio.tsx     # Komponen utama portfolio (semua section & modal)
├── public/
│   ├── favicon.png       # Favicon utama website (baru)
│   ├── gambar-resume/
│   │   └── cv-resume-ade-rama.png
│   ├── gambar-sertifikat/
│   └── images/
│       └── portfolio/    # Aset gambar proyek & cover portfolio
│           ├── foto_rama.png
│           ├── banner_rama-store.png
│           ├── banner_bumi-tani.png     # Screenshot web BumiTani (baru)
│           ├── banner_pojok-coffee.png   # Screenshot web PojokCoffee (baru)
│           ├── banner_rom-pixel.png
│           ├── banner_rama_server.png
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

### 1. Masuk ke folder proyek
```bash
cd portfolio-main
```

### 2. Install dependencies
```bash
npm install
```

### 3. Jalankan development server
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

## ✨ Fitur & Daftar Project Aktif

- ✅ **About** - Profil lengkap dengan foto, bio, dan stats
- ✅ **Skills** - Progress bar animasi untuk setiap skill
- ✅ **Experience** - Timeline pengalaman kerja & edukasi
- ✅ **Contact** - Info kontak + form kirim pesan (terkoneksi WhatsApp & Email)
- ✅ **Mobile Layout Stability** - Scroll-lock pada background body ketika modal aktif sehingga tampilan mobile lebih stabil dan bebas flicker.

### 🗂️ Daftar Project Aktif (Urutan Baru):
1.  **Rama Store – Gaming Topup Platform** (Featured)
2.  **BumiTani – Premium Agricultural E-Commerce** (Featured - Baru)
    *   Database 72 produk, filter & pencarian real-time, LocalStorage cart, checkout WhatsApp.
3.  **PojokCoffee – Toko Kopi Online** (Featured - Baru)
    *   Katalog biji kopi nusantara, detail tasting notes, blog info kopi, checkout flow.
4.  **Custom ROM by Rama – Basic AOSP** (Featured - Naik Posisi)
5.  **Rama Server Dashboard** (Featured - Turun Posisi)
6.  **RISING UI 2.5 – Evolution X for POCO F5**
7.  **Kernel Overclocking by Rama**
8.  **Digital Image Compare Tools**

*(Catatan: Project 'Biodata - Tugas Kuliah Pertemuan 11' dan 'Statistika & Probabilitas EAS' telah dihapus dari portofolio).*

---

## 🔧 Teknologi

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React Icons**

---

> Dibuat oleh **Ade Ramadhani Putra** | [rama.server.my.id](https://rama.server.my.id)
