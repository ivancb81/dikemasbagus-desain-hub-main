import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Form schema validation with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nama harus diisi minimal 2 karakter'
  }),
  whatsapp: z.string().min(10, {
    message: 'Nomor WhatsApp tidak valid'
  }).max(15, {
    message: 'Nomor WhatsApp tidak valid'
  }).regex(/^[0-9+]+$/, {
    message: 'Nomor WhatsApp hanya boleh berisi angka dan +'
  }),
  description: z.string().min(10, {
    message: 'Deskripsi minimal 10 karakter'
  })
});
type FormValues = z.infer<typeof formSchema>;
const NgobrolKemasan = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      whatsapp: '',
      description: ''
    }
  });
  const onSubmit = (data: FormValues) => {
    // Format the message for WhatsApp
    const message = `Halo DikemasBagus! Saya ${data.name} ingin konsultasi kemasan.\n\nIni tentang produk/brand saya:\n${data.description}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Generate WhatsApp URL
    const whatsappNumber = '6287881607080'; // Make sure it starts with country code
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Show success toast
    toast.success("Form berhasil dikirim! Mengalihkan ke WhatsApp...");

    // Set submitted state
    setIsSubmitted(true);

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };
  return <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow mt-16">
        {/* Hero Section - Updated with gradient background */}
        <section className="bg-gradient-to-t from-brand-darkGreen to-brand-green py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ngobrol Kemasan <span className="text-white"></span>
            </h1>
            <p className="text-lg mb-8 text-white/90 max-w-3xl mx-auto">
              Yuk, "Ngobrol Kemasan" GRATIS via WhatsApp! Dapatkan solusi awal dan ide-ide segar dari tim ahli DikemasBagus. Sesi singkat, padat, dan tanpa ribet.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto bg-white shadow-md p-6 md:p-8 rounded">
            {isSubmitted ? <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-brand-green mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-brand-black mb-4">Terima Kasih!</h2>
                <p className="text-gray-600 mb-6">
                  Terima kasih sudah mendaftar untuk "Ngobrol Kemasan"! Kami telah menerima pertanyaan Anda dan akan segera menjadwalkan sesi konsultasi gratis Anda. Mohon tunggu informasi selanjutnya dari tim kami.
                </p>
                <Button className="bg-brand-green hover:bg-brand-darkGreen" onClick={() => setIsSubmitted(false)}>
                  Kirim Pertanyaan Lain
                </Button>
              </div> : <>
                <h2 className="text-2xl font-bold text-center mb-6 text-brand-green">Form Konsultasi Kemasan</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama lengkap Anda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="whatsapp" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Nomor WhatsApp</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: 08123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="description" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Ceritakan pada kami</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Ceritakan secara singkat tentang produk Anda dan masalah kemasan yang dihadapi..." className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <Button type="submit" className="w-full text-white py-3 bg-brand-green">
                      Kirim & Hubungi via WhatsApp
                    </Button>
                  </form>
                </Form>
              </>}
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default NgobrolKemasan;