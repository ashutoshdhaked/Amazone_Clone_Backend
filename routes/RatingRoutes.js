const express = require('express');
const router = express.Router();
const {saveRating,getUserRating,SaveProductRating,getRateingUser,getAllProductsRating,getProductRating} = require('../controller/RatingController');

router.post("/saverating",saveRating);
router.get("/getrating/:id",getUserRating);
router.post("/saveproductrating",SaveProductRating);
router.get("/getratingofshopkeeper/:id",getAllProductsRating);
router.get("/getproductrating/:id",getProductRating);
// router.get("/getrateduser/:id",getRateingUser);



module.exports = router;