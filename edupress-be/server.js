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
// const app = express();

// // ===== Middlewares =====
// app.use(express.json());
// app.use(cookieParser());

// const allowedOrigins = [
//   "http://localhost:5173", // Frontend admin
//   "http://localhost:5174", // Frontend customer
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Nếu không có origin (ví dụ Postman) hoặc origin hợp lệ
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // gửi cookie
// }));

// app.use(morgan("dev"));

// // Tắt cache
// app.disable("etag");
// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-store");
//   next();
// });


// // ===== Static: Serve thư mục uploads =====
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
const bodyParser = require("body-parser");

// ===== Import routes =====
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const courseRoutes = require("./routes/courses.routes");
const blogRoutes = require("./routes/blog.routes");
const lessonRoutes = require("./routes/lessons.routes");
const instructorRoutes = require("./routes/instructors.routes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// ===== Middlewares =====
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:5173", // Frontend admin
  "http://localhost:5174", // Frontend customer
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

app.use(morgan("dev"));

// Tắt cache
app.disable("etag");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// ===== Static: Serve thư mục uploads =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Routes =====
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/cart", cartRoutes);

// ===== Connect Database & Start Server =====
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/edupress";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

