const mongoose = require("mongoose");

const vendorBillSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "pending",
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
  },
});

vendorBillSchema.set("timestamps", true);
module.exports = mongoose.model("vendorBill", vendorBillSchema);
