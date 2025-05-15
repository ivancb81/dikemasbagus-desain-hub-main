
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Download, ExternalLink, BookOpen, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { aggressivelyCompressImage } from '@/utils/imageUtils';

const Ebook = () => {
  const [ebookImage, setEbookImage] = useState<string>("/placeholder.svg");
  const [isUploading, setIsUploading] = useState(false);
  const {
    toast
  } = useToast();
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        toast({
          title: "Gambar terlalu besar",
          description: "Ukuran gambar melebihi 5MB. Mohon pilih gambar yang lebih kecil.",
          variant: "destructive"
        });
        return;
      }
      setIsUploading(true);
      try {
        // Use compression to ensure image fits within size limits
        const compressedImageData = await aggressivelyCompressImage(file, 1024 * 1024); // 1MB target
        setEbookImage(compressedImageData);
        toast({
          title: "Gambar berhasil diunggah",
          description: "Mockup e-book telah diperbarui."
        });
      } catch (error) {
        toast({
          title: "Gagal memproses gambar",
          description: "Terjadi kesalahan saat memproses gambar. Silakan coba lagi.",
          variant: "destructive"
        });
        console.error("Image processing error:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };
  
  return <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">E-Book Eksklusif: Panduan Kemasan Produk untuk UMKM</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bukan sekadar teori, tapi hasil destilasi pengalaman nyata Reymond Lee selama 15+ tahun mendesain kemasan untuk berbagai brand di beragam industri
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="relative flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[3/4] bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <img src={ebookImage} alt="E-book mockup" className="w-full h-full object-cover" />
                {isUploading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
                  </div>}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary" size="sm" className="absolute bottom-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 text-brand-green shadow-md">
                      <ImageIcon className="h-4 w-4 mr-1" /> Ganti Gambar
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Ubah Gambar Mockup</h4>
                      <div className="space-y-2">
                        <Label htmlFor="ebook-image">Pilih gambar mockup baru</Label>
                        <Input id="ebook-image" type="file" accept="image/*" onChange={handleImageChange} disabled={isUploading} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Format: JPG, PNG, GIF. Maks: 5MB
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Card className="border-teal-200 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-6 w-6 text-brand-green" />
                  <CardTitle className="text-2xl font-semibold text-brand-green">Tentang E-book Ini</CardTitle>
                </div>
                <CardDescription className="text-base">
                  E-book komprehensif yang dirancang khusus untuk membantu pelaku UMKM mengembangkan kemasan produk yang efektif dan terjangkau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-black mb-3">Apa yang Ada di Dalamnya?</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Strategi bikin kemasan yang langsung "klik" di kepala konsumen</li>
                      <li>Rangkuman kesalahan umum UMKM + cara menghindarinya</li>
                      <li>Studi kasus sukses dari UMKM yang omzetnya naik berkat kemasan</li>
                      <li>Tips & trik pakai bahan sederhana tapi tampil profesional</li>
                      <li>Checklist siap cetak: dari mau mulai desain sampai siap produksi</li>
                      <li>Membangun Brand Story menjadi kekuatan produk UMKM</li>
                      <li>Membuat produk menjadi Go Local dan beridentitas kuat</li>
                      <li>Meracik elemen desain yang relevan dengan target market</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-black mb-3">Kenapa Kamu Butuh Ini?</h3>
                    <p className="text-gray-700">
                      Karena kemasan bukan cuma bungkus.<br/>
                      Kemasan adalah SALES TOOL pertama produkmu.<br/>
                      Salah kemasan = produkmu dilewatkan.<br/>
                      Kemasan yang tepat = pembeli berhenti, melihat, dan membeli.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start pt-4 bg-brand-lightGray">
                <Button className="bg-brand-green hover:bg-brand-darkGreen w-full sm:w-auto" asChild>
                  <a href="https://lynk.id/dikemasbagus" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Beli Sekarang
                  </a>
                </Button>
                <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-lightGreen w-full sm:w-auto" asChild>
                  
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mb-10 border-teal-200 shadow-md">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-brand-black mb-3">Cocok Untuk</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Pelaku UMKM yang baru memulai bisnis</li>
                    <li>Pemilik usaha yang ingin me-rebranding produknya</li>
                    <li>Manajer produk atau pemasaran UMKM</li>
                    <li>Startup yang ingin memaksimalkan dampak visual produk</li>
                    <li>Siapa saja yang ingin mempelajari dasar-dasar kemasan produk</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-black mb-3">Apa yang Akan Anda Dapatkan</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>50+ halaman panduan yang mudah dipahami</li>
                    <li>Template desain brief kemasan yang siap pakai</li>
                    <li>Checklist evaluasi kemasan produk</li>
                    <li>Daftar supplier material kemasan terpercaya</li>
                    <li>Kerjasama dengan desainer dan percetakan</li>
                    <li>Studi kasus dan contoh sukses kemasan UMKM</li>
                    <li>Akses ke grup diskusi eksklusif tentang kemasan produk</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-brand-black mb-3">Tentang Penulis</h3>
                <p className="text-gray-700">
                  Reymond Lee adalah seorang ahli desain kemasan dengan lebih dari 15 tahun pengalaman
                  mendesain kemasan untuk berbagai brand di beragam industri, dari makanan, minuman, kosmetik, 
                  hingga produk ekspor. Pengalamannya yang luas membuat e-book ini menjadi panduan praktis 
                  yang berisi tips dan strategi nyata, bukan hanya teori belaka.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            
            
            <Button className="bg-brand-green hover:bg-brand-darkGreen" asChild>
              
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};

export default Ebook;
