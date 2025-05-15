import React, { useState, useRef, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TeamMember from '@/components/TeamMember';
import { compressImage, estimateDataUrlSize } from '@/utils/imageUtils';
import { Link } from 'react-router-dom';

// Team member data structure
interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageSrc?: string;
  initials: string;
}

// Storage keys
const STORAGE_KEY = 'dikemasbagus_team_members';
const MAX_LOCALSTORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit for most browsers

const About = () => {
  const {
    toast
  } = useToast();
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({});

  // Default team members data
  const defaultTeamMembers: TeamMember[] = [{
    id: '1',
    name: 'Andi Gunawan',
    position: 'Senior Desainer',
    initials: 'AG',
    imageSrc: '/lovable-uploads/f6490270-ccfe-4967-9e98-8fc3447fdb3d.png'
  }, {
    id: '2',
    name: 'Maya Lestari',
    position: 'Desainer',
    initials: 'ML'
  }, {
    id: '3',
    name: 'Denny Pratama',
    position: 'Kepala Print Hub',
    initials: 'DP'
  }, {
    id: '4',
    name: 'Sinta Rahma',
    position: 'Konsultan UMKM',
    initials: 'SR'
  }];

  // Initialize state with data from localStorage or default data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const savedTeamMembers = localStorage.getItem(STORAGE_KEY);
      return savedTeamMembers ? JSON.parse(savedTeamMembers) : defaultTeamMembers;
    } catch (error) {
      console.error('Error loading team members from localStorage:', error);
      return defaultTeamMembers;
    }
  });

  // Update localStorage when team members change with safety check
  useEffect(() => {
    try {
      // Estimate team members JSON size before saving
      const teamMembersJSON = JSON.stringify(teamMembers);
      const dataSize = new Blob([teamMembersJSON]).size;
      if (dataSize > MAX_LOCALSTORAGE_SIZE) {
        throw new Error('Data size exceeds localStorage limit');
      }
      localStorage.setItem(STORAGE_KEY, teamMembersJSON);
    } catch (error) {
      console.error('Error saving team members to localStorage:', error);
      toast({
        title: "Gagal menyimpan data",
        description: "Data tim terlalu besar untuk disimpan secara lokal.",
        variant: "destructive"
      });
    }
  }, [teamMembers, toast]);

  // Function to handle photo editing
  const handleEditPhoto = (memberId: string) => {
    // Trigger the file input click
    if (fileInputRefs.current[memberId]) {
      fileInputRefs.current[memberId].click();
    }
  };

  // Function to handle file selection with compression
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, memberId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Format tidak didukung",
        description: "Silakan pilih file gambar (JPG, PNG, GIF)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB for original)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ukuran file terlalu besar",
        description: "Maksimal ukuran file adalah 5MB",
        variant: "destructive"
      });
      return;
    }
    try {
      // Show loading state
      toast({
        title: "Memproses gambar",
        description: "Mohon tunggu sebentar..."
      });

      // Compress the image to reduce storage size
      const compressedImageUrl = await compressImage(file, 300, 0.6);

      // Estimate size of the compressed image
      const estimatedSize = estimateDataUrlSize(compressedImageUrl);
      if (estimatedSize > 1024 * 1024) {
        // If still larger than 1MB
        const furtherCompressedUrl = await compressImage(file, 200, 0.4);

        // Update team member with compressed image
        updateTeamMemberPhoto(memberId, furtherCompressedUrl);
      } else {
        // Update team member with compressed image
        updateTeamMemberPhoto(memberId, compressedImageUrl);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Gagal memproses gambar",
        description: "Terjadi kesalahan saat memproses gambar.",
        variant: "destructive"
      });
    }

    // Reset file input
    event.target.value = '';
  };

  // Helper function to update team member photo
  const updateTeamMemberPhoto = (memberId: string, imageUrl: string) => {
    try {
      const memberName = teamMembers.find(m => m.id === memberId)?.name || '';

      // Update team member with new image
      const updatedTeamMembers = teamMembers.map(member => member.id === memberId ? {
        ...member,
        imageSrc: imageUrl
      } : member);

      // Update state with new team members
      setTeamMembers(updatedTeamMembers);

      // Show success toast
      toast({
        title: "Foto berhasil diubah",
        description: `Foto untuk ${memberName} telah diperbarui.`
      });
    } catch (error) {
      console.error('Error updating team member photo:', error);
      toast({
        title: "Gagal menyimpan foto",
        description: "Terjadi kesalahan saat menyimpan foto.",
        variant: "destructive"
      });
    }
  };

  // Sample portfolio items
  const portfolioItems = [{
    title: "Kripik Singkong Organik",
    image: "/lovable-uploads/8537dde3-172b-4396-8c9e-0a6bb6439776.jpg",
    description: "Redesain kemasan untuk meningkatkan daya tarik produk kripik singkong organik di pasar premium."
  }, {
    title: "Sambal Mama Jaya",
    image: "/lovable-uploads/daca559e-6e07-4ceb-ac3f-cbbc2ae4cbc8.jpg",
    description: "Desain kemasan yang menampilkan nilai autentik dan kekayaan rasa sambal homemade."
  }, {
    title: "Keripik Buah Tropical",
    image: "/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg",
    description: "Konsep kemasan yang menyoroti kesegaran dan kandungan alami dari camilan buah tropis."
  }];
  return <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-t from-brand-darkGreen to-brand-green pt-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="heading-xl mb-6 text-slate-50 text-center">“Dilema Harga, Kemasan, dan Produksi”</h1>
              <p className="max-w-2xl mx-auto text-slate-50 text-base text-left">Semuanya bermula dari cerita seorang ibu, pelaku UMKM keripik singkong. Penjualannya lumayan, produknya disukai lingkungan sekitar, tapi setiap harga bahan naik, beliau bingung, naikan harga nanti pembeli berkurang (kabur), tapi kalau tidak dinaikkan, untung tipis banget. Di sisi lain, kemasan masih seadanya — stiker tempel di plastik polos, kadang luntur kalau kena minyak.
Bikin malu juga kalau mau masukin ke toko atau ikut bazar. Pengen produksi lebih banyak biar efisien, tapi modal mepet.
Kemasan bagus butuh biaya.
Desain? Nggak tahu mulai dari mana. Akhirnya stuck. Mau naik level, tapi nggak tahu harus mulai dari mana. (beliau seeorang ibu single parent menghidupi keluarganya)</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                
                <h2 className="heading-lg mt-2 mb-6 text-brand-green">Membuka Potensi Usaha UMKM yang Berkelanjutan</h2>
                <p className="text-gray-600 mb-4">Dari cerita tersebut kami banyak terinspirasi oleh produk rumahan berpotensi besar yang seringkali tersembunyi di balik kemasan seadanya. Pengalaman nyata inilah yang mengerakan kami, melihat produk lokal berkualitas tinggi tapi luput dari perhatian pasar karena "wajah" yang kurang memikat.</p>
                <p className="text-gray-600 mb-8">Misi kami sederhana yaitu menghadirkan akses mudah dan terjangkau ke desain kemasan profesional bagi seluruh UMKM Indonesia. Dengan tim yang terdiri dari desainer berpengalaman dan profesional industri, kami berkomitmen untuk mengajarkan dan menyediakan solusi kemasan menarik, fungsional, relevan, dan memiliki nilai jual yang baik agar usahanya bisa lebih berkembang.</p>
                
              </div>
              <div>
                <img alt="Tim dikemasbagus" className="rounded-lg shadow-xl w-full h-auto object-cover" src="/lovable-uploads/1ccdf13a-8772-4079-a2c4-f83c2c57ff93.jpg" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        
        
        {/* Founder Section */}
        <section className="section-padding bg-zinc-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="heading-lg mt-2 mb-4 text-3xl text-left text-brand-green">Meet Reymond Lee – Founder DikemasBagus</h2>
            </div>
            
            {/* Modified layout with image on left for desktop */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Image - Full width on mobile, left side (1/3) on desktop */}
              <div className="w-full md:w-1/3 order-1">
                <img alt="Reymond Lee - Founder DikemasBagus" className="rounded-lg shadow-xl mx-auto w-full max-w-sm h-auto object-cover" src="/lovable-uploads/460d9350-f96a-4c50-b717-31dc07b825c1.png" />
              </div>
              
              {/* Text content - Full width on mobile, right side (2/3) on desktop */}
              <div className="w-full md:w-2/3 order-2">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Pakar packaging design dengan <span className="text-base font-normal text-brand-black">15+ tahun pengalaman</span> mentransformasi brand melalui kemasan. Juga sebagai Founder Lee Design Associates (Agency desain di balik kemasan Ajinomoto, Campina, Kalbe Farma, Ultrajaya, Wong Coco, Greenfields, Yupi, Le Bakers & puluhan brand ternama lainnya) sampai saat ini ia dan team masih melayani industri dan UMKM.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">Teacher at heart, Reymond Lee juga pernah menjadi Dosen Visual Communication Design selama 10+ thn di Universitas Pelita Harapan. Pembicara aktif di beberapa event dan kolaborasi workshop untuk UMKM, antara lain dengan Dinas Perindustrian, Asosiasi UMKM, CSR, SMK, Universitas, AlfaMart, dsbnya untuk memberikan bimbingan dan pelatihan dalam kemasan.</p>
                  
                  <Separator className="my-6" />
                  
                  <p className="text-xl font-bold text-brand-green">DikemasBagus membawa strategi kemasan berdampak ke dunia UMKM.</p>
                  
                  <div className="space-y-3 my-6">
                    <p className="text-gray-700">Kini, melalui DikemasBagus, semua ilmu dan pengalaman teruji ini disederhanakan untuk UMKM</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-brand-green font-bold mr-2">✅</span>
                        <span>Formula desain yang terbukti meningkatkan perceived value.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-green font-bold mr-2">✅</span>
                        <span>Storytelling kemasan yang connect dengan konsumen lokal.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <blockquote className="border-l-4 border-brand-green pl-4 italic py-2 text-gray-700">
                    "Kemasan adalah interaksi pertama konsumen dengan brand Anda. Buat mereka jatuh cinta sejak pandangan pertama!"
                    <footer className="text-brand-green font-medium mt-2 not-italic">— Reymond Lee</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team - Updated with separate TeamMember component */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mt-2 mb-4 text-brand-green">Team DiKemasBagus</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tim berpengalaman yang siap membantu UMKM Anda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Map through team members using new TeamMember component */}
              {teamMembers.map(member => <React.Fragment key={member.id}>
                  <TeamMember id={member.id} name={member.name} position={member.position} imageSrc={member.imageSrc} initials={member.initials} onEditPhoto={handleEditPhoto} />
                  
                  {/* Hidden file input for each team member */}
                  <input type="file" accept="image/*" className="hidden" ref={el => {
                if (el) fileInputRefs.current[member.id] = el;
              }} onChange={e => handleFileChange(e, member.id)} />
                </React.Fragment>)}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase Section */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mt-2 mb-4 text-brand-green">Portfolio Showcase</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Beberapa contoh karya DikemasBagus yang telah membantu UMKM meningkatkan nilai jual produk mereka
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {portfolioItems.map((item, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>)}
            </div>
            
            <div className="text-center">
              <Button asChild className="bg-brand-green hover:bg-brand-darkGreen">
                <Link to="/portfolio">Lihat Semua Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;