'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CreditCard, 
  Shield, 
  Truck, 
  RefreshCw,
  ChevronLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Calculate cart totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax - discount;
  
  // Apply promo code
  const applyPromoCode = () => {
    // Simple promo code logic - in a real app, this would validate against backend
    if (promoCode.toLowerCase() === 'discount20') {
      setDiscount(subtotal * 0.2); // 20% discount
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      alert('Invalid promo code');
    }
  };
  
  // Clear promo code
  const clearPromoCode = () => {
    setPromoCode('');
    setDiscount(0);
    setPromoApplied(false);
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
            <p className="text-gray-600">
              {cartItems.length > 0 
                ? `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
                : 'Your cart is empty'}
            </p>
          </div>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                  <div className="p-6">
                    <div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500 mb-4">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>
                    
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-6 md:grid md:grid-cols-12 md:gap-6 border-b last:border-b-0">
                        {/* Product Info */}
                        <div className="md:col-span-6 flex">
                          <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex flex-col justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.color && `Color: ${item.color}`} {item.size && `| Size: ${item.size}`}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-red-500 hover:text-red-700 flex items-center mt-2 md:mt-0"
                            >
                              <Trash2 size={16} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="md:col-span-2 flex items-center justify-between md:justify-center mt-4 md:mt-0">
                          <span className="md:hidden text-sm font-medium text-gray-500">Price:</span>
                          <span className="text-sm font-medium text-gray-800">${item.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:col-span-2 flex items-center justify-between md:justify-center mt-4 md:mt-0">
                          <span className="md:hidden text-sm font-medium text-gray-500">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-gray-600 hover:text-indigo-600"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-indigo-600"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="md:col-span-2 flex items-center justify-between md:justify-end mt-4 md:mt-0">
                          <span className="md:hidden text-sm font-medium text-gray-500">Total:</span>
                          <span className="text-sm font-medium text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Continue Shopping */}
                <div className="flex justify-between items-center">
                  <Link
                    href="/categories"
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Continue Shopping
                  </Link>
                  
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Clear Cart
                  </button>
                </div>
              </motion.div>
              
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-gray-800">
                          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span className="font-medium">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-800">Total</span>
                          <span className="text-indigo-600">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Promo Code */}
                    <div className="mt-6">
                      <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                        Promo Code
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          id="promo"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={promoApplied}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {promoApplied ? (
                          <button
                            onClick={clearPromoCode}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <RefreshCw size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                      {promoApplied && (
                        <p className="mt-2 text-sm text-green-600">Promo code applied successfully!</p>
                      )}
                    </div>
                    
                    {/* Checkout Button */}
                    <div className="mt-6">
                      <Link
                        href="/checkout"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                    
                    {/* Trust Badges */}
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Shield className="h-5 w-5 text-green-500 mr-2" />
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="h-5 w-5 text-indigo-500 mr-2" />
                        <span>Free shipping on orders over $100</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <RefreshCw className="h-5 w-5 text-indigo-500 mr-2" />
                        <span>30-day easy returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Start Shopping
              </Link>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}