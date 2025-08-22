// config/db.js
const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  try {
    if (!mongoUri) {
      throw new Error("❌ MONGO_URI chưa được truyền vào connectDB");
    }

    await mongoose.connect(mongoUri, {
      // Thêm timeout để tránh treo khi kết nối Atlas
      serverSelectionTimeoutMS: 10000, // 10s
    });

    console.log("✅ MongoDB connected");

    // Log URI (ẩn password) khi không ở production
    if (process.env.NODE_ENV !== "production") {
      const safeUri = mongoUri.replace(/\/\/.*@/, "//<hidden>@");
      console.log(`📡 Connected to: ${safeUri}`);
    }

    // Lắng nghe sự kiện mất kết nối
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Retrying...");
    });

    // Lắng nghe sự kiện có lỗi
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB error:", err.message);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Thoát app khi kết nối thất bại
  }
};

module.exports = connectDB;
