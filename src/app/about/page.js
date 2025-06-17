'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Award,
  Star,
  ShoppingBag,
  Truck,
  Heart,
  Clock,
  Mail,
  Phone,
  MapPin,
  CheckCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Team members data
const teamMembers = [
  {
    name: "Person",
    role: "Founder & CEO",
    image: "/images/team1.jpg",
    bio: "Person ShopHub with a vision to create an exceptional online shopping experience."
  },
  {
    name: "Person",
    role: "Head of Operations",
    image: "/images/team2.jpg",
    bio: "Person ensures that all operations run smoothly and customers receive their orders on time."
  },
  {
    name: "Person",
    role: "Chief Technology Officer",
    image: "/images/team3.jpg",
    bio: "Person leads our tech team, constantly improving our platform for better user experience."
  },
  {
    name: "Person",
    role: "Customer Experience Manager",
    image: "/images/team4.jpg",
    bio: "Person is dedicated to ensuring every customer has a positive shopping experience."
  }
];

// Company values
const companyValues = [
  {
    icon: <Star className="h-8 w-8 text-yellow-500" />,
    title: "Quality",
    description: "We source only the highest quality products for our customers."
  },
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "Customer First",
    description: "Our customers are at the heart of everything we do."
  },
  {
    icon: <Truck className="h-8 w-8 text-blue-500" />,
    title: "Reliability",
    description: "We deliver on our promises, every time."
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    title: "Integrity",
    description: "We operate with honesty and transparency in all our dealings."
  }
];

// Milestones
const milestones = [
  {
    year: "2018",
    title: "Company Founded",
    description: "ShopHub was established with a mission to revolutionize online shopping."
  },
  {
    year: "2019",
    title: "First 1,000 Customers",
    description: "We celebrated our first milestone of 1,000 happy customers."
  },
  {
    year: "2020",
    title: "Expanded Product Range",
    description: "We expanded our catalog to include over 10,000 products across multiple categories."
  },
  {
    year: "2022",
    title: "International Shipping",
    description: "We began shipping to international customers, taking ShopHub global."
  },
  {
    year: "2023",
    title: "Mobile App Launch",
    description: "We launched our mobile app to make shopping even more convenient."
  }
];

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden mb-16"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-96 flex items-center">
              <div className="max-w-3xl mx-auto text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
                <p className="text-xl mb-8">
                  We're on a mission to make online shopping better for everyone. Learn about our journey, our team, and what makes us different.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="/contact"
                    className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/categories"
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Our Mission */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At ShopHub, our mission is to provide an exceptional online shopping experience that combines quality products, competitive prices, and outstanding customer service.
                </p>
                <p className="text-gray-600 mb-4">
                  We believe that shopping should be enjoyable, convenient, and stress-free. That's why we've built a platform that puts the customer first, offering a wide range of carefully selected products that meet our high standards.
                </p>
                <p className="text-gray-600">
                  Our team is dedicated to continuous improvement, always looking for ways to enhance your shopping experience and exceed your expectations.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-80 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/images/about-mission.jpg"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </section>

          {/* Company Values */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do, from product selection to customer service.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center"
                >
                  <div className="mx-auto w-16 h-16 flex items-center justify-center bg-indigo-50 rounded-full mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Our Journey */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                From humble beginnings to where we are today, here's a look at our key milestones.
              </p>
            </motion.div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="text-indigo-600 font-bold text-xl mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-500 border-4 border-white"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Meet Our Team */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                The passionate people behind ShopHub who work tirelessly to bring you the best shopping experience.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center text-white"
                >
                  <div className="text-4xl font-bold mb-2">0</div>
                  <div className="text-lg">Products</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center text-white"
                >
                  <div className="text-4xl font-bold mb-2">0</div>
                  <div className="text-lg">Happy Customers</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-white"
                >
                  <div className="text-4xl font-bold mb-2">0</div>
                  <div className="text-lg">Countries Served</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-white"
                >
                  <div className="text-4xl font-bold mb-2">0</div>
                  <div className="text-lg">Years of Excellence</div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Journey</h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-8">
                Whether you're a customer, partner, or potential team member, we'd love to connect with you and explore how we can grow together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/contact"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/careers"
                  className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                  Careers
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}