import mongoose from 'mongoose';
import Product from '../models/Product.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Seeding initial products...');
      await seedProducts();
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedProducts = async () => {
  const products = [
    {
      name: 'Pure Sidr Honey - 250g',
      description: 'Our premium Sidr Honey in a convenient 250g jar. Perfect for daily use and gifting.',
      price: 800,
      image: '/images/honey-250g.png',
      category: 'Honey',
      stock: 50,
      weight: '250g'
    },
    {
      name: 'Pure Sidr Honey - 500g',
      description: 'Our premium Sidr Honey in a 500g jar. Great value for regular consumers.',
      price: 1600,
      image: '/images/honey-500g.png',
      category: 'Honey',
      stock: 50,
      weight: '500g'
    },
    {
      name: 'Pure Sidr Honey - 1kg',
      description: 'Our premium Sidr Honey in a 1kg jar. Best value for honey enthusiasts and families.',
      price: 3200,
      image: '/images/honey-1kg.png',
      category: 'Honey',
      stock: 50,
      weight: '1kg'
    }
  ];

  await Product.insertMany(products);
  console.log('Products seeded successfully');
};

export default connectDB;
