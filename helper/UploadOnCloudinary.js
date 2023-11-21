const cloudinary = require('cloudinary').v2;
const storeImage = require('../helper/StoreImage');
const options = {
    overwrite :true,
    invalidate : true,
    resource_type :'auto',
}

cloudinary.config({ 
  cloud_name: 'dmekubcxz', 
  api_key: '779217276584169', 
  api_secret: 'eK5Fc7J_JzNUdZY_YL7MRZbFdcc' 
});

const uploadImage = async(image)=>{
   const pathofimage = await storeImage(image);
   const result =  await cloudinary.uploader.upload(pathofimage.toString(),{
        folder:'products',
    })
           if(result && result.secure_url){
            console.log(result.secure_url);
            return result.secure_url;
        }
        else{
            console.log(error.message);
            return {message : error.message};
        }
}

module.exports = uploadImage;

