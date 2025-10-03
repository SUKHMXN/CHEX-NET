import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import imageRouter from "./routes/image.routes.js"
import appointmentRouter from "./routes/appointment.routes.js"

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/users",userRouter)
app.use("/api/images",imageRouter)
app.use("/api/appointment",appointmentRouter)

export {app}