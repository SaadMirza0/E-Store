'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Filter, 
  ChevronDown, 
  ChevronUp,
  ShoppingCart,
  Heart,
  Star,
  Search,
  X,
  Grid,
  List,
  SlidersHorizontal,
  Eye,
  Compare,
  Share2,
  Tag,
  Clock,
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

// Category data with subcategories
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/images/categories/electronics.jpg',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones', image: '/images/categories/smartphones.jpg' },
      { id: 'laptops', name: 'Laptops', image: '/images/categories/laptops.jpg' },
      { id: 'audio', name: 'Audio', image: '/images/categories/audio.jpg' },
      { id: 'accessories', name: 'Accessories', image: '/images/categories/accessories.jpg' }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    image: '/images/categories/fashion.jpg',
    subcategories: [
      { id: 'men', name: 'Men', image: '/images/categories/men.jpg' },
      { id: 'women', name: 'Women', image: '/images/categories/women.jpg' },
      { id: 'kids', name: 'Kids', image: '/images/categories/kids.jpg' },
      { id: 'accessories', name: 'Accessories', image: '/images/categories/fashion-accessories.jpg' }
    ]
  },
  {
    id: 'home',
    name: 'Home & Living',
    description: 'Everything for your home',
    image: '/images/categories/home.jpg',
    subcategories: [
      { id: 'furniture', name: 'Furniture', image: '/images/categories/furniture.jpg' },
      { id: 'decor', name: 'Decor', image: '/images/categories/decor.jpg' },
      { id: 'kitchen', name: 'Kitchen', image: '/images/categories/kitchen.jpg' },
      { id: 'bath', name: 'Bath', image: '/images/categories/bath.jpg' }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Beauty and personal care products',
    image: '/images/categories/beauty.jpg',
    subcategories: [
      { id: 'skincare', name: 'Skincare', image: '/images/categories/skincare.jpg' },
      { id: 'makeup', name: 'Makeup', image: '/images/categories/makeup.jpg' },
      { id: 'haircare', name: 'Haircare', image: '/images/categories/haircare.jpg' },
      { id: 'fragrances', name: 'Fragrances', image: '/images/categories/fragrances.jpg' }
    ]
  }
];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low-high', name: 'Price: Low to High' },
  { id: 'price-high-low', name: 'Price: High to Low' },
  { id: 'newest', name: 'Newest First' },
  { id: 'rating', name: 'Top Rated' }
];

export default function CategoriesPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addedToCart, setAddedToCart] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [compareProducts, setCompareProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [],
    colors: [],
    availability: [],
    features: []
  });
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    color: true,
    availability: true,
    features: true
  });

  // Fetch products based on category and filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          page: currentPage,
          sort: sortBy,
          category: selectedCategory?.id || '',
          subcategory: selectedSubcategory?.id || '',
          search: searchQuery
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
  }, [currentPage, sortBy, selectedCategory, selectedSubcategory, searchQuery]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToCart(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product._id]: false }));
    }, 2000);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setCurrentPage(1);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleCompare = (product) => {
    if (compareProducts.length < 3) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareProducts(compareProducts.filter(p => p._id !== productId));
  };

  const toggleFilter = (filterType) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      priceRange: [],
      colors: [],
      availability: [],
      features: []
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Categories</h1>
            <p className="text-gray-600">Browse products by category</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -10 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer ${
                  selectedCategory?.id === category.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Category and Products Section */}
          {selectedCategory && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              {/* Category Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCategory.name}</h2>
                  <p className="text-gray-600">{selectedCategory.description}</p>
                </div>
                <button
                  onClick={clearFilters}
                  className="mt-4 md:mt-0 px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50"
                >
                  Clear Filters
                </button>
              </div>

              {/* Subcategories */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {selectedCategory.subcategories.map((subcategory) => (
                  <motion.button
                    key={subcategory.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubcategorySelect(subcategory)}
                    className={`relative h-32 rounded-lg overflow-hidden ${
                      selectedSubcategory?.id === subcategory.id
                        ? 'ring-2 ring-indigo-500'
                        : 'hover:ring-2 hover:ring-indigo-300'
                    }`}
                  >
                    <Image
                      src={subcategory.image}
                      alt={subcategory.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="text-white font-medium">{subcategory.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Advanced Filters */}
              <div className="mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                >
                  <SlidersHorizontal size={20} />
                  <span>Advanced Filters</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform ${
                      showFilters ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {/* Price Range */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <button
                          onClick={() => toggleFilter('price')}
                          className="flex items-center justify-between w-full mb-2"
                        >
                          <span className="font-medium">Price Range</span>
                          <ChevronDown
                            size={20}
                            className={`transform transition-transform ${
                              expandedFilters.price ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedFilters.price && (
                          <div className="space-y-2">
                            {['Under $50', '$50 - $100', '$100 - $200', '$200 - $500', 'Over $500'].map((range) => (
                              <label key={range} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.priceRange.includes(range)}
                                  onChange={() => handleFilterChange('priceRange', range)}
                                  className="rounded text-indigo-600"
                                />
                                <span className="text-sm">{range}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Colors */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <button
                          onClick={() => toggleFilter('color')}
                          className="flex items-center justify-between w-full mb-2"
                        >
                          <span className="font-medium">Colors</span>
                          <ChevronDown
                            size={20}
                            className={`transform transition-transform ${
                              expandedFilters.color ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedFilters.color && (
                          <div className="flex flex-wrap gap-2">
                            {['Black', 'White', 'Blue', 'Red', 'Green'].map((color) => (
                              <button
                                key={color}
                                onClick={() => handleFilterChange('colors', color)}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  selectedFilters.colors.includes(color)
                                    ? 'border-indigo-600'
                                    : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color.toLowerCase() }}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <button
                          onClick={() => toggleFilter('features')}
                          className="flex items-center justify-between w-full mb-2"
                        >
                          <span className="font-medium">Features</span>
                          <ChevronDown
                            size={20}
                            className={`transform transition-transform ${
                              expandedFilters.features ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedFilters.features && (
                          <div className="space-y-2">
                            {['New Arrival', 'On Sale', 'Best Seller', 'Featured'].map((feature) => (
                              <label key={feature} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.features.includes(feature)}
                                  onChange={() => handleFilterChange('features', feature)}
                                  className="rounded text-indigo-600"
                                />
                                <span className="text-sm">{feature}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
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

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'grid'
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'list'
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {/* Products Grid/List */}
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
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                    {products.map((product) => (
                      <motion.div
                        key={product._id}
                        whileHover={{ y: -10 }}
                        className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                          viewMode === 'list' ? 'flex' : ''
                        }`}
                      >
                        <Link href={`/product/${product._id}`} className={viewMode === 'list' ? 'flex-1' : ''}>
                          <div className={`relative ${viewMode === 'list' ? 'w-48' : 'h-64'}`}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                            {product.isNew && (
                              <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                                New
                              </span>
                            )}
                            {product.discount && (
                              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                                -{product.discount}%
                              </span>
                            )}
                          </div>
                        </Link>
                        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuickView(product)}
                                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                              >
                                <Eye size={20} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleCompare(product)}
                                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                              >
                                <Compare size={20} />
                              </motion.button>
                            </div>
                          </div>
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
                          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <Truck size={16} className="mr-1" />
                              <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center">
                              <Shield size={16} className="mr-1" />
                              <span>2 Year Warranty</span>
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
          )}
        </div>
      </main>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{quickViewProduct.name}</h2>
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative h-96">
                    <Image
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-gray-600 mb-4">{quickViewProduct.description}</p>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${
                            i < Math.floor(quickViewProduct.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">({quickViewProduct.reviews} reviews)</span>
                    </div>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-indigo-600">${quickViewProduct.price}</span>
                      {quickViewProduct.originalPrice && (
                        <span className="ml-2 text-lg text-gray-500 line-through">
                          ${quickViewProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          handleAddToCart(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleCompare(quickViewProduct)}
                          className="flex items-center justify-center space-x-2 text-gray-600 hover:text-indigo-600"
                        >
                          <Compare size={20} />
                          <span>Compare</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-indigo-600">
                          <Share2 size={20} />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center text-gray-600">
                        <Truck size={20} className="mr-2" />
                        <span>Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <RefreshCw size={20} className="mr-2" />
                        <span>30-day return policy</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Shield size={20} className="mr-2" />
                        <span>2-year warranty</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Products Drawer */}
      <AnimatePresence>
        {compareProducts.length > 0 && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl z-40"
          >
            <div className="max-w-7xl mx-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Compare Products ({compareProducts.length}/3)</h3>
                <button
                  onClick={() => setCompareProducts([])}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {compareProducts.map((product) => (
                  <div key={product._id} className="relative">
                    <button
                      onClick={() => removeFromCompare(product._id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                    <div className="relative h-32 mb-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                    <p className="text-sm text-indigo-600 font-bold">${product.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  href="/compare"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Compare Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
} 