const mongoose = require('mongoose');

const MarketplaceItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['rent', 'sale'], required: true },
  owner: { type: String, required: true }, // user id or email
  ownerName: { type: String, required: true },
  ownerContact: { type: String, required: true }, // phone or email
  category: { type: String },
  condition: { type: String },
  images: [{ type: String }], // Array of image URLs
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MarketplaceItem', MarketplaceItemSchema);