const Store = require("../models/storeModel");
const Product = require("../models/ProductModel");
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

// module.exports = CreateStore;

module.exports = {
  CreateStore,AddProducts

};