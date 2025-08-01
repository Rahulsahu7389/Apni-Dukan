const mongoose = require("mongoose")

const StoreSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    storeName:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    delivery:{
        type:String,
        required:true,
    },
})
module.exports = mongoose.model("stores",StoreSchema);