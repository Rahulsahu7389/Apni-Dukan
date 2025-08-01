const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    userId:{
        type:String,
        requird:true,
    },
    describe:{
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
    available:{
        type:String,
        requird:true,
    },

    
})

module.exports = mongoose.model("products",ProductSchema);