const SwapRequest = require("../models/SwapRequest");
const Item = require("../models/Item");
const User = require("../models/User");
const PointTransaction = require("../models/PointTransaction");

const requestSwap = async (req, res) => {
  try {
    const { itemRequestedId, itemOfferedId } = req.body;
    const userId = req.user._id;

    if (!itemRequestedId) {
      return res.status(400).json({ message: "itemRequestedId is required" });
    }

    const item = await Item.findById(itemRequestedId);
    if (!item || item.status !== "available") {
      return res.status(404).json({ message: "Requested item not available" });
    }

    if (item.uploaderId.toString() === userId.toString()) {
      return res.status(400).json({ message: "Cannot request your own item" });
    }

    const swap = await SwapRequest.create({
      requesterId: userId,
      responderId: item.uploaderId,
      itemRequestedId,
      itemOfferedId: itemOfferedId || null,
    });

    res.status(201).json(swap);
  } catch (err) {
    console.error("Swap request error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const acceptSwap = async (req, res) => {
  try {
    const swapId = req.params.id;
    const userId = req.user._id;

    const swap = await SwapRequest.findById(swapId)
      .populate("itemRequestedId")
      .populate("itemOfferedId");

    if (!swap || swap.status !== "pending") {
      return res
        .status(404)
        .json({ message: "Swap request not found or already processed" });
    }

    if (swap.responderId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the responder can accept the swap" });
    }

    const item = swap.itemRequestedId;

    if (item.uploaderId.toString() === swap.requesterId.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot swap with your own item" });
    }

    swap.status = "accepted";
    await swap.save();

    await Item.findByIdAndUpdate(item._id, { status: "swapped" });

    if (swap.itemOfferedId) {
      await Item.findByIdAndUpdate(swap.itemOfferedId._id, {
        status: "swapped",
      });
    } else if (item.redeemType === "points" || item.redeemType === "both") {
      const points = item.pointsRequired || 0;

      const requester = await User.findById(swap.requesterId);
      const responder = await User.findById(swap.responderId);

      if (requester.points < points) {
        return res
          .status(400)
          .json({ message: "Insufficient points for this swap" });
      }

      requester.points -= points;
      responder.points += points;

      await requester.save();
      await responder.save();

      await PointTransaction.create([
        {
          userId: requester._id,
          type: "spend",
          reason: "swap",
          points,
        },
        {
          userId: responder._id,
          type: "earn",
          reason: "swap",
          points,
        },
      ]);
    }

    await User.findByIdAndUpdate(swap.requesterId, {
      $push: { completedSwaps: swap._id },
    });

    await User.findByIdAndUpdate(swap.responderId, {
      $push: { completedSwaps: swap._id },
    });

    res.json({ message: "Swap accepted successfully" });
  } catch (err) {
    console.error("Swap accept error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const rejectSwap = async (req, res) => {
  try {
    const swapId = req.params.id;
    const userId = req.user._id;

    const swap = await SwapRequest.findById(swapId);
    if (!swap || swap.status !== 'pending') {
      return res.status(404).json({ message: 'Swap not found or already processed' });
    }

    if (swap.responderId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Only the responder can reject the swap' });
    }

    swap.status = 'rejected';
    await swap.save();

    res.json({ message: 'Swap rejected successfully' });
  } catch (err) {
    console.error('Swap reject error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMySwaps = async (req, res) => {
  try {
    const userId = req.user._id;

    const swaps = await SwapRequest.find({
      $or: [{ requesterId: userId }, { responderId: userId }]
    })
      .populate('itemRequestedId')
      .populate('itemOfferedId')
      .sort({ updatedAt: -1 });

    res.json(swaps);
  } catch (err) {
    console.error('Get my swaps error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  requestSwap,
  acceptSwap,
  rejectSwap,
  getMySwaps
};
