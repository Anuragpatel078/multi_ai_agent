import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
dotenv.config();
import router from "./routes/auth.route.js"

const port=process.env.PORT

const app=express()
app.use(express.json())
app.use("/",router)

app.get("/",(req,res)=>{
    res.json({message:"hello from auth"})
})

const start=async()=>{
    await connectDB()
    app.listen(port,()=>{
        console.log(`auth started at ${port}`)
    })
}

start().catch(error=>{
    console.error("auth service failed to start:",error)
    process.exitCode=1
})