const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; 

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { 
      type: String, 
      default: "processing",
      enum: [
      "Not Processed",
      "Cash On Delivery",
      "processing",
      "Dispatched",
      "Cancelled",
      "Completed",
    ]
  },
  orderdBy: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
