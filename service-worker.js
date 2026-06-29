const CACHE_NAME = 'gizidesa-v1';

// File utama yang HARUS di-cache pertama kali
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

// Event Install: Menyimpan file utama ke dalam Cache HP
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Event Activate: Membersihkan cache lama jika ada update versi aplikasi
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[Service Worker] Menghapus cache lama', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Event Fetch: Mencegat request internet (Runtime Caching)
self.addEventListener('fetch', (event) => {
    // Hanya tangani request tipe GET
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // 1. Jika file ada di memori offline (cache), gunakan itu!
            if (cachedResponse) {
                return cachedResponse;
            }

            // 2. Jika tidak ada di cache, terpaksa ambil dari internet
            return fetch(event.request).then((networkResponse) => {
                // 3. Simpan file yang baru di-download ke cache untuk penggunaan offline berikutnya
                // (Ini sangat berguna untuk menyimpan Tailwind, Font, dan Library dari CDN)
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {
                // Jika offline dan aset tidak ada di cache, abaikan (bisa ditambahkan fallback di sini)
                console.log('[Service Worker] Offline & aset belum di-cache.');
            });
        })
    );
});
