const express = require("express")

const router = express.Router()
const Product = require("../../../Models/Product")

router.post("/create", async (req, res) => {
    try{
        const { name, price, description, image_url, brand, stock, rating } = req.body
        console.log(req.body)
        let data = {
            name: name,
            price: price,
            description: description,
            image_url: image_url,
            brand: brand,
            stock:stock,
            rating:rating
        }
        console.log(data)
        const productData = new Product(data)
        const savedData = await productData.save()
    
        const findSavedProduct = await Product.findById(savedData._id)
        console.log("saved", savedData)
        res.status(200).json({
            status: true,
            message: "Product Added",
            findSavedProduct
        })
    }
    catch (error) {
            res.status(500).json(
                {
                    status: false,
                    message: error.message
                })
    }
})
    
router.get("/list", async (req, res) => {
    try{
        const getProduct = await Product.find({},
            { name: 1, price: 1, description: 1, image_url: 1, createdAt: 1, status: 1 })
    
        if (getProduct.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Data not found",
                data: getProduct
            })
        }
    
        res.status(200).json({
            status: true,
            messsage: " Data found",
            data: getProduct
        })
    }
    catch (error) {
            res.status(500).json(
                {
                    status: false,
                    message: error.message
                }
            )
        }   
})

router.get("/active_product_list", async (req, res) => {

try{
    const getProduct = await Product.find({ status: "Active" },
        { name: 1, price: 1, description: 1, image_url: 1, createdAt: 1, status: 1 })

    if (getProduct.length === 0) {
        return res.status(200).json({
            status: false,
            message: "Data not found",
            data: getProduct
        })
    }

    res.status(200).json({
        status: true,
        message: "Data found",
        data: getProduct
    })
}
catch (error) {
    res.status(400).json(
        {
            status: false,
            message: error.message
        }
    )
}
})

router.get("/statusUpdate/:id", async (req, res) => {

    try{
        let dataId = req.params.id
        console.log("hello")
        const findProduct = await Product.findById(dataId)
        if (!findProduct) {
            return res.status(400).json({
                status: false,
                message: "Product not found",
            })
        }
    
        let productStatus = "Active"
        if (findProduct.status === "Active") {
            productStatus = "Inactive"
        }
    
        const updateProductStatus = await Product.findByIdAndUpdate(dataId, { status: productStatus })
        res.status(200).json({
            status: true,
            message: "Status Updated"
    
        })
    }
    catch(err){
        console.log(err)
        console.log(err.message)
    }   

})

router.get("/singleproduct/delete/:id", async (req, res) => {

    try {
        const findProduct = await Product.findById(req.params.id)
        if (!findProduct) {
            return res.status(400).json({
                status: false,
                message: "Product not exits"
            })
        }

        await Product.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            status: true,
            message: "Product deleted",
        })

    }
    catch (error) {
        res.status(500).json(
            {
                status: false,
                message: error.message
            }
        )
    }
})

router.post("/updateproduct", async (req, res) => {

    try {

        const updateId = req.body.updateId
        let productdata = {
            productname: req.body.productname,
            price: req.body.price,
            description: req.body.description,
            brand: req.body.brand
        }

        const updateProduct = await Product.findByIdAndUpdate(updateId, productdata)
        return res.status(200).send({
            status: true,
            message: "Product Updated",
        })

    }
    catch (error) {
        res.status(500).json(
            {
                status: false,
                message: error.message
            }
        )
    }
})

router.get("/productdelete/deleteall",async(req,res)=>{
    
    try{
        const findProducts = await Product.deleteMany()
        return res.status(200).send({
            status:true,
            message:"Products deleted",
        })
     
    }
    catch(error){
        console.log(error)
        res.status(500).json(
            {
                status:false,
                message:error.message
            }
  )
}
})

module.exports = router;