import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
interface TeamMemberProps {
  id: string;
  name: string;
  position: string;
  imageSrc?: string;
  initials: string;
  onEditPhoto: (id: string) => void;
}
const TeamMember = ({
  id,
  name,
  position,
  imageSrc,
  initials,
  onEditPhoto
}: TeamMemberProps) => {
  return <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="mb-4 relative">
          <Avatar className="h-48 w-48 border-2 border-transparent">
            <AvatarImage src={imageSrc} alt={name} className="object-cover" />
            <AvatarFallback className="text-4xl bg-gray-200 text-gray-500 font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          {/* Edit button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full absolute bottom-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100" onClick={() => onEditPhoto(id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Edit foto</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <h3 className="font-bold mt-2 text-base">{name}</h3>
        <p className="text-brand-green text-sm">{position}</p>
      </CardContent>
    </Card>;
};
export default TeamMember;