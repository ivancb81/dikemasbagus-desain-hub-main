export interface Workshop {
  id: number;
  title: string;
  format: string;
  description?: string;
  content: string[];
  benefits: string[];
  idealFor: string;
  images: string[];
}

export const workshopsData: Workshop[] = [{
  id: 1,
  title: 'Kemasan Beridentitas & Penjualan Naik',
  format: '1 Hari – Blended Class (Offline + Demo Mock-up)',
  description: 'Workshop ini dirancang untuk bantu Anda bikin kemasan yang punya identitas kuat & langsung menarik perhatian di rak toko offline / online. Cocok buat Anda yang pengen produk tampil menonjol, bukan cuma numpang lewat.',
  content: [
    'Menemukan "DNA unik" brand Anda, biar gak mirip produk sebelah',
    'Menyusun visual yang klik di hati konsumen: strategi logo, warna, USP',
    'Penggunaan Ai untuk bantu UMKM',
    'Diskusi & studi kasus dari kemasan yang terbukti berhasil'
  ],
  benefits: [
    'Anda bisa bedah desain produk sendiri untuk analisa',
    'Framework 3-Detik: cara cepat memikat konsumen sejak pandangan pertama',
    'Insight personal dari fasilitator untuk produk Anda',
    'Template + panduan cetak profesional'
  ],
  idealFor: 'UMKM semua kategori • Inkubator bisnis • Produk baru & rebranding\nKalau kamu ingin produkmu nggak cuma bagus, tapi juga laris, ini kelasnya.',
  images: ['/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg', '/lovable-uploads/1ccdf13a-8772-4079-a2c4-f83c2c57ff93.jpg', '/lovable-uploads/8537dde3-172b-4396-8c9e-0a6bb6439776.jpg']
}, {
  id: 2,
  title: 'Strategi Jitu Kemasan Makanan dan Minuman',
  format: '1 Hari – Studi Kasus F&B + Demo Pembuatan Desain',
  description: 'Buat produk kuliner Anda tampil lebih dari sekadar enak.\nDi dunia F&B, kemasan bukan hanya pembungkus — tapi pengantar rasa pertama sebelum konsumen mencicipi.',
  content: [
    'Cara pilih material yang aman, tahan lama, dan sesuai kebutuhan (kering, basah, beku)',
    'Panduan label & regulasi: BPOM, label gizi, klaim rasa & sertifikasi',
    'Membuat visual storytelling • Psikologis warna, font, foto, logo, agar sesuai karakter produk & target konsumen',
    'Praktik mencocokkan kemasan dengan cita rasa (tasting & visual test)'
  ],
  benefits: [
    'Peneran strategi Desain kemasan F&B yang menarik, berbeda dan menggugah selera',
    'Checklist sebelum desain diproses untuk naik cetak',
    'Rekomendasi personal untuk produk Anda',
    'Wawasan soal mengali Storytelling produk'
  ],
  idealFor: '• Spesifik UMKM kuliner (makanan dan minuman) rumahan–menengah\n• Pelaku usaha F&B baru yang ingin mulai dengan kemasan yang tepat\n• Pebisnis makanan/minuman yang ingin tampil beda dan profesional\n\nKalau produknya sudah enak, sekarang saatnya bikin tampilannya ikut bikin lapar. Gabung di workshop ini, biar kemasanmu bukan cuma rapi, tapi juga "mempengaruhi" konsumen',
  images: ['/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg', '/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg', '/lovable-uploads/d20d5b5b-c929-4861-8e00-9f7892b6d9dd.jpg']
}, {
  id: 3,
  title: 'Beauty & Skincare Pack Lab',
  format: '1 Hari (Offline + Demo Desain)',
  description: 'Karena kemasan di dunia beauty bukan cuma soal cantik,\ntapi soal trust dan brand image yang berbicara sejak pertama dilihat. Di workshop ini, Anda akan belajar menyusun kemasan elegan, sesuai regulasi, dan "trustworthy" product.',
  content: [
    'Tren visual & estetika di dunia beauty lokal & global (tone, tekstur, elemen desain)',
    'Cara membuat klaim dan label yang sah – sesuai BPOM kosmetik',
    'Opsi finishing premium: foil, emboss, UV, soft-touch, dan kapan harus digunakan',
    'Hands-on: Sketch dieline + konsultasi formula & tekstur untuk menyesuaikan style brand'
  ],
  benefits: [
    'Desain kemasan yang relevan dengan target konsumen',
    'Menentukan strategi pendekatan desain yang dipakai',
    'Dapat membuat dieline kreatif awal yang siap dikembangkan',
    'Arah desain yang cocok dengan formula dan positioning produk Anda • Pentingnya branding / personal branding'
  ],
  idealFor: '• Brand skincare lokal\n• Start-up kosmetik herbal & natural body-care\n• Pelaku beauty business yang ingin rebranding dengan lebih premium\n\nYuk, bikin kemasan yang nggak cuma cantik — tapi juga dipercaya dan dipilih ditengah tengah produk SKincare yang sudah begitu banyak.',
  images: ['/lovable-uploads/d20d5b5b-c929-4861-8e00-9f7892b6d9dd.jpg', '/lovable-uploads/1ccdf13a-8772-4079-a2c4-f83c2c57ff93.jpg', '/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg']
}, {
  id: 4,
  title: 'Strategi Kemasan "Rasa Nusantara" – Rooted in Culture',
  format: '1 Hari – Workshop Motif, Narasi Lokal & Copywriting Identitas',
  description: 'Banyak produk lokal Indonesia memiliki cita rasa dan cerita yang luar biasa, namun belum mampu bersaing karena kemasan mereka tidak menyampaikan nilai tersebut. Workshop ini hadir untuk menjawab kebutuhan UMKM kuliner dan kriya dalam mengangkat identitas lokal menjadi kekuatan visual yang menjual, khususnya untuk pasar domestik premium maupun ekspor.',
  content: [
    'Menggali cerita asal produk: budaya, sejarah, nilai tradisional',
    'Transisi budaya ke visual modern: layout, warna, motif',
    'Narasi identitas produk',
    'Studi kasus kemasan sukses di pasar oleh-oleh, bandara, dan ekspor'
  ],
  benefits: [
    'Strategi Desain kemasan berciri khas Indonesia',
    'Memahami pembuatan narasi dan elemen visual yang meningkatkan nilai jual',
    'Template desain kemasan bertema "Nusantara Modern"',
    'Konsultasi 1-on-1'
  ],
  idealFor: '• UMKM heritage food & craft\n• Pelaku oleh-oleh daerah & destinasi wisata\n• Brand dengan nilai lokal yang ingin masuk curated store atau ekspor\n• Inkubator desa wisata atau koperasi lokal\n• UMKM kelas menengah yang siap ekspansi (produk ekspor, B2B gift, curated shelf)\n• Brand lokal yang ingin positioning "local pride" tapi tampil modern\n• Kriya & craft untuk pasar turis, hotel, dan export gifting\n\nPasar ekspor sedang tumbuh untuk produk lokal yang punya cerita. Pasar lokal urban makin memilih produk dengan nilai autentik. Branding berbasis budaya bisa meningkatkan perceived value & harga jual\n\nCatatan: Bukan semua produk cocok ikut workshop ini. Tapi kalau produkmu punya cerita, kemasannya wajib bisa bicara.',
  images: ['/lovable-uploads/8537dde3-172b-4396-8c9e-0a6bb6439776.jpg', '/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg', '/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg']
}, {
  id: 5,
  title: 'Strategi Digital Biar Produk Dikenal',
  format: '1 Hari – Kelas Strategi Branding secara digital',
  description: 'Kemasan bagus tanpa promosi digital = tak terlihat.\nWorkshop ini dirancang untuk UMKM yang ingin mengubah kemasan menjadi alat pemasaran digital yang efektif, lewat konten, visual, dan aktivasi yang langsung bisa diterapkan.',
  content: [
    'Teknik foto & video produk yang menjual (pakai HP pun bisa!)',
    'Memanfaatkan Ai untuk membantu kegiatan branding (demo)',
    'Cara menambahkan QR/AR Code untuk storytelling & interaksi digital',
    'Menyusun strategi funnel penjualan di marketplace & social commerce (Shopee, Tokopedia, Instagram, dll.)',
    'Studi kasus konten yang engaging & converting'
  ],
  benefits: [
    'Contoh Konten siap posting untuk 1 bulan penuh (foto, caption, CTA)',
    'Strategi aktivasi digital berbasis kemasan',
    'Template konten promosi (launch, diskon, testimonial, dll.)'
  ],
  idealFor: '• UMKM yang ingin naik ke level online & digital selling\n• Brand baru yang ingin tampil profesional secara visual\n• Affiliator\n\nKenapa Ini Penting?\nDi era scroll cepat, visual & kemasan yang interaktif jadi senjata utama. Marketplace & social media bukan soal upload asal, tapi strategi konten yang konsisten. Produk lokal juga perlu panggung digital dan workshop ini bantu Anda punya strategi yang relevan dengan produk dan konsumen Anda.',
  images: ['/lovable-uploads/1ccdf13a-8772-4079-a2c4-f83c2c57ff93.jpg', '/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg', '/lovable-uploads/d20d5b5b-c929-4861-8e00-9f7892b6d9dd.jpg']
}, {
  id: 6,
  title: 'Workshop Khusus: SMK Indonesia untuk UMKM Indonesia',
  format: '3 Hari (Intensif – Full Praktek)',
  description: 'Latar Belakang: UMKM masih sangat kekurangan akses ke desain kemasan yang berkualitas dan terjangkau.\n\nMereka butuh bantuan nyata, bukan sekadar teori branding.\n\nSMK adalah aset tersembunyi, ribuan siswa belajar desain, tapi jarang punya jalur praktik nyata dan koneksi ke dunia usaha.\n\nKeduanya saling butuh:\n→ UMKM butuh bantuan skill & fresh idea\n→ SMK butuh proyek nyata + validasi kemampuan. Belajar Desain Kemasan, Praktek Langsung, Bangun Masa Depan',
  content: [
    'Hari 1 – Fondasi: Memahami Masalah & Peluang',
    'Hari 2 – Praktek: Mendesain & Presentasi',
    'Hari 3 – Pengembangan & Soft Skill',
    'Mendesain kemasan efektif',
    'Menganalisa produk UMKM',
    'Simulasi meeting & brief klien',
    'Presentasi & revisi desain',
    'Membuat portofolio + cara promosikan keahliannya'
  ],
  benefits: [
    '1 desain kemasan UMKM yang siap cetak (draf)',
    '1 portofolio digital pribadi',
    'Simulasi pengalaman proyek & pitching',
    'Sertifikat + akses ke komunitas alumni kreatif SMK untuk UMKM',
    'Membuka akses dapat magang / PKL di desain agency'
  ],
  idealFor: 'Siswa SMK jurusan desain grafis / multimedia / pemasaran kreatif\n\nKolaborator: **UMKM LOKAL, DINAS PENDIDIKAN, DINAS KOPERASI, SEKOLAH, INKUBATOR UMKM**\n\n**Tujuan Utama:**\n• Membekali siswa SMK dengan keterampilan desain kemasan yang aplikatif\n• Memberikan pengalaman nyata bekerja dengan produk UMKM\n• Membuka potensi SMK sebagai mitra profesional UMKM di bidang kemasan\n• Menumbuhkan jiwa wirausaha & kemandirian di bidang desain terapan',
  images: ['/lovable-uploads/d20d5b5b-c929-4861-8e00-9f7892b6d9dd.jpg', '/lovable-uploads/8537dde3-172b-4396-8c9e-0a6bb6439776.jpg', '/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg']
}];
