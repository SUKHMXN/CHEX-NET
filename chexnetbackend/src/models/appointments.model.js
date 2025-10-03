import mongoose ,{Schema} from "mongoose";


const appointmentSchema = new Schema({
    patientId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    doctorId:{ 
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    },
    doctorName:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    },
    slot_start:{
        type:Number,
        required:true
    },
    slot_end:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","done"]
    },
    reason:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Appointment=mongoose.model("Appointment",appointmentSchema)