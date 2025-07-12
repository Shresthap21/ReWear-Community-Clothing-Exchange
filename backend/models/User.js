const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  points: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  listedItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  completedSwaps: [
    { type: mongoose.Schema.Types.ObjectId, ref: "SwapRequest" },
  ],
});
module.exports = mongoose.model("User", userSchema);
