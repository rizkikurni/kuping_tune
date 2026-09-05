/**
 * Budget IEMs Catalog (< Rp 1.000.000)
 * Curated specifically for Indonesian beginners / kere hore audio enthusiasts.
 */

export const BUDGET_IEMS = [
  {
    id: 'tangzu-waner',
    name: "Tangzu Wan'er S.G",
    brand: 'Tangzu',
    price: 260000,
    priceFormatted: 'Rp 260.000',
    driver: '10mm Dynamic Driver (PET Diaphragm)',
    connector: '0.78mm 2-Pin (QDC style)',
    tuning: 'Vocal-Forward / Warm Balanced',
    soundVector: {
      bass: 58,
      mid: 86,
      treble: 52,
      stage: 58,
      detail: 62
    },
    primaryArchetype: 'vocal_purist',
    pros: [
      'Vokal penyanyi sangat tebal, manis, dan berbobot',
      'Treble mulus tanpa sibilance (aman untuk telinga sensitif)',
      'Desain motif awan klasik yang artistik'
    ],
    cons: ['Kabel bawaan tipis', 'Separasi bass agak padat di lagu cepat'],
    bestFor: 'Pecinta vokal pop wanita/pria, lagu akustik santai, dan podcast.',
    recommendationReason: 'Sangat cocok karena kamu memilih karakter vokal yang intim dan treble yang nyaman di telinga.'
  },
  {
    id: 'moondrop-chu-2',
    name: 'Moondrop Chu II',
    brand: 'Moondrop',
    price: 320000,
    priceFormatted: 'Rp 320.000',
    driver: '10mm DLC (Diamond-Like Carbon) Dynamic Driver',
    connector: '0.78mm 2-Pin (Detachable)',
    tuning: 'Clean Harman / Fun Engaging',
    soundVector: {
      bass: 68,
      mid: 60,
      treble: 75,
      stage: 64,
      detail: 78
    },
    primaryArchetype: 'detail_hunter',
    pros: [
      'Resolusi dan kejernihan treble luar biasa di kelas harganya',
      'Bodi housing full metal zinc-alloy yang mewah dan kokoh',
      'Nozzle kuningan bisa dilepas-pasang dan diganti filternya'
    ],
    cons: ['Bodi metal agak berat di telinga kecil', 'Bisa terasa sedikit terang jika kamu benci treble'],
    bestFor: 'J-Pop, Soundtrack Anime, Rock modern, dan pendengar yang mencari detail simbal renyah.',
    recommendationReason: 'Pilihan tepat karena telingamu menyukai kilau treble berkilau dan kejernihan instrumen tinggi.'
  },
  {
    id: '7hz-zero-2',
    name: '7Hz x Crinacle Zero: 2',
    brand: '7Hz',
    price: 375000,
    priceFormatted: 'Rp 375.000',
    driver: '10mm Dual-Cavity Dynamic Driver (PU + Metal Composite)',
    connector: '0.78mm 2-Pin',
    tuning: 'Warm Harman / Bass Engaging',
    soundVector: {
      bass: 76,
      mid: 65,
      treble: 58,
      stage: 62,
      detail: 68
    },
    primaryArchetype: 'harman_balancer',
    pros: [
      'Kolaborasi tuning dengan Crinacle yang sangat matang',
      'Bass punchy dan berenergi tanpa merusak kejernihan vokal',
      'Kabel bawaan jauh lebih lentur dan bagus dibanding Zero generasi pertama'
    ],
    cons: ['Bodi plastik terasa agak sederhana', 'Bentuk shell bersudut bagi sebagian kuping'],
    bestFor: 'All-rounder segala genre: Pop, R&B, Hip-Hop, hingga Indie Rock.',
    recommendationReason: 'Kecocokan tinggi karena kamu menginginkan harmoni bass punchy dengan vokal yang tetap bersih.'
  },
  {
    id: 'kiwi-ears-cadenza',
    name: 'Kiwi Ears Cadenza',
    brand: 'Kiwi Ears',
    price: 550000,
    priceFormatted: 'Rp 550.000',
    driver: '10mm Beryllium-Plated Dynamic Driver',
    connector: '0.78mm 2-Pin',
    tuning: 'Smooth Warm Balanced / Musical',
    soundVector: {
      bass: 72,
      mid: 75,
      treble: 56,
      stage: 68,
      detail: 72
    },
    primaryArchetype: 'warmth_seeker',
    pros: [
      'Driver Beryllium menghasilkan tekstur bass yang kenyal dan empuk',
      'Bodi resin 3D-printed ergonomis dengan corak faceplate elegan',
      'Karakter suara sangat musikal dan tidak pernah membuat lelah'
    ],
    cons: ['Bukan untuk penikmat suara super analitikal/bright', 'Paket ear tips standar'],
    bestFor: 'Mendengar berjam-jam saat kerja/belajar, lagu jazz, akustik, dan R&B santai.',
    recommendationReason: 'Sangat selaras karena preferensimu menyukai bass hangat yang empuk dan nada non-fatiguing.'
  },
  {
    id: 'kz-castor-bass',
    name: 'KZ Castor (Bass Enhanced Version)',
    brand: 'KZ Acoustics',
    price: 215000,
    priceFormatted: 'Rp 215.000',
    driver: 'Dual Dynamic Driver (10mm Low + 8mm Mid-High)',
    connector: '0.75mm 2-Pin (Type C)',
    tuning: 'Sub-Bass Boosted / Energetic V-Shape',
    soundVector: {
      bass: 92,
      mid: 42,
      treble: 68,
      stage: 56,
      detail: 58
    },
    primaryArchetype: 'energy_v',
    pros: [
      'Dentuman bass luar biasa bertenaga untuk harganya yang ramah kantong',
      'Dilengkapi 4 switch tuning fisik untuk mengubah karakter suara secara hardware',
      'Pemisahan frekuensi terbantu oleh arsitektur dual-driver'
    ],
    cons: ['Bodi agak tebal di telinga', 'Vokal terdengar agak mundur pada lagu ballad murni'],
    bestFor: 'Basshead sejati, lagu EDM, Trap, K-Pop beat berat, dan gaming aksi.',
    recommendationReason: 'Sangat cocok karena kamu memilih dentuman bass bertenaga dan energi ritme yang maksimal.'
  },
  {
    id: 'truthear-zero-red',
    name: 'Truthear x Crinacle ZERO: RED',
    brand: 'Truthear',
    price: 840000,
    priceFormatted: 'Rp 840.000',
    driver: 'Dual Dynamic Driver (10mm Sub-woofer + 7.8mm Tweeter/Mid)',
    connector: '0.78mm 2-Pin',
    tuning: 'Neutral with Controlled Sub-Bass (Harman Modified)',
    soundVector: {
      bass: 66,
      mid: 74,
      treble: 68,
      stage: 78,
      detail: 88
    },
    primaryArchetype: 'harman_balancer',
    pros: [
      'Akurasi tonal dan distorsi sangat rendah di kelas di bawah Rp 1 juta',
      'Dilengkapi adapter impedansi 10Ω khusus untuk menambah bass boost opsional',
      'Panggung suara luas dan imaging instrumen presisi'
    ],
    cons: ['Ukuran nozzle cukup besar (diameter 6.2mm), perlu pembiasaan di telinga kecil'],
    bestFor: 'Audiophile purist yang mengutamakan ketepatan nada instrumen dan separasi rekaman.',
    recommendationReason: 'Pilihan paling sempurna untuk preferensi tonal seimbang, panggung suara lebar, dan detail tinggi.'
  },
  {
    id: 'truthear-gate',
    name: 'Truthear Gate',
    brand: 'Truthear',
    price: 299000,
    priceFormatted: 'Rp 299.000',
    driver: '10mm Dynamic Driver (Carbon LCP Diaphragm)',
    connector: '0.78mm 2-Pin',
    tuning: 'Clean Neutral Harman / Transparent',
    soundVector: {
      bass: 62,
      mid: 70,
      treble: 72,
      stage: 66,
      detail: 75
    },
    primaryArchetype: 'detail_hunter',
    pros: [
      'Bodi transparan modern dengan kabel berkualitas tinggi',
      'Midrange dan treble sangat bersih tanpa distorsi',
      'Ringan dan fitting nyaman di telinga'
    ],
    cons: ['Bass terasa agak tipis untuk penikmat lagu berdentum berat'],
    bestFor: 'Vokal modern, gitar akustik, gaming kompetitif (step footstep jelas), dan lagu pop.',
    recommendationReason: 'Cocok untuk seleramu yang menyukai pemisahan suara bersih dan presentasi vokal transparan.'
  },
  {
    id: 'qkz-x-hbb',
    name: 'QKZ x HBB',
    brand: 'QKZ',
    price: 240000,
    priceFormatted: 'Rp 240.000',
    driver: '10mm Titanium-Coated Diaphragm',
    connector: '0.75mm 2-Pin (QDC)',
    tuning: 'Warm Bass-Heavy / Laid-Back Mids',
    soundVector: {
      bass: 86,
      mid: 55,
      treble: 48,
      stage: 58,
      detail: 56
    },
    primaryArchetype: 'warmth_seeker',
    pros: [
      'Bass sub-bass sangat menggelegar dan memuaskan untuk harganya',
      'Treble tidak pernah menusuk sama sekali',
      'Desain faceplate motif petir emas yang menarik'
    ],
    cons: ['Detail instrumen tinggi agak tenggelam'],
    bestFor: 'Hip hop jadul, reggae, dubstep, dan mendengarkan podcast santai.',
    recommendationReason: 'Pilihan ekonomis untuk pencari karakter suara tebal berbobot dan santai.'
  }
];
