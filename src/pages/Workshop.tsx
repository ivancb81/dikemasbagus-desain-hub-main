
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { workshopsData } from '@/data/workshopsData';
import HeroSection from '@/components/workshop/HeroSection';
import WorkshopGrid from '@/components/workshop/WorkshopGrid';
import WhyDifferentSection from '@/components/workshop/WhyDifferentSection';
import CtaSection from '@/components/workshop/CtaSection';

const Workshop = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16">
        <HeroSection />
        <WorkshopGrid workshops={workshopsData} />
        <WhyDifferentSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Workshop;
