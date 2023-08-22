const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
  garageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },
  password: {
    type: String,
  },
  employeeId: {
    type: Number,
  },
  repairOrder: [
    {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
      price: {
        type: Boolean,
        default: false,
      },
    },
  ],
  counterSale: [
    {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  ],
  purchaseOrder: [
    {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  ],
  appointment: [
    {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  ],
  accounts: [
    {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
      income: {
        type: Boolean,
        default: false,
      },
      paymentDue: {
        type: Boolean,
        default: false,
      },
    },
  ],
  workshopeDetail: [
    {
      edit: {
        type: Boolean,
        default: false,
      },
      userAccess: {
        type: Boolean,
        default: false,
      },
      employee: {
        type: Boolean,
        default: false,
      },
      vendors: {
        type: Boolean,
        default: false,
      },
      reports: {
        type: Boolean,
        default: false,
      },
      downloadReports: {
        type: Boolean,
        default: false,
      },
      itemMaster: {
        type: Boolean,
        default: false,
      },
      packageMaster: {
        type: Boolean,
        default: false,
      },
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

employeeSchema.index({ type: 1 });

employeeSchema.set("timestamps", true);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// JWT TOKEN
employeeSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generating Password Reset Token
employeeSchema.methods.getResetPasswordToken = function () {
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

employeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("employee", employeeSchema);
