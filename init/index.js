const mongoose = require('mongoose');
const Product = require('../models/product'); // Adjust the path as necessary
const sampleProducts = require('./data'); // Adjust the path as necessary

const MONGO_URL = "mongodb://127.0.0.1:27017/products";

main()
  .then(() => {
    console.log("Connected to DB");
    return initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Data was initialized");
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};