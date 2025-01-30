const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const app = express()
app.use(express.json())
app.use(cors())


// importing user route

const UserRoute = require("./routes/UserRoute")
app.use(UserRoute)

// importing Order route

const OrderRoute = require("./routes/OrderRoute")
app.use(OrderRoute)

// importing Adim route

const AdminRoute = require("./routes/AdminRoute")
app.use(AdminRoute)


// importing food model
const foodModel = require("./controllers/FoodModel")


mongoose.connect(
    "mongodb+srv://camaar:camaar@cluster0.3f4cm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then(()=>{
    console.log("Data has been  Connected to MongoDB")
})
//multer file name and location
//destination means locationmongodb://camaar:<db_password>@<hostname>/?ssl=true&replicaSet=atlas-96v0w8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0

// const imageLocation = multer.diskStorage({
//     destination:(req, file, cb)=>{
//         cb(null,"images")
//     },

//     filename:(req, file, cb)=>{
//         cb(null,file.originalname)
//     }
// })

// const uploadImage = multer({
//     storage: imageLocation
// })

// app.post("/food/create", uploadImage.single("image"), async (req,res) =>{
//     const newFood = foodModel({
//         name : req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         image:req.file.filename
//     })

//     const saveFood = await newFood.save()
//     if(saveFood){

//         res.send(saveFood)
//     }
// })

const imageLocation = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); // Ensure 'images' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    }
});

// Initialize Multer
const uploadImage = multer({
    storage: imageLocation
});

// Route to handle food creation with image upload
app.post('/food/create', uploadImage.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }

        const newFood = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename // This should now work if file is correctly uploaded
        });

        const savedFood = await newFood.save();
        res.status(201).send(savedFood);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add food item' });
    }
});

app.get("/food",async (req,res) =>{
    const food = await foodModel.find()
    if(food){
        res.send(food)
    }
})


// app.delete("/delete/:id", async (req,res) =>{
//     const deleteFood = await foodModel.deleteOne({_id: req.params.id})
//     if(deleteFood){
//         res.send("Data has been deleted")
//     }
// })


// app.delete("/delete/:id", async (req, res) => {
//     const id = req.params.id;
//     console.log("Received delete request for ID:", id); // Debugging log
  
//     // Check if the ObjectId is valid
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       console.error("Invalid ObjectId format:", id); // Debugging log
//       return res.status(400).send("Invalid ID format");
//     }
  
//     try {
//       // Perform the delete operation
//       const deleteResult = await foodModel.deleteOne({ _id: id });
//       console.log("Delete result:", deleteResult); // Debugging log
  
//       if (deleteResult.deletedCount > 0) {
//         // Successfully deleted
//         res.status(200).send("Data has been deleted");
//       } else {
//         // No document found with the specified ID
//         console.error("No document found with ID:", id); // Debugging log
//         res.status(404).send("Food not found");
//       }
//     } catch (error) {
//       // Error handling
//       console.error("Error deleting food:", error); // Debugging log
//       res.status(500).send("Internal Server Error");
//     }
//   });

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }
  
    const deleteResult = await foodModel.deleteOne({ _id: id });
    if (deleteResult.deletedCount > 0) {
      res.status(200).send("Data has been deleted");
    } else {
      res.status(404).send("Food not found");
    }
  });
  
  


app.put("/update/:id", async (req, res)=>{
    const foodUpdate = await foodModel.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )
    if(foodUpdate){
        res.send("Data has beeen updated")
    }
})





app.get("/single/update/:id", async (req, res)=>{
    const  getSingle = await foodModel.find({_id: req.params.id})
    if(getSingle){
        res.send(getSingle)
    }
})


//making route for the images

app.use("/Images", express.static("images"))










app.listen(1000,() =>{
    console.log("Server is running on port 1000")
})
