
import React from 'react';
import WorkshopCard from './WorkshopCard';

interface Workshop {
  id: number;
  title: string;
  format: string;
  description?: string;
  content: string[];
  benefits: string[];
  idealFor: string;
  images: string[];
}

interface WorkshopGridProps {
  workshops: Workshop[];
}

const WorkshopGrid: React.FC<WorkshopGridProps> = ({ workshops }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map(workshop => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopGrid;
