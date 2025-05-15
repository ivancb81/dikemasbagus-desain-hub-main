
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useServicesData } from '@/hooks/use-services-data';
import ServiceEditControls from './services/ServiceEditControls';

const ServicesSection = () => {
  const {
    services,
    isEditMode,
    setIsEditMode,
    isLoading,
    storageUsage,
    handleResetImages,
    needsUpdate,
    handleUpdateTextContent
  } = useServicesData();
  
  // Check if initial loading
  const isInitialLoading = isLoading && services.length === 0;
  
  return (
    <section className="section-padding bg-white" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-black text-2xl font-bold">LAYANAN DIKEMASBAGUS</span>
          <h2 className="heading-lg mt-2 mb-4 font-bold text-brand-green">Mitra Strategis untuk Pertumbuhan Bisnis Anda.</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Kami menyediakan berbagai layanan dan solusi untuk membantu produk UMKM memiliki nilai jual yang baik di mata & hati konsumen, sehingga meningkatkan penjualan & pertumbuhan bisnis melalui kemasan yang menjadi "salesperson" andalan Anda</p>
        </div>

        {/* Edit Mode Controls */}
        <ServiceEditControls 
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          handleResetImages={handleResetImages}
          handleUpdateTextContent={handleUpdateTextContent}
          needsUpdate={needsUpdate}
          storageUsage={storageUsage}
        />

        {/* Loading state */}
        {isInitialLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-brand-green mx-auto" />
              <p className="mt-4 text-gray-600">Memuat data layanan...</p>
            </div>
          </div>
        )}

        {/* Services grid */}
        {!isInitialLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <Card key={index} className={`card-shadow transition-all hover:translate-y-[-5px] border-teal-500 border
                  ${isLoading === index ? 'opacity-70' : ''}`}>
                  <CardHeader className="pb-4 bg-transparent">
                    <div className="w-10 h-10 rounded-full bg-brand-green bg-opacity-10 flex items-center justify-center mb-3">
                      <IconComponent className="h-5 w-5 text-brand-green" />
                    </div>
                    <CardTitle className="text-xl text-brand-green">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="bg-transparent">
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="ghost" className="p-0 hover:text-teal-500 text-gray-600 hover:bg-transparent" asChild>
                      <a href="/services" className="flex items-center">
                        Pelajari lebih lanjut
                        <ArrowRight size={16} className="ml-2" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
