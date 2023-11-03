const OrderModel = require('../models/OrderModel');
const asyncHandler = require('express-async-handler');
// const CircularJSON = require('circular-json');


//@desc fetching Orders
//@route /order/getorders
//@access private 
const getOrders = (asyncHandler(async(req,res)=>{
    const orders = await OrderModel.find({});
    if(orders.length > 0){
       orders.forEach(element => {
        console.log("element : "+element);
        element.objects.forEach(index =>{
            console.log("element of array of object : "+index);     
        })
       });

        return res.status(200).send(JSON.stringify(orders));
    }
    else{
        return res.status(500).json({message:"Internal Server Error !!"});
    }
}));


//@desc fetching Orders
//@route /order/saveorder
//@access private 
const saveOrder = (asyncHandler(async(req,res)=>{
    const orderdata = await req.body;
    if(orderdata.every(element => element === null)){
        console.log("data is null");
        return res.status(404).json({message:"Your data is empty !!"});
    }
    else{
    const amount =  orderdata[0].totalamout;    
    const email = orderdata[0].email;
    const phone = orderdata[0].phone;
    const address = orderdata[0].address;
    const order = await new OrderModel({amount:amount,email: email,phone:phone,address:address,status :"pending", objects: orderdata });
    const response = await order.save();
    if(response){
        return res.status(200).send(JSON.stringify(response));
    }
    else{
        return res.status(500).json({message:"Internal server error !!"});
    }
}
}));


//@desc fetching Orders with are pending in state
//@route /order/getpendingorders
//@access private

const pendingOrder = (asyncHandler(async(req,res)=>{
    const response = await OrderModel.find({status:'pending'});
    if(response){
        return res.status(200).send(JSON.stringify(response));
    }
    else{
        return res.status(500).json({message:"Internal server error !!"});
    }
    
}))


module.exports = {getOrders,saveOrder,pendingOrder};