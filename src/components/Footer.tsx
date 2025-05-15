
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return <footer className="bg-brand-black text-white" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-brand-green font-bold text-xl">dikemas<span className="text-white">bagus</span></span>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">Mitra UMKM dalam Meningkatkan Daya Saing Produk</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-brand-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://tiktok.com" className="text-gray-400 hover:text-brand-green transition-colors">
                {/* Using Twitter icon as a substitute for TikTok since TikTok icon is not available */}
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-brand-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-brand-green transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-brand-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Layanan Kami</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-green transition-colors">Coaching</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-green transition-colors">Jasa Desain Kemasan</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-brand-green transition-colors">Konsultasi Gratis</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-green transition-colors">Audit Kemasan</Link>
              </li>
              <li>
                <Link to="/workshop" className="text-gray-400 hover:text-brand-green transition-colors">Workshop</Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Tautan</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-brand-green transition-colors">Cerita Kami</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-brand-green transition-colors">Portfolio</Link>
              </li>
              <li>
                <a href="https://lynk.id/dikemasbagus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-green transition-colors">E-Book Bagus</a>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-brand-green transition-colors">Komunitas</Link>
              </li>
              <li>
                <Link to="/print-hub" className="text-gray-400 hover:text-brand-green transition-colors">Print Hub</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-brand-green mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">Jl. Metro Permata Blok J9/46 Tangerang 15158 - Indonesia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-green flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">+62 87881607080</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-green flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">Halo@dikemasbagus.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} dikemasbagus. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
