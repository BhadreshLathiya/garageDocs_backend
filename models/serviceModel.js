const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
  },
  servicePrice: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
serviceSchema.set("timestamps", true);
module.exports = mongoose.model("Service", serviceSchema);
