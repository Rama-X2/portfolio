# 📘 Panduan Praktis Update Data Portofolio (Rama-X2)

Panduan ini dibuat khusus untuk memudahkan Anda menambah, mengubah, atau memperbarui konten website portofolio (seperti **Proyek Baru**, **Sertifikat Baru**, **Tech Stack**, **Pengalaman**, dan **Biodata**) dengan cepat dan aman tanpa perlu menyentuh kode logika tampilan website.

---

## 📍 File Utama Penyimpanan Data

Seluruh data konten website Anda tersimpan rapi di dalam **satu file pusat data**:
👉 **`common/constants/portfolioData.ts`**

Setiap kali Anda ingin menambah atau mengubah data, Anda **hanya perlu membuka file di atas**, melakukan perubahan, lalu simpan (**Ctrl + S**). Website akan langsung terupdate secara otomatis!

---

## 🚀 1. Cara Menambahkan Proyek Baru (*Projects*)

### Langkah 1: Siapkan Gambar Banner Proyek
1. Siapkan screenshot atau cover banner proyek Anda (disarankan rasio **16:9**, format `.webp` atau `.png`).
2. Masukkan file gambar tersebut ke dalam folder:
   📁 **`public/images/portfolio/`**
   *(Contoh nama file: `banner_proyek-baru.webp`)*

### Langkah 2: Buka File Data
Buka file `common/constants/portfolioData.ts`, lalu cari bagian:
`export const projects: ProjectItem[] = [`

### Langkah 3: Salin & Isi Template Proyek
Tempelkan template berikut di dalam daftar `projects` (bisa di urutan paling atas atau paling bawah):

```typescript
  {
    id: 13, // Ganti dengan nomor urut berikutnya (13, 14, 15, dst.)
    title: 'Nama Proyek Anda',
    description: 'Deskripsi lengkap tentang proyek Anda dalam Bahasa Indonesia.',
    descriptionEn: 'Detailed project description in English.',
    image: '/images/portfolio/banner_proyek-baru.webp', // Path gambar yang Anda simpan di Langkah 1
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'], // Daftar teknologi yang digunakan
    liveUrl: 'https://demo-proyek-anda.vercel.app', // Link demo website (opsional, isi '#' jika belum ada)
    githubUrl: 'https://github.com/Rama-X2/repo-anda', // Link repository GitHub (opsional)
    category: 'Web Development', // Kategori: 'Web Development' | 'Operating System' | 'Dashboard' | 'System Tuning' | dsb.
    featured: true, // Isi `true` jika ingin ada badge bintang "Unggulan", atau `false` untuk reguler
  },
```

> **Catatan Otomatis:**
> * Tombol *"Lihat Lebih Banyak (X lainnya)"* otomatis bertambah dan menghitung sisa proyek Anda.
> * Modal detail pop-up otomatis bekerja ketika kartu diklik.
> * Ikon tombol demo dan GitHub di kartu proyek otomatis muncul jika `liveUrl` dan `githubUrl` diisi.

---

## 🎓 2. Cara Menambahkan Sertifikat Baru (*Achievements*)

### Langkah 1: Siapkan Foto Sertifikat
1. Siapkan foto/scan dokumen sertifikat Anda (rasio landscape A4, format `.webp` atau `.png`).
2. Masukkan file gambar tersebut ke dalam folder:
   📁 **`public/gambar-sertifikat/`**
   *(Contoh nama file: `sertifikat-dicoding-react.webp`)*

### Langkah 2: Buka File Data
Buka file `common/constants/portfolioData.ts`, lalu cari bagian:
`export const achievements: AchievementItem[] = [`

### Langkah 3: Salin & Isi Template Sertifikat
Tempelkan template berikut di dalam daftar `achievements`:

```typescript
  {
    id: 13, // Ganti dengan nomor urut berikutnya (13, 14, 15, dst.)
    title: 'Judul Sertifikat atau Pelatihan yang Diraih',
    issuer: 'Nama Lembaga Penerbit (contoh: Microsoft, Cisco, Dicoding, Google)',
    date: '15 September 2026', // Format tanggal Bahasa Indonesia
    dateEn: 'September 15, 2026', // Format tanggal Bahasa Inggris
    image: '/gambar-sertifikat/sertifikat-dicoding-react.webp', // Path gambar sertifikat
    verifyUrl: 'https://www.credly.com/badges/id-kredensial-anda', // Link verifikasi kredensial resmi (opsional, hapus jika tidak ada)
  },
```

> **Catatan Otomatis:**
> * Jika Anda mengisi `verifyUrl` dari *Microsoft Learn* atau *Credly*, tombol verifikasi berlogo resmi akan otomatis muncul di kartu dan di dalam modal pop-up.
> * Jika tidak memiliki link kredensial online, cukup hapus baris `verifyUrl` (sertifikat tetap tampil rapi).

---

## 💻 3. Cara Menambah / Mengubah Tech Stack (Ikon Keahlian)

Buka `common/constants/portfolioData.ts` dan cari `export const techStackList: TechStackItem[] = [`.

Setiap item memiliki format:
```typescript
  { name: 'Nama Teknologi', icon: 'slug-icon' },
```

Ikon diambil secara otomatis dari **SkillIcons** (`https://skillicons.dev`). Anda cukup memasukkan slug nama teknologi, contoh:
* Next.js: `{ name: 'Next.js', icon: 'nextjs' }`
* React: `{ name: 'React', icon: 'react' }`
* Tailwind: `{ name: 'Tailwind CSS', icon: 'tailwind' }`
* Python: `{ name: 'Python', icon: 'py' }`
* Docker: `{ name: 'Docker', icon: 'docker' }`
* Golang: `{ name: 'Go', icon: 'go' }`
* Kotlin: `{ name: 'Kotlin', icon: 'kotlin' }`

---

## 💼 4. Cara Mengubah Riwayat Pengalaman & Pendidikan

Di file `common/constants/portfolioData.ts`:
* **Pengalaman Kerja**: Cari `export const experiences: ExperienceItem[] = [`
  * Anda bisa mengubah `position`, `period`, warna aksen kartu `color` (hex code), dan daftar poin deskripsi pekerjaan (`descriptions` untuk ID dan `descriptionsEn` untuk EN).
* **Pendidikan**: Cari `export const education: EducationItem[] = [`
  * Anda bisa mengubah nama kampus/sekolah, jurusan, status kelulusan (`ongoing: true` jika masih kuliah), dan logo institusi di folder `public/logo-kampus/`.

---

## 📄 5. Cara Memperbarui File Resume / CV

Jika Anda memiliki file resume/CV versi terbaru:
1. Ekspor resume Anda ke format gambar `.webp` berkualitas tinggi (atau konversi dari PDF ke WebP/PNG).
2. Simpan dengan nama file:
   📁 **`public/gambar-resume/cv-resume-ade-rama.webp`**
3. Gantikan file lama dengan file baru tersebut.
4. **Selesai!** Tombol *"Lihat Resume"*, modal penampil resume, dan tombol unduh otomatis langsung menampilkan CV baru Anda tanpa perlu mengubah kode apa pun.

---

## 💡 Tips & Rekomendasi Format

1. **Format Gambar WebP**:
   * Sangat disarankan mengonversi gambar ke `.webp` sebelum dimasukkan ke folder `public/` agar ukuran file sangat kecil (di bawah 150 KB) tetapi tetap tajam, sehingga website terbuka instan dan hemat kuota.
2. **Penomoran ID Unik**:
   * Pastikan setiap item proyek dan sertifikat memiliki nomor `id` yang berbeda dan berurutan agar key rendering React tetap optimal.
3. **Simpan Perubahan**:
   * Setelah mengedit `portfolioData.ts`, simpan file dengan **Ctrl + S**. Jika menjalankan server development (`npm run dev`), browser Anda akan otomatis me-reload menampilkan data terbaru.
