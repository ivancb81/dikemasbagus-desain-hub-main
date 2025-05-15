
import { z } from 'zod';

// Form schema validation with Zod
export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nama harus diisi minimal 2 karakter'
  }),
  phone: z.string().min(10, {
    message: 'Nomor HP/WhatsApp tidak valid'
  }).max(15, {
    message: 'Nomor HP/WhatsApp tidak valid'
  }).regex(/^[0-9+]+$/, {
    message: 'Nomor HP/WhatsApp hanya boleh berisi angka dan +'
  }),
  subject: z.string({
    required_error: 'Silakan pilih subjek pertanyaan'
  }),
  message: z.string().min(10, {
    message: 'Pesan minimal 10 karakter'
  })
});

export const subjectOptions = [
  { value: 'coaching', label: 'Coaching' },
  { value: 'ebook', label: 'E-Book' },
  { value: 'design', label: 'Jasa Desain' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'collaboration', label: 'Kolaborasi' },
  { value: 'printHub', label: 'Print Hub' },
  { value: 'directory', label: 'Direktori Supplier' },
  { value: 'brandingConsultation', label: 'Konsultasi Branding' },
  { value: 'other', label: 'Lainnya' }
];
