const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { requestSwap, acceptSwap, rejectSwap, getMySwaps } = require("../controllers/swapController");

router.post("/request", protect, requestSwap);
router.post("/:id/accept", protect, acceptSwap);
router.post('/:id/reject', protect, rejectSwap);
router.get('/mine', protect, getMySwaps);

module.exports = router;
