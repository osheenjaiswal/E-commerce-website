const express = require("express")

const router = express.Router()
const Product = require("../../../Models/Product")


router.get("/active_product_list",async(req,res)=>{
    
 
    // const getProduct =await Product.find({status:"Active"},
    // {name:1,price:1,description:1,image_url:1,createdAt:1,status:1}).limit(3)
    const getProduct =await Product.find({status:"Active"},
    {name:1,price:1,description:1,image_url:1,createdAt:1,status:1})
    if(getProduct.length === 0){
        return res.status(400).json({
            status:false,
            message:"Data not found",
            data:getProduct
           })
    }

    res.status(200).json({
     status:true,
     message:"Data found",
     data:getProduct
    })
 })

module.exports = router;