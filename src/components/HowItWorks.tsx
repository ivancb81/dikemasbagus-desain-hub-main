
import React from 'react';
import { ArrowRight, Search, PenTool, Printer, TrendingUp } from 'lucide-react';

const steps = [{
  icon: Search,
  title: "Konsultasi",
  description: "Bedah produk dan kebutuhan kemasan Anda dengan tim ahli kami.",
  color: "bg-amber-100 text-amber-600"
}, {
  icon: PenTool,
  title: "Rancang",
  description: "Racik konsep & desain kemasan yang sesuai dengan identitas brand Anda.",
  color: "bg-blue-100 text-blue-600"
}, {
  icon: Printer,
  title: "Cetak",
  description: "Realisasikan desain melalui Print Hub kami menjadi kemasan berkualitas tinggi.",
  color: "bg-green-100 text-green-600"
}, {
  icon: TrendingUp,
  title: "Cuan",
  description: "Lihat produk melesat di rak dengan kemasan yang menarik perhatian konsumen.",
  color: "bg-purple-100 text-purple-600"
}];

const HowItWorks = () => {
  return <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-black text-2xl font-bold">CARA KERJA</span>
          <h2 className="heading-lg mt-2 mb-4 text-brand-green">Bagaimana DiKemasBagus Bekerja</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Proses sederhana dari ide Anda sendiri hingga profit dengan pendampingan di setiap tahap mulai dari strategi kemasan produknya, aktivasi brand dan pemasaran digital</p>
        </div>

        <div className="relative">
          {/* Desktop Process Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => <div key={index} className="relative z-10 flex flex-col items-center text-center">
                {/* Step Number */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${step.color}`}>
                  <step.icon size={32} />
                </div>
                
                {/* Step Content */}
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {/* Arrow Connector (except for last item) */}
                {index < steps.length - 1 && <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2">
                    <ArrowRight size={24} className="text-gray-300" />
                  </div>}
                
                {/* Mobile Arrow */}
                {index < steps.length - 1 && <div className="md:hidden mt-4 mb-4">
                    <ArrowRight size={24} className="transform rotate-90 text-gray-300" />
                  </div>}
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};

export default HowItWorks;
