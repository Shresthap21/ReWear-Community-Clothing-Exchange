const mongoose = require("mongoose");
const txnSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["earn", "spend"],
  },
  reason: {
    type: String,
    enum: ["signup", "listing", "swap", "admin"],
  },
  points: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("PointTransaction", txnSchema);
