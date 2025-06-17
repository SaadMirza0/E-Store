'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { 
  ShoppingCart, 
  Heart, 
  User, 
  Home, 
  Info, 
  Phone, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Settings,
  Package,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useCart } from '@/context/CartContext';

const categories = [
  {
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Audio", "Accessories"]
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Kids", "Accessories"]
  },
  {
    name: "Home & Living",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bath"]
  },
  {
    name: "Beauty",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"]
  }
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Store', href: '/store' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in using cookies
    const role = Cookies.get('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    // Remove both token and userRole cookies
    Cookies.remove('token');
    Cookies.remove('userRole');
    setUserRole(null);
    router.push('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-indigo-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:+1234567890" className="hover:text-indigo-200">+92 0000000000</a>
            <a href="mailto:info@tech-nexx.com" className="hover:text-indigo-200">info@tech-nexx.com</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/track-order" className="hover:text-indigo-200">Track Order</Link>
            <Link href="/store-locator" className="hover:text-indigo-200">Store Locator</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="text-2xl font-bold text-white flex items-center">
              <Image 
                src="/images/logo-01.png" 
                alt="ShopHub Logo" 
                width={250} 
                height={250} 
                className="mr-2"
              />
            </Link>
          </motion.div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-200 flex items-center space-x-1">
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-200 flex items-center space-x-1">
                <Package size={20} />
                <span>Store</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  href="/categories"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 font-medium"
                >
                  All Categories
                </Link>
                <div className="border-t my-2"></div>
                {categories.map((category) => (
                  <div key={category.name} className="relative group/sub">
                    <button
                      className="w-full px-4 py-2 text-left text-gray-800 hover:bg-indigo-50 flex items-center justify-between"
                      onMouseEnter={() => setActiveCategory(category.name)}
                    >
                      {category.name}
                      <ChevronDown size={16} className="transform group-hover/sub:rotate-180 transition-transform" />
                    </button>
                    <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                          className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
                  href="/deals"
                  className="text-white hover:text-gray-200"
                >
                  Deals
                </Link>
            
            {/* User Menu */}
            <div className="relative group">
              <Link
                href="/account"
                className="text-white hover:text-gray-200 flex items-center space-x-1"
              >
                <User size={20} />
                <span>Account</span>
                <ChevronDown size={16} />
              </Link>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {userRole ? (
                  <>
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account?tab=orders"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/account?tab=wishlist"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      Wishlist
                    </Link>
                    {userRole === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Cart */}
            <Link href="/Cart" className="text-white hover:text-gray-200 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-4 py-2">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </button>
              </div>
              <nav className="space-y-1">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="border-t my-2"></div>
                <div className="px-4 py-2 text-gray-800 font-medium">Categories</div>
                {categories.map((category) => (
                  <div key={category.name}>
                    <Link
                      href={`/category/${category.name.toLowerCase()}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 pl-8"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </div>
                ))}
                <div className="border-t my-2"></div>
                <Link
                  href="/deals"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Deals
                </Link>
                
                <div className="border-t my-2"></div>
                {userRole ? (
                  <>
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account?tab=orders"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 pl-8"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/account?tab=wishlist"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 pl-8"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Wishlist
                    </Link>
                    {userRole === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
                <div className="border-t my-2"></div>
                <Link
                  href="/Cart"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart ({totalItems})
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;