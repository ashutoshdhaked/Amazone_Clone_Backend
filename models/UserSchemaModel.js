const mongoose = require('mongoose');
const userSchema =  mongoose.Schema({
    name:{
       type:String,
       require :[true,"Plese enter your name "]
    },
    username:{
        type:String,
        require :[true,"Plese enter your username "]
    },
    email:{
        type:String,
        require :[true,"Plese enter your email "],
        unique :[true,"Email address is already registered "]
     },
    phone:{
        type:String,
        require :[true,"Plese enter your phone "]
    },
    password:{
        type:String,
       require :[true,"Plese enter your password"]
    },
    profileurl:{
        type:String
    },
    usertype:{
        type:String,
        require :[true,"Plese enter your usertype "]
    }
},

{
    timestamps :true
}

)

module.exports = mongoose.model("Users",userSchema);