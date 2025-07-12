const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createItem,
  getAvailableItems,
  getItemById,
  updateItem
} = require("../controllers/itemController");

router.post("/", protect, createItem);

router.get("/", protect, getAvailableItems);

router.get("/:id", protect, getItemById);

router.patch("/:id", protect, updateItem);

module.exports = router;
