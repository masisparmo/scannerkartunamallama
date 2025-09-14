// --- Service Worker untuk Scanner Pintar ---

// Nama cache unik. Dianjurkan untuk mengubah versi ('v1', 'v2', dst.)
// setiap kali Anda membuat perubahan signifikan pada file yang di-cache untuk memastikan
// pengguna mendapatkan versi terbaru.
const CACHE_NAME = 'scanner-pintar-cache-v1';

// Daftar file inti yang membentuk "App Shell".
// Ini adalah sumber daya minimum yang dibutuhkan agar aplikasi dapat berjalan secara offline.
const urlsToCache = [
  './', // Alias untuk index.html
  './index.html',
  './app.js',       // File logika utama aplikasi
  './about.html', 
  './help.html',
  './terms.html',
  './privacy.html',
  // Aset ikon dan gambar bisa ditambahkan di sini jika ingin selalu tersedia offline.
  // Contoh: './scanner-pintar.png'
];

/**
 * Event: 'install'
 * Dijalankan saat service worker pertama kali diinstal oleh browser.
 * Tugas utamanya adalah membuka cache dan menyimpan semua file App Shell.
 */
self.addEventListener('install', event => {
  // event.waitUntil() memastikan service worker tidak akan diinstal sampai
  // kode di dalamnya selesai dieksekusi.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache berhasil dibuka. Menyimpan App Shell ke dalam cache...');
        return cache.addAll(urlsToCache);
      })
  );
});

/**
 * Event: 'activate'
 * Dijalankan setelah service worker diinstal dan siap untuk mengambil alih kontrol.
 * Berguna untuk membersihkan cache lama yang tidak lagi digunakan.
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Jika ada cache dengan nama yang berbeda dari CACHE_NAME saat ini, hapus.
          // Ini penting untuk menghapus data usang dan menghemat ruang penyimpanan.
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Memaksa service worker untuk aktif segera tanpa perlu me-reload halaman.
  return self.clients.claim();
});

/**
 * Event: 'fetch'
 * Dijalankan setiap kali aplikasi membuat permintaan jaringan (misal: mengambil gambar, script, atau data API).
 * Di sinilah strategi caching (Cache-First) diimplementasikan.
 */
self.addEventListener('fetch', event => {
  // Kita hanya menangani permintaan GET, karena permintaan lain (POST, PUT, dll.) bersifat dinamis.
  if (event.request.method !== 'GET') {
    return;
  }
  
  // event.respondWith() mencegat permintaan dan menyediakan respons kustom.
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Strategi "Cache-First":
      // 1. Coba cari respons dari cache terlebih dahulu.
      const cachedResponse = await cache.match(event.request);
      
      // 2. Jika ada di cache, langsung kembalikan dari cache. Ini membuat aplikasi terasa cepat dan bisa offline.
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // 3. Jika tidak ada di cache, lanjutkan untuk mengambil dari jaringan (internet).
      try {
        const networkResponse = await fetch(event.request);
        
        // Jika permintaan jaringan berhasil, simpan salinannya ke dalam cache untuk penggunaan di masa mendatang.
        // Kita hanya meng-cache respons yang valid (status 200 - OK).
        if (networkResponse && networkResponse.status === 200) {
            // Respons perlu di-clone karena hanya bisa dibaca sekali. Satu untuk cache, satu untuk browser.
            cache.put(event.request, networkResponse.clone());
        }
        
        // Kembalikan respons dari jaringan ke aplikasi.
        return networkResponse;
      } catch (error) {
        // Jika fetch gagal (misalnya karena offline), permintaan akan gagal.
        // Aplikasi akan menangani error ini (misalnya, menampilkan pesan "Anda sedang offline").
        console.error('Pengambilan dari jaringan gagal:', error);
        
        // Anda bisa menyediakan halaman fallback offline di sini jika diperlukan.
        // Contoh: if (event.request.mode === 'navigate') { return caches.match('./offline.html'); }
        
        return null;
      }
    })
  );
});
