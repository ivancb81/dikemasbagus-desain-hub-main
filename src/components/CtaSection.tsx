import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
const CtaSection = () => {
  return <section className="section-padding bg-gradient-to-t from-brand-darkGreen to-brand-green">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-lg mb-6 text-zinc-950">Siap Tingkatkan Kemasan Produk UMKM Anda? dan Raih Pertumbuhan Bisnis</h2>
            <p className="text-white opacity-90 mb-8 text-lg">Tingkatkan Level Kemasan UMKM Anda! Ingin produk tampil profesional tanpa kehilangan kearifan lokal, dan bagaimana membuat storytelling kemasan yang bikin brand Anda menonjol? Semua cara-cara praktisnya sudah kami kemas dalam E-Book Bagus yang mudah dipraktikkan.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="text-brand-green px-8 py-6 font-medium text-base bg-brand-black">E-Book</Button>
              
            </div>
          </div>
          <div className="hidden lg:block">
            <img alt="Konsultasi Desain Kemasan" className="rounded-lg shadow-xl w-full h-auto object-cover" src="/lovable-uploads/07bbe329-2ca0-4d76-a5d1-c388eceb7895.png" />
          </div>
        </div>
      </div>
    </section>;
};
export default CtaSection;