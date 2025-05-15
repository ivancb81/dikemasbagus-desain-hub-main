
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  icon
}) => <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-brand-black">{title}</h3>
    </div>
    <p className="text-sm mt-1 text-zinc-950">{description}</p>
  </div>;
const WhyChooseUs = () => {
  return <section id="why-choose-us" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-brand-green bg-opacity-10 text-brand-green font-medium text-sm mb-4">
            Alasan Memilih Kami
          </span>
          <h2 className="heading-lg text-center text-brand-green text-3xl">
            Mengapa Memilih DiKemasBagus?
          </h2>
          <p className="text-gray-500 mt-4 text-base">
            Kami bantu Anda Desain kemasan yang menjual, bukan sekadar cantik. Solusi praktis dan efisien, tanpa buang waktu & biaya. Akses ilmu, tools, dan strategi komunikasi yang jitu. Dari ide mentah sampai cetak, dari strategi sampai aktivasi kami bantu UMKM naik level lewat kemasan yang punya arah.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <FeatureItem title="Tim Desainer Berpengalaman" description="Didukung oleh tim desainer dengan pengalaman luas dalam mendesain kemasan untuk berbagai jenis produk UMKM." icon={<CheckCircle2 className="text-brand-green mr-2 h-6 w-6" />} />
          <FeatureItem title="Solusi Lengkap" description="Dari konsultasi, desain, hingga produksi kemasan dalam satu ekosistem yang terintegrasi." icon={<CheckCircle2 className="text-brand-green mr-2 h-6 w-6" />} />
          <FeatureItem title="Fokus pada Kemasan UMKM" description="Layanan yang didesain khusus untuk memenuhi kebutuhan dan anggaran pelaku UMKM." icon={<CheckCircle2 className="text-brand-green mr-2 h-6 w-6" />} />
          <FeatureItem title="Pendampingan Menyeluruh" description="Konsultasi dan dukungan di setiap tahap untuk memastikan hasil terbaik." icon={<CheckCircle2 className="text-brand-green mr-2 h-6 w-6" />} />
          <FeatureItem title="Jaringan Print Hub" description="Akses ke jaringan percetakan berkualitas dengan berbagai pilihan material dan teknik finishing." icon={<CheckCircle2 className="text-brand-green mr-2 h-6 w-6" />} />
          <FeatureItem title="Komunitas Pendukung" description="Bergabunglah dengan komunitas UMKM untuk berbagi pengalaman dan belajar." icon={<CheckCircle2 className="text-brand-green mr-2 h-6 w-6" />} />
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8">
              <h3 className="text-2xl font-semibold text-brand-green mb-4">Tingkat Kepuasan</h3>
              <div className="flex items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-xl">
                  98%
                </div>
                <p className="ml-4 text-gray-600">dari pelanggan kami</p>
              </div>
              <p className="text-gray-700">
                Kami berdedikasi untuk memberikan layanan terbaik dan memastikan kepuasan setiap pelanggan.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img alt="Produk Kemasan UMKM" className="w-full h-full object-cover" src="/lovable-uploads/9b339522-dc52-4722-957d-5216cae037bc.png" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;
