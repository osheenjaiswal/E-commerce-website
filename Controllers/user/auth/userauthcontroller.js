const express = require("express")
const router = express.Router()

const Users = require('../../../Models/Users')

router.post("/signup", async (req, res) => {

    try {
        console.log(req.body)
        let data = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
            contact: req.body.contact
        }

        const isUserExits = await Users.findOne({
            email: req.body.email
        })

        if (isUserExits) {
            return res.status(400).json({
                status: false,
                message: "Email already exits"
            })
        }
        
        const adduser = new Users(data)
        await adduser.save()

        console.log("user", adduser)
        return res.status(200).send({
            status: true,
            message: "Registered successfull",
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(
            {
                status: false,
                message: error.message
            }
        )
    }

})

router.post("/userlogin", async (req, res) => {

    try {
        const { email, password } = req.body
        const isUserExists = await Users.findOne({
            email: email
        })

        if (!isUserExists) {
            return res.status(400).json({
                status: false,
                message: "User doesn't exists Please Sign Up before Login"
            })
        }

        const matchPassword = await Users.findOne({
            email: email,
            password: password
        })

        if (!matchPassword) {
            return res.status(400).json({
                status: false,
                message: "Invalid Passsword"
            })
        }
        return res.status(200).send({
            status: true,
            message: "Login successfull",
            data: isUserExists
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

})

module.exports = router;