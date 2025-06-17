'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Settings,
  Save,
  Upload,
  Trash2,
  Mail,
  Bell,
  Lock,
  Globe,
  CreditCard,
  Users,
  Shield,
  HelpCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cookies from 'js-cookie';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'E-commerce Store',
      siteDescription: 'Your one-stop shop for all your needs',
      currency: 'USD',
      timezone: 'UTC',
      maintenanceMode: false
    },
    email: {
      smtpHost: 'smtp.example.com',
      smtpPort: '587',
      smtpUser: 'user@example.com',
      smtpPassword: '********',
      fromEmail: 'noreply@example.com',
      fromName: 'E-commerce Store'
    },
    notifications: {
      newOrder: true,
      lowStock: true,
      customerReview: true,
      newsletter: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      ipWhitelist: []
    }
  });

  // Check if user is admin
  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('userRole');
    
    if (!token || role !== 'admin') {
      router.push('/login');
    }
  }, [router]);

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = (category) => {
    // Here you would typically make an API call to save the settings
    console.log(`Saving ${category} settings:`, settings[category]);
    // Show success message
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Site Name</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Site Description</label>
          <input
            type="text"
            value={settings.general.siteDescription}
            onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            value={settings.general.currency}
            onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="UTC">UTC</option>
            <option value="EST">EST</option>
            <option value="PST">PST</option>
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={settings.general.maintenanceMode}
          onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">Maintenance Mode</label>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
          <input
            type="text"
            value={settings.email.smtpPort}
            onChange={(e) => handleSettingChange('email', 'smtpPort', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP User</label>
          <input
            type="text"
            value={settings.email.smtpUser}
            onChange={(e) => handleSettingChange('email', 'smtpUser', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
          <input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.newOrder}
            onChange={(e) => handleSettingChange('notifications', 'newOrder', e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">New Order Notifications</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.lowStock}
            onChange={(e) => handleSettingChange('notifications', 'lowStock', e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Low Stock Alerts</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.customerReview}
            onChange={(e) => handleSettingChange('notifications', 'customerReview', e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Customer Review Notifications</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.newsletter}
            onChange={(e) => handleSettingChange('notifications', 'newsletter', e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Newsletter Subscriptions</label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password Expiry (days)</label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={settings.security.twoFactorAuth}
          onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">Enable Two-Factor Authentication</label>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4">
              {/* Sidebar */}
              <div className="bg-gray-50 p-6">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                      activeTab === 'general'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings size={20} />
                    <span>General</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('email')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                      activeTab === 'email'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Mail size={20} />
                    <span>Email</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                      activeTab === 'notifications'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Bell size={20} />
                    <span>Notifications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                      activeTab === 'security'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Shield size={20} />
                    <span>Security</span>
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="col-span-3 p-6">
                {activeTab === 'general' && renderGeneralSettings()}
                {activeTab === 'email' && renderEmailSettings()}
                {activeTab === 'notifications' && renderNotificationSettings()}
                {activeTab === 'security' && renderSecuritySettings()}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave(activeTab)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Save size={20} />
                    <span>Save Changes</span>
                  </button>
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