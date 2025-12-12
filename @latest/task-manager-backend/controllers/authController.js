const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        // 1. Check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already registered"});
        }
        // 2. Hash password
        const hashedPassword=await bcrypt.hash(password,10);
        // 3. Create new user
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({
            message:"User created successfully",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        });
    }catch(error){
        res.status(500).json({message:"server error",error})
    }
};

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        //1.check if the user exists
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        }

         // 2. Compare password
         const isMatch=await bcrypt.compare(password,user.password);
         if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"})
         }
         // 3. Create token
         const token=jwt.sign({
            id:user._id
         },
        process.env.JWT_SECRET,
    {expiresIn:"1d"});

    res.json({
        message:"Login successful",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });

    } catch (error) {
        res.status(500).json({message:"Server error",error})
    }
};