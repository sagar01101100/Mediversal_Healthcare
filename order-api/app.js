const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const connectDB = require("./db"); 
const Order = require("./models/Order");

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB 
connectDB();

//Add a new Order
app.post("/api/orders", async (req, res) => {
  const { customerName, medicationName, quantity, price, orderDate, status } = req.body;

  // Validate required fields
  if (!customerName || typeof customerName !== "string") {
    return res.status(400).json({ message: "Invalid or missing customerName" });
  }
  if (!medicationName || typeof medicationName !== "string") {
    return res.status(400).json({ message: "Invalid or missing medicationName" });
  }
  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ message: "Invalid or missing quantity" });
  }
  if (!price || typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Invalid or missing price" });
  }
  if (status && !["Pending", "Completed", "Cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    // Dynamically generate a unique orderId
    const orderId = uuidv4();

    const newOrder = new Order({
      orderId,
      customerName,
      medicationName,
      quantity,
      price,
      orderDate: orderDate || new Date(),
      status: status || "Pending",
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    return res.status(400).json({ message: "Error creating order", error });
  }
});



app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching orders" });
  }
});


// Route to fetch a specific order by orderId
app.get("/api/orders/:orderId", async (req, res) => {
  const { orderId } = req.params; 

  try {
    const order = await Order.findOne({ orderId }); 

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching order" });
  }
});


// Route to delete an order by orderId
app.delete("/api/orders/:orderId", async (req, res) => {
  const { orderId } = req.params; // Extract orderId from URL parameters

  try {
    const deletedOrder = await Order.findOneAndDelete({ orderId }); // Delete order by orderId

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" }); // Respond with 404 if order doesn't exist
    }

    return res.status(200).json({ message: "Order deleted successfully", deletedOrder }); // Respond with success message and deleted order
  } catch (error) {
    return res.status(500).json({ message: "Error deleting order" }); // Handle any other errors
  }
});


// Route to delete all orders
app.delete("/api/orders", async (req, res) => {
  try {
    const result = await Order.deleteMany({}); // Delete all documents in the Orders collection

    return res.status(200).json({
      message: "All orders deleted successfully",
      deletedCount: result.deletedCount, // Number of documents deleted
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting orders", error });
  }
});




// Export the app for server setup or testing
module.exports = app;
