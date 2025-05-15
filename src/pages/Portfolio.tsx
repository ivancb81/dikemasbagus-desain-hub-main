import React, { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, GalleryHorizontal, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { compressImage } from '@/utils/imageUtils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[]; // Changed from single image to array of images
  category: string;
  clientName?: string;
  challenge?: string;
  solution?: string;
}
const STORAGE_KEY = 'dikemasbagus_portfolio';
const Portfolio = () => {
  const {
    toast
  } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update default portfolio items to include array of images instead of a single image
  const defaultPortfolioItems: PortfolioItem[] = [{
    id: '1',
    title: "Kripik Singkong Organik",
    images: ["/lovable-uploads/8537dde3-172b-4396-8c9e-0a6bb6439776.jpg", "/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg"],
    description: "Redesain kemasan untuk meningkatkan daya tarik produk kripik singkong organik di pasar premium.",
    category: "Makanan Ringan",
    clientName: "UD Singkong Sehat",
    challenge: "Mengubah persepsi konsumen terhadap keripik singkong sebagai camilan sehat dan premium.",
    solution: "Desain kemasan minimalis dengan ilustrasi singkong organik dan informasi nutrisi yang menonjol untuk menekankan aspek kesehatan produk."
  }, {
    id: '2',
    title: "Sambal Mama Jaya",
    images: ["/lovable-uploads/daca559e-6e07-4ceb-ac3f-cbbc2ae4cbc8.jpg", "/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg"],
    description: "Desain kemasan yang menampilkan nilai autentik dan kekayaan rasa sambal homemade.",
    category: "Bumbu & Rempah",
    clientName: "Dapur Mama Jaya",
    challenge: "Bersaing dengan produk sambal botol industri besar di pasar modern.",
    solution: "Kemasan dengan sentuhan visual tradisional yang kuat namun modern, label yang menunjukkan proses pembuatan yang autentik."
  }, {
    id: '3',
    title: "Keripik Buah Tropical",
    images: ["/lovable-uploads/329ed035-d824-41c8-8af9-317ca2c14dd4.jpg", "/lovable-uploads/daca559e-6e07-4ceb-ac3f-cbbc2ae4cbc8.jpg"],
    description: "Konsep kemasan yang menyoroti kesegaran dan kandungan alami dari camilan buah tropis.",
    category: "Makanan Ringan",
    clientName: "Tropical Snacks",
    challenge: "Menekankan bahwa keripik buah merupakan camilan sehat dengan bahan alami.",
    solution: "Desain kemasan transparan yang memperlihatkan produk, dengan ilustrasi buah segar dan warna-warna tropis yang eye-catching."
  }, {
    id: '4',
    title: "Kopi Arabica Gayo",
    images: ["/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg", "/lovable-uploads/8537dde3-172b-4396-8c9e-0a6bb6439776.jpg"],
    description: "Kemasan premium untuk kopi spesialti dari dataran tinggi Gayo, Aceh.",
    category: "Minuman",
    clientName: "Koperasi Petani Kopi Gayo",
    challenge: "Menampilkan nilai premium dan asal usul kopi spesial Indonesia ke pasar global.",
    solution: "Desain dengan elemen visual khas Aceh dan informasi detail tentang profil rasa dan ketinggian kebun kopi."
  }, {
    id: '5',
    title: "Cookies Coklat Premium",
    images: ["/lovable-uploads/d20d5b5b-c929-4861-8e00-9f7892b6d9dd.jpg", "/lovable-uploads/a2fe87bd-79a9-41fb-ab8d-3a811fa53181.jpg"],
    description: "Redesain kemasan cookies coklat untuk segmen pasar menengah ke atas.",
    category: "Bakery",
    clientName: "Sweet Delights Bakery",
    challenge: "Meningkatkan perceived value produk cookies rumahan.",
    solution: "Kemasan elegan dengan sentuhan emas dan coklat gelap yang memberikan kesan mewah dan eksklusif."
  }];
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      return savedItems ? JSON.parse(savedItems) : defaultPortfolioItems;
    } catch (error) {
      console.error('Error loading portfolio from localStorage:', error);
      return defaultPortfolioItems;
    }
  });
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: '',
    description: '',
    images: [],
    category: '',
    clientName: '',
    challenge: '',
    solution: ''
  });
  const [newImages, setNewImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const saveToLocalStorage = (items: PortfolioItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving portfolio to localStorage:', error);
      toast({
        title: "Gagal menyimpan data",
        description: "Terjadi kesalahan saat menyimpan data portfolio.",
        variant: "destructive"
      });
    }
  };
  const handleAddItem = () => {
    if (!newItem.title || !newItem.description || !newImages.length || !newItem.category) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon isi judul, deskripsi, kategori, dan upload minimal satu gambar.",
        variant: "destructive"
      });
      return;
    }
    const newPortfolioItem: PortfolioItem = {
      id: Date.now().toString(),
      title: newItem.title || '',
      description: newItem.description || '',
      images: newImages,
      category: newItem.category || '',
      clientName: newItem.clientName || '',
      challenge: newItem.challenge || '',
      solution: newItem.solution || ''
    };
    const updatedItems = [...portfolioItems, newPortfolioItem];
    setPortfolioItems(updatedItems);
    saveToLocalStorage(updatedItems);
    setNewItem({
      title: '',
      description: '',
      images: [],
      category: '',
      clientName: '',
      challenge: '',
      solution: ''
    });
    setNewImages([]);
    setIsAddDialogOpen(false);
    toast({
      title: "Portfolio berhasil ditambahkan",
      description: `${newPortfolioItem.title} telah ditambahkan ke portfolio.`
    });
  };
  const handleUpdateItem = () => {
    if (!selectedItem) return;
    const updatedItems = portfolioItems.map(item => item.id === selectedItem.id ? selectedItem : item);
    setPortfolioItems(updatedItems);
    saveToLocalStorage(updatedItems);
    setIsDialogOpen(false);
    toast({
      title: "Portfolio berhasil diupdate",
      description: `${selectedItem.title} telah diperbarui.`
    });
  };
  const handleDeleteItem = () => {
    if (!selectedItem) return;
    const updatedItems = portfolioItems.filter(item => item.id !== selectedItem.id);
    setPortfolioItems(updatedItems);
    saveToLocalStorage(updatedItems);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Portfolio berhasil dihapus",
      description: `${selectedItem.title} telah dihapus dari portfolio.`
    });
  };
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, isNew: boolean = false, index: number = -1) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Format tidak didukung",
        description: "Silakan pilih file gambar (JPG, PNG, GIF)",
        variant: "destructive"
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ukuran file terlalu besar",
        description: "Maksimal ukuran file adalah 5MB",
        variant: "destructive"
      });
      return;
    }
    try {
      toast({
        title: "Memproses gambar",
        description: "Mohon tunggu sebentar..."
      });
      const compressedImageUrl = await compressImage(file, 800, 0.8);
      if (isNew) {
        if (index === -1 || newImages.length < index) {
          setNewImages(prev => [...prev, compressedImageUrl]);
        } else {
          setNewImages(prev => {
            const newArr = [...prev];
            newArr[index] = compressedImageUrl;
            return newArr;
          });
        }
      } else if (selectedItem) {
        const updatedImages = [...selectedItem.images];
        if (index >= 0 && index < updatedImages.length) {
          // Update existing image at index
          updatedImages[index] = compressedImageUrl;
        } else {
          // Add new image
          updatedImages.push(compressedImageUrl);
        }
        setSelectedItem({
          ...selectedItem,
          images: updatedImages
        });
      }
      toast({
        title: "Gambar berhasil diupload",
        description: "Gambar telah diperbarui."
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Gagal memproses gambar",
        description: "Terjadi kesalahan saat memproses gambar.",
        variant: "destructive"
      });
    }
    event.target.value = '';
  };

  // Filter by category (for future implementation)
  const categories = Array.from(new Set(portfolioItems.map(item => item.category)));
  const deleteImage = (isNew: boolean, index: number) => {
    if (isNew) {
      setNewImages(prev => prev.filter((_, i) => i !== index));
    } else if (selectedItem) {
      const updatedImages = selectedItem.images.filter((_, i) => i !== index);
      if (updatedImages.length === 0) {
        toast({
          title: "Minimal satu gambar",
          description: "Portfolio harus memiliki minimal satu gambar",
          variant: "destructive"
        });
        return;
      }
      setSelectedItem({
        ...selectedItem,
        images: updatedImages
      });
    }
  };
  return <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-lightGreen/20 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-brand-black mb-4">Portfolio <span className="text-brand-green">dikemas<span className="text-brand-black">bagus</span></span></h1>
              <p className="text-lg text-gray-600 mb-8">
                DiKemasBagus merancang sesuai dengan kebutuhan spesifik tiap produk yang memiliki karakter berbeda. 
                Tim kami mempelajarinya dengan sungguh-sungguh agar hasilnya memiliki nilai jual lebih baik dan berdaya saing, 
                dengan metode yang sederhana namun berdampak untuk brand Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Grid Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="heading-lg text-brand-green">Portofolio Kami</h2>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-brand-green hover:bg-brand-darkGreen">
                Tambah Portfolio
              </Button>
            </div>
            
            {/* Pinterest style masonry layout */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {portfolioItems.map(item => <div key={item.id} className="break-inside-avoid mb-4">
                  <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                    <div className="relative" onClick={() => {
                  setSelectedItem(item);
                  setIsDetailDialogOpen(true);
                }}>
                      {/* Carousel for portfolio item images */}
                      <Carousel className="w-full">
                        <CarouselContent>
                          {item.images.map((image, idx) => <CarouselItem key={`${item.id}-image-${idx}`}>
                              <div className="relative aspect-[4/3]">
                                <img src={image} alt={`${item.title} - slide ${idx + 1}`} className="w-full h-full object-cover" />
                              </div>
                            </CarouselItem>)}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 h-8 w-8" />
                        <CarouselNext className="right-2 h-8 w-8" />
                      </Carousel>
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                        <div className="opacity-0 hover:opacity-100 transition-all">
                          <GalleryHorizontal className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                          <span className="text-xs text-white bg-brand-green rounded-full px-2 py-1">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" onClick={e => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        setIsDialogOpen(true);
                      }}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={e => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        setIsDeleteDialogOpen(true);
                      }}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>
                    </div>
                  </Card>
                </div>)}
            </div>
          </div>
        </section>
      </main>
      
      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Portfolio</DialogTitle>
            <DialogDescription>
              Perbarui informasi portfolio Anda. Klik simpan setelah selesai.
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul</Label>
                <Input id="title" value={selectedItem.title} onChange={e => setSelectedItem({
              ...selectedItem,
              title: e.target.value
            })} />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                <Input id="category" value={selectedItem.category} onChange={e => setSelectedItem({
              ...selectedItem,
              category: e.target.value
            })} />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="clientName">Nama Klien</Label>
                <Input id="clientName" value={selectedItem.clientName || ''} onChange={e => setSelectedItem({
              ...selectedItem,
              clientName: e.target.value
            })} />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" rows={3} value={selectedItem.description} onChange={e => setSelectedItem({
              ...selectedItem,
              description: e.target.value
            })} />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="challenge">Tantangan</Label>
                <Textarea id="challenge" rows={3} value={selectedItem.challenge || ''} onChange={e => setSelectedItem({
              ...selectedItem,
              challenge: e.target.value
            })} />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="solution">Solusi</Label>
                <Textarea id="solution" rows={3} value={selectedItem.solution || ''} onChange={e => setSelectedItem({
              ...selectedItem,
              solution: e.target.value
            })} />
              </div>
              
              <div className="grid gap-2">
                <Label>Gambar Portfolio (Minimal 1, Maksimal 2)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {selectedItem.images.map((image, idx) => <div key={`edit-image-${idx}`} className="relative">
                      <img src={image} alt={`${selectedItem.title} - slide ${idx + 1}`} className="w-full h-32 object-cover rounded-md" />
                      <div className="absolute top-0 right-0 p-1 flex gap-1">
                        <input type="file" id={`edit-image-input-${idx}`} className="hidden" accept="image/*" onChange={e => handleFileUpload(e, false, idx)} />
                        <Button type="button" size="sm" variant="secondary" className="h-8 w-8 rounded-full bg-white" onClick={() => document.getElementById(`edit-image-input-${idx}`)?.click()}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {selectedItem.images.length > 1 && <Button type="button" size="sm" variant="destructive" className="h-8 w-8 rounded-full" onClick={() => deleteImage(false, idx)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>}
                      </div>
                    </div>)}
                  
                  {selectedItem.images.length < 2 && <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 h-32">
                      <input type="file" id="add-image-input" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, false)} />
                      <Button type="button" variant="outline" onClick={() => document.getElementById('add-image-input')?.click()}>
                        Tambah Gambar
                      </Button>
                    </div>}
                </div>
              </div>
            </div>}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleUpdateItem}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tambah Portfolio Baru</DialogTitle>
            <DialogDescription>
              Isi informasi portfolio baru Anda. Klik simpan setelah selesai.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-title">Judul</Label>
              <Input id="new-title" value={newItem.title} onChange={e => setNewItem({
              ...newItem,
              title: e.target.value
            })} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-category">Kategori</Label>
              <Input id="new-category" value={newItem.category} onChange={e => setNewItem({
              ...newItem,
              category: e.target.value
            })} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-clientName">Nama Klien</Label>
              <Input id="new-clientName" value={newItem.clientName || ''} onChange={e => setNewItem({
              ...newItem,
              clientName: e.target.value
            })} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-description">Deskripsi</Label>
              <Textarea id="new-description" rows={3} value={newItem.description || ''} onChange={e => setNewItem({
              ...newItem,
              description: e.target.value
            })} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-challenge">Tantangan</Label>
              <Textarea id="new-challenge" rows={3} value={newItem.challenge || ''} onChange={e => setNewItem({
              ...newItem,
              challenge: e.target.value
            })} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-solution">Solusi</Label>
              <Textarea id="new-solution" rows={3} value={newItem.solution || ''} onChange={e => setNewItem({
              ...newItem,
              solution: e.target.value
            })} />
            </div>
            
            <div className="grid gap-2">
              <Label>Gambar Portfolio (Minimal 1, Maksimal 2)</Label>
              <div className="grid grid-cols-2 gap-4">
                {newImages.map((image, idx) => <div key={`new-image-${idx}`} className="relative">
                    <img src={image} alt={`Preview ${idx + 1}`} className="w-full h-32 object-cover rounded-md" />
                    <div className="absolute top-0 right-0 p-1 flex gap-1">
                      <input type="file" id={`new-image-input-replace-${idx}`} className="hidden" accept="image/*" onChange={e => handleFileUpload(e, true, idx)} />
                      <Button type="button" size="sm" variant="secondary" className="h-8 w-8 rounded-full bg-white" onClick={() => document.getElementById(`new-image-input-replace-${idx}`)?.click()}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="sm" variant="destructive" className="h-8 w-8 rounded-full" onClick={() => deleteImage(true, idx)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>)}
                
                {newImages.length < 2 && <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 h-32">
                    <input type="file" id="new-image-input-add" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, true)} />
                    <Button type="button" variant="outline" onClick={() => document.getElementById('new-image-input-add')?.click()}>
                      {newImages.length === 0 ? 'Upload Gambar' : 'Tambah Gambar'}
                    </Button>
                  </div>}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
            <Button onClick={handleAddItem}>Tambah Portfolio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Portfolio</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus "{selectedItem?.title}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDeleteItem}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedItem && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedItem.images.map((image, idx) => <CarouselItem key={`detail-image-${idx}`}>
                        <div className="aspect-square relative">
                          <img src={image} alt={`${selectedItem.title} - slide ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
                        </div>
                      </CarouselItem>)}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                <span className="inline-block text-xs text-white bg-brand-green rounded-full px-2 py-1 mb-4">
                  {selectedItem.category}
                </span>
                
                {selectedItem.clientName && <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500">Klien:</h3>
                    <p className="text-sm font-medium">{selectedItem.clientName}</p>
                  </div>}
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500">Deskripsi:</h3>
                  <p className="text-sm">{selectedItem.description}</p>
                </div>
                
                {selectedItem.challenge && <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500">Tantangan:</h3>
                    <p className="text-sm">{selectedItem.challenge}</p>
                  </div>}
                
                {selectedItem.solution && <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500">Solusi:</h3>
                    <p className="text-sm">{selectedItem.solution}</p>
                  </div>}
              </div>
            </div>}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>;
};
export default Portfolio;