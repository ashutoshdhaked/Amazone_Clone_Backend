const express = require('express');
const router = express.Router();
const {VerifyToken} = require('../middleware/VerifyToken');
const {UserTypeController} = require('../controller/UserTypeController');
const {CheckUserType} = require('../middleware/CheckUserType');
router.get("/home",VerifyToken,CheckUserType,UserTypeController);


module.exports = router;