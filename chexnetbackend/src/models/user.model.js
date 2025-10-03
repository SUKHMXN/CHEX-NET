import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=new Schema(
    {
        email:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        imageHistory:[
            {
                type:Schema.Types.ObjectId,
                ref: "Image"
            }
        ],
        role:{
            type:String,
            required:true,
            enum:["user","doctor"]
        },
        specialization:{
            type:String,
            validate: {
                validator: function(value) {
                    if (this.role === "doctor") {
                        return !!value; 
                    }
                    return true; 
                },
                message: "specialization is required for doctors."
            }
        },
        licenseNumber:{
            type:String,
            validate: {
                validator: function(value) {
                   
                    if (this.role === "doctor") {
                        return !!value; 
                    }
                    return true; 
                },
                message: "License number is required for doctors."
            }
        },
        experience:{
            type:String,
            validate: {
                validator: function(value) {
                    if (this.role === "doctor") {
                        return !!value; 
                    }
                    return true; 
                },
                message: "experience is required for doctors."
            }
        }
    },{timestamps:true}
)

userSchema.methods.matchPassword = async function(Password){
    return await bcrypt.compare(Password,this.password)
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
      next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

export const User=mongoose.model("User",userSchema)
