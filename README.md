# 🌟 Rama Portfolio Web

Website portofolio standalone milik **Ade Ramadhani Putra**, memuat rangkuman profil, keahlian, riwayat pengalaman, pencapaian sertifikasi, serta pameran proyek-proyek digital aktif.

---

## 📁 Struktur Folder

```text
portfolio-web/
├── app/
│   ├── globals.css       # Global styles + Tailwind (termasuk custom scrollbar & modal lock)
│   ├── layout.tsx        # Root layout + metadata (konfigurasi nama situs & favicon)
│   └── page.tsx          # Halaman utama (render Portfolio)
├── components/
│   └── Portfolio.tsx     # Komponen utama portfolio (semua section & modal)
├── public/
│   ├── favicon.png       # Favicon utama website
│   ├── gambar-resume/
│   │   └── cv-resume-ade-rama.png
│   ├── gambar-sertifikat/
│   └── images/
│       └── portfolio/    # Aset gambar proyek & cover portfolio (teroptimasi WebP)
│           ├── foto_rama.webp
│           ├── banner_rama-store.webp
│           ├── banner_bumi-tani.webp
│           ├── banner_homelab.webp       # Screenshot web HomeLab (baru)
│           ├── banner_rom-pixel.webp
│           ├── banner_rama_server.webp
│           ├── kernel_poco-f5.webp
│           ├── kernel.webp
│           ├── anya.webp
│           ├── patrick.webp
│           └── patrick_galon.webp
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── next.config.js
```

---

## ✨ Fitur & Struktur Portofolio

*   **About** - Profil profesional lengkap beserta biografi, rangkuman pendidikan, dan statistik stats keahlian.
*   **Skills** - Progress bar dinamis beranimasi untuk representasi tingkat penguasaan setiap keahlian teknis.
*   **Experience** - Timeline riwayat pengalaman kerja (IT Support & Web Dev) serta detail edukasi.
*   **Contact (Upgraded)** - Bagian kontak interaktif premium:
    *   **Saluran Langsung Terpisah**: Kartu WhatsApp & Email interaktif, dipisahkan secara utuh dari Lokasi.
    *   **Peta Google Maps**: Kartu Lokasi & Jangkauan mandiri dilengkapi dengan tombol rute langsung ke Google Maps.
    *   **Controlled Form & Validasi Real-time**: Input form Nama, Email, Subjek, dan Pesan dengan handling pesan error yang dinamis.
    *   **State Pengiriman & Layar Sukses**: Spinner animasi memuat data ketika mengirim pesan, dan transisi layar konfirmasi sukses (*Success Screen*) pasca pengiriman.
*   **Mobile Layout Stability** - Penanganan *scroll-lock* latar belakang layar saat modal proyek/sertifikat terbuka guna memastikan tampilan mobile stabil di platform Android/iOS.

---

## 🗂️ Daftar Project Aktif (12 Project Showcase)

1.  **BumiTani – Premium Agricultural E-Commerce** (Featured)
    *   Website e-commerce pertanian modern premium: database 72 produk, filter pencarian real-time, keranjang belanja LocalStorage, checkout WhatsApp.
2.  **HomeLab – Premium Powder Drink E-Commerce** (Featured)
    *   Platform e-commerce & editorial web premium minuman bubuk: konsep desain minimalis modern, search real-time, LocalStorage cart, dan direct-to-checkout.
3.  **Rama Store – Gaming Topup Platform** (Featured)
    *   Modern gaming top-up platform dengan pemrosesan transaksi real-time, multi-game, dan animasi modern.
4.  **Custom ROM by Rama – Basic AOSP** (Featured)
    *   ROM kustom ringan berbasis Android 15 (Vanilla Ice Cream) yang disempurnakan dengan asisten AI cerdas.
5.  **Rama Server Dashboard** (Featured)
    *   Dashboard manajemen server lengkap, mengintegrasikan analitik, kontrol jaringan, dan wawasan performa server.
6.  **RISING UI 2.5 – Evolution X for POCO F5**
    *   Modul kustomisasi UI eksklusif untuk ROM kustom Evolution X pada perangkat POCO F5.
7.  **Digital Image Compare Tools**
    *   Aplikasi web pembanding citra digital side-by-side: uji kompresi, estimasi bit depth, dan analisis kualitas gambar.
8.  **Thermal Breaker Miyabi Core**
    *   Modul optimasi sistem Android untuk meminimalisir thermal throttling agresif pada perangkat keras.
9.  **GMS Breaker Miyabi Core**
    *   Modul optimasi proses latar belakang GMS untuk menghemat RAM dan meningkatkan efisiensi daya CPU.
10. **Redmi 10A GPU Performance Unlock**
    *   Modifikasi tingkat rendah untuk membuka performa GPU maksimal pada chipset Helio G25.
11. **MTK WiFi MAC Randomization Fix**
    *   Perbaikan sistem untuk menstabilkan alamat MAC WiFi pada ROM kustom Android 13.
12. **Kernel Overclocking by Rama**
    *   Modifikasi kernel Linux kustom untuk tuning CPU/GPU governor dan penjadwalan I/O.

---

## 🔧 Teknologi Utama

*   **Next.js 14** (App Router)
*   **TypeScript**
*   **Tailwind CSS**
*   **Framer Motion**
*   **Lucide React Icons**

---

> Dibuat secara eksklusif oleh **Ade Ramadhani Putra** | [rama.server.my.id](https://rama.server.my.id)
