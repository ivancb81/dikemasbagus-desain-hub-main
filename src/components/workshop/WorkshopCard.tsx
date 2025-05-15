
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface WorkshopCardProps {
  workshop: {
    id: number;
    title: string;
    format: string;
    description?: string;
    content: string[];
    benefits: string[];
    idealFor: string;
    images: string[];
  };
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop }) => {
  // Format text to make specific keywords bold and larger
  const formatIdealFor = (text: string) => {
    return text.replace(
      /Kolaborator:/g, 
      '<span class="font-bold text-base">KOLABORATOR:</span>'
    ).replace(
      /\*\*Tujuan Utama:\*\*/g, 
      '<span class="font-bold text-base">TUJUAN UTAMA:</span>'
    );
  };

  return (
    <Card className="overflow-hidden border border-gray-200 hover:border-brand-green hover:shadow-md transition-all">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {workshop.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden h-48">
                    <img 
                      src={image} 
                      alt={`Workshop ${workshop.id} slide ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-brand-green mb-2">{workshop.title}</h3>
          <p className="text-sm text-gray-600">{workshop.format}</p>
          {workshop.description && (
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{workshop.description}</p>
          )}
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Isi Workshop:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {workshop.content.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-600">{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Apa yang Didapat:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {workshop.benefits.map((benefit, idx) => (
              <li key={idx} className="text-sm text-gray-600">{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Peserta Ideal:</h4>
          <p 
            className="text-sm text-gray-600 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: formatIdealFor(workshop.idealFor) }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopCard;
