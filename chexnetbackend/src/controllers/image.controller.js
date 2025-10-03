import {uploadOnCloudinary,deleteOnCloudinary} from "../utils/cloudinary.js"
import {Image} from "../models/image.model.js"
import {User} from "../models/user.model.js"
import asyncHandler from "express-async-handler";
import mongoose from "mongoose"

const uploadImage = asyncHandler(async(req,res)=>{
    const imageLocalPath = req.file?.path
    const {Confidence_score} = req.body

    if(!imageLocalPath){
        res.status(401).json({message:"Invalid image path"})
        throw new Error('Invalid image path');
    }

    const imageFile = await uploadOnCloudinary(imageLocalPath)

    if(!imageFile){
        res.status(401).json({message:"image was not uploaded"})
        throw new Error('image was not uploaded');
    }

    const image = await Image.create({
        imageFile:{
            url:imageFile.url,
            public_id:imageFile.public_id
        },
        Confidence_score:Confidence_score,
        owner:req.user?._id
    })
    const uploadedImage = await Image.findById(image._id)
    console.log(uploadedImage)

    if (!uploadedImage){
        res.status(401).json({message:"image was not uploaded"})
        throw new Error('image was not uploaded');
    }

    const UpdatedUser =await User.findByIdAndUpdate(req.user?._id,
        { $push:{imageHistory:uploadedImage._id} },
        { new:true}
    )

    if (!UpdatedUser){
        res.status(401).json({message:"imagehistory was not updated"})
        throw new Error('imagehistory was not updated');
    }
    
    return res.status(200).json({
        id:image._id
    })
}) 

const getImages = asyncHandler(async(req,res)=>{

    const user =await User.findById(req.user._id)

    if (!user){
        res.status(401).json({message:"invalid user"})
        throw new Error("invalid user_id")
    }

    const imageHistory = await User.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(req.user._id) }  // Match the user by their ID
        },
        {
            $lookup: {
                from: "images", 
                localField: "imageHistory", 
                foreignField: "_id",  
                as: "images"  
            }
        },
        {
            $project: {                     
                "images.imageFile.url": 1 ,
                "images.Confidence_score":1  
            }
        }
    ]);
    
    return res.status(200).json(imageHistory)
})
export {uploadImage,getImages}