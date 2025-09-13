

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
// // Parse JSON & URL-encoded bodies
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// // Parse cookies
// app.use(cookieParser());

// // Logging
// app.use(morgan("dev"));

// // ===== CORS =====
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

// // ===== Disable cache =====
// app.disable("etag");
// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-store");
//   next();
// });

// // ===== Static files =====
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ===== Health check =====
// app.get("/api/health", (req, res) => res.json({ ok: true }));

// // ===== API Routes =====
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

// // ===== Connect to MongoDB & Start Server =====
// const MONGO_URI =
//   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/edupress";
// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected:", MONGO_URI);
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ===== Middlewares =====
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// ===== CORS =====
const allowedOrigins = [
  "http://localhost:5173", // FE customer local
  "http://localhost:5174", // FE admin local
  process.env.CLIENT_URL, // FE deployed
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ===== Disable cache =====
app.disable("etag");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// ===== Static files =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Health check =====
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// ===== Routes =====
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/courses", require("./routes/courses.routes"));
app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/lessons", require("./routes/lessons.routes"));
app.use("/api/instructors", require("./routes/instructors.routes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orders.routes"));
app.use("/api/vnpay", require("./routes/vnpay.routes"));
app.use("/api/payment", require("./routes/payment.routes"));

// ===== MongoDB Connection & Start Server =====
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/edupress";
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected:", MONGO_URI);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
})();
