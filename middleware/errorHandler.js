const errorHandler = (err,req,res,next)=>{
   const errorcode = res.statusCode ? res.statusCode:500; 
   
   if(errorcode===500){
    res.json({title : "Internal Server Error " , message:err.message , stackTrace:err.srack});
   }


}

module.exports = errorHandler;