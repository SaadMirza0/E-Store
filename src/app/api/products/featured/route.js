import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not defined in environment variables');
}

const client = new MongoClient(uri);

export async function GET() {
  try {
    if (!uri) {
      throw new Error('MongoDB connection string is not configured');
    }

    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB successfully');

    const database = client.db('Store-Products');
    const collection = database.collection('Products');

    console.log('Fetching featured products...');
    const featuredProducts = await collection.find({ featured: true }).toArray();
    console.log(`Found ${featuredProducts.length} featured products`);

    if (featuredProducts.length === 0) {
      console.log('No featured products found in the database');
    }

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error('Error in featured products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products', details: error.message },
      { status: 500 }
    );
  } finally {
    try {
      await client.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }
} 