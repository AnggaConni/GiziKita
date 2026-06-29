# 🌟 GiziKita - AI Nutrition Planner PWA

GiziKita adalah aplikasi **Progressive Web App (PWA) Offline-First** yang dirancang sebagai Sistem Pendukung Keputusan (DSS) bagi Kader Posyandu dan orang tua. Aplikasi ini menggunakan kecerdasan buatan (algoritma optimasi) untuk menyusun rekomendasi menu harian balita guna mencegah stunting, disesuaikan dengan **harga pasar lokal** dan **anggaran harian** keluarga.

## 🚀 Fitur Utama
- **100% Offline:** Bekerja di daerah pelosok tanpa sinyal internet.
- **AI Menu Optimizer:** Mencari kombinasi menu sarapan, makan siang, dan makan malam terbaik.
- **Dynamic Market Pricing:** Kalkulasi biaya berdasarkan fluktuasi harga pasar lokal sesungguhnya.
- **Standardisasi AKG Kemenkes 2019:** Kalkulasi 9 parameter makro & mikro nutrien (Kalori, Protein, Lemak, Karbo, Zinc, Zat Besi, Kalsium, Vit A, Vit C).
- **Ekspor PDF:** Laporan rekomendasi gizi siap cetak.

  ---

## 🥗 Daftar Rekomendasi Menu Bawaan (Pangan Lokal)

Aplikasi ini dilengkapi dengan *database* menu sehat berbahan dasar pangan lokal yang murah dan mudah didapat. AI akan meracik menu-menu di bawah ini menjadi sajian harian yang pas dengan *budget* dan target gizi anak.

1. **Nasi + Lele Goreng + Sayur Kelor**
   - *Fokus Gizi:* Protein tinggi, Zat Besi, Vit C.
   - *Tips Edukasi:* Pisahkan tulang lele dengan teliti. Cincang halus daun kelor & campur ke nasi bila anak sulit makan sayur.
2. **Nasi + Telur Dadar Kelor**
   - *Fokus Gizi:* Lemak sehat, Vit A, mudah dibuat.
   - *Tips Edukasi:* Cincang kelor ke kocokan telur dadar — cara efektif 'menyembunyikan' sayur bagi picky eater.
3. **Singkong Rebus + Tempe Bumbu Kuning**
   - *Fokus Gizi:* Karbohidrat alternatif, prebiotik alami.
   - *Tips Edukasi:* Ganti nasi sesekali dengan singkong untuk diversifikasi pangan. Tempe baik untuk pencernaan anak.
4. **Nasi + Tahu Kukus + Sayur Bayam**
   - *Fokus Gizi:* Tekstur lembut, hidrasi ekstra.
   - *Tips Edukasi:* Tahu kukus lembut & mudah dikunyah balita. Beri kuah bayam untuk hidrasi ekstra.
5. **Nasi + Orek Tempe + Telur Rebus**
   - *Fokus Gizi:* Asam amino esensial lengkap.
   - *Tips Edukasi:* Kombinasi protein nabati & hewani memaksimalkan asam amino esensial pencegah stunting.
6. **Nasi Tim Hati Ayam + Wortel**
   - *Fokus Gizi:* "Superfood" lokal anti-anemia (Sangat tinggi Zat Besi Heme).
   - *Tips Edukasi:* Hati ayam sangat tinggi zat besi & Vitamin A — sangat dianjurkan untuk anak anemia/stunting.
7. **Bubur Kacang Hijau + Susu**
   - *Fokus Gizi:* Folat, Kalsium, Kalori padat (untuk selingan).
   - *Tips Edukasi:* Selingan padat gizi. Kacang hijau kaya zat besi & folat untuk pertumbuhan.
8. **Nasi + Ayam Suwir + Brokoli**
   - *Fokus Gizi:* Protein & Vitamin C (memaksimalkan penyerapan besi).
   - *Tips Edukasi:* Suwir ayam halus agar mudah ditelan. Brokoli sumber vitamin C penambah penyerapan zat besi.
9. **Nasi + Pepes Ikan Kembung + Kangkung**
   - *Fokus Gizi:* Omega-3 (DHA) lokal untuk otak.
   - *Tips Edukasi:* Ikan kembung kaya omega-3 untuk perkembangan otak. Pepes lebih sehat daripada digoreng.
10. **Ubi Rebus + Telur Rebus + Pisang**
    - *Fokus Gizi:* Energi sarapan, Vit A tinggi (Beta-karoten).
    - *Tips Edukasi:* Menu sarapan murah meriah & padat energi. Ubi sumber Vitamin A & serat.
11. **Nasi + Teri Goreng + Tahu + Bayam**
    - *Fokus Gizi:* Kalsium tulang tertinggi.
    - *Tips Edukasi:* Ikan teri (dimakan dengan tulang) sumber kalsium luar biasa untuk pertumbuhan tulang.
12. **Jagung Rebus + Tempe + Pepaya**
    - *Fokus Gizi:* Enzim pencernaan & serat sehat.
    - *Tips Edukasi:* Pepaya membantu pencernaan & kaya Vitamin A. Cocok sebagai selingan bergizi.

*(Catatan: Anda dapat dengan mudah menambahkan resep baru ke dalam `RECIPE_DB` di dalam kode seiring dengan bertambahnya variasi pangan lokal daerah Anda)*

---

---

## 🧠 Bagaimana Kalkulasi di Aplikasi Ini Bekerja?

Sistem AI di dalam GiziKita sangat transparan. Berikut adalah penjelasan matematis dari logika yang berjalan di balik layar:

### 1. Kalkulasi Harga per Porsi (Market Calculation)
Aplikasi ini memungkinkan pengguna mengatur harga bahan makanan per satuan pembelian (misal: per kilogram, per ikat, per liter). Namun, resep balita biasanya hanya membutuhkan porsi kecil (gram).

**Rumus:**
`Biaya Bahan = (Berat di Resep / Berat Satuan Pasar) x Harga Pasar`

**Contoh:**
- Harga Ikan Lele di pasar adalah **Rp 26.000 / 1 Kg (1000 gram)**.
- Resep "Nasi + Lele Goreng" hanya membutuhkan **80 gram** Ikan Lele.
- Kalkulasi: `(80 / 1000) * 26.000` = **Rp 2.080**
- *Artinya, biaya riil untuk porsi ikan lele pada menu tersebut hanyalah Rp 2.080.* Algoritma akan menjumlahkan seluruh biaya bahan baku per resep untuk mendapatkan Total Harga per Porsi.

### 2. Kalkulasi Kalori & Nutrisi per Porsi
Database GiziKita menyimpan nilai kandungan gizi bahan makanan dengan **basis per 100 gram bahan mentah** (merujuk pada Tabel Komposisi Pangan Indonesia / TKPI).

**Rumus:**
`Total Nutrisi = (Berat Bahan di Resep / 100) x Kandungan Gizi Acuan`

**Contoh (Menghitung Protein Telur):**
- Acuan gizi telur per 100g: **12.6 gram Protein**.
- Resep membutuhkan: **60 gram Telur**.
- Kalkulasi: `(60 / 100) * 12.6` = **7.56 gram Protein**.
- Sistem akan mengulang kalkulasi ini untuk Lemak, Karbo, Zinc, Besi, Kalsium, dll, lalu menjumlahkannya untuk seluruh bahan dalam satu porsi resep.

### 3. Logika AI (Optimization Algorithm) Menu Harian
Bagaimana AI menentukan rekomendasi dari ratusan kemungkinan kombinasi menu?

1. **Pembuatan Kandidat:** AI mengkalkulasi harga & nutrisi dari seluruh resep di database (Sarapan, Siang, Malam).
2. **Filter Anggaran (Constraint):** AI mencoba semua kemungkinan kombinasi 3 menu (`Resep A + Resep B + Resep C`). Jika *Total Harga > Anggaran Harian*, kombinasi tersebut langsung **dibuang**.
3. **Pembobotan Gizi Stunting (Scoring):** Untuk kombinasi yang *masuk budget*, AI akan memberikan skor prioritas. Karena fokus aplikasi adalah **Pencegahan Stunting**, bobot skor tertinggi diberikan pada pemenuhan target gizi spesifik:
   - *Protein* (Bobot 40%)
   - *Zinc* (Bobot 30%)
   - *Zat Besi* (Bobot 20%)
   - *Vitamin A* (Bobot 10%)
4. **Hasil Akhir:** Kombinasi dengan Skor Gizi tertinggi yang tidak melebihi anggaran akan ditampilkan kepada pengguna sebagai Rekomendasi Menu Harian.

---

## 🛠 Teknologi yang Digunakan
- **HTML5 & Vanilla JavaScript:** Tanpa *framework* berat agar aplikasi super ringan dan cepat.
- **TailwindCSS (via CDN/Compiled):** Untuk antarmuka (UI) modern yang responsif.
- **Service Worker (PWA):** Untuk kapabilitas *offline* dan *Install to Home Screen*.
- **Local Storage API:** Menyimpan profil balita, riwayat, dan data harga pasar secara lokal di perangkat.
- **html2pdf.js:** *Library client-side* untuk membuat dokumen laporan tanpa perlu server backend.

## 📥 Cara Instalasi / Penggunaan Lokal
1. Download atau `git clone` repositori ini.
2. Karena menggunakan Service Worker, sangat disarankan membukanya lewat Local Server (misal: *Live Server* extension di VS Code) atau di-*hosting* ke GitHub Pages.
3. Buka di browser Chrome/Safari di HP, lalu klik opsi **"Tambahkan ke Layar Utama" (Add to Home Screen)** untuk menginstal aplikasi ini.

> *Dibuat untuk Indonesia yang lebih sehat. Gizi untuk semua!*
