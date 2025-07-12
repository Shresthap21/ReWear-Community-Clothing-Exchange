const mongoose = require("mongoose");
const swapSchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  responderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  itemRequestedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  itemOfferedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    default: null,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
});
module.exports = mongoose.model("SwapRequest", swapSchema);
