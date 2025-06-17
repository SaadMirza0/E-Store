'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Clock, 
  Star, 
  Heart, 
  ShoppingCart,
  ArrowRight,
  Percent,
  Tag,
  Timer,
  TrendingUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

// Demo deals data
const deals = [
  // {
  //   id: 1,
  //   name: "Premium Wireless Headphones",
  //   price: 199.99,
  //   originalPrice: 299.99,
  //   discount: 33,
  //   image: "/images/headphones.jpg",
  //   category: "Electronics",
  //   rating: 4.5,
  //   reviews: 128,
  //   endTime: "2024-03-20T23:59:59",
  //   isFlashSale: true,
  //   stockLeft: 0
  // },
  // {
  //   id: 2,
  //   name: "Smart Watch Series 5",
  //   price: 299.99,
  //   originalPrice: 399.99,
  //   discount: 25,
  //   image: "/images/smartwatch.jpg",
  //   category: "Electronics",
  //   rating: 4.8,
  //   reviews: 256,
  //   endTime: "2024-03-25T23:59:59",
  //   isFlashSale: false,
  //   stockLeft: 30
  // },
  // {
  //   id: 3,
  //   name: "Designer Leather Bag",
  //   price: 149.99,
  //   originalPrice: 199.99,
  //   discount: 25,
  //   image: "/images/bag.jpg",
  //   category: "Fashion",
  //   rating: 4.3,
  //   reviews: 89,
  //   endTime: "2024-03-22T23:59:59",
  //   isFlashSale: true,
  //   stockLeft: 8
  // },
  // {
  //   id: 4,
  //   name: "Professional Camera",
  //   price: 899.99,
  //   originalPrice: 999.99,
  //   discount: 10,
  //   image: "/images/camera.jpg",
  //   category: "Electronics",
  //   rating: 4.7,
  //   reviews: 156,
  //   endTime: "2024-03-28T23:59:59",
  //   isFlashSale: false,
  //   stockLeft: 5
  // }
];

// Featured deals
const featuredDeals = [
  // {
  //   id: 5,
  //   name: "Summer Collection Bundle",
  //   price: 299.99,
  //   originalPrice: 499.99,
  //   discount: 40,
  //   image: "/images/bag.jpg",
  //   category: "Fashion",
  //   description: "Get 40% off on our summer collection bundle. Limited time offer!"
  // },
  // {
  //   id: 6,
  //   name: "Tech Gadgets Pack",
  //   price: 599.99,
  //   originalPrice: 899.99,
  //   discount: 33,
  //   image: "/images/headphones.jpg",
  //   category: "Electronics",
  //   description: "Complete your tech setup with our premium gadgets pack."
  // }
];

export default function DealsPage() {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState({});
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft = {};
      deals.forEach(deal => {
        const endTime = new Date(deal.endTime).getTime();
        const now = new Date().getTime();
        const difference = endTime - now;

        if (difference > 0) {
          newTimeLeft[deal.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
      });
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (deal) => {
    addToCart(deal, 1);
    setAddedToCart(prev => ({ ...prev, [deal.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [deal.id]: false }));
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Special Deals & Offers</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing deals and discounts on our premium products. Limited time offers with exclusive savings!
            </p>
          </div>

          {/* Featured Deals */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredDeals.map((deal) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={deal.image}
                      alt={deal.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                        {deal.discount}% OFF
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{deal.name}</h3>
                      <p className="text-white/90 text-sm">{deal.category}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{deal.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-indigo-600">${deal.price}</span>
                          <span className="text-gray-500 line-through">${deal.originalPrice}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Save ${(deal.originalPrice - deal.price).toFixed(2)}
                        </div>
                      </div>
                      <Link
                        href={`/product/${deal.id}`}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Shop Now</span>
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Flash Sales */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Flash Sales</h2>
              <div className="flex items-center space-x-2 text-indigo-600">
                <Clock size={20} />
                <span>Ending Soon</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deals.filter(deal => deal.isFlashSale).map((deal) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={deal.image}
                      alt={deal.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      {deal.discount}% OFF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{deal.name}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(deal.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">({deal.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-indigo-600">${deal.price}</span>
                      <span className="text-gray-500 line-through">${deal.originalPrice}</span>
                    </div>
                    {timeLeft[deal.id] && (
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Timer size={16} />
                          <span>Time Left:</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {Object.entries(timeLeft[deal.id]).map(([unit, value]) => (
                            <div
                              key={unit}
                              className="bg-gray-100 rounded-lg p-2 text-center"
                            >
                              <div className="font-bold text-gray-800">{value}</div>
                              <div className="text-xs text-gray-600">{unit}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleAddToCart(deal)}
                        className={`flex-1 ${
                          addedToCart[deal.id]
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        } text-white px-4 py-2 rounded-lg transition-colors`}
                      >
                        {addedToCart[deal.id] ? 'Added to Cart!' : 'Add to Cart'}
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* All Deals */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deals.map((deal) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={deal.image}
                      alt={deal.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      {deal.discount}% OFF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{deal.name}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(deal.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">({deal.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-indigo-600">${deal.price}</span>
                      <span className="text-gray-500 line-through">${deal.originalPrice}</span>
                    </div>
                    {timeLeft[deal.id] && (
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Clock size={16} />
                          <span>Ends in:</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {Object.entries(timeLeft[deal.id]).map(([unit, value]) => (
                            <div
                              key={unit}
                              className="bg-gray-100 rounded-lg p-2 text-center"
                            >
                              <div className="font-bold text-gray-800">{value}</div>
                              <div className="text-xs text-gray-600">{unit}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Add to Cart
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 