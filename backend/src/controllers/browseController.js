const express = require("express");
const Store = require("../models/storeModel");
const Product = require("../models/ProductModel");
const Carts = require("../models/CartModel");
// const { useId } = require("react");

const browseStore = async (req, res) => {
  try {
    const data = await Store.find({});
    if (!data) {
      return res.status(200).json({ message: "No Stores are available Now", success: true })
    }
    return res.status(200).json({ message: data, success: true })

  } catch (error) {
    return res.status(500).json({ message: error, success: false })
  }


}

const getCheckout = async (req, res) => {
  try {
    const { cartItems, totalPrice } =  req.body;
    if (!cartItems || !totalPrice) {
      return res.status(204).json({ message: "nothing was selected in cart", success: false })
    }
    const savedItems = await Promise.all(//we used promise for all the saving and updating process and until done wont go further

      cartItems.map(async (item) => {
        const cartItem = new Carts({
          userId:item.userId,
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          IdofUser:item.IdofUser,
          totalPrice:totalPrice
        });
        return await cartItem.save();
      })
    );
    return res.status(200).json({ message: "Thank you for the order!!", success: true })

  } catch (error) {
    return res.status(500).json({ message: error, success: false })
  }
}

const getProducts = async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId);

    const products = await Product.find({ userId });  // multiple docs
    const store = await Store.findOne({ userId });    // single doc

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found!" });
    }

    if (!store) {
      return res.status(404).json({ success: false, message: "No store found for this user!" });
    }

    // Merge store data into each product
    const mergedData = products.map(product => ({
      ...product.toObject(), // convert mongoose doc to plain object
      store: store.toObject() // add store data
    }));

    return res.status(200).json({ success: true, data: mergedData });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getOrders = async (req,res)=>{
  try {
    const userId = req.query.id;
    const orders = await Carts.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user!" });
    }

    return res.status(200).json({ success: true, data: orders });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
}



module.exports = { browseStore, getProducts, getCheckout ,getOrders };