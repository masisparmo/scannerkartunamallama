// Nama cache unik. Ubah nama ini jika Anda membuat perubahan besar pada file yang di-cache.
const CACHE_NAME = 'scanner-pintar-cache-v1';

// Daftar file inti yang membentuk "App Shell".
// Ini adalah file yang dibutuhkan agar aplikasi Anda dapat berjalan.
const urlsToCache = [
  './',
  './index.html',
  './about.html', 
  './help.html',
  './terms.html',
  './privacy.html',
];

// Event listener 'install'
// Dijalankan saat service worker pertama kali diinstal.
self.addEventListener('install', event => {
  // Tunggu hingga proses caching selesai.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event listener 'activate'
// Dijalankan setelah service worker diinstal. Berguna untuk membersihkan cache lama.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Jika ada cache dengan nama yang berbeda dari CACHE_NAME saat ini, hapus.
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Mengambil alih kontrol halaman dengan segera.
  return self.clients.claim();
});

// Event listener 'fetch'
// Dijalankan setiap kali aplikasi membuat permintaan jaringan (misalnya mengambil gambar, script, atau data).
self.addEventListener('fetch', event => {
  // Kita hanya akan menangani permintaan GET.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 1. Coba cari respons dari cache terlebih dahulu.
      const cachedResponse = await cache.match(event.request);
      
      // 2. Jika ada di cache, langsung kembalikan.
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // 3. Jika tidak ada di cache, coba ambil dari jaringan.
      try {
        const networkResponse = await fetch(event.request);
        
        // Jika berhasil, simpan salinan respons ke dalam cache untuk penggunaan di masa mendatang.
        // Kita hanya meng-cache respons yang valid (status 200).
        if (networkResponse && networkResponse.status === 200) {
            // Perlu di-clone karena response hanya bisa dibaca sekali.
            cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
      } catch (error) {
        // Jika fetch gagal (misalnya karena offline), kita bisa memberikan halaman fallback.
        // Untuk API, kita tidak memberikan fallback agar aplikasi bisa menangani errornya sendiri.
        console.error('Fetch failed; returning offline fallback.', error);
        
        // Untuk navigasi halaman (misal: about.html), Anda bisa memberikan halaman offline fallback
        // if (event.request.mode === 'navigate') {
        //   return caches.match('./offline.html');
        // }
        
        // Untuk request lain, biarkan gagal agar aplikasi tahu sedang offline.
        return null;
      }
    })
  );
});
