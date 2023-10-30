const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');


const CheckUserType = (asyncHandler((req,res,next)=>{
    if (req.user && req.user.usertype === 'shopkeeper') {
        req.email = req.user.email;
        req.id = req.user._id;
        req.type="shopkeeper";
        next();
      } 
     else if (req.user && req.user.usertype === 'normaluser') {
          req.email = req.user.email;
          req.id = req.user._id;
          req.type="normaluser";
        next();
      }
       else {
        res.status(404).json({ message: ' NOT USER :Access denied.' });
      }
}));

module.exports = {CheckUserType};