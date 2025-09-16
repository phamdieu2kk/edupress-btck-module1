
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
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
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
// app.get("/", (req, res) => {
//   res.redirect(process.env.CLIENT_URL || "https://edupress-fe.netlify.app");
// });

// ===== Root page HTML đẹp =====
app.get("/", (req, res) => {
  const frontendURL = process.env.CLIENT_URL || "https://edupress-fe.netlify.app";
  const adminURL = process.env.ADMIN_URL || "https://edupressadmin.netlify.app";
  const apiURL = req.protocol + "://" + req.get("host");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>EduPress Backend</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f3f4f6;
          color: #111827;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 700px;
          margin: 60px auto;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          text-align: center;
        }
        h1 {
          color: #2563eb;
          margin-bottom: 10px;
        }
        p {
          font-size: 1.1rem;
        }
        a {
          color: #2563eb;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 6px;
        }
        .footer {
          margin-top: 30px;
          font-size: 0.85rem;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 EduPress Backend API</h1>
        <p>Status: <b style="color:green">Running ✅</b></p>
        <p>Frontend: <a href="${frontendURL}" target="_blank">${frontendURL}</a></p>
         <p>Admin Frontend: <a href="${adminURL}" target="_blank">${adminURL}</a></p>

        <p>API Base URL: <code>${apiURL}</code></p>
        <p>Health Check: <code>${apiURL}/api/health</code></p>
        
        
        <div class="footer">&copy; ${new Date().getFullYear()} EduPress</div>
      </div>
    </body>
    </html>
  `);
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