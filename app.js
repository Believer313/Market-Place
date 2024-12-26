const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product'); // Adjust the path as necessary

app.set('view engine', 'ejs');
app.set('views', './views'); // Ensure this path is correct

app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(methodOverride('_method')); // To support PUT and DELETE methods

const MONGO_URL = "mongodb://127.0.0.1:27017/products";

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Index Route - Show all products
app.get('/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    console.log('All Products:', allProducts); // Debugging log
    res.render('products/index', { allProducts });
  } catch (err) {
    res.status(500).send(err);
  }
});

// New Route 
app.get('/products/new', (req, res) => {
  res.render('products/new');
});

// Create Route 
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Show Route 
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('products/show.ejs', { product });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Edit Route 
app.get('/products/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update Route 
app.put('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/products/${req.params.id}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete Route
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err);
  }
});