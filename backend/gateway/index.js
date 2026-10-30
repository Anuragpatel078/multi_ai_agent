import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser"
import protect from "./middleware/auth.middleware.js"
import {getCurrentUser} from "./controllers/user.controller.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js";

const port=process.env.PORT

const app=express()

const allowedOrigins=(process.env.FRONTEND_URL || "")
    .split(",")
    .map(origin=>origin.trim())
    .filter(Boolean)

if(process.env.NODE_ENV !== "production"){
    allowedOrigins.push(
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    )
}

app.use(cors({
    origin:(origin,callback)=>{
        callback(null,!origin || allowedOrigins.includes(origin))
    },
    credentials:true
}))
app.use(cookieParser())
app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/chat",protect,proxyWithHeader(process.env.CHAT_SERVICE))
app.use("/api/agent",protect,proxy(process.env.AGENT_SERVICE))

app.use("/api/me",protect,getCurrentUser)

app.get("/",(req,res)=>{
    res.json({message:"hello from gateway"})
})

app.listen(port,()=>{
    console.log(`gateway started at ${port}`)
})