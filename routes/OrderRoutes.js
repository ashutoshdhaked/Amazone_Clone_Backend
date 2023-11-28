const express = require('express');
const router = express.Router();
const {getOrders,saveOrder,pendingOrder,updateStatus,getUserOrders,getCustomerId} = require('../controller/OrderController');
router.get('/getorders',getOrders);
router.post('/saveorder',saveOrder);
router.get('/getpendingorder/:id',pendingOrder);
router.post('/updatestatus/:id',updateStatus);
router.get('/getuserorders/:id',getUserOrders)
router.get('/getcustomerid/:id',getCustomerId);

module.exports = router;