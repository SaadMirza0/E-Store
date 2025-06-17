import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const sort = searchParams.get('sort') || 'featured';
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category')?.split(',') || [];
    const subcategory = searchParams.get('subcategory')?.split(',') || [];
    const priceRange = searchParams.get('priceRange')?.split(',') || [];
    const rating = searchParams.get('rating');

    // Build query
    const query = {};

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Categories
    if (category.length > 0) {
      query.category = { $in: category };
    }

    // Subcategories
    if (subcategory.length > 0) {
      query.subcategory = { $in: subcategory };
    }

    // Price ranges
    if (priceRange.length > 0) {
      const priceQueries = priceRange.map(range => {
        switch (range) {
          case 'under-50':
            return { price: { $lt: 50 } };
          case '50-100':
            return { price: { $gte: 50, $lte: 100 } };
          case '100-200':
            return { price: { $gte: 100, $lte: 200 } };
          case '200-500':
            return { price: { $gte: 200, $lte: 500 } };
          case 'over-500':
            return { price: { $gt: 500 } };
          default:
            return {};
        }
      });
      query.$or = priceQueries;
    }

    // Rating
    if (rating) {
      query.rating = { $gte: parseInt(rating) };
    }

    // Build sort options
    let sortOptions = {};
    switch (sort) {
      case 'price-low-high':
        sortOptions = { price: 1 };
        break;
      case 'price-high-low':
        sortOptions = { price: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      default: // featured
        sortOptions = { featured: -1, createdAt: -1 };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      products,
      currentPage: page,
      totalPages,
      totalProducts: total
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 