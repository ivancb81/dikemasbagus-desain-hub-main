import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
const testimonials = [{
  name: "Yenny",
  business: "Kopi Yuk's",
  image: "SN",
  quote: "Berkat dikemasbagus, kemasan produk kopi saya menjadi lebih profesional dan menarik foto produknya",
  rating: 5
}, {
  name: "Natalia",
  business: "Pastel Tutup",
  image: "BS",
  quote: "Konsultasi yang sangat membantu dan tim desain yang responsif. Hasil akhir kemasan sangat sesuai dengan ekspektasi saya.",
  rating: 5
}, {
  name: "Satria",
  business: "Martabak Sayang",
  image: "DL",
  quote: "Print Hub sangat membantu saya merealisasikan desain dengan kualitas cetak premium. Terima kasih dikemasbagus!",
  rating: 4
}, {
  name: "Erwin",
  business: "Jaceng, Jahe Herbal",
  image: "AF",
  quote: "Tim profesional dengan harga yang terjangkau untuk UMKM. Sangat merekomendasikan untuk semua pelaku usaha kecil.",
  rating: 5
}];
const Testimonials = () => {
  return <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-2xl font-bold text-brand-black">TESTIMONIAL</span>
          <h2 className="heading-lg mt-2 mb-4 text-brand-green">Apa Kata Mereka</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dengarkan langsung pengalaman UMKM yang telah bermitra dengan dikemasbagus
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex mb-4">
                  {Array.from({
                length: 5
              }).map((_, i) => <Star key={i} size={18} className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} />)}
                </div>
                
                {/* Quote */}
                <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
                
                {/* Author */}
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-brand-green text-white">
                      {testimonial.image}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-brand-black">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.business}</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Testimonials;