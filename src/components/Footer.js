'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopHub</h3>
            <p className="text-white/80 mb-4">
              Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent service.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              {['FAQs', 'Shipping Policy', 'Return Policy', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-white/80 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'].map((category) => (
                <li key={category}>
                  <Link href={`/category/${category.toLowerCase().replace(' & ', '-')}`} className="text-white/80 hover:text-white transition-colors">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <MapPin size={20} />
                <span className="text-white/80">123 Shopping Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} />
                <span className="text-white/80">+920000000000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={20} />
                <span className="text-white/80">info@tech-nexx.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} TechNexx. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-white/80 hover:text-white text-sm">Terms of Service</Link>
            <Link href="/privacy" className="text-white/80 hover:text-white text-sm">Privacy Policy</Link>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white text-indigo-600 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowUp size={24} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;