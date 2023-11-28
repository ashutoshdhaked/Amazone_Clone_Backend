const express = require('express');
const router = express.Router();
const {CheckUserType} = require('../middleware/CheckUserType');
const {VerifyToken} = require('../middleware/VerifyToken');
const multer = require('multer');
const upload = multer();
const {getAllProducts,saveProducts,getUserProducts,deleteProducts,updataProducts,getProductById,saveCategory,getAllCategoryName,getAllCategory,getProductByCategoryId} = require('../controller/ProductController');

router.get("/getproducts",getAllProducts);
router.post("/saveproducts",VerifyToken,CheckUserType,saveProducts);
router.get("/getuserproducts",VerifyToken,CheckUserType,getUserProducts);
router.delete("/deleteproducts",VerifyToken,CheckUserType,deleteProducts);
router.patch("/updateproducts",VerifyToken,CheckUserType,updataProducts);
router.get("/getproductbyid/:itemId",VerifyToken,CheckUserType,getProductById);

router.post("/savecategory",upload.single('file'),saveCategory);
router.get("/getallcategoryname",getAllCategoryName);
router.get("/getallcategory",getAllCategory);
router.get("/getproductbycategoryid/:id",getProductByCategoryId);

module.exports = router;