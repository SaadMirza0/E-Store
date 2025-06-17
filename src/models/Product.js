import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'fashion', 'home', 'beauty']
  },
  subcategory: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  specifications: {
    type: Map,
    of: String
  },
  colors: [{
    name: String,
    code: String
  }],
  sizes: [String],
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ featured: -1, createdAt: -1 });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 