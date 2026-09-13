# 🎧 KupingTune — Blind Test & IEM Recommender

Aplikasi web interaktif Single Page Application (SPA) berbasis **Vite + React** yang memungkinkan pengguna melakukan **A/B Blind Preference Test** secara objektif, menyusun **Personal Sound Profile** (Radar Chart & Persona Badge), dan merekomendasikan **IEM Budget Pemula (< Rp 1 Juta)** yang paling sesuai dengan selera kuping pengguna.

Desain antarmuka mengadopsi estetika **Neo-Brutalism Pop** ceria dengan palet ungu, kuning, dan pink berenergi tinggi.

---

## 📌 Dokumen Roadmap & Progress Proyek

Roadmap lengkap tahapan pengerjaan dan status progress dapat dilihat langsung pada:
👉 **[ROADMAP.md](./ROADMAP.md)**

---

## ⚡ Fitur Utama

1. **A/B Blind Audio Test (5 Ronde Interaktif)**:
   - Menguji preferensi Bass, Vokal/Midrange, Treble Sparkle, Soundstage, dan Tuning Signature tanpa bias brand/harga.
   - Pilihan: *Sample A*, *Sample B*, atau *Tidak Bisa Membedakan*.
2. **Web Audio API Real-Time DSP Engine**:
   - Dual DSP Chain dengan **Instant Seamless Crossfading** (transisi 15ms click-free tanpa jeda lagu).
   - **Equal Loudness Normalization** agar perbandingan adil dan tidak bias volume.
   - Dukungan shortcut keyboard: `[A]`, `[B]`, dan `[Space]` untuk play/pause.
3. **Personal Sound Profile & SVG Radar Chart**:
   - Visualisasi Spider Web Chart kustom berbasis SVG murni.
   - Klasifikasi Persona Otomatis (*The Vocal Purist*, *The Warmth Seeker*, *The Detail Hunter*, *The Energy V-Shaper*, *The Harman Balancer*).
4. **Rekomendasi IEM Budget Kere Hore (< Rp 1 Juta)**:
   - Pencocokan kemiripan matematis (*Weighted Euclidean Distance*) dengan katalog IEM terpopuler di Indonesia: Tangzu Wan'er, Moondrop Chu II, 7Hz Zero 2, Kiwi Ears Cadenza, KZ Castor Bass, Truthear Zero:RED, Truthear Gate, QKZ x HBB.
   - Dilengkapi persentase match, kelebihan/kekurangan, dan penjelasan *Why this matches you*.

---

## 🚀 Cara Menjalankan

```powershell
# 1. Install dependencies
npm install

# 2. Jalankan server lokal
npm run dev

# 3. Akses di browser
# http://localhost:5174/
```
