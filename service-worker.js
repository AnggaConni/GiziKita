const CACHE_NAME = 'gizikita-v1';

// Daftar file lokal Anda sesuai gambar struktur folder
const LOCAL_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './favicon.svg',
    './icon-192.png',
    './icon-512.png',
    './thumbnail.jpeg'
];

// Event 1: INSTALL (Menyimpan file ke dalam memori HP)
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Memaksa service worker baru langsung aktif
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Mengunduh & menyimpan aset lokal...');
            return cache.addAll(LOCAL_ASSETS);
        })
    );
});

// Event 2: ACTIVATE (Membersihkan cache versi lama jika ada update)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Langsung mengontrol semua halaman yang terbuka
});

// Event 3: FETCH (Mencegat request internet saat aplikasi digunakan)
self.addEventListener('fetch', (event) => {
    // Abaikan request selain GET (misal: POST, PUT) atau ekstensi Chrome
    if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // 1. Jika file ada di cache, langsung gunakan (Cepat & Offline)
            if (cachedResponse) {
                return cachedResponse;
            }

            // 2. Jika tidak ada di cache, ambil dari internet
            return fetch(event.request).then((networkResponse) => {
                // Pastikan response valid (status 200) atau opaque response dari CDN (status 0)
                if (!networkResponse || (networkResponse.status !== 200 && networkResponse.status !== 0)) {
                    return networkResponse;
                }

                // 3. Simpan file baru dari internet ke cache secara otomatis
                // Sangat penting untuk menyimpan Tailwind CSS, Font, Icons, dan HTML2PDF
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch((err) => {
                // 4. Jika Sedang Offline & file belum pernah di-cache
                console.log('[Service Worker] Offline / Gagal memuat:', event.request.url);
                // Karena ini aplikasi One-Page, jika index.html gagal, kita kembalikan halaman utama cache
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
