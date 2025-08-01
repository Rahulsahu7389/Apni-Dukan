const mongoose = require("mongoose")
const CartSchema = new mongoose.Schema({
    userId:{
        type:String,
        requird:true,
    },
    productId:{
        type:String,
        requird:true,
    },
    quantity:{
        type:String,
        requird:true,
    },
    name:{
        type:String,
        requird:true,
    },
    price:{
        type:String,
        requird:true,
    },
    IdofUser:{
        type:String,
        required:true,
    // this is the id of the user who is buying the product
    },
    totalPrice:{
        type:String,
        required:true,
    },
    
})

module.exports = mongoose.model("carts",CartSchema);