
import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-green/10 rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-brand-green mb-4">Siap menaikkan level kemasan Anda?</h2>
            <p className="text-gray-600 mb-8">
              Dapatkan pengetahuan dan keterampilan yang Anda butuhkan untuk menciptakan kemasan yang menarik, 
              fungsional, dan meningkatkan penjualan produk Anda.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-brand-green hover:bg-brand-darkGreen text-white px-8 py-2 rounded-md font-medium text-lg w-full md:w-auto"
              onClick={() => window.open('https://wa.me/6287881607080', '_blank')}
            >
              Daftar Workshop
            </Button>
            <Button 
              variant="outline" 
              className="border-brand-green text-brand-green hover:bg-brand-lightGreen px-8 py-2 rounded-md font-medium text-lg w-full md:w-auto"
              onClick={() => window.open('https://wa.me/6287881607080?text=Saya%20tertarik%20dengan%20kerjasama%20CSR%20dan%20in-house%20training', '_blank')}
            >
              Tanya Kerjasama
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
