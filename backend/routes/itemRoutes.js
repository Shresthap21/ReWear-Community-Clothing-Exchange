const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createItem,
  getAvailableItems,
  getItemById,
  updateItem,
  getMyItems
} = require("../controllers/itemController");

router.post("/", protect, createItem);
router.get("/", protect, getAvailableItems);
router.get("/:id", protect, getItemById);
router.patch("/:id", protect, updateItem);
router.get("/mine", protect, getMyItems);

module.exports = router;
