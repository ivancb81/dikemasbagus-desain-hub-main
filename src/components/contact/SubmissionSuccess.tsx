
import React from 'react';
import { Button } from '@/components/ui/button';

interface SubmissionSuccessProps {
  onReset: () => void;
}

const SubmissionSuccess = ({ onReset }: SubmissionSuccessProps) => {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-brand-green mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-brand-black mb-4">Terima Kasih!</h2>
      <p className="text-gray-600 mb-6">
        Ke warung pojok beli bakso, Sekalian nambah es teh ijo. 
        Pesan Anda mendarat mulus, ga pakai ngaso, 
        Terima kasih balasan kami ngebut, secepat ojek hijau!
      </p>
      <Button 
        className="bg-brand-green hover:bg-brand-darkGreen" 
        onClick={onReset}
      >
        Kirim Pesan Lain
      </Button>
    </div>
  );
};

export default SubmissionSuccess;
