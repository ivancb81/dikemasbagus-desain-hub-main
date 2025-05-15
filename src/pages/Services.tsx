
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ServiceDetailCard from '@/components/services/ServiceDetailCard';
import ServiceCta from '@/components/services/ServiceCta';
import ServiceEditControls from '@/components/services/ServiceEditControls';
import { useServicesData } from '@/hooks/use-services-data';
import { Loader2 } from 'lucide-react';

const Services = () => {
  const {
    services,
    isEditMode,
    setIsEditMode,
    isLoading: serviceLoading,
    storageUsage,
    handleImageChange,
    handleResetImages,
    needsUpdate,
    handleUpdateTextContent,
    hasLoadError
  } = useServicesData();
  
  // Loading state for the entire services data
  const isInitialLoading = serviceLoading && services.length === 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow mt-16">
        {/* Edit Mode Controls */}
        <ServiceEditControls 
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          handleResetImages={handleResetImages}
          handleUpdateTextContent={handleUpdateTextContent}
          needsUpdate={needsUpdate}
          storageUsage={storageUsage}
        />

        {/* Services Detail */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand-black text-2xl font-bold">LAYANAN DIKEMASBAGUS</span>
              <h2 className="heading-lg mt-2 mb-4 font-bold text-brand-green">Mitra Strategis untuk Pertumbuhan Bisnis Anda.</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Kami menyediakan berbagai layanan dan solusi untuk membantu produk UMKM memiliki nilai jual yang baik di mata & hati konsumen, sehingga meningkatkan penjualan & pertumbuhan bisnis melalui kemasan yang menjadi "salesperson" andalan Anda</p>
            </div>

            {/* Loading state */}
            {isInitialLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-brand-green mx-auto" />
                  <p className="mt-4 text-gray-600">Memuat data layanan...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {hasLoadError && (
              <div className="text-center py-10">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-xl mx-auto">
                  <h3 className="text-red-800 font-medium text-lg mb-2">Terjadi kesalahan saat memuat data</h3>
                  <p className="text-red-700">Data yang ditampilkan mungkin tidak lengkap atau merupakan data default.</p>
                  <button 
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    onClick={() => window.location.reload()}
                  >
                    Muat ulang halaman
                  </button>
                </div>
              </div>
            )}

            {/* Display services in detailed view */}
            {!isInitialLoading && services.length > 0 && (
              <div className="space-y-16">
                {services.map((service, index) => (
                  <ServiceDetailCard
                    key={index}
                    service={service}
                    index={index}
                    isEditMode={isEditMode}
                    isLoading={serviceLoading === index}
                    onImageChange={handleImageChange}
                    isCompact={false}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <ServiceCta />
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
