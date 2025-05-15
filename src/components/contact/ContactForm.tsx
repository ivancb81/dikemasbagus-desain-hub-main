
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, User, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';
import { formSchema, subjectOptions } from './contactUtils';

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onFormSubmit: (isSubmitted: boolean) => void;
}

const ContactForm = ({ onFormSubmit }: ContactFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    // Format the subject from value to readable label
    const subjectLabel = subjectOptions.find(option => option.value === data.subject)?.label || data.subject;

    // Prepare email data
    const emailSubject = `Kontak Website: ${subjectLabel}`;
    const emailBody = `
      Nama: ${data.name}
      HP/WA: ${data.phone}
      Subject: ${subjectLabel}
      
      Pesan:
      ${data.message}
    `;

    // Open email client with this data
    const mailtoUrl = `mailto:dikemasbagus@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Show success toast
    toast.success("Pesan berhasil dikirim! Terima kasih telah menghubungi kami.");

    // Set submitted state
    onFormSubmit(true);

    // Open email client
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-brand-green">Form Kontak</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField 
            control={form.control} 
            name="name" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Masukkan nama lengkap Anda" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField 
            control={form.control} 
            name="phone" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>HP / WhatsApp</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Contoh: 08123456789" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField 
            control={form.control} 
            name="subject" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject yang ingin ditanyakan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih subject pertanyaan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjectOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField 
            control={form.control} 
            name="message" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pertanyaan Anda</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea 
                      placeholder="Tulis pesan atau pertanyaan Anda di sini..." 
                      className="min-h-[120px] pl-10" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full text-white py-3 bg-brand-green hover:bg-brand-darkGreen">
            <Send className="mr-2 h-4 w-4" /> Kirim
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
