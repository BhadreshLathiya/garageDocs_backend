const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  workShopName: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  workShopAddress: {
    type: String,
  },
  token: {
    type: String,
  },

  mobileNo: {
    type: String,
  },
  image: {
    type: String,
  },
  deviceToken: {
    type: String,
  },
  garageType: {
    type: String,
  },
  isExpire: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  isVerify: {
    type: Boolean,
  },
  isRegister: {
    type: Number,
    default: 0,
  },
  signature: {
    type: String,
  },
  otp: {
    type: Number,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  endDate: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.index({ type: 1 });

userSchema.set("timestamps", true);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};
// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
