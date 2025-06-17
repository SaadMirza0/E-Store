'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CategoryPage({ params }) {
  const { category, subcategory } = params;

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
            <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
              {category} - {subcategory}
            </h1>
            <p className="text-gray-600">
              Browse our collection of {subcategory} in the {category} category.
            </p>
            
            {/* Add your product grid or list here */}
            <div className="mt-8">
              <p className="text-gray-500 italic">Products will be displayed here</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 