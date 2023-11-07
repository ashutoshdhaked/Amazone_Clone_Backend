const OrderModel = require('../models/OrderModel');
const asyncHandler = require('express-async-handler');
// const CircularJSON = require('circular-json');
const SendEmail= require('../helper/SendEmail');

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

    // i want that whenever a product is saving in my database then i want to show a notification to the shopkeeper that a new order is in request
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
        // whever data is save i send a message to the shopkeeper whose id i know 
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

const updateStatus = (asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const currentStatus = req.body.status;
    const products = await OrderModel.find({_id:id});
    if(products){
        const email = products[0].email;
        let text = '';
        if(currentStatus==='cancel'){
            text="<h4>Sorry we can not fullfill your order items so we have cancled your order !! </h4>"
        }
        else{
            text=`<h4>Your Order have been Confirmed by Us and we will delivered soon your order on your address :<h3>${products[0].address}</h3></h4>`
        }
        SendEmail(email,text,'Order Process Information');
    }
   const response = await OrderModel.updateOne({_id:id},{'$set':{status:currentStatus}});
    if(response){
        return res.status(200).send(JSON.stringify(response));
    }
    else{
        return res.status(500).json({message:"Internal server error !!"});
    }  
}))


module.exports = {getOrders,saveOrder,pendingOrder,updateStatus};