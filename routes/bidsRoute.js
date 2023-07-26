const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// BID CONTROLLER
const { placeNewBid, getAllBids } = require('../controller/bidsController');

// PLACING NEW BID
router.post('/place-new-bid', authMiddleware, placeNewBid);

// TO GET ALL BIDS
router.post('/get-all-bids', authMiddleware, getAllBids);

module.exports = router;
