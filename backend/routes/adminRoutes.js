const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const {
  getPendingItems,
  approveItem,
  rejectItem,
} = require("../controllers/adminController");


router.use(protect, adminOnly);

router.get("/items/pending", getPendingItems);
router.patch("/items/:id/approve", approveItem);
router.patch("/items/:id/reject", rejectItem);

module.exports = router;
