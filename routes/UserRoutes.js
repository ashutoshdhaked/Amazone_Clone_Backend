const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { saveUser, getUser, deleteUser, updateUser, updatePassword ,getUserById,uploadImage,updateProfile} = require('../controller/UserController');

router.route("/saveuser").post(saveUser); 
router.route("/loginuser").post(getUser);
router.route("/getuserbyid/:id").get(getUserById);
router.route("/:id").delete(deleteUser); 
router.route("/updateuser/:id").patch(updateUser); 
router.route("/updatepassword").patch(updatePassword); 
router.route("/updateimage/:id").patch(updateProfile);
router.route("/uploadimage").post(upload.single('file'),uploadImage);


module.exports = router;
