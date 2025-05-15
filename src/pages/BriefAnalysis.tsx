import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileUploader } from '@/components/FileUploader';
import { ArrowRight, FileText, Target, User, GitCompare, Info, Eye, EyeOff, ThumbsUp, ThumbsDown, Lightbulb, Palette, Type, BookOpen } from 'lucide-react';

// Define form schema with Zod
const formSchema = z.object({
  productName: z.string().min(2, 'Nama produk diperlukan'),
  productDescription: z.string().min(10, 'Deskripsi produk diperlukan dan minimal 10 karakter'),
  targetAudience: z.string().min(10, 'Target audience description is required'),
  designPurpose: z.string().min(10, 'Tujuan desain diperlukan'),
  productPersonality: z.string().min(5, 'Deskripsi kepribadian produk diperlukan'),
  competitors: z.string().min(10, 'Informasi kompetitor diperlukan'),
  additionalInfo: z.string().optional()
});
type FormData = z.infer<typeof formSchema>;

// Product analysis templates
const analysisTemplates = {
  coffee: {
    discovery: {
      overview: "Produk kopi specialty dengan target pasar kalangan menengah ke atas yang mencari pengalaman kopi autentik dan berkualitas premium. Berdasarkan brief yang diterima, produk ini menawarkan biji kopi pilihan dengan karakteristik rasa yang kompleks dan unik yang hanya bisa didapatkan dari daerah Toraja.",
      detailedAnalysis: "Dalam proses analisa mendalam terhadap brief produk kopi specialty ini, kami menemukan bahwa pasar kopi premium di Indonesia sedang mengalami pertumbuhan yang signifikan dengan tingkat kesadaran konsumen terhadap kualitas dan asal-usul kopi yang terus meningkat. Kopi dengan single origin yang jelas seperti dari Toraja memiliki nilai jual yang lebih tinggi karena keunikan profil rasa yang tidak bisa diduplikasi dari daerah lain. Berdasarkan riset pasar terkini, konsumen kopi specialty rela membayar 30-45% lebih tinggi untuk produk yang menawarkan transparansi dalam rantai pasok dan cerita yang otentik di balik setiap cangkir kopi.",
      recommendation: "Desain kemasan perlu menekankan asal kopi dan proses produksi yang eksklusif untuk membangun kepercayaan konsumen terhadap kualitas dan keautentikan produk. Pendekatan storytelling visual yang kuat akan sangat efektif untuk menyampaikan nilai premium dan keunikan kopi Toraja ini."
    },
    consumerPreferences: {
      likes: ["Kemasan yang menceritakan asal-usul kopi dengan peta geografis atau ilustrasi landscape Toraja", "Desain minimalis dengan sentuhan etnik yang mencerminkan budaya Toraja", "Informasi lengkap mengenai profil rasa, notes, dan karakteristik unik kopi", "Elemen visual yang menggambarkan proses seleksi biji premium", "Kemasan yang bisa menjaga kesegaran kopi lebih lama"],
      dislikes: ["Kemasan yang terlalu generic dan tidak mencerminkan keunikan produk", "Visual yang tidak menonjolkan karakter khas Toraja", "Desain yang terlalu ramai sehingga informasi penting tentang kopi sulit ditemukan", "Kemasan yang tidak menjelaskan diferensiasi produk dibandingkan kompetitor", "Logo atau tipografi yang sulit dibaca atau tidak mencerminkan nilai premium"]
    },
    productStrengths: ["Biji kopi asli Toraja dengan kualitas terjamin dan profil rasa yang kompleks", "Proses produksi yang terjaga dari hulu ke hilir dengan standar quality control yang ketat", "Koneksi langsung dengan petani lokal yang menjamin keberlanjutan dan kualitas konsisten", "Memiliki cerita autentik tentang budaya dan tradisi pengolahan kopi di Toraja", "Tersedia dalam bentuk biji sangrai dan bubuk untuk memenuhi kebutuhan berbeda"],
    productWeaknesses: ["Awareness brand yang masih rendah di pasar kopi specialty yang kompetitif", "Harga yang relatif lebih tinggi bisa menjadi barrier untuk segmen pasar tertentu", "Keterbatasan varian produk dibandingkan kompetitor yang menawarkan lebih banyak pilihan", "Identitas visual brand yang belum kuat dan memorable di benak konsumen", "Belum memiliki sistem packaging yang optimal untuk menjaga kesegaran kopi dalam jangka panjang"],
    designRecommendations: [{
      name: "Geographic Heritage",
      description: "Desain yang menampilkan peta detail daerah Toraja dengan ilustrasi custom yang menunjukkan kontur tanah, ketinggian, dan lokasi perkebunan kopi. Pendekatan ini menekankan hubungan langsung antara karakteristik geografis dengan keunikan rasa kopi.",
      approach: "Geographic Storytelling dengan detail visual yang kaya",
      colorPalette: ["#3E2723", "#795548", "#A1887F", "#D7CCC8", "#EFEBE9"]
    }, {
      name: "Artisan Craft",
      description: "Konsep yang menampilkan serangkaian ilustrasi proses pengolahan kopi dari panen hingga roasting dengan gaya visual artisanal yang sophisticated. Pendekatan ini menekankan keahlian dan dedikasi dalam setiap tahap pembuatan kopi.",
      approach: "Process Visualization dengan sentuhan handcrafted",
      colorPalette: ["#5D4037", "#8D6E63", "#BCAAA4", "#D7CCC8", "#F5F5F5"]
    }, {
      name: "Contemporary Heritage",
      description: "Perpaduan motif tradisional Toraja (seperti ukiran atau motif Toraja) dengan layout modern dan clean. Kemasan menggunakan palet warna earthy yang diinterpretasikan dengan cara kontemporer untuk menciptakan kesan premium namun tetap terhubung dengan akar tradisi.",
      approach: "Cultural Fusion antara elemen tradisional dan modern",
      colorPalette: ["#4E342E", "#6D4C41", "#A1887F", "#CDDC39", "#F0F4C3"]
    }],
    designElements: {
      colorPalette: ["#3E2723", "#795548", "#BCAAA4", "#D7CCC8", "#EFEBE9"],
      typography: {
        heading: "Playfair Display - untuk judul utama yang elegan dan premium dengan kontras stroke yang menarik",
        body: "Lato - untuk teks yang bersih, highly readable dan modern dengan kesan friendly namun sophisticated",
        accent: "Montserrat - untuk informasi penting seperti asal origin, altitude, dan roast level dengan kejelasan yang optimal"
      }
    },
    brandStory: "Sulaco Origin merupakan kopi yang lahir dari ketinggian pegunungan Toraja, di mana tradisi perkebunan kopi telah diwariskan selama generasi. Setiap biji kopi dipilih dengan hati-hati oleh para petani lokal yang memahami karakter tanah dan iklim unik wilayah ini. Keluarga Tandiallo, yang telah mengelola perkebunan kopi selama lima generasi, membawa pengetahuan mendalam tentang waktu panen optimal dan teknik pengolahan yang menghasilkan profil rasa terbaik. Melalui proses panen yang selektif dan pengolahan yang presisi, kami menghadirkan cita rasa autentik Toraja dengan notes kompleks buah berry, dark chocolate, dan sentuhan floral yang hanya dapat ditemukan di ketinggian 1.500 mdpl. Setiap kemasan Sulaco Origin tidak hanya membawa kopi berkualitas premium tetapi juga menghormati warisan budaya dan kearifan lokal yang telah terjaga selama berabad-abad."
  },
  chips: {
    discovery: {
      overview: "Produk keripik singkong premium dengan target pasar keluarga dan anak muda urban yang mengutamakan kualitas, kesehatan, dan pengalaman menikmati camilan yang berbeda.",
      detailedAnalysis: "Analisa mendalam terhadap brief produk keripik singkong ini menunjukkan adanya celah di pasar camilan untuk produk yang menggabungkan kesehatan, kualitas premium, dan cita rasa yang unik. Tren konsumsi snack di Indonesia sendiri meningkat sekitar 15% dalam dua tahun terakhir, dengan preferensi konsumen yang bergeser ke produk dengan bahan-bahan lokal berkualitas dan proses produksi yang lebih sehat. Riset pasar juga menunjukkan 67% konsumen urban mencari camilan dengan nilai tambah seperti rendah lemak dan menggunakan minyak sehat.",
      recommendation: "Desain kemasan perlu menonjolkan kesegaran dan kerenyahan produk dengan warna-warna cerah serta elemen visual yang menunjukkan proses produksi yang higienis. Transparansi kemasan yang memperlihatkan produk akan meningkatkan kepercayaan konsumen terhadap kualitas visual produk."
    },
    consumerPreferences: {
      likes: ["Kemasan dengan jendela transparan yang menunjukkan produk secara langsung", "Visual yang menggugah selera dengan foto atau ilustrasi keripik yang renyah", "Desain yang playful namun tetap premium sesuai dengan target pasar", "Informasi nutrisi yang jelas dan mudah dibaca", "Kemasan resealable yang menjaga kerenyahan lebih lama"],
      dislikes: ["Desain yang terlalu generik seperti kemasan keripik pada umumnya", "Tidak ada diferensiasi visual yang menunjukkan keunggulan dibanding kompetitor", "Kemasan yang sulit dibuka atau tidak praktis untuk konsumsi on-the-go", "Logo atau brand name yang kurang memorable dan sulit diingat", "Tidak adanya informasi tentang keunggulan proses produksi yang lebih sehat"]
    },
    productStrengths: ["Keripik singkong dari varietas singkong pilihan dengan tekstur dan rasa premium", "Proses pengolahan yang mengurangi kadar minyak hingga 40% dibanding keripik konvensional", "Varian rasa unik yang terinspirasi dari kuliner nusantara", "Tanpa pengawet dan MSG, menggunakan bumbu-bumbu alami", "Diproduksi langsung oleh petani singkong lokal yang berpengalaman"],
    productWeaknesses: ["Brand awareness yang masih rendah di pasar yang didominasi brand besar", "Harga jual yang lebih tinggi karena kualitas bahan dan proses produksi", "Masa kadaluarsa yang relatif pendek karena tidak menggunakan pengawet", "Keterbatasan saluran distribusi terutama di kota-kota kecil", "Identitas visual yang belum kuat dan belum memiliki karakter distingtif"],
    designRecommendations: [{
      name: "Farm to Snack",
      description: "Konsep desain yang menampilkan ilustrasi perjalanan singkong dari kebun hingga menjadi keripik dengan visualisasi yang modern dan clean. Pendekatan ini menekankan transparansi proses dan kualitas bahan baku yang digunakan.",
      approach: "Process Transparency dengan visual storytelling",
      colorPalette: ["#8BC34A", "#AED581", "#C5E1A5", "#DCEDC8", "#F1F8E9"]
    }, {
      name: "Flavor Explosion",
      description: "Desain dengan fokus pada varian rasa unik dengan ilustrasi atau fotografi bahan-bahan alami pemberi rasa yang eye-catching. Setiap varian memiliki kode warna yang berbeda namun tetap dalam satu kesatuan desain yang kohesif.",
      approach: "Flavor-Centric Design dengan diferensiasi visual yang jelas",
      colorPalette: ["#FF5722", "#FF8A65", "#FFAB91", "#FFCCBC", "#FBE9E7"]
    }, {
      name: "Healthy Indulgence",
      description: "Konsep yang menggabungkan elemen kesehatan dan kenikmatan dengan design yang clean namun playful. Menggunakan kombinasi warna-warna natural dengan aksen cerah dan tipografi yang modern namun friendly.",
      approach: "Balance of Health and Fun dengan elemen visual yang menyeimbangkan kedua aspek",
      colorPalette: ["#CDDC39", "#DCE775", "#E6EE9C", "#F0F4C3", "#F9FBE7"]
    }],
    designElements: {
      colorPalette: ["#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FFFFFF"],
      typography: {
        heading: "Grandstander - untuk judul yang playful dan eye-catching dengan karakter yang friendly dan approachable",
        body: "Nunito - untuk teks informatif yang ramah, modern dan highly legible bahkan dalam ukuran kecil",
        accent: "Baloo - untuk highlight fitur produk dan call-to-action dengan sentuhan fun yang membuat informasi lebih menarik"
      }
    },
    brandStory: "Bermula dari dapur keluarga di pedesaan Jawa Timur, keripik singkong kami lahir dari resep warisan yang telah disempurnakan selama tiga generasi. Nenek Siti, pendiri brand ini, memulai dengan eksperimen mencari tekstur keripik yang sempurna - renyah di luar namun tetap mempertahankan kelembutan di dalam. Setiap singkong dipilih langsung dari kebun para petani lokal yang telah menjadi mitra kami selama bertahun-tahun dan diolah dalam waktu kurang dari 24 jam setelah panen untuk memastikan kesegaran dan kualitas terbaik. Proses pengolahan modern yang kami kembangkan berhasil mengurangi kadar minyak secara signifikan tanpa mengorbankan kerenyahan dan rasa khas singkong. Komitmen kami pada kualitas, keberlanjutan, dan inovasi rasa terus mendorong kami menciptakan camilan sehat yang tetap lezat dan menjadi pendamping sempurna dalam setiap momen kebersamaan."
  },
  chocolate: {
    discovery: {
      overview: "Produk cokelat artisan premium dengan bahan kakao lokal berkualitas tinggi, menawarkan pengalaman rasa yang sophisticated dan autentik untuk pecinta cokelat sejati.",
      detailedAnalysis: "Analisa komprehensif terhadap brief produk cokelat artisan ini menunjukkan potensi besar di segmen pasar premium yang sedang bertumbuh pesat. Konsumen cokelat premium di Indonesia meningkat 22% dalam 3 tahun terakhir, dengan preferensi yang kuat terhadap produk dengan sertifikasi origin yang jelas dan cerita di balik produk. Riset menunjukkan bahwa 78% konsumen cokelat premium mempertimbangkan faktor etik dan keberlanjutan dalam keputusan pembelian mereka, sementara 65% tertarik pada karakteristik rasa yang unik dan kompleks yang hanya ditemukan pada cokelat single origin.",
      recommendation: "Desain kemasan perlu memvisualisasikan kualitas premium dan keunikan rasa cokelat lokal melalui kombinasi elemen-elemen visual yang sophisticated dan informatif tentang asal kakao. Pendekatan story-telling yang kuat akan membedakan produk ini dari kompetitor massal."
    },
    consumerPreferences: {
      likes: ["Kemasan premium dengan finishing khusus seperti embossing atau foil stamping", "Desain elegan yang menampilkan peta origin kakao atau ilustrasi proses bean-to-bar", "Informasi detail tentang persentase kakao dan flavor notes", "Kemasan yang gift-worthy dan dapat dikoleksi", "Elemen visual yang mengkomunikasikan kompleksitas dan kedalaman rasa cokelat"],
      dislikes: ["Kemasan yang terlalu mirip dengan cokelat massal di pasaran", "Tidak ada diferensiasi yang jelas dengan kompetitor dari segi visual", "Kemasan yang tidak praktis dan tidak melindungi cokelat dengan baik", "Brand story yang tidak authentic atau terkesan dibuat-buat", "Tidak adanya informasi tentang keberlanjutan dan etika produksi"]
    },
    productStrengths: ["Cokelat single origin dengan karakteristik rasa yang unik dan kompleks", "Proses bean-to-bar yang dikontrol ketat untuk menjaga kualitas optimal", "Kolaborasi langsung dengan petani kakao lokal yang menjamin kualitas biji", "Teknik pengolahan khusus yang mempertahankan kompleksitas flavor notes", "Pendekatan sustainable dan ethical dalam seluruh rantai produksi"],
    productWeaknesses: ["Price point yang tinggi dibandingkan cokelat mainstream", "Brand awareness yang masih terbatas di kalangan pecinta cokelat", "Keterbatasan produksi dalam skala besar karena proses artisanal", "Identitas visual yang belum solid dan recognizable", "Belum adanya edukasi pasar yang cukup tentang cokelat premium"],
    designRecommendations: [{
      name: "Origin Story",
      description: "Konsep desain yang menampilkan ilustrasi artistik perkebunan kakao dengan detail geografis dan karakteristik tanah yang mempengaruhi flavor. Pendekatan ini menekankan hubungan antara terroir dan profil rasa yang unik.",
      approach: "Geography and Terroir Visualization yang sophisticated",
      colorPalette: ["#3E2723", "#4E342E", "#5D4037", "#D7CCC8", "#EFEBE9"]
    }, {
      name: "Flavor Symphony",
      description: "Desain yang menginterpretasikan flavor notes cokelat melalui elemen visual abstrak yang elegant. Setiap varian cokelat memiliki visualisasi notes rasa yang berbeda namun dengan gaya visual yang konsisten.",
      approach: "Sensory Experience Translation ke dalam bahasa visual",
      colorPalette: ["#5D4037", "#6D4C41", "#8D6E63", "#A1887F", "#D7CCC8"]
    }, {
      name: "Artisanal Craft",
      description: "Konsep yang menampilkan detail proses bean-to-bar dengan ilustrasi teknik handcrafted yang digunakan. Menggunakan elemen visual yang tactile dan tekstural untuk merefleksikan kualitas premium dan ketelitian proses.",
      approach: "Craft Process Emphasis dengan sentuhan premium dan sophisticated",
      colorPalette: ["#4E342E", "#6D4C41", "#8D6E63", "#D7CCC8", "#FFF3E0"]
    }],
    designElements: {
      colorPalette: ["#3E2723", "#5D4037", "#8D6E63", "#D7CCC8", "#FFF3E0"],
      typography: {
        heading: "Cormorant Garamond - untuk judul yang elegant dan premium dengan stroke contrast yang sophisticated",
        body: "Work Sans - untuk teks yang clean, modern dan highly legible dengan kesan contemporary luxury",
        accent: "Tenor Sans - untuk detail informasi produk dan flavor notes dengan kejelasan dan presisi yang tinggi"
      }
    },
    brandStory: "Diawali dari perjalanan explorer rasa yang tak terhenti, kami menemukan keajaiban kakao nusantara di pedalaman hutan Sulawesi. Di lahan yang dikelilingi pegunungan dengan tanah vulkanik kaya nutrisi, kami bertemu dengan komunitas petani kakao yang telah memelihara kebun mereka selama lima generasi. Biji kakao dari daerah ini memiliki karakteristik yang tak dapat ditiru - perpaduan unik antara fruity notes, kekayaan earthy tones, dan kompleksitas yang hanya bisa didapatkan dari tanah vulkanik dengan ketinggian optimal. Setiap batch cokelat kami diproduksi dengan metode small batch yang menjaga integritas flavor profile dan dikerjakan oleh chocolatier yang telah mendalami seni pengolahan cokelat selama bertahun-tahun. Melalui pendekatan bean-to-bar yang transparan, kami tidak hanya menghasilkan cokelat premium, tetapi juga memastikan keberlanjutan ekonomi bagi komunitas petani dan kelestarian lingkungan perkebunan kakao."
  },
  fashion: {
    discovery: {
      overview: "Produk fashion lokal yang menggabungkan estetika modern dengan kekayaan tekstil tradisional Indonesia, menawarkan pakaian berkualitas tinggi dengan identitas kultural yang kuat.",
      detailedAnalysis: "Analisa mendalam terhadap brief brand fashion ini mengungkapkan potensi besar di pasar modest fashion yang sedang bertumbuh pesat. Tren global menunjukkan peningkatan 15% dalam permintaan fashion yang menggabungkan elemen tradisional dengan siluet kontemporer. Riset pasar mengindikasikan bahwa segmen konsumen urban berusia 25-40 tahun semakin menghargai nilai craftmanship dan keberlanjutan dalam produk fashion yang mereka beli, dengan 72% menyatakan kesediaan membayar lebih untuk produk dengan cerita kultural yang kuat dan proses produksi yang etis.",
      recommendation: "Desain identitas brand perlu memvisualisasikan perpaduan harmonis antara elemen tradisional dan modern melalui logo dan sistem visual yang sophisticated namun tetap accessible. Pendekatan story-telling yang menekankan proses pembuatan tekstil tradisional akan memberikan nilai tambah yang signifikan."
    },
    consumerPreferences: {
      likes: ["Desain yang memadukan motif tradisional dengan siluet kontemporer", "Branding yang sophisticated namun tidak intimidating", "Story-telling tentang asal usul tekstil dan proses pembuatan", "Visual yang menampilkan detail craftmanship yang halus", "Palette warna yang distinctive dan recognizable"],
      dislikes: ["Visual yang terlalu generik dan tidak memiliki karakter khas", "Tidak ada diferensiasi yang jelas dengan brand fast fashion", "Branding yang terlalu 'etnik' sehingga terkesan kuno", "Tidak adanya konsistensi visual di berbagai touchpoint", "Fotografi produk yang tidak menunjukkan kualitas tekstil dengan baik"]
    },
    productStrengths: ["Penggunaan tekstil tradisional Indonesia yang diproses dengan teknik modern", "Kolaborasi dengan pengrajin lokal yang menjaga keberlanjutan teknik tradisional", "Design yang menggabungkan elemen heritage dengan siluet kontemporer", "Proses produksi etis dengan upah adil bagi semua pekerja", "Pendekatan sustainable dalam pemilihan material dan proses produksi"],
    productWeaknesses: ["Brand awareness yang masih terbatas di pasar fashion yang sangat kompetitif", "Price point yang lebih tinggi dibandingkan fast fashion", "Keterbatasan dalam produksi skala besar karena proses artisanal", "Belum memiliki identitas visual yang kuat dan konsisten", "Keterbatasan varian produk dibandingkan brand yang lebih established"],
    designRecommendations: [{
      name: "Cultural Fusion",
      description: "Konsep desain yang mengabstraksikan motif tradisional menjadi elemen grafis kontemporer. Sistem desain yang fluid namun tetap memiliki signature elements yang consistent dan recognizable.",
      approach: "Traditional Pattern Modernization dengan sentuhan minimalis",
      colorPalette: ["#33292A", "#D48166", "#EAD3BF", "#F5E9DB", "#F9F3EE"]
    }, {
      name: "Artisan Stories",
      description: "Branding yang berfokus pada craftmanship dengan visual yang menampilkan tangan-tangan terampil di balik setiap produk. Pendekatan human-centered yang menekankan hubungan antara pengrajin, produk, dan pengguna.",
      approach: "Craftmanship Highlight dengan storytelling yang personal",
      colorPalette: ["#6D4C41", "#8D6E63", "#A1887F", "#BCAAA4", "#D7CCC8"]
    }, {
      name: "Contemporary Heritage",
      description: "Sistem visual yang menggunakan fotografi editorial dengan setting kontemporer namun tetap menampilkan elemen tradisional. Color palette yang distinctive dengan signature color yang menjadi penanda brand.",
      approach: "Modern Context for Traditional Elements dengan kesan premium namun approachable",
      colorPalette: ["#5D4037", "#795548", "#BF9E87", "#D7CCC8", "#EFEBE9"]
    }],
    designElements: {
      colorPalette: ["#33292A", "#D48166", "#EAD3BF", "#C17E61", "#F9F3EE"],
      typography: {
        heading: "Freight Display - untuk heading yang elegant dan timeless dengan sentuhan contemporer",
        body: "Relative - untuk body text yang clean, modern dan sangat readable dengan karakter friendly",
        accent: "Trash - untuk aksen tipografis yang memberikan edge dan unexpected twist pada visual"
      }
    },
    brandStory: "Berawal dari perjalanan ke pedalaman Sumba, pendiri brand kami terpesona oleh keindahan dan kompleksitas teknik tenun ikat yang telah diwariskan selama berabad-abad. Pertemuan dengan Mama Ina, seorang penenun senior di desa tersebut, membuka mata kami tentang bagaimana setiap helai benang menyimpan cerita, filosofi, dan identitas suatu komunitas. Namun, kami juga melihat tantangan dalam melestarikan teknik ini di era modern. Dari sinilah muncul visi untuk menciptakan fashion yang menjembatani dunia tradisi dan kontemporer - membawa kekayaan tekstil nusantara ke panggung global melalui desain yang relevan dengan gaya hidup urban. Setiap koleksi kami lahir dari kolaborasi intensif dengan komunitas penenun lokal, menggabungkan kearifan tradisional mereka dengan perspektif desain kontemporer untuk menciptakan pakaian yang tidak hanya indah dikenakan tetapi juga bermakna dan berkelanjutan."
  },
  cosmetics: {
    discovery: {
      overview: "Produk kosmetik lokal yang mengusung konsep clean beauty dengan formula berbahan dasar alami Indonesia, ditujukan untuk konsumen yang peduli terhadap sustainability dan kesehatan kulit jangka panjang.",
      detailedAnalysis: "Analisa komprehensif terhadap brief brand kosmetik ini menunjukkan potensi besar di pasar clean beauty yang sedang bertumbuh 22% per tahun. Riset konsumen menunjukkan peningkatan signifikan dalam awareness terhadap bahan-bahan berbahaya dalam kosmetik, dengan 81% konsumen millennial dan Gen Z menyatakan ketertarikan pada produk dengan formulasi yang aman dan transparan. Tren penggunaan bahan-bahan lokal dalam kosmetik juga semakin populer, dengan 64% konsumen menyatakan preferensi terhadap produk yang memanfaatkan kekayaan sumber daya alam Indonesia secara berkelanjutan.",
      recommendation: "Desain packaging dan identitas visual perlu mengkomunikasikan transparansi, kemurnian, dan koneksi dengan alam melalui penggunaan warna-warna earthy dan elemen visual yang clean namun tetap distinctive. Pendekatan desain yang menekankan pada formulasi jujur dan bahan-bahan lokal akan menjadi kunci diferensiasi."
    },
    consumerPreferences: {
      likes: ["Packaging yang clean dan minimalis namun tetap memiliki karakter", "Informasi formulasi yang transparan dan mudah dipahami", "Elemen visual yang menampilkan bahan-bahan alami dalam produk", "Desain yang sustainable dan eco-friendly", "Color palette yang menenangkan dan dekat dengan alam"],
      dislikes: ["Visual yang overclaimed dengan janji-janji yang berlebihan", "Desain yang terlalu mirip dengan brand clean beauty global", "Packaging yang tidak praktis dan tidak travel-friendly", "Kurangnya informasi jelas tentang kandungan dan manfaat produk", "Branding yang tidak konsisten antara produk satu dengan lainnya"]
    },
    productStrengths: ["Formula dengan bahan aktif alami dari keanekaragaman hayati Indonesia", "Riset mendalam dan pengujian efektivitas yang terdokumentasi", "Proses produksi yang ethical dan sustainable", "Transparansi penuh tentang semua bahan yang digunakan", "Pendekatan holistik terhadap kecantikan yang menghormati alam dan tubuh"],
    productWeaknesses: ["Brand awareness yang masih rendah di pasar yang didominasi brand global", "Keterbatasan range produk dibandingkan brand yang lebih established", "Tantangan dalam stabilitas formula karena minimnya pengawet sintetis", "Belum memiliki identitas visual yang kuat dan distinctive", "Price point yang lebih tinggi karena kualitas bahan dan riset"],
    designRecommendations: [{
      name: "Botanical Clarity",
      description: "Desain yang menampilkan ilustrasi botanical bergaya modern dengan detail yang scientific namun tetap aesthetically pleasing. Pendekatan ini menekankan koneksi antara sains dan alam dalam formulasi produk.",
      approach: "Scientific Naturalism dengan visualisasi yang precise namun organic",
      colorPalette: ["#81C784", "#A5D6A7", "#C8E6C9", "#E8F5E9", "#F1F8E9"]
    }, {
      name: "Honest Minimalism",
      description: "Sistem desain yang ultra clean dengan fokus pada tipografi yang kuat dan penggunaan negative space yang thoughtful. Color coding yang subtle untuk diferensiasi produk namun tetap dalam satu kesatuan visual yang harmonis.",
      approach: "Reduction to Essence dengan kejelasan informasi sebagai prioritas",
      colorPalette: ["#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#607D8B"]
    }, {
      name: "Indigenous Wisdom",
      description: "Branding yang mengangkat kearifan lokal dalam perawatan kecantikan tradisional Indonesia melalui elemen visual yang contemporary ethnic. Pattern dan tekstur yang terinspirasi dari bahan-bahan lokal yang digunakan dalam produk.",
      approach: "Local Heritage Modernization dengan sentuhan sophisticated",
      colorPalette: ["#827717", "#9E9D24", "#AFB42B", "#C0CA33", "#F9FBE7"]
    }],
    designElements: {
      colorPalette: ["#E8EDDF", "#CFDBD5", "#F5CB5C", "#242423", "#333533"],
      typography: {
        heading: "Orpheus Pro - untuk heading dengan kesan organic modern yang elegant dan distinctive",
        body: "Satoshi - untuk body text yang extremely clean, highly readable dengan kesan contemporer",
        accent: "Recoleta - untuk highlight informasi dengan karakter yang friendly namun tetap sophisticated"
      }
    },
    brandStory: "Perjalanan kami dimulai di sebuah laboratorium kecil di Yogyakarta, tempat tim kami yang terdiri dari ahli botani lokal dan formulator kosmetik berpengalaman mulai mengeksplorasi potensi bahan-bahan alami Indonesia yang belum banyak dimanfaatkan dalam industri kecantikan. Setelah tiga tahun riset intensif yang melibatkan pengujian lebih dari 200 ekstrak tanaman lokal, kami berhasil mengembangkan formula yang tidak hanya efektif tetapi juga aman dan berkelanjutan. Setiap bahan dalam produk kami dipilih dengan standar ketat - harus berkhasiat, terbukti secara ilmiah, dan diambil dengan cara yang menghormati alam dan komunitas lokal. Kami percaya bahwa kecantikan sejati berasal dari hubungan harmonis antara tubuh dan alam, antara tradisi dan sains modern. Melalui setiap produk kami, kami tidak hanya ingin membantu konsumen mendapatkan kulit sehat, tetapi juga mengedukasi tentang kekayaan keanekaragaman hayati Indonesia dan pentingnya melestarikannya untuk generasi mendatang."
  },
  default: {
    discovery: {
      overview: "Produk inovatif dengan kualitas unggul yang dirancang untuk memenuhi kebutuhan spesifik target market yang semakin sadar akan nilai dan kualitas.",
      detailedAnalysis: "Analisa komprehensif terhadap brief produk ini mengungkapkan potensi yang signifikan di segmen pasar yang sedang berkembang. Tren konsumen saat ini menunjukkan pergeseran preferensi ke arah produk yang tidak hanya menawarkan fungsionalitas tetapi juga nilai tambah dalam bentuk pengalaman dan identitas yang kuat. Riset menunjukkan bahwa 73% konsumen target semakin selektif dalam memilih produk dan mencari differensiasi yang jelas baik dari segi kualitas maupun presentasi visual produk.",
      recommendation: "Desain kemasan perlu menonjolkan unique selling proposition produk dengan visual yang menarik dan komunikatif. Penekanan pada nilai kualitas dan aspek diferensiasi produk akan membantu membangun persepsi yang kuat di benak konsumen."
    },
    consumerPreferences: {
      likes: ["Kemasan yang mencerminkan kualitas dan nilai produk secara akurat", "Desain yang memiliki keunikan dan dapat dikenali dengan mudah", "Visual yang mengkomunikasikan manfaat utama dengan jelas", "Kemasan yang fungsional dan meningkatkan pengalaman penggunaan", "Elemen visual yang membangun koneksi emosional dengan konsumen"],
      dislikes: ["Desain yang generik dan tidak memiliki diferensiasi dari kompetitor", "Visual yang tidak selaras dengan positioning dan nilai produk", "Kemasan yang overclaimed dan tidak sesuai dengan kualitas aktual", "Tidak adanya kejelasan informasi tentang produk dan kegunaannya", "Branding yang tidak konsisten dan sulit diingat"]
    },
    productStrengths: ["Kualitas produk yang konsisten dan telah teruji", "Formula atau komposisi yang unik dan sulit diduplikasi", "Proses produksi yang mengutamakan kualitas di setiap tahapan", "Tim pengembangan produk yang berpengalaman dan inovatif", "Pendekatan yang customer-centric dalam pengembangan fitur produk"],
    productWeaknesses: ["Brand awareness yang masih perlu ditingkatkan", "Keterbatasan dalam saluran distribusi dibanding kompetitor", "Positioning yang belum sepenuhnya clear di benak konsumen", "Belum memiliki identitas visual yang kuat dan memorable", "Keterbatasan budget marketing dibanding brand yang lebih established"],
    designRecommendations: [{
      name: "Clarity First",
      description: "Desain yang mengutamakan kejelasan informasi produk dengan hierarchy visual yang terorganisir dan fokus pada manfaat utama. Pendekatan ini memastikan komunikasi yang efektif antara produk dan konsumen.",
      approach: "Information Hierarchy yang efektif dengan visual yang supporting",
      colorPalette: ["#455A64", "#607D8B", "#90A4AE", "#CFD8DC", "#ECEFF1"]
    }, {
      name: "Distinctive Character",
      description: "Sistem desain yang membangun karakter unik dan memorable melalui penggunaan elemen visual yang distinctive. Menciptakan 'visual shorthand' yang dapat dengan cepat dikenali oleh konsumen.",
      approach: "Brand Character Development dengan consistency di semua touchpoints",
      colorPalette: ["#37474F", "#546E7A", "#78909C", "#B0BEC5", "#ECEFF1"]
    }, {
      name: "User-Centered Design",
      description: "Pendekatan desain yang mengutamakan pengalaman pengguna dengan mempertimbangkan setiap interaksi konsumen dengan produk. Fokus pada fungsionalitas kemasan yang meningkatkan convenience dan satisfaction.",
      approach: "Experience Enhancement melalui desain yang thoughtful",
      colorPalette: ["#263238", "#455A64", "#78909C", "#B0BEC5", "#ECEFF1"]
    }],
    designElements: {
      colorPalette: ["#212121", "#616161", "#9E9E9E", "#E0E0E0", "#FFFFFF"],
      typography: {
        heading: "Poppins - untuk heading dengan kesan modern, clean dan highly legible di berbagai ukuran",
        body: "Open Sans - untuk body text dengan readability yang optimal dan karakter yang neutral namun friendly",
        accent: "Overpass - untuk highlight dan call-to-action dengan clarity dan impact yang tinggi"
      }
    },
    brandStory: "Setiap produk kami lahir dari komitmen untuk memberikan solusi terbaik bagi kebutuhan konsumen dengan menggabungkan inovasi, kualitas, dan pemahaman mendalam tentang pain points yang dihadapi target market kami. Perjalanan kami dimulai dari sebuah ide sederhana untuk menciptakan produk yang tidak hanya berfungsi dengan baik, tetapi juga memberikan pengalaman yang memperkaya kehidupan pengguna. Melalui riset ekstensif dan proses pengembangan yang iteratif, kami terus menyempurnakan setiap detail untuk memastikan bahwa produk kami tidak hanya memenuhi ekspektasi tetapi juga memberikan nilai tambah yang tidak ditemukan pada produk sejenis. Kami percaya bahwa produk yang baik adalah produk yang menjadi bagian tak terpisahkan dari kehidupan konsumennya - yang hadir saat dibutuhkan, berfungsi melebihi harapan, dan menciptakan momen-momen positif dalam penggunaannya."
  }
};

// Default analysis template for unknown products
const defaultAnalysisTemplate = analysisTemplates.default;
const BriefAnalysis = () => {
  const [activeTab, setActiveTab] = useState('example');
  const [analysisResult, setAnalysisResult] = useState<null | any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productDescription: '',
      targetAudience: '',
      designPurpose: '',
      productPersonality: '',
      competitors: '',
      additionalInfo: ''
    }
  });

  // Detect product type from text with more sophisticated analysis
  const detectProductType = (text: string): keyof typeof analysisTemplates | 'default' => {
    text = text.toLowerCase();

    // Coffee related keywords
    if (text.includes('kopi') || text.includes('coffee') || text.includes('cafe') || text.includes('caffeine') || text.includes('espresso') || text.includes('arabica') || text.includes('robusta') || text.includes('latte') || text.includes('cappuccino') || text.includes('barista') || text.includes('roastery') || text.includes('brewing')) {
      return 'coffee';
    }

    // Chips/snack related keywords
    if (text.includes('keripik') || text.includes('chips') || text.includes('singkong') || text.includes('snack') || text.includes('cassava') || text.includes('camilan') || text.includes('renyah') || text.includes('kripik') || text.includes('makanan ringan') || text.includes('cemilan') || text.includes('crackers') || text.includes('potato chips')) {
      return 'chips';
    }

    // Chocolate related keywords
    if (text.includes('coklat') || text.includes('chocolate') || text.includes('kakao') || text.includes('cocoa') || text.includes('praline') || text.includes('truffle') || text.includes('cacao') || text.includes('dark chocolate') || text.includes('milk chocolate') || text.includes('white chocolate') || text.includes('chocolatier')) {
      return 'chocolate';
    }

    // Fashion related keywords
    if (text.includes('fashion') || text.includes('pakaian') || text.includes('baju') || text.includes('clothing') || text.includes('garment') || text.includes('textile') || text.includes('apparel') || text.includes('dress') || text.includes('fabric') || text.includes('tekstil') || text.includes('outfit') || text.includes('style') || text.includes('mode') || text.includes('couture')) {
      return 'fashion';
    }

    // Cosmetics related keywords
    if (text.includes('kosmetik') || text.includes('cosmetics') || text.includes('makeup') || text.includes('skincare') || text.includes('kecantikan') || text.includes('beauty') || text.includes('perawatan kulit') || text.includes('cream') || text.includes('lotion') || text.includes('serum') || text.includes('facial') || text.includes('body care')) {
      return 'cosmetics';
    }
    return 'default';
  };

  // Generate more detailed and customized analysis based on form data
  const generateAnalysisFromForm = (data: FormData) => {
    const productType = detectProductType(`${data.productName} ${data.productDescription} ${data.targetAudience} ${data.designPurpose} ${data.productPersonality}`);
    const template = productType !== 'default' ? analysisTemplates[productType] : defaultAnalysisTemplate;

    // Create more personalized analysis
    return {
      productName: data.productName,
      productType: productType.charAt(0).toUpperCase() + productType.slice(1),
      discovery: {
        overview: `${data.productName} - ${template.discovery.overview}`,
        detailedAnalysis: `Analisa mendalam terhadap brief ${data.productName} (${productType}) menunjukkan bahwa ${template.discovery.detailedAnalysis}`,
        recommendation: `Berdasarkan analisa brief produk ${data.productName}, ${template.discovery.recommendation}`
      },
      consumerPreferences: {
        likes: template.consumerPreferences.likes,
        dislikes: template.consumerPreferences.dislikes
      },
      productStrengths: template.productStrengths.map(strength => strength.replace(/(kopi|cokelat|keripik|fashion|kosmetik)/gi, data.productName)),
      productWeaknesses: template.productWeaknesses,
      designRecommendations: template.designRecommendations.map(rec => ({
        ...rec,
        description: rec.description.replace(/(kopi|cokelat|keripik|fashion|kosmetik)/gi, data.productName)
      })),
      designElements: template.designElements,
      brandStory: `${template.brandStory.replace(/(Sulaco Origin|keripik singkong kami|cokelat kami|brand kami)/gi, data.productName)} ${data.additionalInfo ? 'Informasi tambahan dari brief: ' + data.additionalInfo : ''}`
    };
  };
  const onSubmit = (data: FormData) => {
    setIsAnalyzing(true);

    // Generate more personalized analysis based on form data with a delay for perceived thoroughness
    setTimeout(() => {
      setAnalysisResult(generateAnalysisFromForm(data));
      setIsAnalyzing(false);
    }, 2000);
  };
  const handleBriefUpload = (file: File, extractedText?: string) => {
    setIsAnalyzing(true);

    // Use extracted text if available, or generate from filename and type
    const textToAnalyze = extractedText || file.name;
    const productType = detectProductType(textToAnalyze);

    // Generate more customized analysis with simulated text extraction
    setTimeout(() => {
      const template = productType !== 'default' ? analysisTemplates[productType] : defaultAnalysisTemplate;

      // Extract potential product name from file name
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
      const potentialProductName = fileName.split(/[-_\s]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

      // Create custom analysis based on file content and detected product type
      const result = {
        productName: potentialProductName,
        productType: productType.charAt(0).toUpperCase() + productType.slice(1),
        discovery: {
          overview: `${potentialProductName} - ${template.discovery.overview}`,
          detailedAnalysis: `Analisa mendalam terhadap brief ${potentialProductName} (${productType}) menunjukkan bahwa ${template.discovery.detailedAnalysis}`,
          recommendation: `Berdasarkan analisa brief yang diunggah (${file.name}) untuk produk ${potentialProductName}, ${template.discovery.recommendation}`
        },
        consumerPreferences: template.consumerPreferences,
        productStrengths: template.productStrengths.map(strength => strength.replace(/(kopi|cokelat|keripik|fashion|kosmetik)/gi, potentialProductName)),
        productWeaknesses: template.productWeaknesses,
        designRecommendations: template.designRecommendations,
        designElements: template.designElements,
        brandStory: template.brandStory.replace(/(Sulaco Origin|keripik singkong kami|cokelat kami|brand kami)/gi, potentialProductName)
      };
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2500); // Slightly longer delay for "processing" uploaded file
  };
  return <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow mt-16">
        <section className="section-padding bg-opacity-5 pt-16 bg-cyan-600">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="heading-xl mb-6 text-zinc-800">Analisa Brief</h1>
              <p className="max-w-2xl mx-auto text-lg text-zinc-800">
                Buat brief yang terstruktur dan dapatkan rekomendasi desain kemasan yang tepat
              </p>
            </div>
          </div>
        </section>
        
        {analysisResult ? <section className="section-padding bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-brand-green mr-3" />
                <h2 className="heading-md">Hasil Analisa Brief: {analysisResult.productName}</h2>
              </div>
              
              <div className="space-y-8 mb-12">
                {/* 1. Discovery - Now with more detailed analysis */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <FileText className="h-5 w-5 text-brand-green mr-2" />
                    <h3 className="font-semibold text-xl">1. Discovery - {analysisResult.productType}</h3>
                  </div>
                  <p className="text-gray-700 mb-3"><strong>Ringkasan Produk:</strong> {analysisResult.discovery.overview}</p>
                  <p className="text-gray-700 mb-4"><strong>Analisa Mendalam:</strong> {analysisResult.discovery.detailedAnalysis}</p>
                  <Alert className="bg-brand-green bg-opacity-5 border-brand-green">
                    <AlertDescription>
                      <strong>Rekomendasi:</strong> {analysisResult.discovery.recommendation}
                    </AlertDescription>
                  </Alert>
                </div>
                
                {/* 2. Consumer Preferences - More tailored to product type */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Eye className="h-5 w-5 text-brand-green mr-2" />
                    <h3 className="font-semibold text-xl">2. Preferensi Konsumen untuk {analysisResult.productName}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <ThumbsUp className="h-4 w-4 text-green-600 mr-2" />
                        <h4 className="font-medium text-lg">Yang Disukai</h4>
                      </div>
                      <ul className="list-disc pl-6 space-y-2">
                        {analysisResult.consumerPreferences.likes.map((item: string, idx: number) => <li key={idx} className="text-gray-700">{item}</li>)}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <ThumbsDown className="h-4 w-4 text-red-600 mr-2" />
                        <h4 className="font-medium text-lg">Yang Tidak Disukai</h4>
                      </div>
                      <ul className="list-disc pl-6 space-y-2">
                        {analysisResult.consumerPreferences.dislikes.map((item: string, idx: number) => <li key={idx} className="text-gray-700">{item}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* 3. Product Strengths and Weaknesses - More specific to product type */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <GitCompare className="h-5 w-5 text-brand-green mr-2" />
                    <h3 className="font-semibold text-xl">3. Kekuatan dan Kelemahan {analysisResult.productName}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <ThumbsUp className="h-4 w-4 text-green-600 mr-2" />
                        <h4 className="font-medium text-lg">Kekuatan</h4>
                      </div>
                      <ul className="list-disc pl-6 space-y-2">
                        {analysisResult.productStrengths.map((item: string, idx: number) => <li key={idx} className="text-gray-700">{item}</li>)}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <ThumbsDown className="h-4 w-4 text-red-600 mr-2" />
                        <h4 className="font-medium text-lg">Kelemahan</h4>
                      </div>
                      <ul className="list-disc pl-6 space-y-2">
                        {analysisResult.productWeaknesses.map((item: string, idx: number) => <li key={idx} className="text-gray-700">{item}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* 4. Design Recommendations - With more detailed approaches and individual color palettes */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Lightbulb className="h-5 w-5 text-brand-green mr-2" />
                    <h3 className="font-semibold text-xl">4. Rekomendasi Desain untuk {analysisResult.productName} (3 Routes)</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {analysisResult.designRecommendations.map((proposal: any, index: number) => <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                        <h4 className="font-medium text-lg mb-1">Route {index + 1}: {proposal.name}</h4>
                        <p className="text-sm text-brand-green mb-2">Pendekatan: {proposal.approach}</p>
                        <p className="text-gray-600 mb-4">{proposal.description}</p>
                        
                        {/* Individual color palette for each design route */}
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Palet Warna:</p>
                          <div className="flex flex-wrap gap-1">
                            {proposal.colorPalette?.map((color: string, colorIdx: number) => <div key={colorIdx} className="w-8 h-8 rounded-md border border-gray-200" style={{
                        backgroundColor: color
                      }} title={color}></div>)}
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
                
                {/* 5. Design Elements - More tailored color and typography recommendations */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Palette className="h-5 w-5 text-brand-green mr-2" />
                    <h3 className="font-semibold text-xl">5. Elemen Desain {analysisResult.productName}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Palette className="h-4 w-4 text-blue-600 mr-2" />
                        <h4 className="font-medium text-lg">Palet Warna Umum</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {analysisResult.designElements.colorPalette.map((color: string, idx: number) => <div key={idx} className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-md border border-gray-200 shadow-sm" style={{
                        backgroundColor: color
                      }}></div>
                            <span className="text-xs mt-1">{color}</span>
                          </div>)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <Type className="h-4 w-4 text-blue-600 mr-2" />
                        <h4 className="font-medium text-lg">Tipografi</h4>
                      </div>
                      <ul className="space-y-3 mt-2">
                        <li className="p-2 bg-white rounded border border-gray-200">
                          <p className="font-semibold text-lg">
                            {analysisResult.designElements.typography.heading.split(' - ')[0]}
                          </p>
                          <p className="text-xs text-gray-500">
                            {analysisResult.designElements.typography.heading.split(' - ')[1]}
                          </p>
                        </li>
                        <li className="p-2 bg-white rounded border border-gray-200">
                          <p className="font-medium">
                            {analysisResult.designElements.typography.body.split(' - ')[0]}
                          </p>
                          <p className="text-xs text-gray-500">
                            {analysisResult.designElements.typography.body.split(' - ')[1]}
                          </p>
                        </li>
                        <li className="p-2 bg-white rounded border border-gray-200">
                          <p className="font-medium tracking-wide">
                            {analysisResult.designElements.typography.accent.split(' - ')[0]}
                          </p>
                          <p className="text-xs text-gray-500">
                            {analysisResult.designElements.typography.accent.split(' - ')[1]}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* 6. Brand Story - More personalized based on product type and name */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <BookOpen className="h-5 w-5 text-brand-green mr-2" />
                    <h3 className="font-semibold text-xl">6. Brand Story {analysisResult.productName}</h3>
                  </div>
                  <div className="bg-white p-4 border border-gray-200 rounded-md">
                    <p className="text-gray-700 italic">{analysisResult.brandStory}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" onClick={() => {
              setAnalysisResult(null);
              setActiveTab('example');
            }}>
                  Mulai Analisa Baru
                </Button>
              </div>
            </div>
          </section> : <section className="section-padding bg-white">
            <div className="max-w-4xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="example">Contoh Brief</TabsTrigger>
                  <TabsTrigger value="create">Buat Brief</TabsTrigger>
                </TabsList>
                
                <TabsContent value="example">
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 className="font-semibold text-2xl mb-6">Contoh brief yang baik - KOPI SPECIALITY ASLI TORAJA</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-700">
                          <strong>Nama Produk:</strong> Sulaco Origin (Bisa ditambahkan nama spesifik jika ada, misal: Arabika)
                        </p>
                        <p className="text-gray-700 mt-2">
                          <strong>Apa yang Anda Jual?</strong> Kopi speciality asli dari Toraja. Biji kopi pilihan dengan kualitas tinggi, rasa yang unik (misalnya: ada rasa buah, cokelat, atau floral), dan aroma yang khas. Kami jual dalam 2 bentuk, yaitu biji sangrai dan bubuk.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-700">
                          <strong>Target Audience (Siapa Pembeli Anda?):</strong> Orang yang suka kopi enak dan berkualitas tinggi. Biasanya berusia 25-50 tahun, tinggal di kota, punya uang lebih untuk beli kopi yang bagus, dan tertarik dengan cerita atau asal-usul kopi. Mungkin juga suka mencoba rasa kopi yang beda dari kopi biasa.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-700">
                          <strong>Tujuan dan Pesan Utama (Kenapa Desain Ini Penting? Apa yang Mau Disampaikan?):</strong>
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-700">
                          <li>
                            <strong>Tujuan:</strong> Supaya kemasan kopi kami terlihat menarik, beda dari kopi lain, dan membuat orang penasaran ingin mencoba kopi Toraja kami. Juga biar orang tahu kalau kopi kami ini kopi pilihan dan berkualitas.
                          </li>
                          <li>
                            <strong>Pesan Utama:</strong> "Ini lho kopi asli Toraja yang rasanya istimewa dan berkualitas tinggi!" Kami juga ingin kemasan ini terasa hangat dan menunjukkan asal-usul kopi dari Toraja.
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-gray-700">
                          <strong>Kepribadian Produk (Seperti Apa "Sifat" Kopi Anda?):</strong> Asli, berkualitas tinggi, punya cita rasa yang unik dan istimewa, hangat seperti budaya Toraja.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-700">
                          <strong>Kompetitor Referensi (Contoh Merek Kopi Lain yang Anda Suka Kemasannya - Jika Ada):</strong> [Sebutkan 1-2 merek kopi lain yang kemasannya Anda anggap bagus atau menarik. Jelaskan sedikit kenapa Anda suka kemasan mereka. Contoh: "Saya suka kemasan dari Kopi X karena terlihat sederhana, tetap ada akar budayanya tapi modern." atau "Saya suka kemasan Kopi Y karena warnanya cerah, lain dari yang lain, dan menarik perhatian."]
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-700">
                          <strong>Informasi Lain yang Bisa Anda Ceritakan:</strong> Kopi kami ini berasal dari daerah pegunungan di Toraja yang terkenal dengan kopi berkualitas. Kami sangat menjaga kualitas biji kopi dari panen sampai pengolahan. Mungkin ada cerita menarik tentang kebun kopi kami atau cara kami mengolah kopi yang bisa dimasukkan dalam desain (kalau memungkinkan).
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <Button onClick={() => setActiveTab('create')}>
                        Buat Brief Saya
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="create">
                  <div className="mb-8">
                    <h2 className="font-semibold text-2xl mb-6">Isi Informasi Brief Anda</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-6">
                          <h3 className="font-semibold text-xl">Tentang Produk</h3>
                          
                          <FormField control={form.control} name="productName" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Nama Produk</FormLabel>
                                <FormControl>
                                  <Input placeholder="Masukkan nama produk Anda" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />
                          
                          <FormField control={form.control} name="productDescription" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Apa yang Anda Jual</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Jelaskan secara singkat tentang produk Anda" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />
                        </div>
                        
                        <FormField control={form.control} name="targetAudience" render={({
                      field
                    }) => <FormItem>
                              <FormLabel>Target Audience</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Deskripsikan target audience Anda (demografis, psychografis, kebutuhan)" className="min-h-[100px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={form.control} name="designPurpose" render={({
                      field
                    }) => <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Tujuan dan Pesan Utama
                              </FormLabel>
                              <FormControl>
                                <Textarea placeholder="Apa tujuan utama Anda mendesain ulang atau membuat desain kemasan baru ini, dan pesan atau kesan utama apa yang ingin Anda sampaikan untuk terhubung dengan target audiens Anda? (Contoh: 'Rasakan Keaslian Kopi Toraja yang Kaya', 'Setiap Tegukan adalah Warisan', 'Kualitas Premium dari Tanah Sulawesi')" className="min-h-[120px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={form.control} name="productPersonality" render={({
                      field
                    }) => <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Kepribadian Produk
                              </FormLabel>
                              <FormControl>
                                <Textarea placeholder="Jika produk ini adalah 'orang', seperti apakah kepribadiannya?" className="min-h-[100px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={form.control} name="competitors" render={({
                      field
                    }) => <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <GitCompare className="h-4 w-4" />
                                Kompetitor Referensi
                              </FormLabel>
                              <FormControl>
                                <Textarea placeholder="Sebutkan 1 merek yang kemasannya Anda sukai, dan 1 yang tidak disukai, beserta alasannya." className="min-h-[100px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={form.control} name="additionalInfo" render={({
                      field
                    }) => <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Info className="h-4 w-4" />
                                Informasi Lain yang bisa Anda ceritakan
                              </FormLabel>
                              <FormControl>
                                <Textarea placeholder="Berikan informasi tambahan yang menurut Anda penting untuk kami ketahui tentang proyek ini" className="min-h-[120px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <div className="pt-4">
                          <Button type="submit" disabled={isAnalyzing} className="w-full">
                            {isAnalyzing ? 'Menganalisa Brief...' : 'Analisa Brief'}
                          </Button>
                        </div>
                      </form>
                    </Form>
                    
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h3 className="font-medium text-lg mb-4">Sudah memiliki brief?</h3>
                      <FileUploader onFileUpload={handleBriefUpload} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>}
      </main>
      <Footer />
    </div>;
};
export default BriefAnalysis;