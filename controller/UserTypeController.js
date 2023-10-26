 const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');


const shopKeeperController = (asyncHandler((req,res)=>{
    if (req.user && req.user.usertype === 'shopkeeper') {
        res.status(200).json({ message: 'Access granted for shopkeepers.' });
      } else {
        res.status(404).json({ message: 'Shopkeeper access denied.' });
      }
}));

const normalUserController = (asyncHandler((req,res)=>{
      const check = jwt.verify()
    if (req.usertype === 'normaluser') {
        res.status(200).json({ message: 'Access granted for normaluser.' });
      } else {
        res.status(404).json({ message: 'NormalUser  access denied.' });
      }
}));

module.exports = {shopKeeperController,normalUserController};