const express = require('express');
const router = express.Router();
const { saveUser, getUser, deleteUser, updateUser, updatePassword } = require('../controller/UserController');

router.route("/saveuser").post(saveUser); 
router.route("/loginuser").post(getUser);
router.route("/:id").delete(deleteUser); 
router.route("/updateuser/:id").patch(updateUser); 
router.route("/updatepassword").patch(updatePassword); 

module.exports = router;
