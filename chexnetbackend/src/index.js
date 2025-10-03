import connectDB from "./db/db.js";
import { app } from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})

connectDB()

.then(()=>{
     app.listen(process.env.PORT || 3000,()=>{
        console.log(`server listening at port: ${process.env.PORT}`)
     })
})
.catch((err)=>{
    console.log("mongodb connection failed",err)
})