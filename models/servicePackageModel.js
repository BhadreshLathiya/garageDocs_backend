const mongoose = require("mongoose");

const servicePackageSchema = new mongoose.Schema({
  servicePackageName: {
    type: String,
  },
  includeServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  price: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
servicePackageSchema.set("timestamps", true);
module.exports = mongoose.model("ServicePackage", servicePackageSchema);
