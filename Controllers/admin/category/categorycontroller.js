const express = require("express")

const router = express.Router()
const Category = require('../../../Models/Category')

router.post("/addcategory", async (req, res) => {

    try {
        console.log(req.body)
        let data = {
            categoryName: req.body.name,                 //image=postman //productName=schemaname

        }
        const newcategory = new Category(data)
        await newcategory.save()

        return res.status(200).send({
            status: true,                            //necessary
            message: "Category added successfully",
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
router.get("/categorylist", async (req, res) => {

    try {
        // const data =await users.find({"name":"admin2"})
        const data = await Category.find()

        return res.status(200).send({
            status: true,
            message: "data found",
            data
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
router.get("/category/delete/:id", async (req, res) => {

    try {
        console.log(req.params)
        const findCategory = await Category.findByIdAndDelete({
            "categoryId": req.params._Id
        })
        if (!findCategory) {
            return res.status(400).json({
                status: false,
                message: "Category not exits"
            })
        }

        return res.status(200).send({
            status: true,
            message: "Category deleted",
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

module.exports = router;