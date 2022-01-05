const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; 

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: "Name is required", unique: true, trim: true,  minlength: [2, "Too short"],maxlength: [32, "Too long"] },
    slug: { type: String, unique: true, lowercase: true, index: true, },
    products: [{
      type: ObjectId,
      ref: "Product",
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
