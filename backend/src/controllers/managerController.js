const Store = require("../models/storeModel");
const Product = require("../models/ProductModel");
const Cart = require("../models/CartModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const CreateStore = async (req, res) => {
  try {
    const { userId, storeName, slug, category, address, delivery } = req.body;
    console.log('here');

    const newStore = new Store({ userId, storeName, slug, category, address, delivery });
    await newStore.save();

    res.status(200).json({ message: "Store created successfully!", success: true });
  } catch (error) {
    console.error("Store creation error:", error); // ✅ helpful debug log
    res.status(500).json({ message: "Internal server error in making store", success: false });
  }
};

const AddProducts = async (req,res)=>{
  try {
    const { userId,describe , name , price, available } = req.body;
    const newProduct = new Product({userId, describe,name,price,available});
    await newProduct.save();
    res.status(200).json({ message: "Product added successfully!", success: true });
  } catch (error) {
    console.error("Store creation error:", error); // ✅ helpful debug log
    res.status(500).json({ message: "Internal server error in making store", success: false });
  }
}

const deleteOrders = async (req, res) => {
    try {
        const { productId } = req.query;  // Document _id passed from frontend
        // const userId = req.user.id;       // From JWT
        console.log(productId);
        

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        // Delete only if the document belongs to the logged-in user
        const deletedItem = await Cart.findOneAndDelete({ _id: productId});
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Item not found or unauthorized" });
        }

        res.json({ success: true, message: "Item removed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// module.exports = CreateStore;

module.exports = {
  CreateStore,AddProducts,deleteOrders,

};