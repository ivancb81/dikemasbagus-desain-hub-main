
import { Calendar, BoxSelect, UsersRound, Book, Package, Users, Archive, Lightbulb, Award, Headphones, Palette, Printer, UserCircle2 } from 'lucide-react';

// Add version number to track changes in default data
export const SERVICES_DATA_VERSION = 4; // Increment this when making changes to default content

export type ServiceIcon = typeof Calendar | typeof BoxSelect | typeof UsersRound | typeof Book | typeof Package | typeof Users | typeof Archive | typeof Lightbulb | typeof Award | typeof Headphones | typeof Palette | typeof Printer | typeof UserCircle2;

export type ServiceItem = {
  title: string;
  description: string;
  longDesc: string;
  icon: ServiceIcon;
  imageSrc: string;
  benefits: string[];
  link?: string;
};

// Initial services data - reordered according to the request
export const initialServices: ServiceItem[] = [
  {
    title: 'Konsultasi Gratis',
    description: 'Dapatkan sesi konsultasi awal tanpa biaya untuk membahas kebutuhan kemasan produk Anda.',
    longDesc: 'Layanan konsultasi gratis kami menyediakan kesempatan untuk mendiskusikan kebutuhan kemasan Anda dengan ahli kami tanpa biaya. Sesi ini akan membantu mengidentifikasi tantangan dan peluang untuk meningkatkan kemasan produk Anda.',
    icon: Headphones,
    imageSrc: '/lovable-uploads/adc34e26-0af0-40c5-a18e-319e5ee276cb.png',
    benefits: ['Analisis awal kebutuhan kemasan', 'Kebutuhan & tujuan kemasanmu', 'Saran desain & strategi yang paling pas', 'Jawaban jujur, tanpa paksaan beli layanan'],
    link: '#konsultasi'
  },
  {
    title: 'Coaching',
    description: 'Konsultasi mendalam dengan pakar desain kemasan untuk meningkatkan nilai produk Anda.',
    longDesc: 'Layanan coaching kami menawarkan pendampingan dan konsultasi dengan pakar desain kemasan. Anda akan mendapatkan waktu eksklusif untuk mendiskusikan secara detail kebutuhan dan tantangan kemasan produk Anda, baik dalam format kelompok maupun one-on-one.',
    icon: UserCircle2,
    imageSrc: '/lovable-uploads/1ccdf13a-8772-4079-a2c4-f83c2c57ff93.jpg',
    benefits: ['Sesi konsultasi dengan ahli desain kemasan', 'Analisis mendalam terhadap kebutuhan bisnis', 'Strategi kemasan jangka panjang', 'Panduan implementasi langkah demi langkah'],
    link: '#coaching'
  },
  {
    title: 'Jasa Desain Kemasan',
    description: 'Layanan desain kemasan profesional yang disesuaikan dengan kebutuhan bisnis Anda.',
    longDesc: 'Tim desainer profesional kami akan menciptakan kemasan yang bukan saja menarik secara visual, fungsional, dan selaras identitas merek Anda, tetapi juga ramah kantong UMKM. Kami menangani seluruh proses, dari konsep awal hingga file siap cetak, dengan paket harga terjangkau yang sudah transparan sejak awal.',
    icon: Palette,
    imageSrc: '/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg',
    benefits: ['Desain kemasan yang unik dan sesuai brand', 'Pilihan berbagai gaya dan pendekatan desain', 'Revisi hingga menemukan desain yang tepat', 'File output siap cetak dengan standar industri'],
    link: '#desain'
  },
  {
    title: 'E-Book Eksklusif',
    description: 'Akses ke panduan digital lengkap tentang dasar-dasar desain kemasan yang efektif.',
    longDesc: 'E-Book kami menyediakan kumpulan panduan lengkap yang dapat diakses kapanpun dan dimanapun. Konten disusun oleh para profesional industri dengan pengalaman luas, memberikan pengetahuan praktis tentang desain kemasan.',
    icon: Book,
    imageSrc: '/lovable-uploads/460d9350-f96a-4c50-b717-31dc07b825c1.png',
    benefits: ['Strategi bikin kemasan yang langsung "klik" di kepala konsumen', 'Rangkuman kesalahan umum UMKM + cara menghindarinya', 'Studi kasus sukses dari UMKM yang omzetnya naik berkat kemasan', 'Tips & trik pakai bahan sederhana tapi tampil profesional', 'Checklist siap cetak: dari mau mulai desain sampai siap produksi', 'Membangun Brand Story menjadi kekuatan produk UMKM', 'Membuat produk menjadi Go Local dan beridentitas kuat', 'Meracik elemen desain yang relevan dengan target market'],
    link: '/ebook'
  },
  {
    title: 'Upskilling Workshop',
    description: 'Program workshop intensif untuk membangun kemampuan tim dalam menciptakan kemasan menarik.',
    longDesc: 'Workshop kami menawarkan program intensif yang dirancang khusus untuk membantu UMKM naik kelas. Dengan pendekatan hands-on dan aplikatif, peserta akan belajar langsung dari praktisi berpengalaman tentang teknik merancang kemasan yang efektif.',
    icon: UsersRound,
    imageSrc: '/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg',
    benefits: ['Anda akan praktek langsung, bukan cuma lihat demo', 'Anda akan menganalisis produk sendiri, bukan studi kasus umum', 'Anda bisa tingkatkan kemasan dengan bimbingan langsung', 'Semua materi langsung bisa diterapkan ke bisnis Anda', 'Integrasi dengan Ai untuk produk UMKM & membantu usaha'],
    link: '/workshop'
  },
  {
    title: 'Print Hub',
    description: 'Cetak kemasan berkualitas tinggi dengan berbagai pilihan material dan finishing.',
    longDesc: 'Print Hub kami menawarkan solusi cetak kemasan berkualitas dengan berbagai pilihan material dan teknik finishing. Kami bekerja sama dengan percetakan terpercaya untuk memastikan hasil akhir yang sempurna sesuai dengan desain yang telah dibuat.',
    icon: Printer,
    imageSrc: '/lovable-uploads/146e81e2-7ca2-4ef2-a01a-552124cf1ac9.png',
    benefits: ['Berbagai pilihan material kemasan berkualitas', 'Opsi finishing premium', 'Quality control ketat di setiap tahap', 'Pengiriman tepat waktu ke seluruh Indonesia'],
    link: '/print-hub'
  },
  {
    title: 'Konsultasi Strategi Branding',
    description: 'Layanan konsultasi strategis untuk membangun brand identity yang kuat dan konsisten.',
    longDesc: 'Tim ahli branding kami akan membantu mengembangkan strategi merek yang efektif untuk bisnis Anda. Mulai dari penetapan nilai-nilai merek hingga pengembangan identitas visual yang konsisten, kami membimbing Anda membangun brand yang diingat konsumen.',
    icon: Lightbulb,
    imageSrc: '/lovable-uploads/43a735b8-f87f-4dee-9f5e-4567c697e051.png',
    benefits: ['Kenali posisi produk Anda di pasar — biar tahu harus bersaing lewat mana', 'Tentukan gaya bicara brand Anda — supaya cocok ke target pembeli', 'Cari keunikan brand Anda — biar nggak tenggelam di antara kompetitor', 'Bangun tampilan visual yang konsisten — biar toko offline & online terlihat profesional dan terpercaya'],
    link: '#branding'
  }
];

// Icon mapping helper for storing/retrieving services
export const iconMapping = {
  Calendar,
  BoxSelect,
  UsersRound,
  Book,
  Package,
  Users,
  Archive,
  Lightbulb,
  Award,
  Headphones,
  Palette,
  Printer,
  UserCircle2
};

export type IconName = keyof typeof iconMapping;

// Function to get icon name from component
export const getIconName = (icon: ServiceIcon): IconName => {
  if (icon === Calendar) return 'Calendar';
  if (icon === BoxSelect) return 'BoxSelect';
  if (icon === UsersRound) return 'UsersRound';
  if (icon === Book) return 'Book';
  if (icon === Package) return 'Package';
  if (icon === Users) return 'Users';
  if (icon === Archive) return 'Archive';
  if (icon === Lightbulb) return 'Lightbulb';
  if (icon === Award) return 'Award';
  if (icon === Headphones) return 'Headphones';
  if (icon === Palette) return 'Palette';
  if (icon === Printer) return 'Printer';
  if (icon === UserCircle2) return 'UserCircle2';
  return 'Calendar'; // Default
};

// Function to get icon component from name
export const getIconComponent = (iconName: IconName): ServiceIcon => {
  return iconMapping[iconName];
};
