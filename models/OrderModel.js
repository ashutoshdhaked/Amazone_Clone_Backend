const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
    status :String,
    amount : String,
    email :String,
    phone :String,
    address : String,
    objects: [ {
        productid :String,
        customerid :String,  
        shopid :String,
        mrp :Number,
        quantity :Number,
        price :Number,
        title :String,
        name :String,
        totalamout :Number,
        email:String,
        phone:String,
        address:String,
  },
]
},
{
    timestamps :true
}
)

module.exports = mongoose.model("Orders",OrderSchema);