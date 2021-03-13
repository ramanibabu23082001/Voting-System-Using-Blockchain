const express=require("express");
const path=require('path');
const isauth=require('../middleware/voterauthentication');
const router=express.Router();
const votercontroller=require("../Control/voter");
router.get("/votersignup/",votercontroller.votersignup);
//router.post("/votersignup/",votercontroller.votersignuppost);
//router.get("/voterlogin/",votercontroller.voterlogin);
//router.post("/voterlogin/",votercontroller.voterloginpost);

module.exports=router; 