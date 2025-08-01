const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const register = async (req,res)=>{
    try{
        const role = "user";
        const {username,email , password} = req.body;//this is destructuring of req ka body
        const hashedPassword = await bcrypt.hash(password,10);//here 10 is salt number
        console.log('this was ran');
        const newUser = new User({username,email,password:hashedPassword,role});
        await newUser.save();
        
        return res.status(200).json({success:true,message:`user registered with username ${username}`});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"})
    }
};

const login = async (req,res)=>{
    try{

        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            //if user not found on db
            return res.status(404).json({message:"user not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid credentials"});
        }
        const token = jwt.sign({id:user._id,role:user.role,name:user.username},process.env.JWT_SECRET,{expiresIn:"1h"})//first argument is payload , second is secret , expiry
        return res.status(200).json({success:true,token , message:"logged in successfully"})

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"something went wrong"})
    }
};

module.exports = {register,login};