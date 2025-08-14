require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const courseRoutes = require('./routes/courses.routes');
// const adminRoutes = require('./routes/admin.routes'); // nếu cần

const app = express();

// ===== Middlewares =====
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(morgan('dev'));

// ===== Connect Database =====
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/edupress');

// ===== Health Check =====
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
// app.use('/api/admin', adminRoutes); // nếu cần

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
