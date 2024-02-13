const express = require("express");
const router = express.Router();
const User=require("../models/user.js");
const bcrypt=require("bcryptjs");

//sign up
router.post("/register",async (req,res)=>{
    try {
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered please go to login page" });
        }
        const hashpassword= bcrypt.hashSync(password);
        const user = new User({ email, username, password:hashpassword });
        await user.save();
            res.status(200).json({message:"user registered"});
        
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(200).json({message: "Internal Server Error"});
    }    
})
//login
router.post("/signin",async (req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});

        if(!user){
           return  res.status(200).json({message:"please sign up first"});
        }

        const ispassword=bcrypt.compareSync(req.body.password,user.password);
        if(!ispassword){
           return  res.status(401).json({message:"email or password incorrect"});
        }

        const {password,...others}= user._doc;
        res.status(200).json({others});
    } catch (error) {
        res.status(400).json({message: "user already not"});
    }    
})

module.exports=router;
