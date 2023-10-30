const ProductModel = require('../models/ProductSchemaModel');
const asyncHandler = require('express-async-handler');

// @desc Fetching all the products
// @route /product/getproducts
// @access public 
const getAllProducts = (asyncHandler( async(req,res)=>{
    try {
        const products = await ProductModel.find({});
        if (products.length > 0) {
            return res.status(200).json(products);
        } else {
            return res.status(404).json({
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error',});
    }
}));

// @desc Saving the product item
// @route /product/saveproducts
// @access public
const saveProducts = (asyncHandler( async(req,res)=>{
    const usertype =  req.type; 
    if(usertype!=='shopkeeper'){
        return res.status(500).json({
            error :'Not A Valid User '
        })
       }
    const productdata ={
        url: req.body.url,
        shorttitle: req.body.shorttitle,
        longtitle: req.body.longtitle,
        mrp: req.body.mrp, 
        cost: req.body.cost,
        discount: req.body.discount,
        description: req.body.description,
        detail: req.body.detail,
        category: req.body.category
    }
    
    productdata.cost = ( productdata.mrp -  (productdata.mrp* productdata.discount)/100);
    const product = await new  ProductModel(productdata);
    const response = await product.save();
   if(response){
    return res.status(200).json(response);
   }
   else{
    return res.status(500).json({error : 'Internal Server Error!! '});
   }

}));

// @desc Fetching product according to id
// @route /product/getproducts/:token
// @access private
const getUserProducts = (asyncHandler( async(req,res)=>{
    const usertype =  req.type; 
   const id = req.id;
   if(usertype!=='shopkeeper'){
    return res.status(500).json({
        error :'Not A Valid User '
    })
   }
   const product = await ProductModel.find({userid : id}).then(  
    (result)=>{
        if (result.length > 0) {
            return res.status(200).json(result); 
        } 
        else {
            return res.status(404).json({
                error: "User not found", 
            });   
    } 
}
 ).catch((err)=>{
   return res.status(500).json({
        error :'Internal Server Error '
    })
 })

}));
// @desc deleting the product
// @route /product/deleteproducts/token
// @access private
const deleteProducts = (asyncHandler( async(req,res)=>{
    const id = req.id;
    try{
    const deleteditem = await ProductModel.deleteOne({_id:id});
      if(!deleteditem){
        return res.status(409).json("Product Not Found");
      }
      return res.status(200).json({message:"Product is deleted " ,deleteditem});
    }
    catch(error){
        return res.status(500).json("Internal Server Error ");
    }
}));

// @desc  updating products
// @route /product/updateproducts/:token
// @access private
const updataProducts = (asyncHandler( async(req,res)=>{
    const id = req.id;
    const productdata = {
        url: req.body.url,
        detailUrl: req.body.detailUrl,
        shorttitle: req.body.shorttitle,
        longtitle: req.body.longtitle,
        mrp: req.body.mrp, 
        cost: req.body.cost,
        discount: req.body.discount,
        description: req.body.description,
        detail: req.body.detail,
        tagline: req.body.tagline
    }
     
   try{
    const result = await ProductModel.updateOne({_id : id},{$set :productdata});
     if(!result){
        return res.status(500).json("Internal Server Error !!");
     } 
     res.status(200).json({message:"Product is updated ",result})
    }
    catch(error){
        return res.status(500).json("Internal Server Error !!");
    }

}));

module.exports = {getAllProducts,saveProducts,getUserProducts,deleteProducts,updataProducts};