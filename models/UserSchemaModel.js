const mongoose = require('mongoose');
const userSchema =  mongoose.Schema({
    profile:{
        type:String
    },
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
    },
    about:{
      type:String
    }

},

{
    timestamps :true
}

)

module.exports = mongoose.model("Users",userSchema);