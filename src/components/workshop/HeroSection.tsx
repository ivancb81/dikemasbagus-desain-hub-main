
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-brand-lightGreen/20 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-black mb-4">6 Program <span className="text-brand-green">WORKSHOP</span> dikemasbagus</h1>
          <p className="text-lg text-gray-600 mb-8">
            Terfokus, aplikatif, dan dirancang khusus untuk mendorong kemasan UMKM naik kelas dengan biaya terjangkau, terbuka untuk kolaborasi dengan berbagai Stakeholder.
          </p>
          <Button 
            className="bg-brand-green hover:bg-brand-darkGreen text-white px-6 py-2 rounded-md font-medium text-lg" 
            onClick={() => window.open('https://wa.me/6287881607080', '_blank')}
          >
            Daftar Workshop
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
