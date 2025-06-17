'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Tag,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Package,
  BarChart,
  Image as ImageIcon
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cookies from 'js-cookie';

// Demo categories data
const categories = [
  
// Categories add here

  // Add more demo categories as needed
];

export default function CategoriesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('userRole');
    
    if (!token || role !== 'admin') {
      router.push('/login');
    }
  }, [router]);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || category.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add New Category</span>
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={20} />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  )}
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
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Package size={16} className="text-gray-400" />
                      <span className="text-gray-600">{category.productCount} products</span>
                    </div>
                    {category.parentCategory && (
                      <div className="flex items-center space-x-2">
                        <Tag size={16} className="text-gray-400" />
                        <span className="text-gray-600">{category.parentCategory}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      View Products
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