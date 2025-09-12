// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const path = require("path");

// // ===== Import routes =====
// const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/users.routes");
// const courseRoutes = require("./routes/courses.routes");
// const blogRoutes = require("./routes/blog.routes");
// const lessonRoutes = require("./routes/lessons.routes");
// const instructorRoutes = require("./routes/instructors.routes");
// const cartRoutes = require("./routes/cartRoutes");
// const ordersRoutes = require("./routes/orders.routes");
// const vnpayRoutes = require("./routes/vnpay.routes");

// const paymentRoutes = require("./routes/payment.routes");
// const app = express();

// // ===== Middlewares =====
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
// // parse application/json
// app.use(cookieParser());       // parse cookies
// app.use(morgan("dev"));        // logging

// const allowedOrigins = [
//   "http://localhost:5173", // FE customer
//   "http://localhost:5174", // FE admin
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));

// // Tắt cache
// app.disable("etag");
// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-store");
//   next();
// });

// // ===== Static =====
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ===== Routes =====
// app.get("/api/health", (req, res) => res.json({ ok: true }));
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/lessons", lessonRoutes);
// app.use("/api/instructors", instructorRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", ordersRoutes);
// app.use("/api/vnpay", vnpayRoutes);

// app.use("/api/payment", paymentRoutes);

// // ===== Connect Database & Start Server =====
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/edupress";
// const PORT = process.env.PORT || 5000;

// mongoose.connect(MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   });



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// ===== Import routes =====
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const courseRoutes = require("./routes/courses.routes");
const blogRoutes = require("./routes/blog.routes");
const lessonRoutes = require("./routes/lessons.routes");
const instructorRoutes = require("./routes/instructors.routes");
const cartRoutes = require("./routes/cartRoutes");
const ordersRoutes = require("./routes/orders.routes");
const vnpayRoutes = require("./routes/vnpay.routes");
const paymentRoutes = require("./routes/payment.routes");

const app = express();

// ===== Middlewares =====
// Parse JSON & URL-encoded bodies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Parse cookies
app.use(cookieParser());

// Logging
app.use(morgan("dev"));

// ===== CORS =====
const allowedOrigins = [
  "http://localhost:5173", // FE customer
  "http://localhost:5174", // FE admin
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ===== Disable cache =====
app.disable("etag");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// ===== Static files =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Health check =====
app.get("/api/health", (req, res) => res.json({ ok: true }));

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/vnpay", vnpayRoutes);
app.use("/api/payment", paymentRoutes);

// ===== Connect to MongoDB & Start Server =====
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/edupress";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});
