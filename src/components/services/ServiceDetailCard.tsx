import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Image, Eye } from 'lucide-react';
import { ServiceItem } from '@/data/initialServices';
import { useToast } from '@/hooks/use-toast';
import { aggressivelyCompressImage } from '@/utils/imageUtils';
interface ServiceDetailCardProps {
  service: ServiceItem;
  index: number;
  isEditMode: boolean;
  isLoading: boolean;
  onImageChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isCompact?: boolean;
}
const ServiceDetailCard: React.FC<ServiceDetailCardProps> = ({
  service,
  index,
  isEditMode,
  isLoading,
  onImageChange,
  isCompact = false
}) => {
  const {
    toast
  } = useToast();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Preview handling
  const handlePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Mohon unggah file gambar yang valid (JPG, PNG, GIF).",
          variant: "destructive"
        });
        return;
      }
      try {
        // Generate preview
        const preview = await aggressivelyCompressImage(file, 300 * 1024); // Smaller for preview
        setPreviewImage(preview);
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal membuat pratinjau gambar.",
          variant: "destructive"
        });
      }
    }
  };
  const handleConfirmUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (previewImage) {
      await onImageChange(index, e);
      setPreviewImage(null);
    }
  };
  const cancelPreview = () => {
    setPreviewImage(null);
  };

  // Check if service is E-Book type
  const isEbookService = service.title.toLowerCase().includes('ebook') || service.title.toLowerCase().includes('e-book');

  // Check if service is Design Service
  const isDesignService = service.title.toLowerCase().includes('desain') || service.title.toLowerCase().includes('design');

  // Check if service is Print Hub
  const isPrintHubService = service.title.toLowerCase().includes('print hub');

  // Check if service is Coaching
  const isCoachingService = service.title.toLowerCase().includes('coaching');

  // Check if service is Branding Strategy Consultation
  const isBrandingService = service.title.toLowerCase().includes('strategi branding') || service.title.toLowerCase().includes('branding');

  // Check if service is Free Consultation
  const isFreeConsultation = service.title.toLowerCase().includes('konsultasi gratis');

  // Check if service is Workshop
  const isWorkshopService = service.title.toLowerCase().includes('workshop');

  // Custom benefits for E-Book
  const ebookBenefits = ["Strategi bikin kemasan yang langsung \"klik\" di kepala konsumen", "Rangkuman kesalahan umum UMKM + cara menghindarinya", "Studi kasus sukses dari UMKM yang omzetnya naik berkat kemasan", "Tips & trik pakai bahan sederhana tapi tampil profesional", "Checklist siap cetak: dari mau mulai desain sampai siap produksi", "Membangun Brand Story menjadi kekuatan produk UMKM", "Membuat produk menjadi Go Local dan beridentitas kuat", "Meracik elemen desain yang relevan dengan target market"];

  // Custom benefits for Branding Strategy
  const brandingBenefits = ["Kenali posisi produk Anda di pasar — biar tahu harus bersaing lewat mana", "Tentukan gaya bicara brand Anda — supaya cocok ke target pembeli", "Cari keunikan brand Anda — biar nggak tenggelam di antara kompetitor", "Bangun tampilan visual yang konsisten — biar toko offline & online terlihat profesional dan terpercaya"];

  // Custom benefits for Free Consultation
  const freeConsultationBenefits = ["Analisis awal kebutuhan kemasan", "Kebutuhan & tujuan kemasanmu", "Saran desain & strategi yang paling pas", "Jawaban jujur, tanpa paksaan beli layanan"];

  // Custom benefits for Workshop
  const workshopBenefits = ["Anda akan praktek langsung, bukan cuma lihat demo", "Anda akan menganalisis produk sendiri, bukan studi kasus umum", "Anda bisa tingkatkan kemasan dengan bimbingan langsung", "Semua materi langsung bisa diterapkan ke bisnis Anda", "Integrasi dengan Ai untuk produk UMKM & membantu usaha"];

  // Render compact card for grid view
  if (isCompact) {
    const IconComponent = service.icon;
    return <Card className={`card-shadow transition-all hover:translate-y-[-5px] border-teal-500 border
        ${isLoading ? 'opacity-70' : ''}`}>
        <CardHeader className="pb-4 bg-transparent">
          <div className="w-10 h-10 rounded-full bg-brand-green bg-opacity-10 flex items-center justify-center mb-3">
            <IconComponent className="h-5 w-5 text-brand-green" />
          </div>
          <CardTitle className="text-xl text-brand-green">
            {service.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="bg-transparent">
          <CardDescription className="text-gray-600">
            {service.description}
          </CardDescription>
        </CardContent>
        
        <CardFooter>
          <Button variant="ghost" className="p-0 hover:text-teal-500 text-gray-600 hover:bg-transparent" asChild>
            <a href="/services" className="flex items-center">
              Pelajari lebih lanjut
              <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </CardFooter>
      </Card>;
  }

  // Render full detail card
  return <div className={`mb-12 relative ${isLoading ? 'opacity-70' : ''}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Service Image */}
        <div className="relative">
          {/* Image container */}
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
            {previewImage ? <div className="relative">
                <img src={previewImage} alt={`Preview of ${service.title}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center p-4">
                    <h4 className="text-white font-medium mb-4">Konfirmasi Pratinjau</h4>
                    <div className="flex flex-col gap-2 items-center">
                      <Button onClick={e => handleConfirmUpload(e as any)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2">
                        Simpan Gambar
                      </Button>
                      <Button variant="outline" onClick={cancelPreview} className="border-white text-white hover:bg-white hover:text-gray-800">
                        Batal
                      </Button>
                    </div>
                  </div>
                </div>
              </div> : <img src={service.imageSrc} alt={service.title} className="w-full h-full object-cover" />}
          </div>
          
          {/* Edit button */}
          {isEditMode && !previewImage && <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
              <label className="cursor-pointer">
                <div className="bg-white p-3 rounded-full shadow-lg">
                  <Upload className="h-6 w-6 text-brand-green" />
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handlePreview} />
              </label>
            </div>}
        </div>
        
        {/* Service Content */}
        <div>
          <div className="w-10 h-10 rounded-full bg-brand-green bg-opacity-10 flex items-center justify-center mb-3">
            <service.icon className="h-5 w-5 text-brand-green" />
          </div>
          <h3 className="text-xl md:text-2xl mb-4 font-semibold text-brand-green">{service.title}</h3>
          <p className="text-gray-600 mb-5">
            {isEbookService ? "E-book ini bukan sekadar teori, tapi hasil destilasi pengalaman nyata Reymond Lee, dengan lebih dari 15 tahun mendesain kemasan untuk berbagai brand di beragam industri, dari makanan, minuman, kosmetik, sampai produk ekspor." : isDesignService ? "Layanan desain kemasan profesional yang disesuaikan dengan kebutuhan bisnis Anda. Tim desainer profesional kami akan menciptakan kemasan yang tidak hanya menarik secara visual tetapi juga fungsional dan sesuai dengan identitas merek Anda. Kami menangani seluruh proses desain dari konsep awal hingga file siap cetak." : isPrintHubService ? "Cetak kemasan berkualitas dengan harga kompetitif untuk UMKM, berbagai pilihan material dan finishing. Kami pastikan hasil cetak produksi sesuai dengan desain yang telah dibuat." : isCoachingService ? "Konsultasi langsung dengan pakar desain kemasan melalui appointment. Untuk kebutuhan yang lebih kompleks, kami menyediakan layanan konsultasi one-on-one atau grup dengan para ahli di bidang kemasan dan branding. Anda akan mendapatkan waktu eksklusif untuk mendiskusikan secara detail kebutuhan dan tantangan kemasan produk Anda." : isBrandingService ? "Bingung bikin brand yang beda dan gampang diingat? Lewat sesi kolaboratif bareng tim Dikemas Bagus, Anda akan dibimbing langsung membuat strategi brand yang simpel, tapi ngena, biar produk makin dikenal dan dipercaya." : isWorkshopService ? "Bukan sekadar duduk dan dengar teori, di workshop DiKemasBagus, Anda juga akan langsung praktik proses merancang kemasan yang efektif, menarik, dan sesuai kebutuhan Anda. Kami terbuka untuk kolaborasi." : isFreeConsultation ? "Masih bingung mulai dari mana soal kemasan produk Anda? ngobrol dulu aja bareng tim DikemasBagus, Kami siap bantu kasih arahan awal GRATIS! tanpa komitmen." : "Melalui workshop kolaboratif kami, Anda akan belajar langsung dan demo akan banyak hal tentang merancang kemasan produk yang efektif dan menarik."}
          </p>
          
          {isWorkshopService && <div className="mb-6">
              <p className="text-red-500">Tersedia 5 tema workshop dan 1 workshop khusus yang bisa Anda pilih sesuai jenis usaha.</p>
            </div>}
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-brand-darkGreen mb-3">
              {isFreeConsultation ? "Apa yang akan dibahas:" : isEbookService ? "Apa yang Ada di Dalamnya?" : isWorkshopService ? "Apa yang Membuat Workshop Ini Spesial?" : "Manfaat:"}
            </h4>
            <ul className="space-y-2">
              {isEbookService ? ebookBenefits.map((benefit, idx) => <li key={idx} className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>) : isBrandingService ? brandingBenefits.map((benefit, idx) => <li key={idx} className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>) : isFreeConsultation ? freeConsultationBenefits.map((benefit, idx) => <li key={idx} className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>) : isWorkshopService ? workshopBenefits.map((benefit, idx) => <li key={idx} className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>) : service.benefits.map((benefit, idx) => <li key={idx} className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>)}
            </ul>
          </div>
          
          {isEbookService && <div className="mb-5">
              <h4 className="text-lg font-medium text-brand-darkGreen mb-3">Kenapa Kamu Butuh Ini?</h4>
              <p className="text-gray-600">
                Karena kemasan bukan cuma bungkus.<br />
                Kemasan adalah SALES TOOL pertama produkmu.<br />
                Salah kemasan = produkmu dilewatkan.<br />
                Kemasan yang tepat = pembeli berhenti, melihat, dan membeli.
              </p>
            </div>}
          
          {isWorkshopService && <div className="mb-5">
              <p className="text-gray-600">
                Anda pulang bukan hanya dengan ilmu, tapi juga dengan arah baru buat produk Anda. Ini bukan sekadar belajar, ini investasi pengetahuan yang akan nempel di bisnis Anda selamanya.
              </p>
            </div>}
          
          {isEbookService ? <Button className="bg-brand-green hover:bg-brand-darkGreen text-white" asChild>
              <a href="https://lynk.id/dikemasbagus">
                Dapatkan EBook
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button> : <Button className="bg-brand-green hover:bg-brand-darkGreen text-white" asChild>
              <a href="https://lynk.id/dikemasbagus">
                Hubungi Kami
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>}
        </div>
      </div>
    </div>;
};
export default ServiceDetailCard;