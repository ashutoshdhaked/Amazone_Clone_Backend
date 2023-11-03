const express = require('express');
const router = express.Router();
const {CheckUserType} = require('../middleware/CheckUserType');
const {VerifyToken} = require('../middleware/VerifyToken');
const {getAllProducts,saveProducts,getUserProducts,deleteProducts,updataProducts,getProductById} = require('../controller/ProductController');

router.get("/getproducts",getAllProducts);
router.post("/saveproducts",VerifyToken,CheckUserType,saveProducts);
router.get("/getproducts/:token",VerifyToken,CheckUserType,getUserProducts);
router.delete("/deleteproducts/:token",VerifyToken,CheckUserType,deleteProducts);
router.patch("/updateproducts/:token",VerifyToken,CheckUserType,updataProducts);
router.get("/getproductbyid/:itemId",VerifyToken,CheckUserType,getProductById);

module.exports = router;