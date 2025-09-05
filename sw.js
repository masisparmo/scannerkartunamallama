// Nama cache unik untuk aplikasi Anda.
// Disarankan untuk mengubah versi (v1, v2, dst.) setiap kali ada pembaruan pada file yang di-cache
// agar service worker melakukan pembaruan.
const CACHE_NAME = 'scanner-pintar-cache-v2';

// Daftar lengkap file yang akan di-cache saat service worker diinstal (App Shell).
// Ini termasuk halaman HTML, aset penting seperti ikon, dan library JavaScript/CSS dari CDN.
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/help.html',
  '/terms.html',
  '/privacy.html',
  '/manifest.json',
  'https://raw.githubusercontent.com/masisparmo/scannerkartunamallama/refs/heads/main/scanner-pintar.ico',
  'https://raw.githubusercontent.com/masisparmo/scannerkartunamallama/refs/heads/main/scanner-pintar-192.png',
  'https://raw.githubusercontent.com/masisparmo/scannerkartunamallama/refs/heads/main/scanner-pintar-512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://unpkg.com/lucide@latest',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

// Event listener untuk 'install'
// Berjalan saat service worker pertama kali didaftarkan.
self.addEventListener('install', (event) => {
  // Menunda event install sampai semua aset penting di-cache.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Membuka cache dan menyimpan App Shell');
        // Menambahkan semua file dari urlsToCache ke dalam cache.
        return cache.addAll(urlsToCache);
      })
  );
});

// Event listener untuk 'fetch'
// Berjalan setiap kali aplikasi membuat request jaringan.
self.addEventListener('fetch', (event) => {
  // === PERBAIKAN UNTUK MENGATASI ERROR CHROME-EXTENSION ===
  // Mengabaikan request yang bukan berasal dari protokol http atau https.
  // Ini akan mencegah error saat browser extension mencoba membuat request.
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Menggunakan strategi "Stale-While-Revalidate" untuk aset dari CDN (seperti Tailwind, Lucide, dll.)
  // Ini akan memberikan respons cepat dari cache, sambil memperbarui cache di latar belakang.
  if (event.request.url.includes('cdn') || event.request.url.includes('googleapis') || event.request.url.includes('unpkg') || event.request.url.includes('cdnjs')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          // Kembalikan dari cache jika ada, jika tidak, tunggu dari jaringan.
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }
  
  // Menggunakan strategi "Cache, falling back to Network" untuk aset lokal.
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Jika request ditemukan di cache, kembalikan dari cache.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Jika tidak ada di cache, lakukan fetch ke jaringan.
        return fetch(event.request).then(
          (networkResponse) => {
            // Periksa apakah respons valid sebelum di-cache.
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        ).catch((error) => {
          console.error('Fetching failed:', error);
          // Di sini Anda bisa menambahkan halaman fallback jika diperlukan, misalnya:
          // return caches.match('/offline.html');
          throw error;
        });
      })
  );
});

// Event listener untuk 'activate'
// Berjalan setelah service worker baru diaktifkan.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Hapus cache lama yang tidak ada di dalam whitelist.
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Menghapus cache lama ->', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Mengambil kontrol halaman secara langsung.
  );
});
