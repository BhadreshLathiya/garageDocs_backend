const mongoose = require("mongoose");

const repairTagSchema = new mongoose.Schema({
  repairTagName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  price:{
    type: Number,
  },
  userType:{
    type:Number
  }
});
repairTagSchema.set("timestamps", true);
module.exports = mongoose.model("repairTag", repairTagSchema);
