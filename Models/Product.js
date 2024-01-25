var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({

    name: {
        type: String,
        required:true
    },
    image_url: {
        type: String,
        required:false
    },
    price: {
        type: Number,
        required:true
    },
    description: {
        type: String,
        required:false
    },
    brand:{
        type: String,
        required:false
    },
    status:{
        type: String,
        default:"Active",
        required:true
    },
    featured: {
        type: Boolean,
        default: false,
    },
      stock: {
        type: Number,
        default: 0,
    },
      rating: {
        type: Number,
        default: 4.9,
        required: false,
    }
 
},{timestamps:true});

let Product = mongoose.model('Product',ProductSchema);
module.exports = Product