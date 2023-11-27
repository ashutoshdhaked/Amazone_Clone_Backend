const express = require('express');
const router = express.Router();
const {CheckUserType} = require('../middleware/CheckUserType');
const {VerifyToken} = require('../middleware/VerifyToken');
const {getAllProducts,saveProducts,getUserProducts,deleteProducts,updataProducts,getProductById} = require('../controller/ProductController');

router.get("/getproducts",getAllProducts);
router.post("/saveproducts",VerifyToken,CheckUserType,saveProducts);
router.get("/getuserproducts",VerifyToken,CheckUserType,getUserProducts);
router.delete("/deleteproducts",VerifyToken,CheckUserType,deleteProducts);
router.patch("/updateproducts",VerifyToken,CheckUserType,updataProducts);
router.get("/getproductbyid/:itemId",VerifyToken,CheckUserType,getProductById);

module.exports = router;