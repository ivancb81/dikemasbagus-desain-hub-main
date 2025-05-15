
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const scrollToFooter = () => {
    const footerElement = document.getElementById('contact-section');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Cerita Kami', href: '/about' },
    { name: 'Layanan', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Audit Kemasan', href: '/brief-analysis' },
    { name: 'Workshop', href: '/workshop' },
    { name: 'Ebook', href: '/ebook' },
    { name: 'Print Hub', href: '/print-hub' },
    { name: 'Kontak', href: '/contact' }, 
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-brand-green font-bold text-xl">dikemas<span className="text-brand-black">bagus</span></span>
            </Link>
          </div>

          {/* Desktop Navigation - Updated to fit in single row */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-600 hover:text-brand-green px-2 py-2 text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Button className="bg-brand-green text-white hover:bg-brand-darkGreen ml-2" asChild>
                <Link to="/ngobrol-kemasan">Konsultasi Yuk!</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-brand-green focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-brand-lightGray hover:text-brand-green"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-3">
              <Button 
                className="w-full bg-brand-green text-white hover:bg-brand-darkGreen"
                onClick={() => setIsMenuOpen(false)}
                asChild
              >
                <Link to="/ngobrol-kemasan">Konsultasi Yuk!</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
