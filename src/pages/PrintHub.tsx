import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PrintHubBanner from '@/components/PrintHub/BannerCarousel';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { CheckCircle, Printer, Package, Box, Send } from 'lucide-react';

// Form schema validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nama harus diisi minimal 2 karakter'
  }),
  phone: z.string().min(10, {
    message: 'Nomor HP tidak valid'
  }).regex(/^[0-9+]+$/, {
    message: 'Nomor HP hanya boleh berisi angka'
  }),
  packageType: z.string({
    required_error: 'Silakan pilih jenis kemasan'
  }),
  design: z.any().optional(),
  questions: z.string().optional()
});

// Banner slides data
const bannerSlides = [
  {
    imageUrl: "/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg",
    caption: "Label Sticker Premium untuk Kemasan Produk Anda"
  },
  {
    imageUrl: "/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg",
    caption: "Pouch Modern dengan Printing Full Color"
  },
  {
    imageUrl: "/lovable-uploads/8537dde3-172b-4396-8c9e-0a6bb6439776.jpg",
    caption: "Karton & Sleeve dengan Desain Eksklusif"
  },
  {
    imageUrl: "/lovable-uploads/d20d5b5b-c929-4861-8e00-9f7892b6d9dd.jpg",
    caption: "Sample Pack untuk Tes Pasar Produk Baru"
  },
  {
    imageUrl: "/lovable-uploads/daca559e-6e07-4ceb-ac3f-cbbc2ae4cbc8.jpg",
    caption: "Solusi Kemasan Premium untuk UMKM"
  }
];

type FormValues = z.infer<typeof formSchema>;
const pricingData = [{
  name: 'Label Sticker Instan',
  suitable: 'Produk botol, toples, dus kraft',
  specs: ['Vinyl Gloss / Matte', 'Tahan air & minyak', 'Die-cut bebas bentuk'],
  time: '3-5 hari kerja',
  icon: <Printer className="h-8 w-8 text-brand-green" />
}, {
  name: 'Pouch Print-On-Demand',
  suitable: 'Kopi, snack, rempah, dll',
  specs: ['Pouch kertas / metalized / PET', 'Printing digital full-color', 'Tersedia zip-lock & valve'],
  time: '7-10 hari',
  icon: <Package className="h-8 w-8 text-brand-green" />
}, {
  name: 'Karton & Sleeve',
  suitable: 'Skincare, makanan/ kue kering, gadget, fashion, dll',
  specs: ['Duplex 350 gsm / Ivory Box', 'Foil / emboss opsional'],
  time: '10-12 hari',
  icon: <Box className="h-8 w-8 text-brand-green" />
}, {
  name: 'Sample Pack',
  suitable: 'Tes pasar varian baru',
  specs: ['20 pcs label + 20 pcs custom karton'],
  time: '5 hari',
  icon: <Package className="h-8 w-8 text-brand-green" />
}];
const packageOptions = pricingData.map(item => ({
  value: item.name.toLowerCase().replace(/\s+/g, '-'),
  label: item.name
}));
const PrintHub = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      packageType: '',
      questions: ''
    }
  });
  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);

    // In a production environment, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    toast.success("Formulir berhasil dikirim!");
    setIsSubmitted(true);

    // Scroll to the response message
    setTimeout(() => {
      const responseElement = document.getElementById('response-message');
      if (responseElement) {
        responseElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 500);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // In a real implementation, you'd upload this file to your server
      // or send it via email to dikemasbagus@gmail.com
    }
  };
  return <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow mt-16">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-brand-darkGreen to-brand-green py-16 md:py-20 px-4 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Wujudkan Kemasan Impian Anda!
            </h1>
            <h2 className="text-xl md:text-2xl mb-6">Cetak Mudah, Tanpa Ribet dan Repot, Hasil Memukau.</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto">
              <p className="text-lg">Label | Pouch | Karton | MOQ mulai 50pcs | Terjangkau, Warna Tajam, Kualitas Bagus, Langsung Sampai! Silahkan Anda Boleh Berkonsultasi Dahulu.</p>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-green mb-4">
                Informasi Print Hub
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">Kami bantu UMKM naik kelas dengan kemasan profesional. Anda fokus produksi & jualan, kami urus semua detail cetak: proof-color, QC, sampai pengiriman. Bergabunglah dengan ratusan UMKM yang telah meningkatkan penjualan dengan kemasan terjangkau dari DiKemasBagus!</p>
            </div>
          </div>
        </section>

        {/* Banner Carousel - New Section */}
        <PrintHubBanner slides={bannerSlides} />

        {/* Pricing Table */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-green mb-4">
                Paket Layanan Print Hub
              </h2>
            </div>

            <div className="overflow-x-auto">
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="bg-brand-green text-white">
                    <TableHead className="p-4 bg-gray-300">Paket</TableHead>
                    <TableHead className="p-4 bg-gray-300">Cocok Untuk</TableHead>
                    <TableHead className="p-4 bg-gray-300">Spesifikasi</TableHead>
                    <TableHead className="p-4 bg-gray-300">Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingData.map((item, index) => <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <TableCell className="p-4 border">
                        <div className="flex items-center space-x-3">
                          {item.icon}
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 border">{item.suitable}</TableCell>
                      <TableCell className="p-4 border">
                        <ul className="list-disc pl-5">
                          {item.specs.map((spec, idx) => <li key={idx}>{spec}</li>)}
                        </ul>
                      </TableCell>
                      <TableCell className="p-4 border font-medium">{item.time}</TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
              <p className="text-center mt-4 text-gray-600 italic">
                (Semua paket inklusif QC, wrap, & kirim)
              </p>
            </div>
          </div>
        </section>

        {/* CTA Form */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? <div id="response-message" className="bg-white p-8 rounded-lg shadow-md text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-brand-green mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-brand-black mb-4">Terima kasih!</h2>
                <p className="text-gray-700 mb-6">
                  Kami telah menerima permintaan Anda. Tim Dikemasbagus akan segera menganalisa kebutuhan Anda, 
                  memberikan rekomendasi terbaik, dan menghubungi Anda dalam waktu 1x24 jam.
                </p>
                <Button className="bg-brand-green hover:bg-brand-darkGreen" onClick={() => setIsSubmitted(false)}>
                  Kirim Permintaan Lain
                </Button>
              </div> : <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green mb-4">
                    Siap memulai?
                  </h2>
                  <p className="text-lg text-gray-700">
                    Isi form di bawah untuk mendapatkan penawaran terbaik dan rekomendasi dari tim ahli kami.
                  </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField control={form.control} name="name" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                              <Input placeholder="Masukkan nama lengkap" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={form.control} name="phone" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>No HP</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: 08123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={form.control} name="packageType" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Kemasan yang ingin digunakan</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenis kemasan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {packageOptions.map(option => <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormItem>
                        <FormLabel>Desain</FormLabel>
                        <div className="flex items-center space-x-4">
                          <label className="cursor-pointer bg-brand-lightGray hover:bg-gray-200 text-gray-600 px-4 py-2 rounded transition-colors">
                            <span>Upload File</span>
                            <input type="file" onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.pdf,.ai,.psd" />
                          </label>
                          {fileName && <span className="text-sm text-gray-600">{fileName}</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          File akan dikirim otomatis ke dikemasbagus@gmail.com
                        </p>
                      </FormItem>
                      
                      <FormField control={form.control} name="questions" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Pertanyaan Anda</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tulis pertanyaan atau detail tambahan di sini..." className="min-h-[100px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <Button type="submit" className="w-full bg-brand-green hover:bg-brand-darkGreen text-white py-3">
                        <Send className="mr-2 h-4 w-4" /> KIRIM
                      </Button>
                    </form>
                  </Form>
                </div>
              </>}
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default PrintHub;
