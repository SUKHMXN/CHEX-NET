import mongoose ,{Schema}from "mongoose";

const imageSchema=new Schema(
    {
        imageFile:{
            type:{
                url:String,
                public_id:String
            },
            required:true
        },
        Confidence_score:{
            type:Number,
            default:0
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    },{timestamps:true}
)

export const Image=mongoose.model("Image",imageSchema)