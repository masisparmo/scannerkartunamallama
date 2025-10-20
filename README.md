# 🚀 Scanner Pintar - AI-Powered Business Card & QR Code Scanner

[![Meta AI](https://img.shields.io/badge/Meta-Llama_4_Maverick-0467DF?style=for-the-badge&logo=meta&logoColor=white)](https://llama.com)
[![Hackathon](https://img.shields.io/badge/Hackathon-Meta_Hacktiv8_2025-FF6B35?style=for-the-badge)](https://hacktiv8.com)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=google-chrome&logoColor=white)](https://scankartunama.isparmo.com/)
[![GitHub Pages](https://img.shields.io/badge/Frontend-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![Google Cloud](https://img.shields.io/badge/Backend-GCP-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)

> **Scanner Pintar adalah aplikasi web inovatif berbasis AI Llama 4 Maverick (Groq.com) yang merevolusi pengelolaan kartu nama dan data kontak bisnis langsung dari browser Anda. Data kontak tersimpan di IndexedDB perangkat dan dapat diekspor ke Google Sheets atau CSV.**

---

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Mengapa Llama 4 Maverick?](#mengapa-llama-4-maverick)
- [Fitur Utama](#fitur-utama)
- [Arsitektur Aplikasi](#arsitektur-aplikasi)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Demo & Screenshot](#demo--screenshot)
- [Cara Kerja](#cara-kerja)
- [Instalasi & Deployment](#instalasi--deployment)
- [Penggunaan](#penggunaan)
- [Roadmap & Pengembangan Masa Depan](#roadmap--pengembangan-masa-depan)
- [Tim Pengembang](#tim-pengembang)
- [Lisensi](#lisensi)
- [Kontak](#kontak)
---

## Tentang Proyek

**Scanner Pintar** adalah aplikasi digital untuk memproses dan mengelola kartu nama secara otomatis menggunakan AI Llama 4 Maverick (Groq.com). Dirancang agar mudah digunakan tanpa instalasi, semua data kontak disimpan privat di device user (IndexedDB) dan dapat diexport dengan satu klik ke beberapa format.

---

## Mengapa Llama 4 Maverick?

- **Native multimodal AI**: Memproses image dan teks bersamaan untuk ekstraksi data dari kartu nama.
- **Klasifikasi perusahaan**: AI tidak hanya membaca data, tapi mengelompokkan jenis industri perusahaan otomatis.
- **Integrasi Groq.com**: Layanan inference supercepat dan murah untuk pemrosesan vision & text.
- **Draft follow-up cerdas**: Membuat draft email dan WhatsApp secara otomatis sesuai konteks dan profil user.

---

## Fitur Utama

- **AI Business Card OCR** (Vision dari Llama 4 Maverick lewat Groq.com API)
- **Klasifikasi Industri Perusahaan** otomatis
- **QR Code Universal Scanner** (vCard, contact, URL, plain text)
- **Edit & Hapus Kontak** manual
- **Draft Follow-up Email/WA** otomatis oleh AI
- **Database Lokal IndexedDB** (offline, privat, GDPR-ready)
- **Ekspor ke Google Sheets / CSV / VCF / ZIP**
- **PWA - Bisa dipasang di HP tanpa store**

---

## Arsitektur Aplikasi



## Teknologi yang Digunakan

| Komponen               | Teknologi & Tools                   | Fungsi Utama                                    |
|------------------------|-------------------------------------|-------------------------------------------------|
| Frontend Web           | HTML5, CSS3, JavaScript (ES6), Bootstrap | Antarmuka responsif, PWA-ready, GitHub Pages    |
| Backend AI             | Groq.com (Llama 4 Maverick API)     | Pemrosesan vision & NLP untuk ekstraksi data    |
| Database Local         | IndexedDB (browser)                 | Penyimpanan data kontak secara privat & offline |
| Ekspor Cloud           | Google Sheets API                   | Mass upload hasil scan, kolaborasi event/tim     |
| QR Scanning            | jsQR library, MediaDevices API      | Scan QR code vCard, URL, dan teks                |
| Ekspor Data            | JS CSV/VCF/ZIP generator            | Export data kontak ke berbagai format            |
| Follow-up Assistant AI | Groq.com Llama 4 API                | Generate auto-draft email & WhatsApp follow-up   |

---

## Demo & Screenshot

**Live Demo:** [https://scankartunama.isparmo.com/](https://scankartunama.isparmo.com/)

**Screenshots:**  
- Landing page: Isi profil, nama acara, tanggal  
- Scan: Preview kamera, upload dari galeri  
- Hasil scan: List kontak, edit, ekspor

---

## Cara Kerja

1. **Isi profil pengguna (nama, jabatan, perusahaan)** – supaya draft follow-up AI tepat.
2. **Pilih scan kartu nama atau upload foto**.
3. Gambar dikirim (sementara, tanpa disimpan) ke Groq.com-Llama4:
   - Ekstraksi otomatis: Nama, Jabatan, Email, Telepon, Perusahaan.
   - Klasifikasi perusahaan.
4. Data hasil ekstraksi **disimpan di IndexedDB** browser (private, offline).
5. Kontak hasil scan bisa **direview, diedit, atau dihapus**.
6. **Generate draft email/WhatsApp** follow-up otomatis (AI-craft, bisa di-edit).
7. Data **diexport ke CSV, VCF, ZIP, atau Google Sheets** (satu klik, privacy aware).

**Workflow QR Code:**
- Scan QR code → decode data → otomatis jadi kontak jika vCard, AI bantu parsing jika string/URL.

**Privasi:**
- Data hanya di device user, bisa dihapus setiap saat.
- Gambar tidak disimpan, hanya diproses sementara oleh AI (Groq.com).
- Tanpa login, tanpa tracking.

---

## Instalasi & Deployment

### Tidak perlu instalasi manual.

- Buka https://scankartunama.isparmo.com/ di browser.
- Bisa dipasang jadi PWA (Add to Home Screen).
- Frontend di-host di GitHub Pages, backend AI via API Groq.com.

**Untuk kontributor/developer:**
- Fork repo, clone, install dependencies (npm untuk tools internal, opsional testing).
- Tambahkan env/config sesuai kredensial jika integrasi lanjutan.

---

## Penggunaan

1. **Buka aplikasi, isi profil dan event jika diperlukan.**
2. **Scan kartu nama dengan kamera atau upload/dari galeri.**
3. **Review hasil, edit/hapus jika perlu.**
4. **Ekspor kontak** ke format yang diinginkan.
5. **Gunakan draft follow-up AI** untuk email/WA, bisa di-copy ke aplikasi lain.

---

## Kriteria Penilaian Hackathon

- Inovasi: AI multimodal dengan Llama 4 Maverick, Groq.com, UI modern
- Kompleksitas: Vision, teks, QR, IndexedDB, export multi format, PWA, Google Sheets
- Pemanfaatan Llama4: 100% fitur utama, end-to-end inference scan + klasifikasi + draft
- Real impact: Otomasi scan, time saving, zero manual entry, privacy first
- UX: Ringan, mobile-first, tanpa instalasi, responsif, intuitif
- Skalabilitas: Web-based, serverless export, cloud enabled

---

## Roadmap & Pengembangan Masa Depan

- Q4 2025: Integrasi CRM populer (SF, HubSpot)
- Q1 2026: Peningkatan batch scan & multi-image
- Q2 2026: Voice note AI, search semantik kontak
- Q3 2026: Mobile native apps, template follow-up dinamis
- Kolaborasi enterprise, API publik, template export custom

---

## Tim Pengembang

**Isparmo & Mohamad Hasan**  
Email: support@isparmo.com  
Website: https://www.isparmo.com

---

## Lisensi

Copyright (c) 2025 Scanner Pintar Team

---

## Kontak

- Live demo: https://scankartunama.isparmo.com/
- GitHub: https://github.com/masisparmo/scannerkartunamallama
- Email: support@isparmo.com

---

