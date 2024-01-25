const express = require("express")

const router = express.Router()

router.get("/adminlogin", async (req,res)=>{
    try{
        console.log(req.body)
        const getAdmin = await Users.findOne({ "email": req.body.email })
    
        if (!getAdmin) {
            return res.status(400).send({
                status: false,
                message: "Invalid Email"
            })
        }
      
        if (getAdmin.password !== req.body.password) {
            return res.status(400).send({
                status: false,
                message: "Invalid Password"
            })
        }
    
        return res.status(200).send({
            status: true,
            message: "Login successfull",
            data: getAdmin
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