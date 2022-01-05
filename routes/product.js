const Category = require("../models/Category");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; 

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {

      // products = await Product.aggregate([{$lookup: {from: 'categories',localField: 'categories', foreignField: '_id',as:'categories'}}]);
      // const categories = await Category.aggregate([{$lookup: {from: 'products',localField: 'products', foreignField: '_id',as:'product_list'}}]);
      products = await Product.aggregate([{$match: {categories: {$in: [ObjectId(qCategory)]} }}]);

      // const category = await Category.find({'_id': ObjectId(qCategory)}).populate('products.product');
  
      console.log("found products",JSON.stringify(products,null," "));
    } else {
      products = await Product.find({});
    }
    return res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  const {q} = req.query;
  console.log(q);
  const products = await Product.find({ title: { $regex: '^' + q, $options: 'i' } });
  
  console.log(products);
  return res.status(200).json(products);
});

module.exports = router;
