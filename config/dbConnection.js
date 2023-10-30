const mongoose = require('mongoose');
const env = require('dotenv').config();

const connectionDB = async ()=>{
    const db_url = process.env.DATABASE_CONNECTION_URL;
    try{
   await mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
     });
    }
    catch(error){
        console.log("error in connection of mongodb !!");
    }

}

module.exports = connectionDB;



