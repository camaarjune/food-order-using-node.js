const express = require("express")
const router = express.Router()

const AdminModel = require("../controllers/AdminModel")

// API adim sameenyo

router.post("/admin/create", async(req, res) =>{
    const newAdmin = AdminModel(req.body)
    const saveAdim = await newAdmin.save()
    if(saveAdim){
        res.send("Admin has been saved")
    }
})

module.exports = router