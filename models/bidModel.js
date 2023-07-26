const mongoose = require('mongoose');
const bidSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('bids', bidSchema);
