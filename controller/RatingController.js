const RatingModel = require('../models/RatingModel');
const ProductRatingModel = require('../models/ProductRatingModel');
const asyncHandler = require('express-async-handler');


const saveRating = (asyncHandler(async(req,res)=>{
      const data = req.body;
      const  rating = new RatingModel(data);
      const response = await rating.save();
      if(response){
        return res.status(200).send(response);
      }
      else{
        return res.status(500).send("Internal Server Error !!");
      }

}));

const getUserRating = (asyncHandler(async(req,res)=>{
       const id = req.params.id;
       const response = await RatingModel.find({ratedid:id}).select('star');;
       if(response){
          const rates = response
           let totalRating  = 0;
           for(let item of rates){
            totalRating += item.star;
           }
           const averageRating = totalRating/rates.length;

           return res.status(200).send({averageRating});
       }
       else{
        return res.status(500).send("Internal Server Error !!");
       }

}))


const SaveProductRating = (asyncHandler(async(req,res)=>{
  const data = req.body;
   const model = new  ProductRatingModel(data);
   const response = await model.save();
   if(response){
    return res.status(200).send(response);
  }
  else{
    return res.status(500).send("Internal Server Error !!");
  }
  
}))

const getRateingUser = (asyncHandler(async(req,res)=>{
   const id = req.params.id;
   const response = await RatingModel.find({ratedid:id});
   if(response){
    return res.status(200).send(response);
   }
  else{
    return res.status(500).send("Internal Server Error !!");
  }
})) 

const getAllProductsRating = (asyncHandler(async(req,res)=>{
  const id = req.params.id;
       const response = await ProductRatingModel.find({shopid:id}).select('star');
       if(response){
          const rates = response
           let totalRating  = 0;
           for(let item of rates){
            totalRating += item.star;
           }
           const shopRating = totalRating/rates.length;

           return res.status(200).send({shopRating});
       }
       else{
        return res.status(500).send("Internal Server Error !!");
       }
}))


const getProductRating = (asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const response = await ProductRatingModel.find({pid:id}).select('star');
  if(response){
     const rates = response
      let totalRating  = 0;
      for(let item of rates){
       totalRating += item.star;
      }
      const productRating = totalRating/rates.length;
      return res.status(200).send({productRating});
  }
  else{
   return res.status(500).send("Internal Server Error !!");
  }

}))

module.exports = {saveRating,getUserRating,SaveProductRating,getRateingUser,getAllProductsRating,getProductRating};