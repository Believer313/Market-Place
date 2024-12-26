const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  rating: Number,
  category: String,
  ratingCount: Number,
});

module.exports = mongoose.model('Product', productSchema);
