const express = require("express")

const router = express.Router()


const UserModel = require("../models/UserModel")

// Register new User

router.post("/user/ccount", async (req, res) =>{
  const newUser = UserModel(req.body)
  const saveUser = await newUser.save()
  if(saveUser){
    res.send("user has been saved")
  }
})


router.get("/user", async (req, res) =>{
    const getAllUser = await UserModel.find()
    if(getAllUser){
        res.send(getAllUser)
    }
})


// login user



router.post("/user/login", async(req, res) =>{
  if(req.body.email && req.body.password){
    const user = await UserModel.findOne(req.body)
    if(user){
        res.send(user)
    
} 
else{
    res.send({error: "wrong email or password"})
}

  } else {
    res.send ({error:"please enter email and password"})
  }
}
)

module.exports = router