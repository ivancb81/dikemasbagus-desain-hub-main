
import React from 'react';
import { Calendar, Users, Check } from 'lucide-react';
import WhyDifferentCard from './WhyDifferentCard';

const WhyDifferentSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Instruktur Praktisi",
      description: "Dipandu pakar desainer kemasan yang aktif menangani proyek UMKM."
    },
    {
      icon: Calendar,
      title: "Harga Bersahabat",
      description: "Dapatkan diskon paket kelompok >10 orang)."
    },
    {
      icon: Check,
      title: "After-Class Support",
      description: "Akses grup mentoring 30 hari + diskon jasa desain 15%."
    }
  ];

  return (
    <section className="py-12 bg-brand-lightGreen/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          Kenapa Workshop Dikemas Bagus <span className="text-brand-green">Berbeda?</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {features.map((feature, index) => (
            <WhyDifferentCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
