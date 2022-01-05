const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; 

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, index: true, required: true, trim: true, text: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    // categories: { type: Array },
    categories: [
      {
        type: ObjectId,
        ref: "Category",
      }
    ],
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    instock: { type: Boolean, default: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
