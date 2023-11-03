const express = require('express');
const router = express.Router();
const {getOrders,saveOrder,pendingOrder} = require('../controller/OrderController');
router.get('/getorders',getOrders);
router.post('/saveorder',saveOrder);
router.get('/getpendingorder',pendingOrder);

module.exports = router;