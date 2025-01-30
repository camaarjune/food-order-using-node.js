// const express = require("express")

// const router = express.Router()

// const OrderModel = require("../model/OrderModel")

// router.post("/order/create", async(req,res) =>{
//     const newOrder = OrderModel(req.body)

//     const saveOrder = await newOrder.save()
//     if(saveOrder){
//         res.send("Order has been saved")
//     }
// })

// // API that displays all order

// router.get("/orders", async (req, res) =>{
//     const getAllorder = await OrderModel.find()
//     if(getAllorder){
//         res.send(getAllorder)
//     }
// })


// // API that deletes order
// router.delete("/delete/:id", async(req,res) =>{
//     const deleteAll = await OrderModel.deleteOne({_id: req.params.id})
//     if(deleteAll){
//         res.send("Data has been deleted")
//     }
// })

// // router.delete('/delete/:id', async (req, res) => {
// //     const { id } = req.params;

// //     // Validate ObjectId format
// //     if (!mongoose.Types.ObjectId.isValid(id)) {
// //         return res.status(400).send('Invalid ID format');
// //     }

// //     try {
// //         const result = await OrderModel.deleteOne({ _id: id });

// //         // Check if any document was deleted
// //         if (result.deletedCount === 0) {
// //             return res.status(404).send('Document not found');
// //         }

// //         res.send('Data has been deleted');
// //     } catch (error) {
// //         console.error('Error deleting document:', error);
// //         res.status(500).send('An error occurred while deleting the document');
// //     }
// // });



// module.exports  = router


const express = require("express");
const mongoose = require("mongoose"); // Ensure this is imported
const router = express.Router();
const OrderModel = require("../model/OrderModel");

// POST API to create an order
router.post("/order/create", async (req, res) => {
    try {
        const newOrder = new OrderModel(req.body); // Fixed model instantiation
        const saveOrder = await newOrder.save();

        if (saveOrder) {
            return res.status(201).send("Order has been saved"); // Use status 201 for created resources
        }
        return res.status(400).send("Failed to save the order");
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Server error while creating order");
    }
});

// GET API to display all orders
router.get("/orders", async (req, res) => {
    try {
        const getAllOrder = await OrderModel.find();

        if (getAllOrder.length > 0) {
            return res.status(200).send(getAllOrder);
        }
        return res.status(404).send("No orders found");
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Server error while fetching orders");
    }
});

// DELETE API to delete an order
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID format");
    }

    try {
        const deleteResult = await OrderModel.deleteOne({ _id: id });

        // Check if any document was deleted
        if (deleteResult.deletedCount === 0) {
            return res.status(404).send("Order not found");
        }

        return res.status(200).send("Order has been deleted");
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).send("An error occurred while deleting the order");
    }
});

module.exports = router;
