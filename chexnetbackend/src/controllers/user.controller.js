import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { User } from "../models/user.model.js";

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body


    const user=await User.findOne({email})


    if(user && (await user.matchPassword(password))){
        generateToken(req,res, user._id)

        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            city:user.city,
            role:user.role
        });
    }
    else{
        res.status(401).json({message:"Invalid email or password"})
        throw new Error('Invalid email or password');
    }
})

const registerUser=asyncHandler(async(req,res)=>{
    const {email,password,name,city} = req.body
    
    const userexists=await User.findOne({email})

    if(userexists){
        res.status(400).json({message:"User already exists"})
        throw new Error("user already exists")
    }

    const user =await User.create({
       email,
       password,
       name,
       city,
       role:"user"
    });

    if(user){
        generateToken(req,res,user._id)

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:"user",
            city:user.city
          });
    }else{
        res.status(400).json({message:"Failed to create user"})
        throw new Error("failed to create a new user")
    }
})

const registerDoctor=asyncHandler(async(req,res)=>{
    const {email,password,name,city,licenseNumber,specialization,experience} = req.body

    const doctorexists=await User.findOne({email})

    if(doctorexists){
        res.status(400).json({message:"Doctor already exists"})
        throw new Error("Doctor already exists")
    }

    const doctor =await User.create({
       email,
       password,
       name,
       city,
       role:"doctor",
       licenseNumber,
       specialization,
       experience
    });

    if(doctor){
        generateToken(req,res,doctor._id)

        res.status(200).json({
            _id:doctor._id,
            name:doctor.name,
            email:doctor.email,
            role:"doctor",
            city:doctor.city
          });
    }else{
        res.status(400).json({message:"Failed to create doctor"})
        throw new Error("failed to create a new doctor")
    }
})

const logoutUser=(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    });
    res.status(200).json({message:"logged out successfully"})
};

const getUserProfile=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
})
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.city = req.body.city || user.city;
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        city:updatedUser.city 
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

const getDoctors = asyncHandler(async(req,res)=>{

    const {city}=req.params

    if(!city){
        res.status(400).json({message:"city is required"})
        throw new Error("city is required")
    }

    const doctors =await User.aggregate([
    {
        $match:{
            role:"doctor",
            city:city
        }
    },
    {
        $project:{
            _id:1,
            name:1,
            specialization:1,
            experience:1
        }
    }
    ])

    res.status(200).json({message:"fetched users",doctors})
    
})

export {
    authUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    getUserProfile,
    registerDoctor,
    getDoctors
}