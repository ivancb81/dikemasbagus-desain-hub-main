
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const HeroCarousel: React.FC = () => {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <div className="p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded">
              <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-xl">
                <img alt="Kemasan Produk UMKM" className="w-full h-full object-cover" src="/lovable-uploads/6cacc9c4-f737-4973-8201-8104ceb766ec.png" />
              </AspectRatio>
              <div className="p-4">
                <p className="text-gray-600 text-sm font-normal">Dari ide pingin bikin kerupuk didapur hingga jadi produk khas Palembang - Bu Regina - </p>
                <h3 className="text-brand-black font-medium text-sm">Ini kemasan awal</h3>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded">
              <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-xl">
                <img alt="Desain Kemasan Modern" className="w-full h-full object-cover" src="/lovable-uploads/adc34e26-0af0-40c5-a18e-319e5ee276cb.png" />
              </AspectRatio>
              <div className="p-4">
                <p className="text-gray-600 text-sm font-normal">Didesain ulang oleh kurator DikemasBagus dalam kegiatan Kemenparekraft</p>
                <h3 className="text-brand-black text-sm font-medium">Kemasan yang lebih menarik perhatian</h3>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded">
              <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-xl">
                <img alt="UMKM Sukses" className="w-full h-full object-cover" src="/lovable-uploads/021ae7f0-c0d2-43d2-a7c9-b8569739017c.png" />
              </AspectRatio>
              <div className="p-4">
                <p className="text-gray-600 text-sm font-normal">Merica Batak Andaliman, - Pak Marandus Surait - Didesain oleh kurator DikemasBagus</p>
                <h3 className="text-brand-black text-sm font-medium">Go Lokal! dengan kemasan premium</h3>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-2 lg:-left-12" />
        <CarouselNext className="right-2 lg:-right-12" />
      </Carousel>
      <div className="absolute -bottom-6 -right-6 bg-brand-green text-white p-4 rounded-xl shadow-lg hidden md:block">
        <p className="font-bold text-3xl">500+</p>
        <p className="text-sm">UMKM Terbantu</p>
      </div>
    </div>
  );
};

export default HeroCarousel;
