import React from 'react';
import { Button } from '@/components/ui/button';
const ServiceCta = () => {
  return <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="heading-lg mb-6">Siap Meningkatkan Kemasan Produk Anda?</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <Button variant="outline" className="border-brand-green bg-brand-green text-slate-50">
            Hubungi Kami
          </Button>
        </div>
      </div>
    </section>;
};
export default ServiceCta;