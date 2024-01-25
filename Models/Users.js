var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    contact:{
        type: Number,
        required:true
    },
    email: {
        type: String,   
        required:false
    },
    address: {
        type: String,
        required:false
    },
    password:{
        type:String,
        required:true
        
    },
    is_admin:{
        type:Number,
        required:true,
        default:0
    }
});

let Users = mongoose.model('users', UsersSchema);

module.exports = Users