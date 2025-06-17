'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp,
  ShoppingCart,
  Heart,
  Star,
  Search,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

// Filter options
const categories = [
  { id: 'electronics', name: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Audio', 'Accessories'] },
  { id: 'fashion', name: 'Fashion', subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
  { id: 'home', name: 'Home & Living', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bath'] },
  { id: 'beauty', name: 'Beauty', subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances'] }
];

const priceRanges = [
  { id: 'under-50', name: 'Under $50' },
  { id: '50-100', name: '$50 - $100' },
  { id: '100-200', name: '$100 - $200' },
  { id: '200-500', name: '$200 - $500' },
  { id: 'over-500', name: 'Over $500' }
];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low-high', name: 'Price: Low to High' },
  { id: 'price-high-low', name: 'Price: High to Low' },
  { id: 'newest', name: 'Newest First' },
  { id: 'rating', name: 'Top Rated' }
];

export default function StorePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    subcategory: [],
    priceRange: [],
    rating: null,
    search: ''
  });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addedToCart, setAddedToCart] = useState({});

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          page: currentPage,
          sort: sortBy,
          ...filters
        });

        const response = await fetch(`/api/products?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortBy, filters]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToCart(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product._id]: false }));
    }, 2000);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (type === 'category') {
        newFilters.category = prev.category.includes(value)
          ? prev.category.filter(c => c !== value)
          : [...prev.category, value];
      } else if (type === 'subcategory') {
        newFilters.subcategory = prev.subcategory.includes(value)
          ? prev.subcategory.filter(s => s !== value)
          : [...prev.subcategory, value];
      } else if (type === 'priceRange') {
        newFilters.priceRange = prev.priceRange.includes(value)
          ? prev.priceRange.filter(p => p !== value)
          : [...prev.priceRange, value];
      } else {
        newFilters[type] = value;
      }
      
      return newFilters;
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      subcategory: [],
      priceRange: [],
      rating: null,
      search: ''
    });
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Store</h1>
            <p className="text-gray-600">Browse our collection of products</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  {filters.search && (
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort */}
              <div className="w-full md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} className="mr-2" />
                Filters
                {showFilters ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category.id}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.category.includes(category.id)}
                              onChange={() => handleFilterChange('category', category.id)}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-gray-700">{category.name}</span>
                          </label>
                          {filters.category.includes(category.id) && (
                            <div className="ml-6 mt-1 space-y-1">
                              {category.subcategories.map(sub => (
                                <label key={sub} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={filters.subcategory.includes(sub)}
                                    onChange={() => handleFilterChange('subcategory', sub)}
                                    className="rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <span className="ml-2 text-gray-600">{sub}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <label key={range.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.priceRange.includes(range.id)}
                            onChange={() => handleFilterChange('priceRange', range.id)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-gray-700">{range.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Rating</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            checked={filters.rating === rating}
                            onChange={() => handleFilterChange('rating', rating)}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-gray-700">
                            {rating}+ Stars
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <Link href={`/product/${product._id}`}>
                      <div className="relative h-64">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-indigo-600">${product.price}</span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAddToCart(product)}
                            className={`p-2 ${
                              addedToCart[product._id]
                                ? 'text-green-500'
                                : 'text-gray-600 hover:text-indigo-600'
                            } transition-colors`}
                          >
                            <ShoppingCart size={20} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                          >
                            <Heart size={20} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === i + 1
                            ? 'bg-indigo-600 text-white'
                            : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 