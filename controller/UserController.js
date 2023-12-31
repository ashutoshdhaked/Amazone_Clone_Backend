const asyncHandler = require('express-async-handler');
const UserModel = require('../models/UserSchemaModel');
const  GeneratePassword = require('../helper/GeneratePassword');
const bcrypt = require("bcrypt")
require('dotenv').config(); 
const  jwt = require('jsonwebtoken');
const SendEmail = require('../helper/SendEmail');
const userValidation = require('../Validation/UserValidation'); 
const UploadOnCloudinary = require('../helper/UploadOnCloudinary');



async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
   }

//@desc Save The User Data 
//@routes  /user/saveuser
//@access public 
const saveUser = ( asyncHandler(async (req,res)=>{
    const userdata = {
        profile : req.body.profile,
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        profileurl:req.body.profileurl,
        usertype:req.body.usertype
       }
       try{
               // using the server side validation to validate that coming data is correct or not
                   const error = userValidation(userdata);
                   if (Object.keys(error).length !== 0) {
                    return res.status(409).json({ error });
                }
            //  here we are checking that email which is entered by user already exist in database or not  
            const emailExist = await UserModel.findOne({ email: userdata.email });
            if(emailExist){
                   return res.status(409).json({
                   error : "User is already exist !!"
               })
            }
            const temppassword = GeneratePassword(12);
            userdata.password = await hashPassword(temppassword);
            // generating the jwt token for all the user before sending the mail to the user  
            const  usersecreatekey = process.env.SECERATE_KEY; 
            const payload = {
               email : userdata.email 
            }
            const token = jwt.sign(payload,usersecreatekey,{expiresIn:'1h'})
            const text = `"<p>You have successfully registered, and your password is <h3> ${temppassword}.</h3> To change your password, please <a href="${process.env.Base_Url}/ResetPassword?token=${token}"> click here</a>.</p>"`;
            const condition =  await SendEmail(userdata.email,text,'change password');
            if (condition !== true) {
                // console.log( "email is not be send error !!!");
                return res.status(400).json({ error : "user email is not a valid email"});
             } 
            const user = await new UserModel(userdata);
            const response = await user.save();
            if(response){
              return  res.status(200).json(response);  
            }
            else{ 
             return  res.status(500).json({
                   error :"User Data Not Saved"
               })
            }
          }
          catch(err){
           console.log("error in the catch  block"); 
           return res.status(500).json({
               error : "Internal Server Error "
           })
          }

}));




//@desc Update the user password
//@routes  /user/updatepassword
//@access public
const updatePassword = ( asyncHandler(async (req,res)=>{
    const token = req.body.token.trim();
    const password = req.body.password;
    const key = process.env.SECERATE_KEY.trim(); 
    try{ 
        const payload = await jwt.verify(token,key);
        const email = payload.email;    
        const user= await UserModel.findOne({email :email});
        user.password = await hashPassword(password);
        const response =  new UserModel(user);
        const updateduser = response.save();
           if(!updateduser){
             return res.status(500).json("Internal server error");
           }        
           res.status(200).json("Your Password is updated ");
       }
    catch(error){
        console.log("error in verfing the token");
        return res.status(500).json("Internal server error");
    }
}));




//@desc  getting login user data 
//@routes  /user/loginuser
//@access public
const getUser = ( asyncHandler(async (req,res)=>{
     const {email ,password}= req.body;
     try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
         // @desc if you find a user then password which is coming with from database and the password in the request will match
         const match = await bcrypt.compare(password,user.password);
         if(!match){
            return res.status(404).json({ message: 'Incorrect Password !!' });
         }
        secretkey  =  process.env.SECREATE_KEY_USER;
          const payload = {
             id : user._id,
             email : user.email,
             usertype :user.usertype
          }
           const userdata ={
            id : user._id,
            email : user.email,
            usertype :user.usertype,
            profile : user.profile,
            username:user.username
           }

         const token = jwt.sign(payload,secretkey);
         res.status(200).json({ token: token , data : userdata});
    } catch (error) {
         console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));



//@desc Delete the Data 
//@routes  /user/:id
//@access public 
const deleteUser = ( asyncHandler(async (req,res)=>{
    const id = req.params.id;
    try{
    const user = await UserModel.deleteOne({_id:id});
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
     return  res.status(200).json({message:"user is deleted "});
}
catch(error){
    return res.status(500).json({message:"Internal Server Error !!"});
} 

}));



//@desc Update The User Data 
//@routes /user/:id
//@access public 
const updateUser = (asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userdata = {
        profile : req.body.profile,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        usertype: req.body.usertype,
        about:req.body.about
    };
    try {
        const updatedUser = await UserModel.findByIdAndUpdate({ _id: id },userdata, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));


const updateProfile = (asyncHandler(async(req,res)=>{
    try{
  const id = req.params.id;  
  const profile_url = req.body.profile;
  const updatedUser = await UserModel.findByIdAndUpdate({ _id: id },{ $set: { profile: profile_url } },{ new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}))

const getUserById =(asyncHandler(async(req,res)=>{
      const id = req.params.id;
      const response = await UserModel.find({_id:id});
      if(response){
        return res.status(200).json(response);
      }
      else{
        return res.status.apply(500).json("Internal Server error ");
      }
}))

const EmailExist = (asyncHandler(async(req,res)=>{
     const Email = req.body.email;
     const response = await UserModel.find({email:Email});
     if(response.length!==0){
        const data = response[0];
       const payload = {
        email : data.email
     }
       const  usersecreatekey = process.env.SECERATE_KEY; 
       const token = jwt.sign(payload,usersecreatekey,{expiresIn:'1h'})
       const text = `"<h4>Hii ${data.name}</h4><br><p> You can Change Your password please click here to change your password <a href="${process.env.Base_Url}/ResetPassword?token=${token}"> click here</a>.</p>"`;


       const condition =  await SendEmail(data.email,text,'Forgot password');
       if (condition !== true) {
        return res.status(400).json("Error in Sending the mail !!");
         } 
        return res.status(200).json("ok");
     }
     else{
        return res.status(500).json("not_ok");
     }
}))


const uploadImage = (asyncHandler(async(req,res)=>{
try{
    const image = req.file;
   const url = await UploadOnCloudinary(image);
   if(url){
    console.log("Image successfully uploaded, URL is: " + url);
    return res.status(200).json(url);
   }
   else{
    console.error("Error in uploading the image:", error);
    return res.status(500).json("Internal Server Error: Error in uploading the image");
   }
}
catch(error){
    console.error("Error in uploading the image:", error);
    return res.status(500).json("Internal Server Error: Error in uploading the image");   
}

}))


module.exports = {saveUser,getUser,deleteUser,updateUser,updatePassword,getUserById,uploadImage,updateProfile,EmailExist};

