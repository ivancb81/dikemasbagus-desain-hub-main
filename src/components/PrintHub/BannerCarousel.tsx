
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";

interface BannerSlide {
  imageUrl: string;
  caption: string;
}

interface PrintHubBannerProps {
  slides: BannerSlide[];
}

const PrintHubBanner = ({ slides }: PrintHubBannerProps) => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleSliderChange = (value: number[]) => {
    api?.scrollTo(value[0]);
  };

  return (
    <section className="py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <Carousel 
          setApi={setApi}
          className="relative" 
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg">
                  <img 
                    src={slide.imageUrl} 
                    alt={`Print Hub Banner ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-white text-lg md:text-xl font-medium">{slide.caption}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <CarouselPrevious className="pointer-events-auto" />
            <CarouselNext className="pointer-events-auto" />
          </div>
        </Carousel>
        
        <div className="flex items-center justify-center mt-4 px-8 max-w-md mx-auto">
          <Slider
            value={[current]}
            max={slides.length - 1}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default PrintHubBanner;
