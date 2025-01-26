const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Cart = require("../models/Cart");

// Add new item
router.post("/", async (req, res) => {
  const { sku, name, price } = req.body;

  // Check if required fields are provided
  if (!sku || !name || !price) {
    return res.status(400).json({ error: "SKU, name, and price are required" });
  }

  try {
    // Check if an item with the same SKU already exists
    const existingItem = await Item.findOne({ sku });
    if (existingItem) {
      return res.status(400).json({ error: "Item with this SKU already exists" });
    }

    const newItem = new Item({
      sku,
      name,
      price
    });

    // Save the new item to MongoDB
    await newItem.save();

    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item", details: error.message });
  }
});


// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Search items by query
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const items = await Item.find({
      $or: [{ sku: query }, { name: { $regex: query, $options: "i" } }],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to search items" });
  }
});

// Add item to cart
router.post("/cart", async (req, res) => {
  const { sku, name, price } = req.body;
  try {
    const existingItem = await Cart.findOne({ sku });
    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.json({ message: "Item quantity increased", cartItem: existingItem });
    }
    const newCartItem = new Cart({ sku, name, price, quantity: 1 });  // Set initial quantity to 1
    await newCartItem.save();
    res.json({ message: "Item added to cart", cartItem: newCartItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// Remove item from cart
router.delete("/cart/:sku", async (req, res) => {
  try {
    const { sku } = req.params;
    const item = await Cart.findOne({ sku });
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
      return res.json({ message: "Item quantity reduced", cartItem: item });
    }

    await Cart.deleteOne({ sku });
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// Get all cart items
router.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// Get all cart items and calculate total amount
router.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    let totalAmount = 0;

    // Calculate the total amount
    cartItems.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    res.json({ cartItems, totalAmount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// Remove item from items collection
router.delete("/item/:sku", async (req, res) => {
  try {
    const { sku } = req.params;
    const item = await Item.findOne({ sku });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Corrected line - find and remove the item
    await Item.deleteOne({ sku });  // This works fine with `sku` as the query

    res.json({ message: "Item removed from inventory" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from inventory", details: error.message });
  }
});


// Update item quantity in cart (Increase or Decrease)
router.put("/cart/:sku", async (req, res) => {
  const { sku } = req.params;
  const { action } = req.body;  // "increase" or "decrease"
  
  try {
    const item = await Cart.findOne({ sku });
    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Modify quantity based on action
    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease" && item.quantity > 1) {
      item.quantity -= 1;
    } else if (action === "decrease" && item.quantity === 1) {
      await Cart.deleteOne({ sku });
      return res.json({ message: "Item removed from cart" });
    }

    await item.save();
    res.json({ message: "Cart updated", cartItem: item });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

module.exports = router;
