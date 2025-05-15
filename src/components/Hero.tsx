import React, { useState } from 'react';
import EditableTextSection from './EditableText/EditableTextSection';
import { TextSegment } from './EditableText/TextSegment';
import HeroCarousel from './HeroCarousel';
import HeroButtons from './HeroButtons';
const Hero = () => {
  // Single combined text section as requested
  const [heroTextSegments, setHeroTextSegments] = useState<TextSegment[]>([{
    text: "DikemasBagus membantu Anda upskilling strategi kemasan yang menjual, mendesain dan mendapatkan akses ke desainer profesional harga kompetitif. Bikin bagus kemasan, perluas pasar dan bisnis bertumbuh.\n\nKonsultasi Gratis! Audit Gratis! E-Book mulai dari 25rb, E-Learning Kemasan Canva Gratis! . . . Yuk jelajahi DikemasBagus!",
    bold: false,
    fontSize: 16
  }]);
  return <section className="relative bg-gradient-to-br from-white to-gray-100 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 lg:px-[32px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-2 rounded-full bg-brand-green bg-opacity-10 text-brand-green font-medium text-sm mb-4">
              #KemasanBagusBisnisNaik
            </span>
            <h1 className="heading-xl mb-6 text-left">
              <span className="text-brand-black text-6xl py-0 text-left">Ekosistem Desain Kemasan UMKM </span> 
              <span className="text-brand-green block mt-2 text-left text-2xl">Belajar bikin produk jadi magnet pembeli. Gratis Konsultasi, Gratis Audit, E-Book, Cetak dan Jasa Desain Kemasan Profesional. Jelajahi Yuk DiKemasBagus!</span>
            </h1>
            
            {/* Single editable text section */}
            <EditableTextSection initialSegments={heroTextSegments} onSegmentsUpdate={segments => setHeroTextSegments(segments)} />
            
            <HeroButtons />
            
            <div className="mt-8 text-sm text-gray-500 flex flex-wrap justify-center lg:justify-start gap-8">
              <div className="flex items-center"></div>
            </div>
          </div>
          <HeroCarousel />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#4CAF50" fillOpacity="0.05" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,218.7C672,224,768,224,864,218.7C960,213,1056,203,1152,208C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>;
};
export default Hero;