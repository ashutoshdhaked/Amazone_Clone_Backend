const asyncHandler = require('express-async-handler');
const UserTypeController = (asyncHandler(async(req,res)=>{
  try{
     const usertype = req.type;
     if(usertype){
           return res.status(200).json({usertype:usertype});
     }
     else{
       return res.status(404).json({message :"Invalid User : user not having any access "});
     }
    }
    catch(error){
      return res.status(500).json({message :"Internal Server Error"});
    }

}));

module.exports = {UserTypeController};