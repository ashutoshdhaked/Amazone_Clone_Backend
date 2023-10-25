const ProductModel = require('../models/ProductSchemaModel');
const asyncHandler = require('express-async-handler');

// @desc Fetching all the products
// @route /product/getproducts
// @access public 
const getAllProducts = (asyncHandler( async(req,res)=>{
    const product = await ProductModel.find({}).then(  
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

// @desc Saving the product item
// @route /product/saveproducts
// @access public
const saveProducts = (asyncHandler( async(req,res)=>{
    const productdata ={
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
// @route /product/getproducts/:userid
// @access private
const getUserProducts = (asyncHandler( async(req,res)=>{
   const id = req.params.userid;
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
// @route /product/deleteproducts/id
// @access private
const deleteProducts = (asyncHandler( async(req,res)=>{
    const id = req.params.id;
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
// @route /product/updateproducts/:id
// @access private
const updataProducts = (asyncHandler( async(req,res)=>{
    const id = req.params.id;
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