const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
      shopid : String,
      url:String,
      name:String,
      descryption :String
},
{
    timestamp:true
}
)
module.exports = mongoose.model("Categories",CategorySchema);