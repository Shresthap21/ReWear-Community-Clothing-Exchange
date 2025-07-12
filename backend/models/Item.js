const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  title: { type: String, required: true },
  description: { type: String },
  
  category: {
    type: String,
    enum: ["men", "women", "kids", "accessories", "footwear", "home"],
    required: true
  },

  type: {
    type: String,
    enum: ["shirt", "t-shirt", "jeans", "jacket", "dress", "skirt", "shoes", "bag", "scarf", "kurta", "other"],
    required: true
  },

  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "Kids"],
    required: true
  },

  condition: {
    type: String,
    enum: ["new", "gently used", "worn", "vintage", "like new"],
    required: true
  },

  tags: [String],
  images: [String],

  status: {
    type: String,
    enum: ["available", "swapped", "pending"],
    default: "pending"
  },

  redeemType: {
    type: String,
    enum: ["swap", "points", "both"],
    required: true
  },

  pointsRequired: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
