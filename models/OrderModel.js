const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type: [],
        required:true
    }
})

module.exports = mongoose.model("Order",orderSchema)