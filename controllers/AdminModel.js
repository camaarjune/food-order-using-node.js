const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    userName: {
        type: String,
        requried : true
    },
    password:{
        type: String,
        requried: true
    }
})



module.exports = mongoose.model("Admin", adminSchema)