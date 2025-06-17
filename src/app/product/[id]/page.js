'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart, Heart, Star, Share2, Truck, Shield, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

// Demo product data (in real app, this would come from an API)
const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 999.99,
  originalPrice: 999.99,
  description: "Experience premium sound quality with our latest wireless headphones. Features include active noise cancellation, 30-hour battery life, and premium comfort for extended listening sessions.",
  images: [
    "/images/headphones.jpg",
    "/images/headphones-2.jpg",
    "/images/headphones-3.jpg",
    "/images/headphones-4.jpg"
  ],
  category: "Electronics",
  rating: 0.0,
  reviews: 0,
  inStock: true,
  features: [
    "Active Noise Cancellation",
    "1000-hour Battery Life",
    "Bluetooth 5.0",
    "Premium Comfort",
    "Built-in Microphone"
  ],
  specifications: {
    "Brand": "Premium Audio",
    "Model": "WH-1000XM4",
    "Color": "Black",
    "Weight": "50g",
    "Warranty": "0 Years"
  }
};

// Related products data
const relatedProducts = [
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 999.99,
    image: "/images/smartwatch.jpg",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    price: 999.99,
    image: "",
    category: "Fashion"
  },
  {
    id: 4,
    name: "Professional Camera",
    price: 999.99,
    image: "/images/camera.jpg",
    category: "Electronics"
  }
];

export default function ProductDetails() {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-indigo-600">Home</a>
            <ChevronRight size={16} />
            <a href={`/category/${product.category.toLowerCase()}`} className="hover:text-indigo-600">{product.category}</a>
            <ChevronRight size={16} />
            <span className="text-gray-800">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-96 rounded-xl overflow-hidden bg-gray-200"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                  </div>
                  <button className="text-gray-600 hover:text-indigo-600">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-indigo-600">${product.price}</span>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
                <p className="text-green-600 text-sm">In Stock</p>
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-4 py-2 text-gray-600 hover:text-indigo-600"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      className="w-16 text-center border-x"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-indigo-600"
                    >
                      +
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className={`flex-1 ${
                      addedToCart
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                  >
                    <ShoppingCart size={20} />
                    <span>{addedToCart ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 border rounded-lg text-gray-600 hover:text-red-500 hover:border-red-500"
                  >
                    <Heart size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Truck size={20} className="text-indigo-600" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={20} className="text-indigo-600" />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw size={20} className="text-indigo-600" />
                  <span className="text-sm text-gray-600">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-16">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {['description', 'features', 'specifications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              )}

              {activeTab === 'features' && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-indigo-600">${product.price}</span>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Heart size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          <ShoppingCart size={20} />
                        </motion.button>
                      </div>
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