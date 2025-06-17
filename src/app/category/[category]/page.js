'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Star, 
  Heart, 
  ShoppingCart,
  SlidersHorizontal,
  Grid,
  List,
  ArrowUpDown,
  Check,
  Minus,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Demo products data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    image: "/images/headphones.jpg",
    category: "Electronics",
    subcategory: "Audio",
    rating: 4.5,
    reviews: 128,
    brand: "Premium Audio",
    color: ["Black", "White", "Blue"],
    size: ["One Size"],
    inStock: true,
    isNew: true,
    isSale: true,
    features: ["Noise Cancellation", "30h Battery", "Bluetooth 5.0"]
  },
  // Add more products here...
];

// Filter options
const filterOptions = {
  priceRanges: [
    { label: "Under $50", value: [0, 50] },
    { label: "$50 - $100", value: [50, 100] },
    { label: "$100 - $200", value: [100, 200] },
    { label: "$200 - $500", value: [200, 500] },
    { label: "Over $500", value: [500, Infinity] }
  ],
  brands: ["Premium Audio", "TechPro", "SmartLife", "EliteGear", "FutureTech"],
  colors: ["Black", "White", "Blue", "Red", "Green", "Yellow"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  ratings: [4, 3, 2, 1],
  availability: ["In Stock", "Out of Stock"],
  features: ["New Arrival", "On Sale", "Best Seller", "Featured"]
};

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

export default function MainCategoryPage({ params }) {
  const { category } = params;
  const currentCategory = categories.find(cat => cat.name.toLowerCase() === category);

  if (!currentCategory) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Category not found</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-8 capitalize">
              {currentCategory.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentCategory.subcategories.map((sub, index) => (
                <motion.div
                  key={sub}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <Link
                    href={`/category/${category}/${sub.toLowerCase()}`}
                    className="block"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{sub}</h2>
                    <p className="text-gray-600">Browse our {sub} collection</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 