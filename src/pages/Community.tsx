
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, MessageSquare, Link } from 'lucide-react';

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-lightGreen/20 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-brand-black mb-4">Komunitas UMKM <span className="text-brand-green">dikemas<span className="text-brand-black">bagus</span></span></h1>
              <p className="text-lg text-gray-600 mb-8">
                Bergabunglah dengan komunitas kami untuk saling belajar, berbagi, dan bertumbuh bersama dalam perjalanan wirausaha.
              </p>
              <Button 
                className="bg-brand-green hover:bg-brand-darkGreen text-white px-6 py-2 rounded-md font-medium text-lg"
                onClick={() => window.open('https://wa.me/6287881607080', '_blank')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Gabung Sekarang via WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-green mb-4">Manfaat Bergabung dengan Komunitas Kami</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Rasakan berbagai manfaat menjadi bagian dari komunitas UMKM dikemasbagus
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border border-gray-200 hover:border-brand-green hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-brand-lightGreen/30 p-3 rounded-full mb-4">
                      <Users className="h-8 w-8 text-brand-green" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Saling Membantu</h3>
                    <p className="text-gray-600">
                      Dapatkan dukungan dari sesama pelaku UMKM, berbagi solusi untuk tantangan yang dihadapi bersama.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-brand-green hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-brand-lightGreen/30 p-3 rounded-full mb-4">
                      <MessageSquare className="h-8 w-8 text-brand-green" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Saling Belajar</h3>
                    <p className="text-gray-600">
                      Perluas pengetahuan dan keterampilan Anda melalui diskusi, workshop, dan berbagi pengalaman dengan anggota lain.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-brand-green hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-brand-lightGreen/30 p-3 rounded-full mb-4">
                      <Link className="h-8 w-8 text-brand-green" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Informasi Terupdate</h3>
                    <p className="text-gray-600">
                      Selalu dapatkan informasi terkini tentang tren kemasan, pemasaran, dan peluang bisnis baru untuk UMKM Anda.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section className="py-16 bg-brand-lightGreen/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="md:flex md:items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                  <h2 className="text-2xl font-bold text-brand-green mb-4">Bergabunglah dengan Komunitas Kami Sekarang!</h2>
                  <p className="text-gray-600 mb-6">
                    Dengan bergabung di grup WhatsApp komunitas dikemasbagus, Anda akan terhubung dengan jaringan pelaku UMKM lainnya, 
                    mendapatkan tips dan trik meningkatkan kemasan produk, serta informasi eksklusif tentang event dan promo terbaru.
                  </p>
                  <div className="text-lg font-medium">
                    <p className="mb-2">Hubungi kami untuk bergabung:</p>
                    <p className="text-brand-green">WhatsApp: +62 878-8160-7080</p>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <Button 
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-6 rounded-md font-medium text-lg w-full md:w-auto"
                    onClick={() => window.open('https://wa.me/6287881607080', '_blank')}
                  >
                    <MessageSquare className="w-6 h-6 mr-2" />
                    Gabung via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-brand-green mb-8">Pertanyaan yang Sering Diajukan</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">Apakah komunitas ini gratis untuk diikuti?</AccordionTrigger>
                <AccordionContent>
                  Ya, bergabung dengan komunitas WhatsApp dikemasbagus tidak dipungut biaya. Kami menyediakan platform ini untuk membantu UMKM bertumbuh bersama.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Siapa saja yang bisa bergabung dengan komunitas ini?</AccordionTrigger>
                <AccordionContent>
                  Komunitas ini terbuka untuk semua pelaku UMKM yang ingin meningkatkan kualitas kemasan produknya, terutama yang bergerak di bidang makanan, minuman, kosmetik, dan produk rumah tangga.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Apa saja kegiatan yang ada dalam komunitas ini?</AccordionTrigger>
                <AccordionContent>
                  Kegiatan komunitas meliputi berbagi informasi, diskusi tentang kemasan produk, workshop virtual, berbagi promo diskon dari mitra, dan kesempatan networking dengan sesama pelaku UMKM.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Bagaimana cara mendapatkan konsultasi khusus untuk produk saya?</AccordionTrigger>
                <AccordionContent>
                  Anggota komunitas mendapatkan prioritas untuk layanan konsultasi kemasan. Anda dapat mengirimkan pertanyaan spesifik melalui grup atau menghubungi admin untuk sesi konsultasi privat.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
