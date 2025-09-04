// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['ADMIN', 'CUSTOMER'], default: 'CUSTOMER' },
//   phone: String,
//   gender: String,
//   nationality: String,
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);



// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['ADMIN', 'CUSTOMER'], default: 'CUSTOMER' },
//   phone: String,
//   gender: String,
//   nationality: String,
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true }, // 👈 thống nhất field này
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "CUSTOMER"],
      default: "CUSTOMER",
    },
    phone: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    nationality: { type: String },

    // phục vụ reset password qua OTP / token
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// Hash password trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method để so sánh mật khẩu khi login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
