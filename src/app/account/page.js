'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  Star,
  MessageSquare,
  Users,
  BarChart,
  ShoppingBag,
  FileText,
  Lock,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Plus,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileSection from '@/components/ProfileSection';

// Demo user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (234) 567-890",
  address: "123 Main St, City, Country",
  avatar: "/images/avatar.jpg",
  role: "admin", // or "user"
  joinDate: "January 2024",
  lastLogin: "2 hours ago"
};

// Demo orders
const recentOrders = [


  // {
  //   id: "ORD-002",
  //   date: "2024-03-10",
  //   status: "Processing",
  //   total: 149.99,
  //   items: 2
  // }

  // In User Profile recent orders are here in there
];

// Demo wishlist items
const wishlistItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "/images/headphones.jpg"
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "/images/smartwatch.jpg"
  }
];

// Admin dashboard stats
const adminStats = {
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
  activeProducts: 0
};

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [user, setUser] = useState(userData);

  // Check authentication on mount
  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('userRole');
    
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Update active tab when URL changes
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userRole');
    router.push('/login');
  };

  const handleProfileUpdate = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell }
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
                  <div className="relative w-24 h-24 mb-4">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                      <Edit size={16} />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <span className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    (!tab.adminOnly || user.role === 'admin') && (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <tab.icon size={20} />
                        <span>{tab.label}</span>
                      </button>
                    )
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
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <ProfileSection userData={user} onUpdate={handleProfileUpdate} />
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800">{order.id}</h3>
                              <p className="text-sm text-gray-500">Placed on {order.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              {order.items} items • Total: ${order.total}
                            </div>
                            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'wishlist' && (
                  <motion.div
                    key="wishlist"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Wishlist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="relative h-48">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-indigo-600">
                                ${item.price}
                              </span>
                              <div className="flex space-x-2">
                                <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                                  <Trash2 size={20} />
                                </button>
                                <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                                  <ShoppingBag size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Currency
                          </label>
                          <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="usd">USD ($)</option>
                            <option value="eur">EUR (€)</option>
                            <option value="gbp">GBP (£)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Security</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-800">Order Updates</p>
                              <p className="text-sm text-gray-500">Get notified about your order status</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-800">Promotional Emails</p>
                              <p className="text-sm text-gray-500">Receive offers and discounts</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 