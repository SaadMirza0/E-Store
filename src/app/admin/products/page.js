'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Package,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Tag,
  DollarSign,
  BarChart,
  Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cookies from 'js-cookie';

// Demo products data
const products = [
  // {
  //   id: 1,
  //   name: "Premium Wireless Headphones",
  //   category: "Electronics",
  //   price: 199.99,
  //   stock: 50,
  //   status: "active",
  //   rating: 4.5,
  //   sales: 120,
  //   image: "/images/headphones.jpg"
  // }

  // Add more products as needed
];

export default function ProductsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('userRole');
    
    if (!token || role !== 'admin') {
      router.push('/login');
    }
  }, [router]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home & Living</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={20} />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50">
                      <Edit size={18} className="text-indigo-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {product.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{product.category}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-gray-400" />
                      <span className="text-gray-600">${product.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package size={16} className="text-gray-400" />
                      <span className="text-gray-600">{product.stock} in stock</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star size={16} className="text-yellow-400" />
                      <span className="text-gray-600">{product.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart size={16} className="text-gray-400" />
                      <span className="text-gray-600">{product.sales} sales</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-700">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 