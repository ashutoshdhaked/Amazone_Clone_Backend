const express = require('express');
const router = express.Router();
const {getAllProducts,saveProducts,getUserProducts,deleteProducts,updataProducts} = require('../controller/ProductController');

router.route("/getproducts").get(getAllProducts);
router.route("/saveproducts").post(saveProducts);
router.route("/getproducts/:userid").get(getUserProducts);
router.route("/deleteproducts/:id").delete(deleteProducts);
router.route("/updateproducts/:id").patch(updataProducts);

module.exports = router;