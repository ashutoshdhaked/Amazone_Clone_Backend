const express = require('express');
const router = express.Router();
const {getOrders,saveOrder,pendingOrder,updateStatus} = require('../controller/OrderController');
router.get('/getorders',getOrders);
router.post('/saveorder',saveOrder);
router.get('/getpendingorder',pendingOrder);
router.post('/updatestatus/:id',updateStatus);

module.exports = router;