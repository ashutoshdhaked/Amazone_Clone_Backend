const mongoose = require('mongoose');

const productratingschema = mongoose.Schema({
    pid : String,
    userid: String,
    shopid:String,
    star :Number
},
{
        timestamps :true
}
)

module.exports = mongoose.model("ProductRating",productratingschema);