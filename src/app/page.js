'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart, Heart, Star, ArrowRight, Mail, Shield, Truck, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Lorem",
    role: "Regular Customer",
    image: "/images/testimonial1.jpg",
    text: "Nothing",
    rating: 5
  },
  {
    id: 2,
    name: "Lorem",
    role: "Tech Enthusiast",
    image: "/images/testimonial2.jpg",
    text: "Nothing",
    rating: 5
  },
  {
    id: 3,
    name: "Lorem",
    role: "Fashion Blogger",
    image: "/images/testimonial3.jpg",
    text: "Nothing",
    rating: 5
  }
];

// Features data
const features = [
  {
    icon: <Truck size={24} />,
    title: "Free Shipping",
    description: "On orders over $50"
  },
  {
    icon: <Shield size={24} />,
    title: "Secure Payment",
    description: "100% secure payment"
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Easy Returns",
    description: "30 days return policy"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function Home() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/products/featured');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch featured products');
        }
        
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToCart(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product._id]: false }));
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 z-0" />
          <div className="relative z-10 text-center text-white px-4">
            <motion.h1 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Welcome to ShopHub
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl mb-8"
            >
              Discover Amazing Products
            </motion.p>
            <Link href="/categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-4 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50"
                >
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-white/80">Discover our handpicked selection of premium products</p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center text-white/80 py-8">
                <p className="mb-4">Error loading featured products</p>
                <p className="text-sm">{error}</p>
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="text-center text-white/80 py-8">
                <p>No featured products available at the moment</p>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {featuredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -10 }}
                    className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg overflow-hidden"
                  >
                    <Link href={`/product/${product._id}`}>
                      <div className="relative h-64 w-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 hover:scale-110"
                          priority={product._id <= 2}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 hover:text-indigo-200 transition-colors">{product.name}</h3>
                        <p className="text-white/80 mb-4">{product.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-white">${product.price}</span>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-white/80 hover:text-red-300 transition-colors"
                            >
                              <Heart size={20} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(product);
                              }}
                              className={`p-2 ${
                                addedToCart[product._id]
                                  ? 'text-green-300'
                                  : 'text-white/80 hover:text-indigo-200'
                              } transition-colors`}
                            >
                              <ShoppingCart size={20} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
              <p className="text-white/80">Limited time deals you don't want to miss</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Summer Sale</h3>
                <p className="text-gray-600 mb-4">Up to 50% off on selected items</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full flex items-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4"><Link href="/new-arrivals/page" >New Arrivals</Link></h3>
                <p className="text-gray-600 mb-4">Get 20% off on new collection</p>
                <Link href="./new-arrivals/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full flex items-center space-x-2"
                  >
                    <span>Explore</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 text-gray-800"
            >
              What Our Customers Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white mb-8"
            >
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-white/80">Get the latest updates and offers directly in your inbox</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto"
            >
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <span>Subscribe</span>
                  <Mail size={20} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 py-16"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Electronics', 'Fashion', 'Home', 'Beauty'].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
