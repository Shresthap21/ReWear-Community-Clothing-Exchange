const Item = require("../models/Item");

const getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "pending" }).populate(
      "uploaderId",
      "name email"
    );
    res.json(items);
  } catch (err) {
    console.error("Error fetching pending items:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item || item.status !== "pending") {
      return res
        .status(404)
        .json({ message: "Item not found or already processed" });
    }

    item.status = "available";
    await item.save();

    res.json({ message: "Item approved and is now available" });
  } catch (err) {
    console.error("Error approving item:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const rejectItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item || item.status !== "pending") {
      return res
        .status(404)
        .json({ message: "Item not found or already processed" });
    }

    await item.deleteOne();
    res.json({ message: "Item rejected and removed" });
  } catch (err) {
    console.error("Error rejecting item:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPendingItems,
  approveItem,
  rejectItem,
};
