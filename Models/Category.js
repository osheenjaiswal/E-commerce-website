var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({

    categoryName: {
        type: String,
        required:true
    },

    
});

let Category = mongoose.model('addcategory',CategorySchema);
module.exports = Category