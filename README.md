# KupingTune - Laboratorium Blind Test dan Rekomendasi IEM

Dokumentasi teknis dan panduan sistem platform KupingTune.

---

## 1. Penjelasan Singkat Website

KupingTune adalah aplikasi web interaktif berbasis Single Page Application (SPA) yang dibangun menggunakan Vite, React, dan Web Audio API. Platform ini dirancang untuk memecahkan kebingungan pemula maupun antusias audio dalam memilih In-Ear Monitor (IEM) berkabel di segmen harga terjangkau (di bawah Rp 1.000.000).

Berbeda dari ulasan konvensional yang kerap dipengaruhi oleh bias merek, harga, atau sugesti visual, KupingTune menerapkan metode A/B Blind Preference Test secara objektif. Pengguna mendengarkan satu lagu referensi yang diproses secara real-time melalui dua rantai filter Digital Signal Processing (DSP) yang berbeda (Sample A dan Sample B). Tanpa mengetahui konfigurasi teknis di balik masing-masing sampel, pengguna memilih karakter suara yang paling nyaman di telinga mereka.

Sistem kemudian mengolah hasil pilihan pengguna menggunakan algoritma penilaian preferensi dan Weighted Euclidean Distance untuk menghasilkan:
- Personal Sound Profile berupa Spider Acoustic Graph (Radar Chart 5 dimensi).
- Klasifikasi Audio Persona Archetype (seperti The Vocal Purist, The Warmth Seeker, The Detail Hunter, The Energy V-Shaper, atau The Harman Balancer).
- Rekomendasi IEM budget paling presisi beserta persentase kecocokan (match score), kelebihan, kekurangan, dan tautan belanja langsung.

---

## 2. Konfigurasi 5 Ronde Blind Test

Pengujian dilakukan melalui 5 ronde terarah yang masing-masing mengisolasi parameter akustik tertentu. Setiap sampel menggunakan Web Audio API BiquadFilterNode serta kompensasi gain (Equal Loudness Normalization / trimGain) agar perbandingan murni menilai tonal balance, bukan perbedaan keras-lemahnya volume.

Berikut rincian teknis konfigurasi filter untuk setiap ronde:

### Ronde 1: Karakter Bass dan Low-End
Tujuan: Menguji sensitivitas dan preferensi pengguna terhadap ketebalan bass versus kecepatan dan kebersihan sub-bass.

- Sample A (Warm and Punchy):
  - Low-shelf filter pada frekuensi 120 Hz dinaikkan sebesar +4.5 dB (Q: 0.8). Memberikan ketebalan menyeluruh dari area sub-bass hingga mid-bass.
  - Peaking filter pada frekuensi 250 Hz dinaikkan sebesar +1.5 dB (Q: 1.0). Menambah bobot kehangatan (warmth) pada ketukan drum dan instrumen bass elektrik.
  - Trim Gain: 0.82 (-1.7 dB) sebagai kompensasi dorongan gain frekuensi rendah agar volume total tetap setara.
- Sample B (Clean and Sub-focused):
  - High-pass filter pada frekuensi 35 Hz (Q: 0.7). Memangkas getaran sub-audible liar yang tidak terkontrol.
  - Peaking filter pada frekuensi 50 Hz dinaikkan sebesar +3.0 dB (Q: 1.2). Menghasilkan hentakan sub-bass yang padat, dalam, dan bergetar cepat.
  - Peaking filter pada frekuensi 180 Hz diturunkan sebesar -2.5 dB (Q: 1.0). Mengurangi penumpukan mid-bass (muddy/bleed) agar vokal dan instrumen tengah tetap jernih dan bebas distorsi.
  - Trim Gain: 0.95.

### Ronde 2: Kejernihan Vokal dan Midrange
Tujuan: Menguji preferensi posisi vokal, apakah menyukai vokal intim di depan atau vokal santai yang memberi ruang pada instrumen.

- Sample A (Vocal-Forward / Intimate):
  - Peaking filter pada frekuensi 1.200 Hz (1.2 kHz) dinaikkan sebesar +2.0 dB (Q: 1.0). Menambah ketebalan body vokal penyanyi.
  - Peaking filter pada frekuensi 2.800 Hz (2.8 kHz) dinaikkan sebesar +4.0 dB (Q: 1.2). Mengangkat area pinna gain telinga manusia untuk memajukan artikulasi lirik tepat di depan pendengar.
  - Trim Gain: 0.80.
- Sample B (Relaxed / V-Shape Mids):
  - Peaking filter pada frekuensi 2.200 Hz (2.2 kHz) diturunkan sebesar -3.5 dB (Q: 1.1). Menghilangkan rasa teriakan vokal yang menusuk (anti-shoutiness) dan mendorong vokal sedikit mundur ke dalam panggung.
  - Peaking filter pada frekuensi 1.000 Hz (1.0 kHz) diturunkan sebesar -1.5 dB (Q: 0.9). Menciptakan ruang yang lebih dominan untuk dentuman bass dan instrumen latar.
  - Trim Gain: 0.98.

### Ronde 3: Kilau Treble dan Resonansi Air
Tujuan: Menguji batas toleransi telinga pengguna terhadap ketajaman frekuensi tinggi dan kebutuhan resolusi detail mikro.

- Sample A (Smooth and Fatigue-Free):
  - Peaking filter pada frekuensi 6.500 Hz (6.5 kHz) diturunkan sebesar -3.0 dB (Q: 1.5). Menghilangkan desis tajam konsonan suara 's' dan 't' (anti-sibilance).
  - High-shelf filter pada frekuensi 9.000 Hz (9.0 kHz) diturunkan sebesar -4.0 dB (Q: 0.8). Meredam kilau frekuensi atas yang menusuk agar aman untuk sesi mendengarkan lagu dalam durasi panjang tanpa membuat telinga cepat lelah.
  - Trim Gain: 0.98.
- Sample B (Crisp, Airy and Sparkle):
  - Peaking filter pada frekuensi 7.500 Hz (7.5 kHz) dinaikkan sebesar +3.5 dB (Q: 1.4). Memperjelas gesekan simbal, tepukan perkusi, dan petikan senar gitar akustik dengan batas gigitan yang tajam dan renyah.
  - High-shelf filter pada frekuensi 11.000 Hz (11.0 kHz) dinaikkan sebesar +4.5 dB (Q: 0.9). Membuka resonansi udara atas (airiness) untuk menciptakan kesan detail mikro dan separasi instrumen yang luas.
  - Trim Gain: 0.84.

### Ronde 4: Keluasan Panggung dan Separasi (Soundstage)
Tujuan: Menguji preferensi terhadap persepsi ruang akustik, antara panggung intim yang padat atau panggung megah yang lebar.

- Sample A (Intimate and Centered):
  - Peaking filter pada frekuensi 500 Hz dinaikkan sebesar +1.5 dB (Q: 0.7). Memadatkan fokus bunyi di bagian tengah (center-focused) untuk menghadirkan kesan intim layaknya pertunjukan akustik di studio kecil.
  - Mode pelebaran stereo dinonaktifkan.
  - Trim Gain: 0.92.
- Sample B (Wide and Holographic):
  - High-shelf filter pada frekuensi 8.000 Hz (8.0 kHz) dinaikkan sebesar +2.0 dB (Q: 0.7). Mengangkat pantulan spasial frekuensi tinggi yang memperluas ilusi persepsi dimensi ruangan.
  - Pengolahan matriks stereo widening aktif untuk memperlebar jarak separasi instrumen saluran kiri dan kanan telinga.
  - Trim Gain: 0.90.

### Ronde 5: Harmoni Keseluruhan (Tuning Signature)
Tujuan: Ronde penentu yang menggabungkan seluruh respons frekuensi ke dalam dua mazhab tuning audio terpopuler di dunia IEM.

- Sample A (Warm Musical and Rich):
  - Low-shelf filter pada frekuensi 140 Hz dinaikkan sebesar +4.0 dB (Q: 0.8). Fondasi bass tebal dan hangat.
  - Peaking filter pada frekuensi 400 Hz dinaikkan sebesar +1.5 dB (Q: 0.9). Memberi bobot musikal yang kaya pada vokal pria dan instrumen piano/gitar.
  - High-shelf filter pada frekuensi 7.000 Hz (7.0 kHz) diturunkan sebesar -2.5 dB (Q: 0.7). Menjaga area nada tinggi tetap santai dan lembut.
  - Trim Gain: 0.82.
- Sample B (Harman Balanced and Engaging):
  - Peaking filter pada frekuensi 45 Hz dinaikkan sebesar +3.5 dB (Q: 1.2). Menghadirkan dorongan sub-bass punchy sesuai standar target kurva Harman.
  - Peaking filter pada frekuensi 2.800 Hz (2.8 kHz) dinaikkan sebesar +3.0 dB (Q: 1.1). Memastikan kejernihan vokal dan melodi utama berada pada level yang presisi tanpa tertutup bass.
  - High-shelf filter pada frekuensi 10.000 Hz (10.0 kHz) dinaikkan sebesar +2.0 dB (Q: 0.8). Memberikan kilau treble yang proporsional dan seimbang.
  - Trim Gain: 0.84.

---

## 3. Halaman dan Struktur Website

Aplikasi KupingTune terdiri dari beberapa halaman utama yang dapat diakses secara dinamis:

### 1. Halaman Beranda (Hero dan Showcase)
- Header dan Navigasi: Logo KupingTune, indikator navigasi halaman yang sedang aktif, dan tombol akses cepat.
- Hero Section: Paparan nilai platform, tombol langsung memulai Blind Test, dan tombol melihat katalog IEM.
- Visual Karakter Audio dan Mini Player: Ilustrasi dinamis bertema Neo-Brutalism dengan pemutar audio preview mini.
- Kotak Statistik Platform: Informasi mengenai 5 ronde tes, sistem Web Audio API DSP 100% netral tanpa bias, dan 8+ kurasi IEM budget juara.
- Hottest IEM Showcase: Carousel interaktif menampilkan IEM terpopuler (Tangzu Wan'er, Moondrop Chu II, 7Hz x Crinacle Zero: 2) lengkap dengan spesifikasi driver, harga, keunggulan suara, dan tombol langsung uji coba. Elemen dimuat dengan animasi scroll-reveal.

### 2. Halaman Blind Test (Blind Arena)
- Indikator Progres Ronde: Header penunjuk ronde (Ronde 1 hingga Ronde 5) beserta persentase penyelesaian.
- Papan Informasi Uji: Judul dimensi yang diuji, petunjuk mendengarkan, dan pertanyaan pemandu.
- Audio Player Controls:
  - Tombol pergantian instan antara Sample A dan Sample B (didukung tombol pintas keyboard [A] dan [B]).
  - Tombol Play/Pause dengan ikon dinamis (didukung tombol pintas keyboard [Space]).
  - Pengatur volume slider dan tombol mute/unmute.
  - Visualizer audio frekuensi real-time yang membaca sinyal keluaran Web Audio API.
- Kartu Pilihan Jawaban:
  - Kartu Karakter A (dengan deskripsi impresi suara).
  - Kartu Karakter B (dengan deskripsi impresi suara).
  - Opsi Netral: "Tidak Bisa Membedakan / Ragu-ragu" untuk memastikan objektivitas hasil tanpa paksaan.
- Tombol Navigasi: Tombol kembali ke ronde sebelumnya dan tombol lanjut ke ronde berikutnya.

### 3. Halaman Hasil (Personal Sound Profile)
- Header Profil: Judul penegasan hasil tes murni berbasis selera pendengaran pengguna.
- Kartu Audio Persona Archetype: Lencana persona (seperti The Vocal Purist, The Warmth Seeker, The Detail Hunter, The Energy V-Shaper, atau The Harman Balancer), slogan musikal, deskripsi karakter suara telinga pengguna, serta daftar genre musik yang paling cocok.
- Spider Acoustic Graph (Radar Chart): Visualisasi interaktif berbasis SVG yang memetakan skor preferensi 5 parameter akustik (Bass, Midrange, Treble, Soundstage, dan Detail).
- Panel Top Match Preview: Menampilkan IEM nomor satu yang paling cocok dengan persentase kecocokan tertinggi.
- Rincian 5 Parameter Telinga: Kartu visual yang menjabarkan persentase preferensi untuk Bass Power, Mid Clarity, Treble Sparkle, Stage Width, dan Detail Resolution.
- Tombol Aksi: Navigasi untuk menggulir langsung ke daftar rekomendasi lengkap atau mengulang kembali Blind Test dari awal.

### 4. Halaman Katalog IEM (Recommendation List)
- Daftar Rekomendasi Lengkap: Menampilkan kurasi IEM budget terbaik di bawah Rp 1.000.000 (Tangzu Wan'er, Moondrop Chu II, 7Hz Zero: 2, Kiwi Ears Cadenza, KZ Castor Bass, Truthear Zero:RED, Truthear Gate, QKZ x HBB).
- Filter Rentang Harga: Tombol filter cepat (Semua Harga, Di bawah Rp 300 Ribu, Rp 300 Ribu - 600 Ribu, dan Rp 600 Ribu - 900 Ribu).
- Pengurutan (Sorting): Menu pengurutan berdasarkan Match Tertinggi, Harga Termurah, atau Harga Tertinggi.
- Kartu IEM: Menyajikan nama produk, harga, tipe driver, badge keunggulan suara, badge kecocokan (Match Score), rincian kelebihan (Pros), kekurangan (Cons), serta tombol tautan pencarian langsung ke toko daring (Tokopedia / Olshop).

---

## 4. Cara Menjalankan Proyek Secara Lokal

Pastikan Node.js (versi 18 ke atas) telah terpasang di sistem operasi Anda.

1. Buka terminal di direktori proyek:
```bash
cd audiophile
```

2. Pasang pustaka dependensi:
```bash
npm install
```

3. Jalankan server pengembangan lokal:
```bash
npm run dev
```

4. Buka peramban (browser) dan akses alamat lokal:
```text
http://localhost:5173/
```
