const userModel  = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { hashpassword, comparepassword } = require("../helpers/authHelper");
const router = require("../routes/authRoute");
const registerController=async(req,res)=>{
    try {
        const {name,email,password}=req.body; 
        if(!name){
            return res.send({message:"Name is required"});
        }
        if(!email){
            return res.send({message:"Email is required"});
        }
        if(!password){
            return res.send({message:"Password is required"});
        }
    
        //existing user
        const exisitingUser=await userModel.findOne({email});
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'Already Registered',
            })
        }
        //register user
        const hashedpassword=await hashpassword(password)
        const user=new userModel({name,email,password:hashedpassword}).save();
    
        res.status(201).send({
            success:true,
            message:"User Registered successfully",
            user:user
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
    }
    const loginController=async(req,res)=>{
        try {
            const {email,password}=req.body;
            console.log("Running");
            if(!email||!password){
                return res.status(500).send({
                    success:false,
                    message:"Invailid UserDetails",
                })
            }
            const User=await userModel.findOne({email});
            if(!User){
                return res.status(404).send({
                    success:false,
                    message:'Email is not registered.',
                })
            }
            const match=await comparepassword(password,User.password);
            if (!match) {
        return res.status(401).json({
            success: false,
            message: "Incorrect details",
        });
    }
            const token = jwt.sign({id:User._id }, process.env.JWT_SECRET,{expiresIn:'1h'});
            
            res.status(200).send({
                success:true,
                message:"login successfully",
                User:{
                    _id:User._id,
                    name:User.name,
                    email:User.email,
                },
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error in Login",
                error
            })
        }
    }
    module.exports = {
        registerController,
        loginController}