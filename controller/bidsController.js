const Bid = require('../models/bidModel');

// PLACING NEW BID
const placeNewBid = async (req, res) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    res.send({
      success: true,
      message: 'Bid Successfully placed',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// TO GET ALL BIDS
const getAllBids = async (req, res) => {
  try {
    const { product, seller } = req.body;
    let filters = {};
    if (product) {
      filters.product = product;
    }
    if (seller) {
      filters.seller = seller;
    }
    const bids = await Bid.find(filters)
      .populate('product')
      .populate('buyer')
      .populate('seller')
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data: bids,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { placeNewBid, getAllBids };
