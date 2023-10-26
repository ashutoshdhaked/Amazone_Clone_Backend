const express = require('express');
const router = express.Router();
const {checkTypeAsShopkeeper,checkTypeAsNormaluser} = require('../middleware/checkType');
const {shopKeeperController,normalUserController} = require('../controller/UserTypeController');
router.get("/shopkeeper",checkTypeAsShopkeeper,shopKeeperController);
router.get("/normaluser",checkTypeAsNormaluser,normalUserController)


module.exports = router;