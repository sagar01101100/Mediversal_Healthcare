// const mongoose = require("mongoose");

// // Schema for Pharmacy Orders
// const OrderSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     medicationName: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true },
//     orderDate: { type: Date, default: Date.now },
//     status: { type: String, default: "Pending", enum: ["Pending", "Completed", "Cancelled"] },
//   },
//   { timestamps: true }
// );

// // Create the Order model
// const Order = mongoose.model("Order", OrderSchema);

// module.exports = Order;



const mongoose = require("mongoose");

// Schema for Pharmacy Orders
const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // Add orderId
    customerName: { type: String, required: true },
    medicationName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: "Pending", enum: ["Pending", "Completed", "Cancelled"] },
  },
  { timestamps: true }
);

// Create the Order model
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;

