const CACHE_NAME = 'scanner-pintar-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './about.html', 
  './help.html',
  './terms.html',
  './privacy.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;
      
      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        console.error('Fetch failed; returning offline fallback.', error);
        return null;
      }
    })
  );
});

// --- LOGIKA BARU UNTUK FITUR PENGINGAT ---

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('SmartScannerDB', 2);
        request.onerror = (event) => reject("Database error: " + event.target.errorCode);
        request.onsuccess = (event) => resolve(event.target.result);
    });
}

async function checkRemindersAndNotify() {
    console.log("Checking reminders...");
    try {
        const db = await openDB();
        const transaction = db.transaction(['contacts'], 'readwrite');
        const store = transaction.objectStore('contacts');
        const contacts = await new Promise((resolve, reject) => {
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });

        const now = new Date();

        for (const contact of contacts) {
            if (contact.reminderDate) {
                const reminderDate = new Date(contact.reminderDate);
                if (reminderDate <= now) {
                    console.log(`Reminder for ${contact.nama}`);
                    await showNotification(contact);
                    
                    // Hapus pengingat setelah notifikasi ditampilkan
                    contact.reminderDate = null;
                    const updateRequest = store.put(contact);
                    updateRequest.onerror = (e) => console.error("Error updating contact after notification:", e.target.error);
                }
            }
        }
    } catch (error) {
        console.error("Failed to check reminders:", error);
    }
}

async function showNotification(contact) {
    const title = 'Waktunya Follow-up!';
    const options = {
        body: `Jangan lupa hubungi ${contact.nama} dari ${contact.perusahaan}.`,
        icon: 'https://raw.githubusercontent.com/masisparmo/scannerkartunamallama/refs/heads/main/scanner-pintar-192.png',
        badge: 'https://raw.githubusercontent.com/masisparmo/scannerkartunamallama/refs/heads/main/scanner-pintar-72.png',
        data: {
            contactId: contact.id
        },
        actions: [
            { action: 'open_app', title: 'Buka Kontak' }
        ]
    };

    await self.registration.showNotification(title, options);
}

self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-reminders') {
        event.waitUntil(checkRemindersAndNotify());
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const contactId = event.notification.data.contactId;
    const urlToOpen = new URL(`/index_asisten-pintar_040925.html?contactID=${contactId}`, self.location.origin).href;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].navigate(urlToOpen).then((client) => client.focus());
            }
            return clients.openWindow(urlToOpen);
        })
    );
});
