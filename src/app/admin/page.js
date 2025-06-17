'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  BarChart,
  Settings,
  LogOut,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Tag,
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cookies from 'js-cookie';

// Demo admin stats
const adminStats = {
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
  activeProducts: 0,
  totalCategories: 0
};

// Demo recent orders
const recentOrders = [
  // {
  //   id: "ORD-001",
  //   customer: "John Doe",
  //   date: "2024-03-15",
  //   status: "Delivered",
  //   total: 299.99
  // }

 
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is admin
  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('userRole');
    
    if (!token || role !== 'admin') {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userRole');
    router.push('/login');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Users size={32} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                  <p className="text-gray-600">Dashboard</p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (tab.id === 'overview') {
                          setActiveTab('overview');
                        } else {
                          router.push(`/admin/${tab.id}`);
                        }
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>

                <button 
                  onClick={handleLogout}
                  className="w-full mt-6 flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500">Total Users</h3>
                    <Users size={24} className="text-indigo-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{adminStats.totalUsers}</p>
                  <p className="text-sm text-green-600 mt-2">+0% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500">Total Orders</h3>
                    <ShoppingBag size={24} className="text-indigo-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{adminStats.totalOrders}</p>
                  <p className="text-sm text-green-600 mt-2">+0% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500">Total Revenue</h3>
                    <DollarSign size={24} className="text-indigo-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">${adminStats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-2">+0% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500">Active Products</h3>
                    <Package size={24} className="text-indigo-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{adminStats.activeProducts}</p>
                  <p className="text-sm text-green-600 mt-2">+0% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500">Total Categories</h3>
                    <Tag size={24} className="text-indigo-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{adminStats.totalCategories}</p>
                  <p className="text-sm text-green-600 mt-2">+0% from last month</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-4 font-medium text-gray-500">Order ID</th>
                        <th className="pb-4 font-medium text-gray-500">Customer</th>
                        <th className="pb-4 font-medium text-gray-500">Date</th>
                        <th className="pb-4 font-medium text-gray-500">Status</th>
                        <th className="pb-4 font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-4 text-gray-800">{order.id}</td>
                          <td className="py-4 text-gray-800">{order.customer}</td>
                          <td className="py-4 text-gray-600">{order.date}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-600'
                                : order.status === 'Processing'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 text-gray-800">${order.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 