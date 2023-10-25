const mongoose = require("mongoose");

const bikeCompanyNameSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  type: {
    type: String,
    default: "bike",
  },
  bikeModel: {
    type: Array,
  },
});
bikeCompanyNameSchema.set("timestamps", true);
module.exports = mongoose.model("bikeCompanyName", bikeCompanyNameSchema);
