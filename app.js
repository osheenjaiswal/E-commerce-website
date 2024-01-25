const express = require("express")
const mongoose = require("mongoose")
const bodyParser =require("body-parser")
require('dotenv').config()
const PORT = process.env.PORT || 9000

const Product = require ('./Models/Product')
const Category = require('./Models/Category')
const Users = require('./Models/Users')


const app = express()

var cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

const connection = mongoose.connect(process.env.MONGO_URI)
const conn = mongoose.connection
conn.on('open', () => {
    console.log('Database connected')
});

// admin routes
app.use("/backend/api/admin/auth/",require("./Controllers/admin/auth/adminauthcontroller"))
app.use("/backend/api/admin/product/",require("./Controllers/admin/product/productcontroller"))
app.use("/backend/api/admin/category/",require("./Controllers/admin/category/categorycontroller"))

// user routes
app.use("/backend/api/user/frontend/",require("./Controllers/user/frontend/frontendcontroller"))
app.use("/backend/api/user/auth/",require("./Controllers/user/auth/userauthcontroller"))



app.listen(PORT, () =>
    console.log(`app is listening on ${PORT}`)
)