# 🎧 Roadmap Pengembangan: KupingTune — Blind Test & IEM Recommender

> **Konsep Proyek:**  
> Aplikasi web interaktif Single Page Application (SPA) berbasis **Vite + React** yang memberikan pengalaman **A/B Blind Preference Test** objektif tanpa pengaruh brand atau harga, menyusun **Personal Sound Profile (Radar Chart & Persona Badge)**, dan merekomendasikan **IEM Budget Populer (< Rp 1 Juta)** yang paling sesuai dengan selera kuping pengguna.

---

## 🎨 Desain Sistem: KupingTune Neo-Brutalism Pop

Desain antarmuka mengadopsi estetika **Neo-Brutalism Pop**:
- **Hero & Header:** Vivid Royal Purple (`#6949FE`) dengan teks putih tebal.
- **Card Utama:** Pastel Punchy Yellow (`#FFDF34`) dengan sudut membulat (`border-radius: 28px - 32px`).
- **Stats Bar:** Bubblegum Pink Box (`#FFAEF0`).
- **Latar Bawah:** Warm Cream (`#FAF8F4`) yang ramah mata.
- **Border & Bayangan (Neo-Brutalism):** Stroke hitam pekat (`2.5px - 3px solid #0E0F14`) dengan hard drop shadow tajam (`4px 4px 0 #0E0F14` dan `8px 8px 0 #0E0F14`).
- **Aksen Khas:**
  - Starburst / Scalloped Badges (Oranye `#FF7728` & Ungu) dengan rotasi kemiringan mikro.
  - Floating Audio Player Card warna putih dengan scrub bar oranye dan aksen titik pink/oranye di sudut.
  - Section **Hottest Show** dengan navigasi panah kiri/kanan `[←]` `[→]`.
  - Tombol-tombol Neo-Pill (Yellow, White, Pink, Purple).

---

## 📊 Status & Progress Tracker

| Fase | Deskripsi | Status |
| :--- | :--- | :---: |
| **Fase 1** | Scaffolding Vite + React & Desain Sistem Neo-Brutalism PodCraze | ✅ **SELESAI** |
| **Fase 2** | Web Audio API DSP Engine, Audio Stems & Equal Loudness | ✅ **SELESAI** |
| **Fase 3** | The 5-Round Blind Arena, Keyboard Shortcuts & Live Waveform | ✅ **SELESAI** |
| **Fase 4** | Scoring Engine, SVG Spider Radar Chart & Persona Archetypes | ✅ **SELESAI** |
| **Fase 5** | Database IEM Budget Pemula & Euclidean Recommendation Match | ✅ **SELESAI** |
| **Fase 6** | Polishing, Hottest Show Showcase & Mobile Responsive | ✅ **SELESAI** |

---

## 📋 Detail Tiap Tahapan (Phases)

### [x] Fase 1: Fondasi Proyek & Desain Sistem Neo-Brutalism PodCraze
- [x] Inisialisasi Vite + React di root workspace.
- [x] Rombak total `src/index.css` mengadopsi palet warna: Purple `#6949FE`, Yellow `#FFDF34`, Pink `#FFAEF0`, Cream `#FAF8F4`, dan Orange `#FF7728`.
- [x] Utilitas tombol `.btn-neo-yellow`, `.btn-neo-white`, `.btn-neo-purple`, dan kartu `.card-neo` dengan hard drop shadow.
- [x] Komponen `Navbar.jsx`: Brand logo oranye PodCraze., menu nav dipisahkan titik oranye (`About • Blind Test • Katalog IEM • FAQ • Blog`), dan tombol neo-pill.
- [x] Komponen `HeroSection.jsx`:
  - Headline tebal: *"Tune In to Your True Hearing Profile"*.
  - Dua tombol aksi: Pill Kuning *"Mulai Blind Test"* dan Pill Putih *"Katalog IEM Murah"*.
  - Kartu Kuning Besar dengan karakter ber-headphone, floating starburst badge, dan floating audio player card.
  - Kotak pink statistik (5 Ronde, 100% Netral, 8+ IEM Pilihan).
- [x] Komponen `FeaturedShowcase.jsx`: Replika presisi dari card *"Hottest Show"* pada screenshot (kartu kuning bersudut tebal, starburst badge `#1`, tombol play ungu melingkar, dan panah navigasi).

### [x] Fase 2: Web Audio API DSP Engine & Setup Demo Audio
- [x] Arsitektur Dual DSP Chain pada `src/audio/audioEngine.js`:
  ```
  [ Source Node ] ──┬──> [ Chain A: Biquad Filters ] ──> [ Gain Node A ] ──┬──> [ Master Gain ] ──> [ Analyser ] ──> [ Speakers ]
                    └──> [ Chain B: Biquad Filters ] ──> [ Gain Node B ] ──┘
  ```
- [x] **Instant Seamless A/B Crossfading**: Transisi 15ms micro-ramp saat beralih antara sample A dan B tanpa jeda lagu atau letupan (*click-free*).
- [x] **Equal Loudness Normalization**: Pre-gain compensation pada filter yang di-boost agar tidak terjadi bias psikologis akibat volume lebih keras.
- [x] Generator audio multi-instrumen berkualitas studio di `src/audio/demoTrackGenerator.js` (16-bar loop: kick drum 808, snare/clap, hi-hats tajam, bassline tebal, synth chords stereo, dan melodi vokal formant).
- [x] Definisi filter biquad 5 ronde di `src/audio/roundFilters.js`.

### [x] Fase 3: The Blind Arena & Audio Visualizer
- [x] Komponen `WaveformVisualizer.jsx`: Render real-time audio spectrum berbasis `HTML5 Canvas` dengan batang bersudut tegas dalam balutan border hitam neo-brutalis.
- [x] Komponen `AudioControls.jsx`:
  - Tombol tactile A/B switch pill besar (Kuning untuk A, Pink untuk B).
  - Shortcut keyboard: Tombol `[A]`, `[B]`, dan `[Space]` untuk play/pause.
  - Player bar neo-brutalis dengan tombol play bulat oranye dan slider volume.
- [x] Komponen `BlindArena.jsx`:
  - Kartu putih besar dengan starburst badge ronde (`#1`, `#2`, `#3`, dll).
  - 3 kartu pilihan neo-brutalis: Kuning (Sample A), Pink (Sample B), dan Abu-abu (Tidak bisa membedakan).
  - Tombol aksi kuning tebal untuk lanjut ke ronde berikutnya.

### [x] Fase 4: Profiling Suara, SVG Radar Chart & Persona Archetypes
- [x] Algoritma pembobotan vektor 5-dimensi di `src/utils/scoringEngine.js`: `[Bass, Mid, Treble, Stage, Detail]`.
- [x] Komponen `RadarChart.jsx`: Visualisasi Spider Web Chart kustom berbasis SVG murni dengan border hitam tebal, titik vertex oranye, dan isian kuning pastel.
- [x] Klasifikasi Persona Otomatis di `src/data/archetypes.js`:
  - 🎙️ **The Vocal Purist**
  - ☕ **The Warmth Seeker**
  - 🔍 **The Detail Hunter**
  - ⚡ **The Energy V-Shaper**
  - ⚖️ **The Harman Balancer**
- [x] Komponen `ResultProfile.jsx`: Kartu kuning besar persona, rincian preferensi dalam 5 kotak warna-warni (Kuning, Pink, Ungu, Biru, Hijau), dan tombol aksi neo-pill.

### [x] Fase 5: Katalog & Rekomendasi IEM Budget Pemula (< Rp 1 Juta)
- [x] Database katalog IEM budget pilihan pemula di `src/data/iemDatabase.js`:
  - **Tangzu Wan'er S.G** (Rp 260.000)
  - **Moondrop Chu II** (Rp 320.000)
  - **7Hz x Crinacle Zero: 2** (Rp 375.000)
  - **Kiwi Ears Cadenza** (Rp 550.000)
  - **KZ Castor Bass Enhanced** (Rp 215.000)
  - **Truthear x Crinacle ZERO: RED** (Rp 840.000)
  - **Truthear Gate** (Rp 299.000)
  - **QKZ x HBB** (Rp 240.000)
- [x] Algoritma **Weighted Euclidean Distance** untuk menghitung persentase kecocokan (*Match Score %*).
- [x] Komponen `RecommendationList.jsx`:
  - Kartu IEM dengan kartu teratas berwarna kuning cerah.
  - Badge persentase match (contoh: `96% Match`).
  - Penjelasan khusus *"Kenapa Ini Pas Denganmu"*.
  - Filter rentang harga (&lt; 300rb, 300rb - 600rb, &gt; 600rb) dan sorting.
  - Direct link pencarian ke Tokopedia.

### [x] Fase 6: Fitur Hybrid Audio Selector (Preset Kurasi + Upload File Lokal 100% Memory)
- [x] **Pustaka Preset Bawaan (Multi-Genre)**:
  - *Studio Multi-Stem Groove (112 BPM)*: All-Rounder (Kick, bass, keys, vokal).
  - *Acoustic & Warm Vocal (92 BPM)*: Uji vokal intim & treble simbal halus.
  - *Cyber Bass & Electro Beats (124 BPM)*: Uji sub-bass 808 & resolusi sparkle.
- [x] **Upload File Lokal (100% Client-Side In-Memory)**:
  - Drag & Drop audio file (`.mp3`, `.wav`, `.flac`, `.m4a`, `.ogg`, `.aac`).
  - Di-decode langsung via Web Audio API `decodeAudioData()` ke RAM browser pengguna.
  - **Zero Server Upload**: 100% privat, file tidak pernah diunggah ke server mana pun.
- [x] Komponen `TrackSelectorModal.jsx`: Modal Neo-Brutalis untuk memilih preset lagu atau drag & drop file lagu sendiri.
- [x] Indikator status trek aktif di `BlindArena.jsx` dengan tombol cepat *"Ganti / Upload Lagu"*.

---

## 🛠️ Cara Menjalankan Proyek Secara Lokal

1. **Install Dependencies:**
   ```powershell
   npm install
   ```
2. **Jalankan Development Server:**
   ```powershell
   npm run dev
   ```
   Aplikasi akan terbuka di: `http://localhost:5173/` (atau `http://localhost:5174/`).
3. **Build untuk Production:**
   ```powershell
   npm run build
   ```
