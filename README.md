# Scanner Pintar: Scanner Kartu Nama & QR Code Berbasis AI

Scanner Pintar adalah aplikasi web progresif (PWA) yang dirancang untuk memudahkan para profesional, terutama di bidang marketing dan sales, dalam mengelola kontak yang didapat dari kartu nama. Aplikasi ini menggunakan kecerdasan buatan (AI) untuk secara otomatis mengekstrak informasi dari foto kartu nama dan menyimpannya dalam format digital yang terstruktur.

Aplikasi ini sepenuhnya berjalan di sisi klien (client-side), memanfaatkan IndexedDB untuk penyimpanan data lokal di browser Anda. Ini berarti data Anda tetap pribadi dan dapat diakses bahkan saat offline.

## ✨ Fitur Utama

- **Pemindaian Kartu Nama Berbasis AI**: Ambil foto kartu nama, dan biarkan AI secara otomatis mengekstrak nama, jabatan, perusahaan, nomor telepon, email, dan lainnya.
- **Pemindaian Kode QR**: Pindai QR code dengan mudah, termasuk kontak vCard dan undangan sesi kolaborasi.
- **Penyimpanan Lokal & Offline**: Semua data kontak disimpan dengan aman di perangkat Anda menggunakan IndexedDB. Aplikasi dapat berfungsi penuh tanpa koneksi internet setelah dimuat pertama kali.
- **Mode Kolaborasi Tim**: Buat sesi acara dan bagikan melalui QR code kepada anggota tim. Semua data yang dipindai oleh tim akan secara otomatis dikirim dan dikonsolidasi ke dalam satu Google Sheet.
- **Ekspor Data Fleksibel**: Ekspor data kontak Anda ke berbagai format:
  - **.csv**: Untuk dibuka di Microsoft Excel atau Google Sheets.
  - **.vcf (vCard)**: Untuk diimpor langsung ke kontak ponsel (Android/iPhone).
  - **.zip**: Kumpulan file .vcf untuk ekspor massal.
- **Integrasi Google Sheets**: Simpan hasil pindaian Anda ke Google Sheet pribadi atau tim untuk analisis lebih lanjut.
- **Asisten AI untuk Follow-Up**:
  - **Draf Email**: Secara otomatis membuat draf email perkenalan yang profesional berdasarkan data kontak dan profil Anda.
  - **Draf WhatsApp**: Membuat draf pesan WhatsApp yang siap kirim untuk memulai percakapan.
- **Pengingat Janji**: Buat pengingat acara (.ics) yang dapat langsung ditambahkan ke kalender Anda (Google Calendar, Outlook, dll.).
- **Antarmuka Multi-bahasa**: Tersedia dalam Bahasa Indonesia dan Inggris.
- **Tema Terang & Gelap**: Sesuaikan tampilan aplikasi sesuai preferensi Anda.

## 🚀 Cara Menjalankan Proyek

Aplikasi ini adalah aplikasi web statis dan tidak memerlukan proses build yang rumit.

1.  **Clone Repositori (Opsional)**
    Jika Anda ingin menjalankan secara lokal, clone repositori ini:
    ```bash
    git clone https://github.com/masisparmo/scannerkartunamallama.git
    ```

2.  **Jalankan Server Lokal**
    Anda memerlukan server web sederhana untuk menjalankan `index.html`. Anda bisa menggunakan ekstensi seperti "Live Server" di Visual Studio Code, atau menggunakan Python:
    ```bash
    # Arahkan terminal ke direktori proyek
    cd scannerkartunamallama

    # Jika Anda menggunakan Python 3
    python -m http.server
    ```
    Buka browser dan akses `http://localhost:8000`.

3.  **Akses Langsung**
    Aplikasi ini juga di-host dan dapat diakses langsung melalui [URL publiknya](https://scanner-pintar.isparmo.com/).

## 🛠️ Cara Menggunakan Aplikasi

1.  **Buka Aplikasi**: Akses URL aplikasi melalui browser di ponsel Anda. Untuk pengalaman terbaik, gunakan Chrome di Android atau Safari di iOS.
2.  **Lengkapi Profil (Penting!)**: Sebelum memulai, buka menu **Profil**. Isi nama, jabatan, dan perusahaan Anda. Informasi ini akan digunakan oleh AI untuk membuat draf email dan pesan WhatsApp yang lebih personal.
3.  **Memindai Kartu Nama**:
    - Klik **SCAN KARTU NAMA**.
    - Arahkan kamera ke kartu nama dan pastikan gambar jelas dan terang.
    - Klik tombol **SCAN**. AI akan memproses gambar.
4.  **Memindai QR Code**:
    - Arahkan kamera ke QR code. Aplikasi akan mendeteksinya secara otomatis.
5.  **Verifikasi & Edit**:
    - Setelah pemindaian, Anda akan dibawa ke halaman edit. Periksa kembali data yang diekstrak AI.
    - Lakukan koreksi jika diperlukan, tambahkan `Tags` untuk mengkategorikan kontak (misal: "Prospek Panas", "Supplier").
    - Klik **SIMPAN**.
6.  **Lihat Hasil**:
    - Klik **LIHAT HASIL SCAN** dari halaman utama untuk melihat semua kontak yang telah Anda simpan.
    - Gunakan fitur pencarian dan filter berdasarkan tag untuk mengelola kontak.
7.  **Lakukan Aksi**:
    - Klik pada sebuah kontak untuk membuka menu aksi.
    - Dari sini, Anda bisa membuat draf email/WA, menyimpan vCard, atau membuat pengingat.

## 💻 Teknologi yang Digunakan

-   **Frontend**: HTML5, CSS3 (TailwindCSS), Vanilla JavaScript (ES6+)
-   **PWA**: Service Worker, Web App Manifest
-   **Penyimpanan Lokal**: IndexedDB
-   **Library JavaScript**:
    -   `lucide-icons`: Untuk ikon.
    -   `jsQR`: Untuk pemindaian QR code.
    -   `jszip`: Untuk membuat file .zip.
    -   `qrcodejs`: Untuk menghasilkan QR code.
    -   `tagify`: Untuk input tag yang interaktif.
-   **Backend (untuk AI & Google Sheets)**: Google Cloud Run, Google Cloud Vision AI, Google Gemini API.
