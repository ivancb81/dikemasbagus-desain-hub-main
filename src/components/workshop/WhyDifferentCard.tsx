
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface WhyDifferentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const WhyDifferentCard: React.FC<WhyDifferentCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <Card className="border border-gray-200 hover:border-brand-green hover:shadow-md transition-all">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center h-full">
          <div className="bg-brand-lightGreen/30 p-3 rounded-full mb-4">
            <Icon className="h-8 w-8 text-brand-green" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhyDifferentCard;
