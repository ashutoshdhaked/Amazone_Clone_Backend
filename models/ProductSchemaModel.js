const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
   
        url:{
            type:String,
            require :[true,"Plese enter your url "]
         },
        detailUrl:{
            type:String,
            require :[true,"Plese enter your detail "]
         },
        shorttitle:{
            type:String,
            require :[true,"Plese enter your shorttitle "]
         },
        longtitle:{
            type:String,
            require :[true,"Plese enter your longtitle "]
         },
        mrp:{
            type:Number,
            require :[true,"Plese enter your mrp "]
         },
        cost:{
            type:Number,
            require :[true,"Plese enter your cost "]
         },
        discount:{
            type:Number,
            require :[true,"Plese enter your discount "]
         },
        description:{
            type:String,
            require :[true,"Plese enter your description "]
         },
        detail:{
            type:String,
            require :[true,"Plese enter your datail "]
         },
        tagline:{
            type:String,
            require :[true,"Plese enter your tagline "]
        },
        userid:{
            type:String
        }
},
{
    timestamps :true
}

);

module.exports = mongoose.model("products",productSchema);