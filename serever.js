import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { DbConnect } from './db/db.config.js';
dotenv.config();
const app = express();
//middleware
app.use(express.json());//for json data
app.use(cookieParser());//for cookies
app.use(cors({
    credentials: true,}));//for cors  Prevents Unauthorized Access to Sensitive Data
//
const Port=process.env.PORT || 4000;
app.get("/",(req,res)=>{
    res.send("helo");
})
app.listen(Port, () => {
    DbConnect();
    console.log(`Server is running on port ${Port}`);
});