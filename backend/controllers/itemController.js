const Item = require("../models/Item");
const User = require("../models/User");
const PointTransaction = require("../models/PointTransaction");

const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      images,
      redeemType,
      pointsRequired,
    } = req.body;

    if (!title || !category || !type || !size || !condition || !redeemType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const item = await Item.create({
      uploaderId: req.user._id,
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      images,
      redeemType,
      pointsRequired:
        redeemType === "points" || redeemType === "both" ? pointsRequired : 0,
      status: "pending",
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { listedItems: item._id },
      $inc: { points: 5 },
    });

    await PointTransaction.create({
      userId: req.user._id,
      type: "earn",
      reason: "listing",
      points: 5,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error("Item creation error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAvailableItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "available" }).populate(
      "uploaderId",
      "name email"
    );
    res.json(items);
  } catch (err) {
    console.error("Get items error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "uploaderId",
      "name email"
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error("Get item by ID error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updates = req.body;

    const item = await Item.findById(itemId);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.uploaderId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this item" });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "type",
      "size",
      "condition",
      "tags",
      "images",
      "redeemType",
      "pointsRequired",
    ];

    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        item[field] = updates[field];
      }
    });

    await item.save();
    res.json(item);
  } catch (err) {
    console.error("Item update error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const items = await Item.find({ uploaderId: userId }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (err) {
    console.error("Get my items error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createItem,
  getAvailableItems,
  getItemById,
  updateItem,
  getMyItems,
};
