import {Appointment} from "../models/appointments.model.js"
import asyncHandler from "express-async-handler";
import mongoose from "mongoose"

const bookAppointment = asyncHandler(async(req,res)=>{

    const {name,date,start,end,doctorId,reason}=req.body
    

    if(!date || !start || !end){
        res.status(400).json({message:"Please fill in all fields."})
        throw new Error("all fields are required")
    }
    
    const appointment = await Appointment.aggregate([
        {
            $match: {
                doctorId: new mongoose.Types.ObjectId(doctorId), 
                status: "pending",
                appointmentDate: date
            }
        },
        {
            $match: {
                slot_start: { $gt: start, $lt: end }
            }
        }
    ])

    if(appointment.length>0){
        res.status(401).json({message:"cant book this time slot"})
        throw new Error("time slot is not avaliable")
    }

    const newAppointment = await Appointment.create({
        patientId:req.user._id,
        doctorId:doctorId,
        doctorName:name,
        appointmentDate:date,
        slot_start:start,
        slot_end:end,
        status:"pending",
        reason:reason
    })

    if(!newAppointment){
        res.status(500).json({message:"failed to book appointment"})
    }

    res.status(200).json({message:"appointment booked",
        doctorId:doctorId,
        start:start,
        end:end
    })
})

const fetchUserAppointment = asyncHandler(async(req,res)=>{

    const appointments = await Appointment.aggregate([
        {
            $match:{
             patientId : new mongoose.Types.ObjectId(req.user._id),
             status:"pending"
            } 
        },
        {
            $lookup:{
                from:"users",
                localField:"doctorId",
                foreignField:"_id",
                as:"doctor"
            }
        },
        {
            $unwind:"$doctor"
        },
        {
            $project:{
                _id:1,
                patientId:1,
                appointmentDate:1,
                slot_start:1,
                slot_end:1,
                "doctor.name":1,
                "doctor.email":1,
                reason:1
            }
        }
    ])

    res.status(200).json({message:"fetched all appointments",
        appointments 
    })
})

const fetchDoctorAppointment = asyncHandler(async(req,res)=>{

    const appointments = await Appointment.aggregate([
        {
            $match:{
                doctorId : new mongoose.Types.ObjectId(req.user._id),
                status:"pending"
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"patientId",
                foreignField:"_id",
                as:"patient"
            }
        },
        {
            $unwind:"$patient"
        },
        {
            $project:{
                _id:1,
                patientId:1,
                appointmentDate:1,
                slot_start:1,
                slot_end:1,
                "patient.name":1,
                "patient.email":1,  
                reason:1 
            }
        }
    ])
    res.status(200).json({message:"appointments",
        appointments
    })
})

const toggleAppointment = asyncHandler(async(req,res)=>{

    await Appointment.findByIdAndUpdate(
        req.params.id,
       { status:"done"},
       {new:true}
    )

    res.status(200).json({message:"appointment done"})
})

export {
    bookAppointment,
    fetchUserAppointment,
    fetchDoctorAppointment,
    toggleAppointment
}