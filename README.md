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

### Frontend (Aplikasi Web)

Aplikasi ini adalah aplikasi web statis dan tidak memerlukan proses build yang rumit.

1.  **Akses Langsung (Rekomendasi)**
    Aplikasi ini di-host dan dapat diakses langsung melalui [URL publiknya](https://scanner-pintar.isparmo.com/).

2.  **Menjalankan Secara Lokal**
    Jika Anda ingin memodifikasi frontend, Anda bisa menjalankannya di komputer lokal Anda.
    ```bash
    # 1. Clone repositori ini
    git clone https://github.com/masisparmo/scannerkartunamallama.git
    cd scannerkartunamallama

    # 2. Jalankan server web sederhana.
    # Jika Anda menggunakan Python 3:
    python -m http.server
    ```
    Buka browser dan akses `http://localhost:8000`.

### Backend (Server AI & Google Sheets)

Untuk menjalankan fungsionalitas AI dan penyimpanan ke Google Sheets, frontend perlu terhubung ke server backend. Anda dapat menjalankan server backend yang disediakan secara lokal.

1.  **Prasyarat**: Pastikan Anda memiliki [Node.js](https://nodejs.org/) terinstal.

2.  **Setup Awal**:
    - Simpan kode backend yang diberikan ke dalam sebuah file, misalnya `backend/server.js`.
    - Dari dalam direktori `backend`, jalankan `npm install` untuk menginstal dependensi: `express`, `googleapis`, `google-auth-library`, `cors`, `dotenv`.

3.  **Konfigurasi Environment Variables**:
    Buat file bernama `.env` di dalam direktori `backend` dan isi dengan variabel berikut:

    ```env
    # Kunci API dari Groq.com. Bisa lebih dari satu, dipisahkan koma.
    GROQ_API_KEYS=gsk_xxx,gsk_yyy

    # ID Spreadsheet Google Sheets Anda
    SPREADSHEET_ID=1LliHJrPnsRlIJv8RVROrabrXoicIUKT9OdqWoyXcIqY

    # Kredensial Service Account Google dalam format JSON string satu baris
    # Buka file JSON kredensial Anda, salin seluruh isinya, dan tempel di sini.
    GOOGLE_CREDENTIALS_JSON='{"type": "service_account", "project_id": "...", ...}'

    # Port server (opsional, default 8080)
    PORT=8080
    ```

4.  **Menjalankan Server Backend**:
    ```bash
    node server.js
    ```
    Server akan berjalan di `http://localhost:8080`. Pastikan URL di `app.js` (variabel `BACKEND_API_URL`) menunjuk ke alamat ini jika Anda ingin frontend lokal terhubung ke backend lokal.


## 🏛️ Arsitektur Backend (Node.js & Google Cloud)

Fungsionalitas inti aplikasi (pemrosesan AI dan integrasi Google Sheets) didukung oleh backend yang aman dan skalabel. Kode backend **tidak** disimpan di repositori ini untuk alasan keamanan.

-   **Platform**: Backend dibangun menggunakan **Node.js** dengan framework **Express.js**. Untuk produksi, layanan ini di-hosting di **Google Cloud Run**, yang memungkinkan penskalaan otomatis untuk efisiensi.
-   **Bahasa**: JavaScript (Node.js).

### Endpoint API

Frontend berkomunikasi dengan backend melalui beberapa endpoint REST API:

1.  `/processBusinessCard`
    -   **Metode**: `POST`
    -   **Fungsi**: Menerima data gambar kartu nama (base64). Endpoint ini memanggil **Groq API** dengan model `meta-llama/llama-4-maverick-17b-128e-instruct` yang memiliki kemampuan *vision*. Prompt meminta model untuk mengekstrak informasi kontak dan mengklasifikasikan jenis industri perusahaan, lalu mengembalikan hasilnya dalam format JSON yang bersih.
    -   **Respons**: `JSON` berisi data kontak terstruktur.

2.  `/generateFollowUpEmail` & `/generateFollowUpWa`
    -   **Metode**: `POST`
    -   **Fungsi**: Menerima detail kontak dan profil pengguna, kemudian memanggil model `meta-llama/llama-4-maverick-17b-128e-instruct` dengan prompt spesifik untuk menghasilkan draf email atau pesan WhatsApp yang relevan dan profesional.
    -   **Respons**: `JSON` berisi subjek dan isi email, atau `string` berisi pesan WhatsApp.

3.  `/simpan-gsheet`
    -   **Metode**: `POST`
    -   **Fungsi**: Menerima satu atau beberapa data kontak. Menggunakan kredensial layanan Google (`googleapis`) untuk mengautentikasi dan menambahkan data sebagai baris baru di **Google Sheet**. Jika nama *sheet* (berdasarkan nama acara) belum ada, maka akan dibuat secara otomatis lengkap dengan *header*.
    -   **Respons**: Memberikan konfirmasi sukses atau gagal.

### 🔐 Manajemen Kunci API & Keamanan

-   **Rotasi Kunci API**: Kode backend mendukung beberapa kunci API Groq (`GROQ_API_KEYS`) dan akan menggunakannya secara bergiliran. Ini meningkatkan resiliensi jika satu kunci mencapai batas penggunaan.
-   **Environment Variables**: Semua informasi sensitif (kunci API, kredensial Google, ID spreadsheet) dimuat dari *environment variables* menggunakan `dotenv` untuk pengembangan lokal, dan diatur langsung di Google Cloud Run untuk produksi. Ini adalah praktik terbaik untuk menghindari penyimpanan rahasia di dalam kode.
