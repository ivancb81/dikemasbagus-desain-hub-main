import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
const HeroButtons: React.FC = () => {
  const [showSolutionDialog, setShowSolutionDialog] = React.useState(false);
  return <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Button className="btn-primary h-12 px-8" asChild>
          <Link to="/ngobrol-kemasan">Konsultasi Gratis</Link>
        </Button>
        <Button variant="outline" onClick={() => setShowSolutionDialog(true)} className="h-12 px-8 border-brand-green hover:bg-opacity-90 transition-colors bg-brand-black text-white">
          Solusi Kemasan
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Dialog open={showSolutionDialog} onOpenChange={setShowSolutionDialog}>
        <DialogContent className="sm:max-w-2xl p-0 bg-transparent border-none">
          <div className="relative w-full">
            <img src="/lovable-uploads/67c432d6-fb3d-4205-b62e-8785fefd998f.png" alt="Solusi Kemasan Bisnis" className="w-full h-auto rounded-lg shadow-xl" />
            <DialogClose className="absolute top-2 right-2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-1 text-brand-green border border-brand-green">
              <X className="h-6 w-6" />
              <span className="sr-only">Tutup</span>
            </DialogClose>

            <Button variant="default" className="absolute bottom-4 right-4 bg-brand-green hover:bg-brand-darkGreen" asChild>
              <DialogClose>Tutup</DialogClose>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default HeroButtons;