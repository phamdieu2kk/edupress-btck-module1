// config/db.js
const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');

    // Log URI (ẩn password)
    if (process.env.NODE_ENV !== 'production') {
      const safeUri = mongoUri.replace(/\/\/.*@/, '//<hidden>@');
      console.log(`📡 Connected to: ${safeUri}`);
    }

    // Bắt sự kiện khi mất kết nối
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Retrying...');
    });

    // Bắt sự kiện khi có lỗi
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err.message);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
