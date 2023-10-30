const jwt = require('jsonwebtoken');
require('dotenv').config();
const { promisify } = require('util');
const VerifyToken = async (req,res,next) =>{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.SECREATE_KEY_USER);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
}



module.exports = {VerifyToken};

