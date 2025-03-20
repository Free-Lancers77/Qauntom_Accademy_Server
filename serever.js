import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { DbConnect } from './db/db.config.js';
import authRoutes from "./routes/authroutes.js";
dotenv.config();
const app = express();
//middleware
app.use(express.json());//for json data
app.use(cookieParser());//for cookies
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//
const Port=process.env.PORT || 4000;
app.use("/api/auth",authRoutes);

app.listen(Port, () => {
    DbConnect();
    console.log(`Server is running on port ${Port}`);
});