const mongoose = require('mongoose');

const connectionDB = async ()=>{
    try{
   await mongoose.connect('mongodb://localhost:27017/Amazonedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
     });
    }
    catch(error){
        console.log("error in connection of mongodb !!");
    }

}

module.exports = connectionDB;



